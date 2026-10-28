// Génère DISCOURS.md (tout ce qu'il faut dire, diapo par diapo) à partir des notes de js/deck.js.
// Usage : node tools/generer-discours.js
const fs = require('fs');
const path = require('path');

global.window = {};
require(path.join(__dirname, '..', 'js', 'deck.js'));
const D = window.DECK;

const PARTS = [
  [1, 'Ouverture'],
  [4, 'Chapitre 01 · Qu\'est-ce que l\'IA ?'],
  [13, 'Chapitre 02 · L\'IA dans notre quotidien'],
  [18, 'Chapitre 03 · L\'IA en pratique : les démonstrations'],
  [28, 'Chapitre 04 · Impacts et enjeux'],
  [33, 'Chapitre 05 · Les bonnes pratiques'],
  [37, 'Chapitre 06 · Et demain ? + démo finale'],
  [41, 'Conclusion'],
];
const fmt = (m) => { const s = Math.round(m * 60); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
const dur = (m) => { const s = Math.round(m * 60), mm = Math.floor(s / 60), ss = s % 60; return mm ? `${mm} min${ss ? ' ' + ss : ''}` : `${ss} s`; };
const total = Object.values(D.slides).reduce((t, s) => t + (s.minutes || 0), 0);

const out = [
  `# Le discours, diapo par diapo`,
  '',
  `${D.title} · ${D.subtitle} · ${D.slideCount} diapos · environ ${Math.round(total)} min hors questions.`,
  '',
  'Légende : 🎯 le message à faire passer · • à dire · ⚙️ à faire · ➡️ transition vers la suite · 🔸 diapo à sauter si on est en retard.',
  'Ces points sont aussi dans les notes de la régie, sur la télécommande, et dans la page imprimable 🖨️ Notes.',
  '',
  '> Fichier généré à partir de `js/deck.js` (`node tools/generer-discours.js`) : modifiez les notes là-bas, pas ici.',
];

let elapsed = 0;
for (let n = 1; n <= D.slideCount; n++) {
  const part = PARTS.find(([start]) => start === n);
  if (part) {
    const end = (PARTS[PARTS.indexOf(part) + 1] || [D.slideCount + 1])[0];
    let mins = 0;
    for (let k = n; k < end; k++) mins += D.slides[k]?.minutes || 0;
    out.push('', '---', '', `## ${part[1]} (diapos ${n} à ${end - 1}, environ ${Math.round(mins * 2) / 2} min)`);
  }
  const s = D.slides[n] || {};
  out.push('', `### ${n} · ${s.title || 'Diapo ' + n}` + (s.minutes ? ` — ${dur(s.minutes)} · prévu à ${fmt(elapsed)}` : ''), '');
  elapsed += s.minutes || 0;
  for (const raw of (s.notes || '').split('\n')) {
    const line = raw.replace(/\s+$/, '');
    if (!line) continue;
    if (line.startsWith('🎯')) out.push(`**${line}**`, '');
    else if (line.startsWith('  ')) out.push(`  - ${line.trim()}`);
    else if (line.startsWith('• ')) out.push(`- ${line.slice(2)}`);
    else if (line.startsWith('⚙️')) out.push(`- *${line}*`);
    else if (line.startsWith('➡️')) out.push('', `> ${line}`);
    else out.push(`- ${line}`);
  }
  if (s.prompts?.length) {
    out.push('', '<details><summary>Prompts de la démo</summary>', '');
    for (const p of s.prompts) out.push(`- **${p.label}** : ${p.text}`);
    out.push('', '</details>');
  }
}
out.push('');
fs.writeFileSync(path.join(__dirname, '..', 'DISCOURS.md'), out.join('\n'));
console.log('DISCOURS.md généré');
