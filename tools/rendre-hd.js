// Rend chaque diapo de slides-src/demos.html en haute définition (3840×2160) pour le PDF final.
// Résultat : slides-src/rendu-hd/<id>.jpg (non versionné).
// Usage : NODE_PATH=$(npm root -g) node tools/rendre-hd.js
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

(async () => {
  const root = path.join(__dirname, '..', 'slides-src');
  const out = path.join(root, 'rendu-hd');
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
  const url = 'file://' + path.join(root, 'demos.html');
  await page.goto(url);
  await page.evaluate(() => document.fonts.ready);
  const ids = await page.$$eval('.slide', (s) => s.map((x) => x.id));
  for (const id of ids) {
    await page.goto(url + '#' + id);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(out, id + '.jpg'), type: 'jpeg', quality: 92 });
    console.log('✓', id);
  }
  await browser.close();
})();
