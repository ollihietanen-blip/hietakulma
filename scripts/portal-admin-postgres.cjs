#!/usr/bin/env node
// Explicit operator command. Never loads .env files or prints a connection URL.
const { options, operate } = require('./portal-admin.cjs');
const help = `Usage: node scripts/portal-admin-postgres.cjs COMMAND --database host:port/database [options]
Set POSTGRES_DIRECT_URL in this process environment. No .env fallback.
Commands: export, delete-user, withdraw-marketing, invalidate-sessions, cleanup
User commands need --email; export needs --output /absolute/new-file.json.
cleanup needs --before YYYY-MM-DDTHH:mm:ss.sssZ. Mutations need --apply.
The --database target must exactly match the host, port and database in the URL.`;
async function main() {
  if (process.argv.slice(2).includes('--help')) return console.log(help);
  let opt, connection;
  try {
    connection = new URL(process.env.POSTGRES_DIRECT_URL || '');
    if (!['postgres:', 'postgresql:'].includes(connection.protocol) || !connection.hostname || connection.pathname.length < 2) throw Error();
    const target = `${connection.hostname}:${connection.port || '5432'}${connection.pathname}`;
    opt = options(process.argv.slice(2), value => {
      if (value !== target) throw Error('Target mismatch');
      return target;
    });
  } catch {
    console.error('Invalid connection, target or command options. Use --help; no operation performed.');
    process.exitCode = 1;
    return;
  }
  const { PrismaClient } = require('../lib/generated/prisma-postgres');
  const db = new PrismaClient({ datasourceUrl: connection.toString() });
  try { console.log(JSON.stringify(await operate(db, opt), null, 2)); }
  finally { await db.$disconnect(); }
}
main().catch(() => {
  console.error('PostgreSQL operation failed. Check connectivity, migrations and output-file permissions; connection details are withheld.');
  process.exitCode = 1;
});
