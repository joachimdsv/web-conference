// Fabrique presentation/notes.pdf : les notes de toutes les diapos, avec la miniature, prêtes à imprimer (A4).
// Usage : NODE_PATH=$(npm root -g) node tools/generer-notes-pdf.js
const fs = require('fs');
const path = require('path');
global.window = {};
require('../js/deck.js');
const D = window.DECK;
const ROOT = path.join(__dirname, '..');
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function line(l) {
  const t = l.trim();
  if (!t) return '';
  let cls = 'say';
  if (t.startsWith('🎯')) cls = 'goal';
  else if (t.startsWith('⚙️')) cls = 'do';
  else if (t.startsWith('⏱️')) cls = 'time';
  else if (t.startsWith('➡️')) cls = 'next';
  else if (t.startsWith('🔸')) cls = 'mem';
  else if (!t.startsWith('•') && l.startsWith('  ')) cls = 'sub';
  let h = esc(t.replace(/^•\s*/, ''));
  h = h.replace(/«([^»]*)»/g, '<q>«$1»</q>');
  return `<p class="${cls}">${h}</p>`;
}

let start = 0;
const fmt = (m) => { const x = Math.round(m); return x >= 60 ? `${Math.floor(x / 60)} h ${String(x % 60).padStart(2, '0')}` : `${x} min`; };
const pages = [];
for (let n = 1; n <= D.slideCount; n++) {
  const s = D.slides[n];
  const img = 'file://' + path.join(ROOT, 'slides', 'thumbs', `slide-${String(n).padStart(2, '0')}.jpg`);
  pages.push(`<section><header><img src="${img}"><div><div class="num">Diapo ${n}</div><h2>${esc(s.title)}</h2>
  <div class="meta">${s.minutes ? s.minutes.toString().replace('.', ',') + ' min' : ''} · début vers ${fmt(start)}</div></div></header>
  ${s.notes.split('\n').map(line).join('')}</section>`);
  start += s.minutes || 0;
}

const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>
  @page { size: A4; margin: 13mm 13mm 14mm; }
  body { font: 10.5pt/1.45 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #1d2140; }
  h1 { font-size: 19pt; margin: 0 0 2px; } .sub0 { color: #5d6385; margin: 0 0 14px; }
  .legend { font-size: 9pt; color: #5d6385; margin: 0 0 14px; }
  section { break-inside: avoid-page; border-top: 2px solid #e3e6f5; padding-top: 10px; margin-top: 12px; }
  header { display: flex; gap: 14px; align-items: center; margin-bottom: 6px; }
  header img { width: 62mm; border-radius: 4px; border: 1px solid #dfe2f0; }
  .num { font: 700 9pt/1 monospace; color: #7c5cff; letter-spacing: .08em; text-transform: uppercase; }
  h2 { font-size: 14pt; margin: 4px 0 2px; } .meta { font-size: 9pt; color: #5d6385; }
  p { margin: 3px 0; }
  .goal { font-weight: 700; color: #18794e; }
  .do { color: #8a4b00; background: #fff4e0; padding: 2px 6px; border-radius: 4px; font-size: 9.5pt; }
  .time { color: #a3123a; font-weight: 600; font-size: 9.5pt; }
  .next { color: #4b5fe0; font-style: italic; }
  .mem { color: #8a4b00; font-size: 9.5pt; }
  .sub { padding-left: 14px; }
  q { quotes: none; font-weight: 600; }
</style></head><body>
<h1>Notes de la conférence</h1>
<p class="sub0">L'intelligence artificielle · MJC du Val d'Ajol · 06/11/2026 · Joachim Da Silva · ${D.slideCount} diapos, 1 h 30 avec le débat</p>
<p class="legend"><b style="color:#18794e">En vert</b> : le message de la diapo · <b>En gras</b> : le texte à dire · <span style="background:#fff4e0;color:#8a4b00">Sur fond orange</span> : ce qu'il faut faire · <b style="color:#a3123a">En rouge</b> : les repères de temps · <i style="color:#4b5fe0">En bleu</i> : la transition</p>
${pages.join('\n')}
</body></html>`;

(async () => {
  const { chromium } = require('playwright');
  const b = await chromium.launch();
  const p = await b.newPage();
  const tmp = path.join(ROOT, 'presentation', '.notes.html');
  fs.writeFileSync(tmp, html);
  await p.goto('file://' + tmp);
  await p.waitForTimeout(500);
  await p.pdf({ path: path.join(ROOT, 'presentation', 'notes.pdf'), format: 'A4', printBackground: true,
    displayHeaderFooter: true, headerTemplate: '<span></span>',
    footerTemplate: '<div style="font-size:8px;width:100%;text-align:center;color:#888">Notes · page <span class="pageNumber"></span> / <span class="totalPages"></span></div>' });
  fs.unlinkSync(tmp);
  await b.close();
  console.log('presentation/notes.pdf');
})();
