const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const state = path.resolve(__dirname, '../../.local-preview');
const config = JSON.parse(fs.readFileSync(path.join(state, 'preview.json'), 'utf8'));
const base = config.origin;
assert.equal(config.kind, 'hietakulma-local-preview');
assert.equal(new URL(base).hostname, '127.0.0.1');
const evidenceDir = fs.mkdtempSync(path.join(os.tmpdir(), 'hietakulma-browser-qa-'));
const output = name => path.join(evidenceDir, name);
const mailFile = path.join(state, 'mail.ndjson');
async function verifyPreview() {
  const response = await fetch(base);
  assert.ok(config.previewId, 'Start the preview with npm run preview first.');
  assert.equal(response.headers.get('x-hietakulma-preview'), config.previewId, 'Refusing QA: target is not the configured isolated preview.');
  console.log(`Preview verified: ${base}; screenshots: ${evidenceDir}`);
}
module.exports = { chromium, base, mailFile, output, verifyPreview };
