#!/usr/bin/env node
// Operator-only backup/restore. Connection secrets stay out of argv and output.
const fs = require('node:fs');
const path = require('node:path');
const { parseArgs } = require('node:util');
const { execFileSync } = require('node:child_process');
function main() {
  const { values, positionals } = parseArgs({ allowPositionals: true, options: {
    database: { type: 'string' }, file: { type: 'string' }, apply: { type: 'boolean' }, help: { type: 'boolean' },
  } });
  if (values.help) return console.log('Usage: postgres-snapshot.cjs backup|restore --database host:port/database --file /absolute/file.dump [--apply]\nPOSTGRES_DIRECT_URL is required. Restore requires --apply and an empty target. PG_BIN selects PostgreSQL tools.');
  const command = positionals[0];
  if (positionals.length !== 1 || !['backup', 'restore'].includes(command)) throw Error();
  if (!values.file || !path.isAbsolute(values.file)) throw Error();
  if (command === 'backup' && values.apply) throw Error();
  const url = new URL(process.env.POSTGRES_DIRECT_URL || '');
  if (!['postgres:', 'postgresql:'].includes(url.protocol) || !url.hostname || url.pathname.length < 2 || url.hash) throw Error();
  const target = `${url.hostname}:${url.port || '5432'}${url.pathname}`;
  if (values.database !== target) throw Error();
  const supported = ['sslmode', 'channel_binding', 'connect_timeout'];
  for (const key of url.searchParams.keys()) if (!supported.includes(key)) throw Error();
  // Build a clean libpq environment; do not inherit unrelated PG* overrides.
  const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith('PG')));
  Object.assign(env, {
    PGHOST: url.hostname, PGPORT: url.port || '5432', PGDATABASE: decodeURIComponent(url.pathname.slice(1)),
    PGUSER: decodeURIComponent(url.username), PGPASSWORD: decodeURIComponent(url.password),
    PGSSLMODE: url.searchParams.get('sslmode') || (['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname) ? 'disable' : 'require'),
    PGCHANNELBINDING: url.searchParams.get('channel_binding') || 'prefer',
    PGCONNECT_TIMEOUT: url.searchParams.get('connect_timeout') || '10',
  });
  const bin = process.env.PG_BIN || '/opt/homebrew/opt/postgresql@17/bin';
  const run = (tool, args, extra = {}) => execFileSync(path.join(bin, tool), args, { env, stdio: 'pipe', ...extra });
  if (command === 'backup') {
    const fd = fs.openSync(values.file, 'wx', 0o600);
    try {
      run('pg_dump', ['--format=custom', '--no-owner', '--no-acl', '--no-password'], { stdio: ['ignore', fd, 'pipe'] });
      fs.fsyncSync(fd);
    } catch (error) {
      fs.unlinkSync(values.file); // Only the new, incomplete file owned by this run.
      throw error;
    } finally { fs.closeSync(fd); }
    console.log(JSON.stringify({ command, database: target, file: values.file, complete: true }));
    return;
  }
  if (!fs.statSync(values.file).isFile()) throw Error();
  run('pg_restore', ['--list', values.file]);
  const objects = run('psql', ['--no-psqlrc', '--no-password', '--tuples-only', '--no-align', '--set', 'ON_ERROR_STOP=1', '--command',
    "SELECT (SELECT count(*) FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname NOT LIKE 'pg_%' AND n.nspname <> 'information_schema') + (SELECT count(*) FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace WHERE n.nspname NOT LIKE 'pg_%' AND n.nspname <> 'information_schema') + (SELECT count(*) FROM pg_type t JOIN pg_namespace n ON n.oid=t.typnamespace WHERE n.nspname NOT LIKE 'pg_%' AND n.nspname <> 'information_schema')"], { encoding: 'utf8' }).trim();
  if (objects !== '0') throw Error();
  if (values.apply) run('pg_restore', ['--exit-on-error', '--single-transaction', '--no-owner', '--no-acl', '--no-password', '--dbname', env.PGDATABASE, values.file]);
  console.log(JSON.stringify({ command, database: target, applied: Boolean(values.apply), emptyTarget: true }));
}
try { main(); } catch {
  console.error('Snapshot failed: check explicit target, connection, tool version, file permissions and empty restore target. Connection details are withheld.');
  process.exitCode = 1;
}
