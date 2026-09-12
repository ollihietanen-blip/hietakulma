#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const net = require('node:net');
const { spawn, spawnSync } = require('node:child_process');
const { parseArgs } = require('node:util');
const root = path.resolve(__dirname, '..');
const state = path.join(root, '.local-preview');
const marker = path.join(state, 'preview.json');
const { values } = parseArgs({ options: { port: { type: 'string', default: '3108' }, mails: { type: 'boolean' } } });
const port = Number(values.port);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw Error('Use a port between 1024 and 65535.');

async function main() {
  if (values.mails) {
    const config = JSON.parse(fs.readFileSync(marker, 'utf8'));
    const file = path.join(state, 'mail.ndjson');
    if (!fs.existsSync(file)) return console.log('Esikatselussa ei ole vielä viestejä.');
    for (const line of fs.readFileSync(file, 'utf8').trim().split('\n').filter(Boolean)) {
      const mail = JSON.parse(line);
      const links = [...(mail.text || mail.html || '').matchAll(/https:\/\/preview\.hietakulma\.test\/(?:activate|reset-password)\?token=([^\s"<]+)/g)].map(match => match[0].replace('https://preview.hietakulma.test', config.origin));
      console.log(JSON.stringify({ to: mail.to, subject: mail.subject, localLinks: links }));
    }
    return;
  }
  // Check before building: an existing server must not have its build files replaced.
  await new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.once('error', () => reject(Error(`Port ${port} is in use. Stop that preview or select --port.`)));
    probe.listen(port, '127.0.0.1', () => probe.close(resolve));
  });
  if (fs.existsSync(state) && !fs.existsSync(marker)) throw Error('Existing .local-preview directory has no preview marker; inspect it before continuing.');
  fs.mkdirSync(state, { recursive: true, mode: 0o700 });
  const origin = `http://127.0.0.1:${port}`;
  const prior = fs.existsSync(marker) ? JSON.parse(fs.readFileSync(marker, 'utf8')) : null;
  if (prior && prior.kind !== 'hietakulma-local-preview') throw Error('Invalid preview marker.');
  if (prior) {
    const previousOrigin = new URL(prior.origin);
    if (previousOrigin.protocol !== 'http:' || previousOrigin.hostname !== '127.0.0.1') throw Error('Invalid local preview origin.');
    let running = false;
    try {
      const response = await fetch(prior.origin, { signal: AbortSignal.timeout(1000) });
      running = Boolean(prior.previewId && response.headers.get('x-hietakulma-preview') === prior.previewId);
    } catch (error) {
      if (error.cause?.code !== 'ECONNREFUSED') throw Error('Cannot establish whether the previous preview stopped. Check it before rebuilding.');
    }
    if (running) throw Error('The previous preview is still running. Stop it before rebuilding on another port.');
  }
  const secret = prior?.secret || crypto.randomBytes(32).toString('base64url');
  const previewId = crypto.randomUUID();
  fs.writeFileSync(marker, JSON.stringify({ kind: 'hietakulma-local-preview', origin, secret, previewId }), { mode: 0o600 });
  const database = path.join(state, 'preview.db');
  fs.closeSync(fs.openSync(database, 'a', 0o600));
  const mailFile = path.join(state, 'mail.ndjson');
  const env = { ...process.env,
    DATABASE_URL: `file:${database}`, AUTH_SECRET: secret, NEXTAUTH_SECRET: secret,
    AUTH_URL: origin, NEXTAUTH_URL: origin, AUTH_TRUST_HOST: 'true',
    NEXT_PUBLIC_APP_URL: 'https://preview.hietakulma.test',
    RESEND_API_KEY: 'local-preview-invalid-key', RESEND_FROM_EMAIL: 'Preview <preview@example.com>',
    HIETAKULMA_LOCAL_PREVIEW: '1', PREVIEW_MAIL_FILE: mailFile, PREVIEW_ID: previewId,
    NODE_OPTIONS: '', // Do not inherit unrelated preload modules into the isolated preview.
  };
  function run(module, args) {
    const result = spawnSync(process.execPath, [require.resolve(module), ...args], { cwd: root, env, stdio: 'inherit' });
    if (result.error || result.status !== 0) throw Error(`Preview setup failed: ${module} ${args.join(' ')}`);
  }
  run('prisma/build/index.js', ['generate']);
  run('prisma/build/index.js', ['migrate', 'deploy']);
  run('next/dist/bin/next', ['build']);
  console.log(`\nPaikallinen esikatselu: ${origin}\nTestitietokanta: ${database}\nViestejä ei lähetetä. Näytä aktivointi-/palautuslinkit: npm run preview:mails\nLopeta Ctrl+C. Testitiedot säilyvät .local-preview-hakemistossa.\n`);
  const child = spawn(process.execPath, ['--require', path.join(__dirname, 'preview-mail.cjs'), require.resolve('next/dist/bin/next'), 'start', '--hostname', '127.0.0.1', '--port', String(port)], { cwd: root, env, stdio: 'inherit' });
  for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
  child.on('error', error => { console.error(error.message); process.exitCode = 1; });
  child.on('exit', code => { process.exitCode = code || 0; });
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
