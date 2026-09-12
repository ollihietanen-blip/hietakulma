const { chromium, base, verifyPreview } = require('./context.cjs');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
(async () => {
  await verifyPreview();
  const tracked = new Set(execFileSync('git', ['ls-files', '-z', 'public'], { cwd: path.resolve(__dirname, '../..'), encoding: 'utf8' }).split('\0'));
  const sitemap = await (await fetch(base + '/sitemap.xml')).text();
  const paths = [...sitemap.matchAll(/<loc>https:\/\/hietakulma.fi([^<]*)<\/loc>/g)].map(m => m[1] || '/');
  const assets = new Set(), links = new Set();
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const width of [390, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const mediaRequests = [];
      page.on('request', request => { if (request.resourceType() === 'media') mediaRequests.push(request.url()); });
      let images = 0;
      for (const route of paths) {
        console.log(`Checking media: ${width} ${route}`);
        await page.goto(base + route, { waitUntil: 'networkidle' });
        for (const img of await page.locator('img').all()) {
          if (!await img.isVisible()) continue;
          // Inspect lazy loading without waiting through the site's smooth-scroll animation for every image.
          await img.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
          await img.evaluate(el => Promise.race([
            el.decode(),
            new Promise((_, reject) => setTimeout(() => reject(Error(`Image decode timed out: ${el.currentSrc || el.src}`)), 15000)),
          ]));
          const src = new URL(await img.getAttribute('src'), base);
          assets.add(src.searchParams.get('url') || src.pathname);
          images++;
        }
        for (const href of await page.locator('a[href]').evaluateAll(els => els.map(el => el.getAttribute('href')))) {
          const url = new URL(href, base + route);
          if (url.origin === base) links.add(url.pathname + url.hash);
        }
        for (const video of await page.locator('video').all()) {
          assets.add(await video.locator('source').getAttribute('src'));
          if (width === 1440) {
            await video.scrollIntoViewIfNeeded();
            await page.waitForFunction(() => [...document.querySelectorAll('video')].every(v => v.readyState >= 2 && v.videoWidth > 0));
            const time = await video.evaluate(el => el.currentTime);
            await page.waitForTimeout(500);
            assert.ok(await video.evaluate(el => el.currentTime) > time, route + ': video did not play');
          } else assert.equal(await video.isVisible(), false);
        }
      }
      console.log(JSON.stringify({ width, status: 'PASS', decodedImages: images, pages: paths.length }));
      if (width === 390) assert.deepEqual(mediaRequests, [], 'Mobile preview downloaded a background video');
      await page.close();
    }
    for (const asset of assets) {
      assert.ok(tracked.has('public' + decodeURIComponent(asset)), `Asset is not committed: ${asset}`);
    }
    const page = await browser.newPage();
    for (const href of links) {
      const response = await page.goto(base + href, { waitUntil: 'domcontentloaded' });
      assert.equal(response.status(), 200, href);
      const hash = new URL(base + href).hash;
      if (hash) assert.ok(await page.evaluate(id => !!document.getElementById(id), decodeURIComponent(hash.slice(1))), `Missing fragment: ${href}`);
    }
    for (const route of ['/qa-nonexistent-page', '/kohteet/qa-nonexistent-project']) {
      assert.equal((await page.goto(base + route)).status(), 404, route);
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const route of ['/', '/puuelementit']) {
      await page.goto(base + route);
      assert.equal(await page.locator('video').isVisible(), false);
      assert.equal(await page.locator('.hero-section img').first().evaluate(el => getComputedStyle(el).animationName), 'none');
    }
    console.log(JSON.stringify({ status: 'PASS', committedAssets: assets.size, internalLinks: links.size, missingPages: '404', reducedMotion: 'video hidden' }));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
