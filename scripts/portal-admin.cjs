#!/usr/bin/env node
// Local operator CLI. Never imported by application routes; no environment-file fallback.
const fs = require('node:fs');
const path = require('node:path');
const { parseArgs } = require('node:util');
const { PrismaClient } = require('@prisma/client');

const help = `Usage: node scripts/portal-admin.cjs COMMAND --database /absolute/database.db [options]
Commands: export, delete-user, withdraw-marketing, invalidate-sessions, cleanup
User commands require --email. export requires --output /absolute/new-file.json.
cleanup requires --before YYYY-MM-DDTHH:mm:ss.sssZ (approved retention cutoff).
Mutations only report counts unless --apply is supplied. No emails are sent.`;

function options(args) {
  const { values, positionals } = parseArgs({ args, allowPositionals: true, options: {
    database: { type: 'string' }, email: { type: 'string' }, output: { type: 'string' },
    before: { type: 'string' }, apply: { type: 'boolean', default: false }, help: { type: 'boolean' },
  } });
  if (values.help) return { help: true };
  const command = positionals[0];
  if (positionals.length !== 1 || !['export', 'delete-user', 'withdraw-marketing', 'invalidate-sessions', 'cleanup'].includes(command)) throw Error(help);
  if (!values.database || !path.isAbsolute(values.database) || !fs.statSync(values.database).isFile()) throw Error('An existing absolute database file is required.');
  const database = fs.realpathSync(values.database);
  // Prisma interprets query characters in datasource URLs. Fail rather than silently target another file.
  if (/[?#]/.test(database)) throw Error('Database path cannot contain ? or #.');
  const email = values.email?.trim().toLowerCase();
  if (command !== 'cleanup' && (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) throw Error('A valid --email is required.');
  if (command === 'cleanup' && (values.email || values.output)) throw Error('cleanup only accepts --before, --database and --apply.');
  if (command !== 'cleanup' && values.before) throw Error('--before is only accepted by cleanup.');
  if (command !== 'export' && values.output) throw Error('--output is only accepted by export.');
  if (command === 'export' && (values.apply || !values.output || !path.isAbsolute(values.output))) throw Error('export requires an absolute --output and does not accept --apply.');
  const before = new Date(values.before || NaN);
  if (command === 'cleanup' && (!values.before || !Number.isFinite(before.getTime()) || before.toISOString() !== values.before || before > new Date())) throw Error('A past UTC --before cutoff in YYYY-MM-DDTHH:mm:ss.sssZ format is required.');
  return { ...values, command, database, email, before };
}

const profileSelect = Object.fromEntries(['id', 'email', 'name', 'firstName', 'lastName', 'company', 'roleCategory', 'jobTitle', 'phone', 'useCase', 'emailVerifiedAt', 'marketingConsent', 'marketingConsentAt', 'privacyAcceptedAt', 'lastLoginAt', 'loginCount', 'createdAt', 'updatedAt'].map(key => [key, true]));
const registrationSelect = Object.fromEntries(['email', 'firstName', 'lastName', 'company', 'roleCategory', 'jobTitle', 'phone', 'useCase', 'marketingConsent', 'privacyAcceptedAt', 'expiresAt', 'usedAt', 'createdAt'].map(key => [key, true]));

async function operate(db, opt) {
  if (opt.command === 'export') {
    const data = await db.$transaction(async tx => ({
      profile: await tx.user.findUnique({ where: { email: opt.email }, select: profileSelect }),
      registrations: await tx.registrationRequest.findMany({ where: { email: opt.email }, select: registrationSelect }),
      passwordResets: await tx.passwordResetRequest.findMany({ where: { user: { email: opt.email } }, select: { createdAt: true, expiresAt: true, usedAt: true } }),
    }));
    fs.writeFileSync(opt.output, JSON.stringify({ exportedAt: new Date().toISOString(), ...data }, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
    return { command: opt.command, output: opt.output, found: Boolean(data.profile || data.registrations.length) };
  }
  // Counts and changes share one transaction. Dry runs never execute update/delete operations.
  return db.$transaction(async tx => {
    let counts;
    if (opt.command === 'cleanup') {
      const expired = { expiresAt: { lt: opt.before } };
      counts = { registrations: await tx.registrationRequest.count({ where: expired }), passwordResets: await tx.passwordResetRequest.count({ where: expired }), rateLimits: await tx.rateLimitBucket.count({ where: expired }) };
      if (opt.apply) {
        await tx.registrationRequest.deleteMany({ where: expired });
        await tx.passwordResetRequest.deleteMany({ where: expired });
        await tx.rateLimitBucket.deleteMany({ where: expired });
      }
    } else {
      const where = { email: opt.email };
      counts = { users: await tx.user.count({ where }), registrations: await tx.registrationRequest.count({ where }) };
      if (opt.command === 'delete-user') {
        counts.passwordResets = await tx.passwordResetRequest.count({ where: { user: where } });
        if (opt.apply) {
          await tx.registrationRequest.deleteMany({ where });
          await tx.user.deleteMany({ where }); // Reset requests cascade; existing JWTs fail the user lookup.
        }
      } else if (opt.command === 'withdraw-marketing' && opt.apply) {
        await tx.user.updateMany({ where, data: { marketingConsent: false } });
        // Pending activation must not restore a withdrawn choice.
        await tx.registrationRequest.updateMany({ where, data: { marketingConsent: false } });
      } else if (opt.command === 'invalidate-sessions' && opt.apply) {
        await tx.user.updateMany({ where, data: { sessionVersion: { increment: 1 } } });
      }
    }
    return { command: opt.command, database: opt.database, applied: opt.apply, matched: counts };
  });
}

async function main() {
  const opt = options(process.argv.slice(2));
  if (opt.help) return console.log(help);
  const db = new PrismaClient({ datasourceUrl: `file:${opt.database}` });
  try { console.log(JSON.stringify(await operate(db, opt), null, 2)); }
  finally { await db.$disconnect(); }
}
if (require.main === module) main().catch(error => { console.error(error.message); process.exitCode = 1; });
module.exports = { options, operate };
