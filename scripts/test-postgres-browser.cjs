const fs = require('node:fs');
const path = require('node:path');
const net = require('node:net');
const crypto = require('node:crypto');
const { spawn, execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');

module.exports = async function postgresBrowser(databaseUrl) {
  const state = path.join(root, '.postgres-browser');
  // Exclusive creation prevents concurrent builds and protects an existing directory.
  fs.mkdirSync(state, { mode: 0o700 });
  let server;
  let exited;
  try {
    const probe = net.createServer();
    await new Promise((resolve, reject) => { probe.once('error', reject); probe.listen(0, '127.0.0.1', resolve); });
    const port = probe.address().port;
    await new Promise(resolve => probe.close(resolve));
    const origin = `http://127.0.0.1:${port}`;
    const previewId = crypto.randomUUID();
    const secret = crypto.randomBytes(32).toString('base64url');
    fs.writeFileSync(path.join(state, 'preview.json'), JSON.stringify({ kind: 'hietakulma-local-preview', origin, previewId }), { mode: 0o600 });
    const env = { ...process.env, NODE_OPTIONS: '', VERCEL: '',
      PORTAL_DATABASE_PROVIDER: 'postgresql', POSTGRES_DATABASE_URL: databaseUrl,
      POSTGRES_DIRECT_URL: databaseUrl, DATABASE_URL: 'file:/nonexistent/forbidden.db',
      HIETAKULMA_LOCAL_PREVIEW: '1', HIETAKULMA_POSTGRES_BROWSER: '1',
      HIETAKULMA_QA_STATE: state, PREVIEW_ID: previewId, PREVIEW_MAIL_FILE: path.join(state, 'mail.ndjson'),
      AUTH_SECRET: secret, NEXTAUTH_SECRET: secret, AUTH_URL: origin, NEXTAUTH_URL: origin, AUTH_TRUST_HOST: 'true',
      NEXT_PUBLIC_APP_URL: 'https://preview.hietakulma.test', RESEND_API_KEY: 'local-preview-invalid-key',
      RESEND_FROM_EMAIL: 'Preview <preview@example.com>',
    };
    const run = args => execFileSync(process.execPath, args, { cwd: root, env, stdio: 'inherit' });
    run(['scripts/generate-clients.cjs']);
    run(['node_modules/next/dist/bin/next', 'build']);
    server = spawn(process.execPath, ['--require', path.join(__dirname, 'preview-mail.cjs'), 'node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port)], { cwd: root, env, stdio: 'inherit' });
    exited = new Promise((resolve, reject) => { server.once('exit', resolve); server.once('error', reject); });
    const deadline = Date.now() + 30000;
    let ready = false;
    while (Date.now() < deadline) {
      if (server.exitCode !== null) throw Error('PostgreSQL browser server exited before readiness.');
      try {
        const response = await fetch(origin, { signal: AbortSignal.timeout(1000) });
        if (response.headers.get('x-hietakulma-preview') === previewId) { ready = true; break; }
      } catch {}
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    if (!ready) throw Error('PostgreSQL browser server did not become ready.');
    for (const test of ['public', 'portal', 'contact', 'privacy']) run([`scripts/qa/${test}.cjs`]);
  } finally {
    if (server && server.exitCode === null) server.kill('SIGTERM');
    if (exited) await exited;
    fs.rmSync(state, { recursive: true, force: true });
  }
};
