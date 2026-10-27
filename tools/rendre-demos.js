// Transforme chaque <section class="slide"> de slides-src/demos.html en image 1920×1080
// et mesure les zones (data-zone) en % pour js/deck.js.
// Usage : node tools/rendre-demos.js   (nécessite Playwright : npm i -D playwright)
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

(async () => {
  const root = path.join(__dirname, '..', 'slides-src');
  const out = path.join(root, 'rendu');
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const url = 'file://' + path.join(root, 'demos.html');
  await page.goto(url);
  await page.evaluate(() => document.fonts.ready);
  const ids = await page.$$eval('.slide', (s) => s.map((x) => x.id));
  const zones = {};
  for (const id of ids) {
    await page.goto(url + '#' + id);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(out, id + '.jpg'), type: 'jpeg', quality: 90 });
    const z = await page.$$eval(`#${id} [data-zone]`, (els) => els.map((e) => {
      const r = e.getBoundingClientRect();
      const p = (v, t) => Math.round((v / t) * 1000) / 10;
      return [e.dataset.zone, [p(r.left, 1920), p(r.top, 1080), p(r.width, 1920), p(r.height, 1080)]];
    }));
    if (z.length) zones[id] = Object.fromEntries(z);
    console.log('✓', id);
  }
  fs.writeFileSync(path.join(out, 'zones.json'), JSON.stringify(zones, null, 2));
  await browser.close();
})();
