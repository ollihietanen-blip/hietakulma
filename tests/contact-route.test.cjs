const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { NextRequest } = require('next/server');

// Compile the actual handler and replace only email transport; no messages leave the test.
const source = ts.transpileModule(
  readFileSync(join(__dirname, '../app/api/contact/route.ts'), 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } },
).outputText;
const valid = {
  firstName: ' Maija ', lastName: 'Meikäläinen', email: 'maija@example.com',
  phone: '+358 (40) 123-4567', company: 'Esimerkki Oy', message: 'Tarjouspyyntö\nToinen rivi',
};

function setup(result = { data: { id: 'test-email' }, error: null }, configured = true) {
  const calls = [];
  const exports = {};
  vm.runInNewContext(source, {
    exports,
    require: (name) => name === 'resend' ? {
      Resend: class {
        emails = { send: async (payload) => {
          calls.push(payload);
          if (result instanceof Error) throw result;
          return result;
        } };
      },
    } : require(name),
    process: { env: configured ? { RESEND_API_KEY: 'test-only', RESEND_FROM_EMAIL: 'Test <test@example.com>' } : {} },
    console: { error() {} },
  });
  return {
    calls,
    post: (body, raw = false) => exports.POST(new NextRequest('http://localhost/api/contact', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: raw ? body : JSON.stringify(body),
    })),
  };
}

test('accepted email returns success, trims fields and sets reply-to', async () => {
  const { calls, post } = setup();
  const res = await post(valid);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).success, true);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].replyTo, valid.email);
  assert.equal(calls[0].from, 'Test <test@example.com>');
  assert.equal(calls[0].subject, 'Uusi yhteydenotto: Maija Meikäläinen');
  assert.ok(calls[0].text.includes(valid.message));
});

for (const [label, result] of [
  ['provider rejection', { data: null, error: { message: 'rejected' } }],
  ['missing acceptance ID', { data: {}, error: null }],
  ['transport exception', new Error('connection failed')],
]) {
  test(`${label} never returns success`, async () => {
    const { post } = setup(result);
    const res = await post(valid);
    assert.equal(res.status, 502);
    const body = await res.json();
    assert.ok(body.error);
    assert.equal(body.success, undefined);
  });
}

test('missing configuration does not attempt email delivery', async () => {
  const { post, calls } = setup(undefined, false);
  assert.equal((await post(valid)).status, 503);
  assert.equal(calls.length, 0);
});

for (const [label, body] of [
  ['null body', null], ['array body', []], ['empty body', {}],
  ['whitespace name', { ...valid, firstName: '  ' }],
  ['non-string message', { ...valid, message: { text: 'hello' } }],
  ['invalid email', { ...valid, email: 'not-an-email' }],
  ['invalid phone', { ...valid, phone: 'soita minulle' }],
  ['oversize message', { ...valid, message: 'x'.repeat(10001) }],
  ['header newline', { ...valid, firstName: 'Maija\r\nBcc: other@example.com' }],
]) {
  test(`rejects ${label} before delivery`, async () => {
    const { post, calls } = setup();
    assert.equal((await post(body)).status, 400);
    assert.equal(calls.length, 0);
  });
}

test('malformed JSON returns 400', async () => {
  const { post, calls } = setup();
  assert.equal((await post('{invalid', true)).status, 400);
  assert.equal(calls.length, 0);
});

test('optional company can be omitted; HTML stays plain text', async () => {
  const { post, calls } = setup();
  const { company, ...body } = valid;
  assert.equal((await post({ ...body, message: '<a href="https://example.com">teksti</a>' })).status, 200);
  assert.equal(calls[0].html, undefined);
  assert.ok(calls[0].text.includes('<a href='));
  assert.ok(!calls[0].text.includes('Yritys:'));
});
