// Fabrique presentation/presentation-finale.pdf : le diaporama tel qu'il s'affiche sur l'écran
// (affiches, tableau, conversation…), avec une page par révélation (comme des animations).
// À projeter sans la régie : flèche droite = étape suivante.
// Usage : NODE_PATH=$(npm root -g) node tools/rendre-hd.js (diapos en 3840×2160), puis
//         python3 -m http.server 8765 (à la racine du site), puis
//         NODE_PATH=$(npm root -g) node tools/pdf-final.js && python3 tools/pdf-assembler.py
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const OUT = path.join(__dirname, '..', 'presentation', 'pages-finales');
const HD = path.join(__dirname, '..', 'slides-src', 'rendu-hd');
// diapo n -> id de la section dans demos.html (les pages d'origine du PDF n'ont pas de version HD)
const ORDER = fs.readFileSync(path.join(__dirname, '..', 'slides-src', 'ordre.txt'), 'utf-8')
  .split('\n').filter((l) => /^(demo|page) /.test(l)).map((l) => l.split(' '));

(async () => {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
  // Remplace chaque image de diapo par sa version haute définition, quand elle existe.
  await page.route(/\/slides\/slide-(\d+)\.jpg/, (route) => {
    const n = Number(route.request().url().match(/slide-(\d+)\.jpg/)[1]);
    const [kind, id] = ORDER[n - 1] || [];
    const hd = kind === 'demo' && path.join(HD, id + '.jpg');
    if (hd && fs.existsSync(hd)) return route.fulfill({ path: hd, contentType: 'image/jpeg' });
    return route.continue();
  });
  await page.goto('http://localhost:8765/ecran.html');
  const deck = await page.evaluate(() => ({
    n: window.DECK.slideCount,
    v: window.DECK.version || 1,
    steps: Object.fromEntries(Object.entries(window.DECK.slides).map(([k, s]) => [k,
      (s.elements || []).filter((e) => (e.type === 'answer' || e.type === 'cover')
        && !(e.choices || []).some((c) => /débat/i.test(c)))
        .map((e) => [e.id, e.answer ?? 0])])),
  }));
  let count = 0;
  for (let n = 1; n <= deck.n; n++) {
    const els = deck.steps[n] || [];
    for (let k = 0; k <= els.length; k++) {
      const reveals = Object.fromEntries(els.slice(0, k).map(([id, v]) => [n + ':' + id, v]));
      await page.evaluate(([n, rv, v]) => {
        localStorage.setItem('wc:deckVersion', JSON.stringify(v));
        localStorage.setItem('wc:state', JSON.stringify({ slide: n, blank: null, overlay: null, countdown: null, reveals: rv, zones: {}, zoom: null, rev: 99 }));
      }, [n, reveals, deck.v]);
      await page.reload();
      await page.waitForTimeout(1200);
      await page.getByText('Continuer sans plein écran').click({ timeout: 800 }).catch(() => {});
      await page.waitForTimeout(500);
      count++;
      const file = path.join(OUT, `p${String(count).padStart(3, '0')}-d${String(n).padStart(2, '0')}-${k}.jpg`);
      await page.screenshot({ path: file, type: 'jpeg', quality: 90 });
      console.log('✓', path.basename(file));
    }
  }
  await browser.close();
  console.log(count, 'pages');
})();
