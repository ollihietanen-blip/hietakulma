const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');
const ts = require('typescript');
const { PrismaClient } = require('@prisma/client');
const { NextRequest } = require('next/server');
const bcrypt = require('bcryptjs');
const root = path.resolve(__dirname, '..');
const valid = { email: 'maija@example.com', firstName: 'Maija', lastName: 'Meikäläinen', company: 'Testi Oy', roleCategory: 'DESIGNER', useCase: 'Rakennedetaljien tarkastelu', privacyAccepted: true };
const password = 'Testisalasanani-123';

// Real Prisma/SQLite and password hashing; only external delivery is replaced.
function load(file, prisma, env, transport, cache = new Map()) {
  if (cache.has(file)) return cache.get(file);
  const exports = {};
  cache.set(file, exports);
  const source = ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), {
    compilerOptions: { esModuleInterop: true, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  vm.runInNewContext(source, { exports, Buffer, URL, process: { env }, console: { error() {} }, require(name) {
    if (name === '@/lib/prisma') return { prisma };
    if (name === 'next-auth') return config => ({ auth: config });
    if (name === 'next-auth/providers/credentials') return config => config;
    if (name === 'resend') return { Resend: class { emails = { send: transport }; } };
    if (name.startsWith('@/')) return load(`${name.slice(2)}.ts`, prisma, env, transport, cache);
    return require(name);
  } }, { filename: file });
  return exports;
}
function request(body) {
  return new NextRequest('https://example.com/api/portal', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
}

test('portal registration and activation integration', async t => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'hietakulma-portal-'));
  const database = path.join(dir, 'test.db');
  execFileSync('python3', ['-c', `import sqlite3,pathlib,sys
c=sqlite3.connect(sys.argv[1])
for p in sorted(pathlib.Path(sys.argv[2]).glob('*/migration.sql')): c.executescript(p.read_text())
c.close()`, database, path.join(root, 'prisma/migrations')]);
  const prisma = new PrismaClient({ datasourceUrl: `file:${database}` });
  const sent = [];
  let outcome = 'success';
  const transport = async message => {
    sent.push(message);
    if (outcome === 'throw') throw new Error('test transport failure');
    return outcome === 'reject' ? { data: null, error: { message: 'test rejection' } } : { data: { id: 'test-email' }, error: null };
  };
  const env = { NODE_ENV: 'production', NEXT_PUBLIC_APP_URL: 'https://example.com', RESEND_API_KEY: 'test-only' };
  const signup = load('app/api/signup/route.ts', prisma, env, transport);
  const activate = load('app/api/activate/route.ts', prisma, env, transport);
  const helpers = load('lib/portal-registration.ts', prisma, env, transport);
  const tokenFromMail = () => sent.at(-1).html.match(/token=([^"<]+)/)[1];
  try {
    await t.test('invalid input never sends or stores a request', async () => {
      for (const body of [null, [], {}, { ...valid, email: 'x@' }, { ...valid, roleCategory: 'ADMIN' }, { ...valid, firstName: 'x'.repeat(81) }, { ...valid, privacyAccepted: false }]) {
        assert.equal((await signup.POST(request(body))).status, 400);
      }
      assert.equal(sent.length, 0);
      assert.equal(await prisma.registrationRequest.count(), 0);
    });
    await t.test('blocked company domains and subdomains are rejected', async () => {
      assert.equal((await signup.POST(request({ ...valid, email: 'maija@sub.lapwall.fi' }))).status, 403);
      assert.equal(sent.length, 0);
    });
    await t.test('production refuses missing or local activation URL', async () => {
      for (const url of [undefined, 'http://localhost:3000', 'https://example.com/path', 'https://example.com?wrong=1']) {
        const handler = load('app/api/signup/route.ts', prisma, { ...env, NEXT_PUBLIC_APP_URL: url }, transport);
        assert.equal((await handler.POST(request(valid))).status, 503);
      }
      assert.equal(await prisma.registrationRequest.count(), 0);
    });
    await t.test('missing email service fails before creating cooldown', async () => {
      const handler = load('app/api/signup/route.ts', prisma, { ...env, RESEND_API_KEY: '' }, transport);
      assert.equal((await handler.POST(request(valid))).status, 503);
      assert.equal(await prisma.registrationRequest.count(), 0);
    });
    await t.test('provider rejection and exception allow immediate retry', async () => {
      for (outcome of ['reject', 'throw']) {
        assert.equal((await signup.POST(request(valid))).status, 502);
        assert.equal(await prisma.registrationRequest.count(), 0);
      }
      outcome = 'success';
    });
    await t.test('successful registration normalizes email and hashes token', async () => {
      const res = await signup.POST(request({ ...valid, email: ' Maija@Example.com ' }));
      assert.equal(res.status, 200);
      assert.equal((await res.json()).activationUrl, undefined);
      const row = await prisma.registrationRequest.findFirst();
      assert.equal(row.email, valid.email);
      assert.equal(row.tokenHash, helpers.hashActivationToken(tokenFromMail()));
      assert.ok(!sent.at(-1).html.includes('localhost'));
    });
    await t.test('cooldown prevents another delivery', async () => {
      const before = sent.length;
      assert.equal((await signup.POST(request(valid))).status, 200);
      assert.equal(sent.length, before);
    });
    await t.test('password must fit bcrypt byte limit', async () => {
      for (const tooLong of ['a'.repeat(73), 'ä'.repeat(37)]) {
        assert.equal((await activate.POST(request({ token: tokenFromMail(), password: tooLong }))).status, 400);
      }
      assert.equal(await prisma.user.count(), 0);
    });
    await t.test('activation creates user and consumes token atomically', async () => {
      const token = tokenFromMail();
      const res = await activate.POST(request({ token, password }));
      assert.equal(res.status, 200);
      const user = await prisma.user.findUnique({ where: { email: valid.email } });
      assert.ok(await bcrypt.compare(password, user.password));
      assert.ok(user.emailVerifiedAt);
      assert.ok((await prisma.registrationRequest.findFirst()).usedAt);
      assert.equal((await activate.POST(request({ token, password }))).status, 410);
      assert.equal(await prisma.user.count(), 1);
    });
    await t.test('login accepts normalized email and rejects malformed credentials', async () => {
      const auth = load('lib/auth-options.ts', prisma, env, transport).auth;
      const authorize = auth.providers[0].authorize;
      const user = await authorize({ email: ' Maija@Example.com ', password });
      assert.equal(user.email, valid.email);
      assert.equal((await prisma.user.findUnique({ where: { email: valid.email } })).loginCount, 1);
      assert.equal(await authorize({ email: valid.email, password: 'wrong' }), null);
      assert.equal(await authorize({ email: valid.email, password: { bad: true } }), null);
      assert.equal(await authorize({ email: {}, password }), null);
    });
    await t.test('expired activation creates no account', async () => {
      await signup.POST(request({ ...valid, email: 'expired@example.com' }));
      const token = tokenFromMail();
      await prisma.registrationRequest.updateMany({ where: { email: 'expired@example.com' }, data: { expiresAt: new Date(0) } });
      assert.equal((await activate.POST(request({ token, password }))).status, 410);
      assert.equal(await prisma.user.count(), 1);
    });
    await t.test('simultaneous activation creates one account', async () => {
      await signup.POST(request({ ...valid, email: 'race@example.com' }));
      const token = tokenFromMail();
      const results = await Promise.all([activate.POST(request({ token, password })), activate.POST(request({ token, password }))]);
      assert.deepEqual(results.map(r => r.status).sort(), [200, 410]);
      assert.equal(await prisma.user.count({ where: { email: 'race@example.com' } }), 1);
    });
    const resetRequest = load('app/api/password-reset/request/route.ts', prisma, env, transport);
    const resetConfirm = load('app/api/password-reset/confirm/route.ts', prisma, env, transport);
    const resetToken = () => sent.at(-1).text.match(/token=([^\s]+)/)[1];
    let activeResetToken;
    await t.test('reset delivery failure leaves no cooldown record', async () => {
      outcome = 'reject';
      const res = await resetRequest.POST(request({ email: valid.email }));
      assert.equal(res.status, 200);
      assert.equal(await prisma.passwordResetRequest.count(), 0);
      outcome = 'success';
    });
    await t.test('reset gives the same public response for known and unknown users', async () => {
      const before = sent.length;
      const unknown = await resetRequest.POST(request({ email: 'unknown@example.com' }));
      assert.equal(sent.length, before);
      const known = await resetRequest.POST(request({ email: valid.email }));
      assert.deepEqual(await known.json(), await unknown.json());
      assert.equal(sent.length, before + 1);
      activeResetToken = resetToken();
      const row = await prisma.passwordResetRequest.findFirst();
      assert.equal(row.tokenHash, helpers.hashActivationToken(activeResetToken));
    });
    await t.test('reset cooldown prevents duplicate email', async () => {
      const before = sent.length;
      assert.equal((await resetRequest.POST(request({ email: valid.email }))).status, 200);
      assert.equal(sent.length, before);
    });
    await t.test('reset refuses invalid token and excessive password bytes', async () => {
      assert.equal((await resetConfirm.POST(request({ token: 'invalid', password }))).status, 410);
      assert.equal((await resetConfirm.POST(request({ token: activeResetToken, password: 'ä'.repeat(37) }))).status, 400);
    });
    await t.test('one-time reset invalidates old password and existing sessions', async () => {
      const auth = load('lib/auth-options.ts', prisma, env, transport).auth;
      const user = await auth.providers[0].authorize({ email: valid.email, password });
      const oldSession = await auth.callbacks.jwt({ token: {}, user });
      assert.ok(oldSession);
      const nextPassword = 'Uusi-testisalasana-456';
      const res = await resetConfirm.POST(request({ token: activeResetToken, password: nextPassword }));
      assert.equal(res.status, 200);
      assert.equal(await auth.callbacks.jwt({ token: oldSession }), null);
      assert.equal(await auth.providers[0].authorize({ email: valid.email, password }), null);
      assert.ok(await auth.providers[0].authorize({ email: valid.email, password: nextPassword }));
      assert.equal((await resetConfirm.POST(request({ token: activeResetToken, password }))).status, 410);
    });
    await t.test('expired reset cannot change a password', async () => {
      await resetRequest.POST(request({ email: 'race@example.com' }));
      const token = resetToken();
      await prisma.passwordResetRequest.updateMany({ where: { tokenHash: helpers.hashActivationToken(token) }, data: { expiresAt: new Date(0) } });
      assert.equal((await resetConfirm.POST(request({ token, password }))).status, 410);
    });
    await t.test('shared database limiter allows only configured number of concurrent attempts', async () => {
      const { allowAttempt } = load('lib/rate-limit.ts', prisma, env, transport);
      const results = await Promise.all(Array.from({ length: 8 }, () => allowAttempt('test', 'one-user', 3)));
      assert.equal(results.filter(Boolean).length, 3);
      assert.equal(await allowAttempt('test', 'different-user', 3), true);
    });
    await t.test('signup and reset endpoints return 429 after too many requests', async () => {
      for (let i = 0; i < 5; i++) await resetRequest.POST(request({ email: 'limited@example.com' }));
      assert.equal((await resetRequest.POST(request({ email: 'limited@example.com' }))).status, 429);
      for (let i = 0; i < 5; i++) await signup.POST(request({ ...valid, email: 'signup-limited@example.com' }));
      assert.equal((await signup.POST(request({ ...valid, email: 'signup-limited@example.com' }))).status, 429);
    });
  } finally {
    await prisma.$disconnect();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
