const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const exportsObject = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/database-provider.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText, { exports: exportsObject });
const { databaseProvider } = exportsObject;
test('Vercel always requires the persistent provider', () => {
  assert.equal(databaseProvider({ VERCEL: '1' }), 'postgresql');
  assert.equal(databaseProvider({ VERCEL: '1', PORTAL_DATABASE_PROVIDER: 'postgresql' }), 'postgresql');
  assert.throws(() => databaseProvider({ VERCEL: '1', PORTAL_DATABASE_PROVIDER: 'sqlite' }));
});
test('local provider selection is explicit and rejects typos', () => {
  assert.equal(databaseProvider({}), 'sqlite');
  assert.equal(databaseProvider({ PORTAL_DATABASE_PROVIDER: 'postgresql' }), 'postgresql');
  assert.throws(() => databaseProvider({ PORTAL_DATABASE_PROVIDER: 'postgres' }));
});
