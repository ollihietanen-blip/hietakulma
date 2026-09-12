const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { execFileSync, spawnSync } = require('node:child_process');
const { PrismaClient } = require('@prisma/client');
const root = path.resolve(__dirname, '..');
const cli = path.join(root, 'scripts/portal-admin.cjs');
const snapshot = path.join(root, 'scripts/sqlite-snapshot.py');

test('operator commands preserve unrelated users and restore a real SQLite backup', async t => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'hietakulma-admin-'));
  const database = path.join(dir, 'test.db');
  execFileSync('python3', ['-c', `import sqlite3,pathlib,sys
c=sqlite3.connect(sys.argv[1])
for p in sorted(pathlib.Path(sys.argv[2]).glob('*/migration.sql')): c.executescript(p.read_text())
c.close()`, database, path.join(root, 'prisma/migrations')]);
  const db = new PrismaClient({ datasourceUrl: `file:${database}` });
  const email = 'target@example.com';
  const old = new Date('2025-01-01T00:00:00.000Z');
  const future = new Date('2099-01-01T00:00:00.000Z');
  function run(command, extra = []) {
    return JSON.parse(execFileSync(process.execPath, [cli, command, '--database', database, ...extra], { encoding: 'utf8' }));
  }
  const targetArgs = ['--email', ' Target@Example.com '];
  try {
    const user = await db.user.create({ data: { email, password: 'SECRET-PASSWORD-HASH', marketingConsent: true, marketingConsentAt: old } });
    const other = await db.user.create({ data: { email: 'other@example.com', password: 'OTHER-SECRET' } });
    for (const [address, tokenHash, expiresAt] of [[email, 'SECRET-TOKEN-1', old], [email, 'SECRET-TOKEN-2', future], [other.email, 'OTHER-TOKEN', future]]) {
      await db.registrationRequest.create({ data: { email: address, tokenHash, firstName: 'Test', lastName: 'User', company: 'Test', roleCategory: 'DESIGNER', useCase: 'QA', marketingConsent: true, privacyAcceptedAt: old, expiresAt } });
    }
    await db.passwordResetRequest.create({ data: { userId: user.id, tokenHash: 'SECRET-RESET', expiresAt: future } });
    await db.passwordResetRequest.create({ data: { userId: user.id, tokenHash: 'SECRET-EXPIRED-RESET', expiresAt: old } });
    await db.rateLimitBucket.create({ data: { key: 'expired-test', expiresAt: old } });
    await db.rateLimitBucket.create({ data: { key: 'active-test', expiresAt: future } });
    await db.rateLimitBucket.create({ data: { key: 'boundary-test', expiresAt: new Date('2026-01-01T00:00:00.000Z') } });

    await t.test('requires explicit existing target and rejects typos and invalid cleanup dates', () => {
      for (const args of [[], ['delete-user', '--database', database, '--email', email, '--aply'], ['cleanup', '--database', database, '--before', '2099-01-01T00:00:00.000Z'], ['cleanup', '--database', database, '--before', 'yesterday'], ['export', '--database', database, '--email', email]]) {
        assert.notEqual(spawnSync(process.execPath, [cli, ...args]).status, 0);
      }
      const missing = path.join(dir, 'missing.db');
      assert.notEqual(spawnSync(process.execPath, [cli, 'delete-user', '--database', missing, ...targetArgs]).status, 0);
      assert.equal(fs.existsSync(missing), false);
    });

    await t.test('all mutation commands default to dry run', async () => {
      for (const command of ['delete-user', 'withdraw-marketing', 'invalidate-sessions']) assert.equal(run(command, targetArgs).applied, false);
      assert.equal(run('cleanup', ['--before', '2026-01-01T00:00:00.000Z']).applied, false);
      assert.equal(await db.registrationRequest.count(), 3);
      assert.equal(await db.passwordResetRequest.count(), 2);
      const current = await db.user.findUnique({ where: { id: user.id } });
      assert.equal(current.marketingConsent, true);
      assert.equal(current.sessionVersion, 0);
    });

    await t.test('export omits credentials and tokens and does not overwrite an existing file', () => {
      const output = path.join(dir, 'export.json');
      run('export', [...targetArgs, '--output', output]);
      const content = fs.readFileSync(output, 'utf8');
      assert.equal(JSON.parse(content).registrations.length, 2);
      assert.equal(JSON.parse(content).passwordResets.length, 2);
      assert.doesNotMatch(content, /SECRET|tokenHash|sessionVersion|"password"/);
      assert.equal(fs.statSync(output).mode & 0o777, 0o600);
      assert.notEqual(spawnSync(process.execPath, [cli, 'export', '--database', database, ...targetArgs, '--output', output]).status, 0);
      assert.equal(fs.readFileSync(output, 'utf8'), content);
    });

    await t.test('withdrawal also changes pending activations and preserves historical consent time', async () => {
      run('withdraw-marketing', [...targetArgs, '--apply']);
      assert.equal(await db.registrationRequest.count({ where: { email, marketingConsent: true } }), 0);
      const current = await db.user.findUnique({ where: { id: user.id } });
      assert.equal(current.marketingConsent, false);
      assert.equal(current.marketingConsentAt.toISOString(), old.toISOString());
      assert.equal((await db.registrationRequest.findFirst({ where: { email: other.email } })).marketingConsent, true);
    });

    await t.test('session invalidation changes only the selected account', async () => {
      run('invalidate-sessions', [...targetArgs, '--apply']);
      assert.equal((await db.user.findUnique({ where: { id: user.id } })).sessionVersion, 1);
      assert.equal((await db.user.findUnique({ where: { id: other.id } })).sessionVersion, 0);
    });

    await t.test('cleanup respects the chosen expiry cutoff and keeps active tokens and all users', async () => {
      run('cleanup', ['--before', '2026-01-01T00:00:00.000Z', '--apply']);
      assert.equal(await db.registrationRequest.count(), 2);
      assert.equal(await db.passwordResetRequest.count(), 1);
      assert.equal(await db.rateLimitBucket.count(), 2);
      assert.equal(await db.user.count(), 2);
    });

    await t.test('backup includes committed WAL data and restores readable Prisma records', async () => {
      await db.$queryRawUnsafe('PRAGMA journal_mode=WAL');
      await db.user.update({ where: { id: user.id }, data: { name: 'Committed WAL name' } });
      const backup = path.join(dir, 'backup.db');
      const restored = path.join(dir, 'restored.db');
      execFileSync('python3', [snapshot, '--source', database, '--destination', backup]);
      assert.equal(fs.statSync(backup).mode & 0o777, 0o600);
      assert.notEqual(spawnSync('python3', [snapshot, '--source', database, '--destination', backup]).status, 0);
      execFileSync('python3', [snapshot, '--source', backup, '--destination', restored]);
      const copy = new PrismaClient({ datasourceUrl: `file:${restored}` });
      try {
        assert.equal((await copy.user.findUnique({ where: { id: user.id } })).name, 'Committed WAL name');
        assert.equal(await copy.user.count(), 2);
        assert.equal(await copy.passwordResetRequest.count(), 1);
      } finally { await copy.$disconnect(); }
    });

    await t.test('delete removes the account, all its registrations and reset tokens only', async () => {
      const result = run('delete-user', [...targetArgs, '--apply']);
      assert.equal(result.matched.users, 1);
      assert.equal(await db.user.findUnique({ where: { id: user.id } }), null);
      assert.equal(await db.registrationRequest.count({ where: { email } }), 0);
      assert.equal(await db.passwordResetRequest.count(), 0);
      assert.equal(await db.user.count(), 1);
      assert.equal(await db.registrationRequest.count(), 1);
      assert.equal(run('delete-user', [...targetArgs, '--apply']).matched.users, 0);
    });
  } finally { await db.$disconnect(); fs.rmSync(dir, { recursive: true, force: true }); }
});
