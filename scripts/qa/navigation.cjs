const { chromium, base, output, verifyPreview } = require('./context.cjs');
const assert = require('node:assert/strict');
(async () => {
  await verifyPreview();
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const width of [390, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base, { waitUntil: 'networkidle' });
      if (width === 390) {
        const open = page.getByRole('button', { name: 'Avaa valikko' });
        await open.focus();
        await page.keyboard.press('Enter');
        const dialog = page.getByRole('dialog', { name: 'Päävalikko' });
        await dialog.waitFor();
        assert.equal(await page.getByRole('button', { name: 'Sulje valikko' }).evaluate(el => el === document.activeElement), true);
        for (const key of ['Tab', 'Shift+Tab']) {
          for (let i = 0; i < 20; i++) {
            await page.keyboard.press(key);
            assert.equal(await page.evaluate(() => !!document.activeElement.closest('dialog')), true, `${key} escaped the modal`);
          }
        }
        await page.screenshot({ path: output('mobile-menu.png') });
        await page.keyboard.press('Escape');
        await dialog.waitFor({ state: 'detached' });
        assert.equal(await open.evaluate(el => el === document.activeElement), true);
        assert.equal(await page.evaluate(() => document.body.style.overflow), '');
        await open.click();
        await page.setViewportSize({ width: 1440, height: 900 });
        await dialog.waitFor({ state: 'detached' });
        assert.equal(await page.evaluate(() => document.body.style.overflow), '');
        await page.setViewportSize({ width: 390, height: 900 });
        await open.click();
        await page.getByRole('dialog').getByRole('link', { name: 'Puutalot', exact: true }).click();
        await page.waitForURL('**/puutalot');
        assert.equal(await page.getByRole('dialog').count(), 0);
        assert.equal(await page.evaluate(() => document.body.style.overflow), '');
      } else {
        const nav = page.getByRole('navigation', { name: 'Päänavigaatio' });
        await nav.getByRole('link', { name: 'Puutalot', exact: true }).focus();
        await page.keyboard.press('Enter');
        await page.waitForURL('**/puutalot');
        assert.equal(await nav.getByRole('link', { name: 'Puutalot', exact: true }).getAttribute('aria-current'), 'page');
        await nav.getByRole('link', { name: 'Pyydä tarjous' }).click();
        await page.waitForURL('**/ota-yhteytta');
      }
      await page.goto(base + '/kohteet', { waitUntil: 'networkidle' });
      const filters = page.locator('[aria-label="Suodata kohteita"] button');
      for (const button of await filters.all()) {
        const count = Number((await button.innerText()).match(/\d+$/)[0]);
        await button.focus();
        await page.keyboard.press('Enter');
        assert.equal(await button.getAttribute('aria-pressed'), 'true');
        assert.equal(await page.locator('main a[href^="/kohteet/"]').count(), count);
      }
      const project = page.locator('main a[href^="/kohteet/"]').first();
      const href = await project.getAttribute('href');
      await project.focus();
      await page.keyboard.press('Enter');
      await page.waitForURL(base + href);
      assert.equal(await page.locator('main h1').count(), 1);
      assert.deepEqual(errors, []);
      console.log(JSON.stringify({ width, status: 'PASS', checks: 'navigation, keyboard activation, project filters and project links; mobile modal focus, Escape and resize' }));
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
