const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(file, env) {
  const exports = {};
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(source, { exports, process: { env, cwd: () => process.cwd() }, Response, Uint8Array, Object,
    require(name) {
      if (name === '@/lib/auth-options') return { auth: async () => null };
      if (name === '@/lib/portal-preview') return load('lib/portal-preview.ts', env);
      return require(name);
    },
  });
  return exports;
}

test('anonymous downloads open only on the approved Vercel preview branch', async () => {
  for (const [env, expected] of [
    [{ VERCEL_ENV: 'preview', VERCEL_GIT_COMMIT_REF: 'codex/julkaisuvalmistelu' }, 200],
    [{ VERCEL_ENV: 'production', VERCEL_GIT_COMMIT_REF: 'codex/julkaisuvalmistelu' }, 401],
    [{ VERCEL_ENV: 'preview', VERCEL_GIT_COMMIT_REF: 'other' }, 401],
    [{ VERCEL_ENV: 'preview' }, 401],
    [{}, 401],
  ]) {
    const { GET } = load('app/api/documents/[id]/route.ts', env);
    for (const id of ['tarkistuspaketti-word', 'tarkistuspaketti-zip']) {
      const result = await GET(null, { params: Promise.resolve({ id }) });
      assert.equal(result.status, expected, JSON.stringify(env));
      assert.equal(result.headers.get('cache-control'), 'private, no-store');
      assert.equal(result.headers.get('x-robots-tag'), 'noindex, nofollow');
      if (expected === 200) assert.ok((await result.arrayBuffer()).byteLength > 1000);
    }
    assert.equal((await GET(null, { params: Promise.resolve({ id: '__proto__' }) })).status, expected === 200 ? 404 : 401);
  }
});
