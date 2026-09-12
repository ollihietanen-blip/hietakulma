// Preloaded only by preview.cjs. All Resend calls are captured locally.
const fs = require('node:fs');
const path = require('node:path');
if (process.env.HIETAKULMA_LOCAL_PREVIEW !== '1' || !path.isAbsolute(process.env.PREVIEW_MAIL_FILE || '')) {
  throw Error('The preview mail transport requires an explicit local preview environment.');
}
const originalFetch = globalThis.fetch;
globalThis.fetch = async function(input, options) {
  const url = new URL(typeof input === 'string' ? input : input.url || String(input));
  if (url.hostname === 'api.resend.com') {
    if (url.pathname !== '/emails' || options?.method !== 'POST' || typeof options.body !== 'string') throw Error('Unexpected mail operation in local preview.');
    const message = JSON.parse(options.body);
    fs.appendFileSync(process.env.PREVIEW_MAIL_FILE, JSON.stringify(message) + '\n', { mode: 0o600 });
    return new Response(JSON.stringify({ id: 'local-preview-only' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
  return originalFetch.apply(this, arguments);
};
