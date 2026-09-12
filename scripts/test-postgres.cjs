// Disposable real PostgreSQL cluster. No dotenv, remote DB, or existing cluster.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const net = require('node:net');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const bin = process.env.PG_BIN || '/opt/homebrew/opt/postgresql@17/bin';
const run = (name, args, options = {}) => execFileSync(path.join(bin, name), args, { stdio: 'pipe', ...options });
async function main() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'hietakulma-pg-'));
  const data = path.join(dir, 'data');
  const socket = path.join(dir, 'socket');
  fs.mkdirSync(socket);
  const probe = net.createServer();
  await new Promise((resolve, reject) => { probe.once('error', reject); probe.listen(0, '127.0.0.1', resolve); });
  const port = probe.address().port;
  await new Promise(resolve => probe.close(resolve));
  let started = false;
  try {
    run('initdb', ['-D', data, '-U', 'test_runner', '--auth-local=trust', '--auth-host=trust', '--no-locale', '--encoding=UTF8']);
    run('pg_ctl', ['-D', data, '-l', path.join(dir, 'server.log'), '-o', `-h 127.0.0.1 -p ${port} -k ${socket}`, '-w', 'start']);
    started = true;
    run('createdb', ['-h', '127.0.0.1', '-p', String(port), '-U', 'test_runner', 'hietakulma_test_portal']);
    const url = `postgresql://test_runner@127.0.0.1:${port}/hietakulma_test_portal`;
    const env = { ...process.env, POSTGRES_DATABASE_URL: url, POSTGRES_DIRECT_URL: url };
    const prisma = args => execFileSync(process.execPath, ['node_modules/prisma/build/index.js', ...args, '--config', 'prisma.postgresql.config.ts'], { cwd: root, env, stdio: 'inherit' });
    execFileSync(process.execPath, ['scripts/postgres-schema.cjs', '--check'], { cwd: root, stdio: 'inherit' });
    prisma(['generate']);
    prisma(['migrate', 'deploy']);
    prisma(['migrate', 'deploy']);
    prisma(['migrate', 'diff', '--from-schema-datasource', 'prisma/postgresql/schema.prisma', '--to-schema-datamodel', 'prisma/postgresql/schema.prisma', '--exit-code']);
    execFileSync(process.execPath, ['--test', 'tests/portal-flow.test.cjs'], { cwd: root, env: { ...env, HIETAKULMA_TEST_POSTGRES_URL: url }, stdio: 'inherit' });
    if (process.argv.includes('--browser')) await require('./test-postgres-browser.cjs')(url);
    const backup = path.join(dir, 'portal.dump');
    const fd = fs.openSync(backup, 'wx', 0o600);
    try {
      run('pg_dump', ['--format=custom', '--no-owner', '--no-acl'], {
        env: { ...env, PGDATABASE: 'hietakulma_test_portal', PGHOST: '127.0.0.1', PGPORT: String(port), PGUSER: 'test_runner' },
        stdio: ['ignore', fd, 'pipe'],
      });
    } finally { fs.closeSync(fd); }
    run('createdb', ['-h', '127.0.0.1', '-p', String(port), '-U', 'test_runner', 'hietakulma_test_restored']);
    const restoredUrl = url.replace('/hietakulma_test_portal', '/hietakulma_test_restored');
    run('pg_restore', ['--exit-on-error', '--no-owner', '--no-acl', '--dbname', 'hietakulma_test_restored', backup], {
      env: { ...env, PGHOST: '127.0.0.1', PGPORT: String(port), PGUSER: 'test_runner' },
    });
    const { PrismaClient } = require('../lib/generated/prisma-postgres');
    const original = new PrismaClient({ datasourceUrl: url });
    const restored = new PrismaClient({ datasourceUrl: restoredUrl });
    try {
      for (const model of ['user', 'registrationRequest', 'passwordResetRequest', 'rateLimitBucket']) {
        const orderBy = model === 'rateLimitBucket' ? { key: 'asc' } : { id: 'asc' };
        const before = await original[model].findMany({ orderBy });
        const after = await restored[model].findMany({ orderBy });
        assert.ok(before.length > 0, `Expected nonempty ${model} fixture`);
        assert.deepEqual(after, before, `Restored ${model} must preserve every field`);
      }
      // Verify the restored FK still cascades, rather than merely comparing rows.
      const reset = await restored.passwordResetRequest.findFirst();
      await restored.user.delete({ where: { id: reset.userId } });
      assert.equal(await restored.passwordResetRequest.count({ where: { userId: reset.userId } }), 0);
      console.log('PASS: pg_dump/pg_restore preserves all portal fields and cascading relation.');
    } finally {
      await Promise.all([original.$disconnect(), restored.$disconnect()]);
    }
  } finally {
    if (started) run('pg_ctl', ['-D', data, '-m', 'fast', '-w', 'stop']);
    fs.rmSync(dir, { recursive: true, force: true });
  }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
