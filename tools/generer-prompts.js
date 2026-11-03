// Extrait tous les prompts des démonstrations (js/deck.js) dans PROMPTS.md et presentation/prompts.pdf.
// Usage : NODE_PATH=$(npm root -g) node tools/generer-prompts.js
const fs = require('fs');
const path = require('path');
global.window = {};
require('../js/deck.js');
const D = window.DECK;
const ROOT = path.join(__dirname, '..');

const accueil = {
  n: 1, title: "Ouverture — Le mot d'accueil écrit par l'IA",
  quand: "La veille : générer le texte, l'imprimer et le lire tel quel en ouvrant la soirée.",
  prompts: [{ label: "Mot d'accueil", text: "Écris un mot d'accueil chaleureux de 30 secondes pour une conférence sur l'intelligence artificielle à la MJC du Val d'Ajol." }],
  links: [{ label: 'ChatGPT', url: 'https://chatgpt.com/' }],
};
const quand = {
  21: 'En direct. Le prompt « Retouche » ensuite, pour corriger le texte de l’affiche.',
  22: 'En direct. « Piège : la loi » après le premier e-mail, puis « Plus naturel ».',
  23: 'En direct. « Amélioration » une fois le fichier téléchargé.',
  24: 'En direct, en mode vocal (appli ChatGPT ou Gemini), son relié à la sono.',
  25: 'À la fin des démos. Ajouter 2 ou 3 idées du public avec le modèle « Idées du public », puis laisser l’IA travailler. Les autres prompts sont des idées en réserve. Résultat montré diapo 42.',
};
const demos = [accueil];
for (let n = 1; n <= D.slideCount; n++) {
  const s = D.slides[n];
  if (s.prompts && s.prompts.length) demos.push({ n, title: s.title, quand: quand[n] || '', prompts: s.prompts, links: s.links || [] });
}

// ---- Markdown ----
let md = `# Les prompts des démonstrations\n\nConférence « L'intelligence artificielle » · MJC du Val d'Ajol · 06/11/2026\n\n`;
md += `Tous ces textes sont aussi dans la régie (bouton « Copier »). Ce fichier est généré à partir de \`js/deck.js\` (\`node tools/generer-prompts.js\`).\n\n`;
for (const d of demos) {
  md += `## Diapo ${d.n} · ${d.title.replace(/ — /, ' : ')}\n\n`;
  if (d.quand) md += `_${d.quand}_\n\n`;
  for (const p of d.prompts) md += `**${p.label}**\n\n> ${p.text}\n\n`;
  if (d.links.length) md += `Outils : ${d.links.map((l) => `[${l.label}](${l.url})`).join(' · ')}\n\n`;
}
fs.writeFileSync(path.join(ROOT, 'PROMPTS.md'), md);

// ---- PDF imprimable ----
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>
  @page { size: A4; margin: 16mm 15mm; }
  body { font: 11pt/1.5 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #1d2140; }
  h1 { font-size: 20pt; margin: 0 0 4px; } .sub { color: #5d6385; margin: 0 0 18px; }
  section { break-inside: avoid; margin: 0 0 16px; padding: 12px 14px; border: 1px solid #e3e6f5; border-left: 5px solid #7c5cff; border-radius: 8px; }
  h2 { font-size: 13pt; margin: 0 0 4px; } .quand { color: #5d6385; font-style: italic; margin: 0 0 8px; font-size: 10pt; }
  .label { font-weight: 700; color: #7c5cff; font-size: 10pt; text-transform: uppercase; letter-spacing: .04em; margin-top: 8px; }
  .p { background: #f4f5fb; border-radius: 6px; padding: 8px 10px; margin: 3px 0 0; }
  .links { font-size: 9.5pt; color: #5d6385; margin-top: 8px; }
</style></head><body>
<h1>Les prompts des démonstrations</h1><p class="sub">Conférence « L'intelligence artificielle » · MJC du Val d'Ajol · 06/11/2026</p>
${demos.map((d) => `<section><h2>Diapo ${d.n} · ${esc(d.title.replace(/ — /, ' : '))}</h2>${d.quand ? `<p class="quand">${esc(d.quand)}</p>` : ''}
${d.prompts.map((p) => `<div class="label">${esc(p.label)}</div><div class="p">${esc(p.text)}</div>`).join('')}
${d.links.length ? `<div class="links">Outils : ${d.links.map((l) => `${esc(l.label)} (${esc(l.url.replace(/^https?:\/\//, '').replace(/\/$/, ''))})`).join(' · ')}</div>` : ''}</section>`).join('\n')}
</body></html>`;
(async () => {
  const { chromium } = require('playwright');
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.setContent(html);
  await p.pdf({ path: path.join(ROOT, 'presentation', 'prompts.pdf'), format: 'A4', printBackground: true });
  await b.close();
  console.log(demos.length, 'démos → PROMPTS.md et presentation/prompts.pdf');
})();
