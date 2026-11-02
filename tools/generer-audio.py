#!/usr/bin/env python3
"""Lit les notes de js/deck.js à voix haute (voix gratuite de Microsoft Edge).

Produit audio/diapo-NN.mp3 (une piste par diapo) et audio/conference-complete.mp3.
Usage : python3 tools/generer-audio.py [voix]      (par défaut fr-FR-HenriNeural ;
        autres voix : fr-FR-DeniseNeural, fr-FR-VivienneMultilingualNeural…)
Prérequis : pip install edge-tts, node et ffmpeg. Il faut internet.
"""
import asyncio, json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'audio')
VOICE = sys.argv[1] if len(sys.argv) > 1 else 'fr-FR-HenriNeural'

# Derrière le proxy de certains environnements, utiliser son certificat.
CA = os.environ.get('SSL_CERT_FILE') or ('/root/.ccr/ca-bundle.crt' if os.path.exists('/root/.ccr/ca-bundle.crt') else None)
if CA:
    import certifi
    certifi.where = lambda: CA
import edge_tts


def slides():
    js = "global.window={};require('./js/deck.js');const D=window.DECK;const r=[];" \
         "for(let n=1;n<=D.slideCount;n++){const s=D.slides[n]||{};r.push({n,title:s.title||'',notes:s.notes||'',skip:!!s.skip})}" \
         "console.log(JSON.stringify(r))"
    return json.loads(subprocess.run(['node', '-e', js], cwd=ROOT, capture_output=True, text=True, check=True).stdout)


def speakable(s):
    """Transforme les notes en texte à dire : on garde le message, le texte et les transitions."""
    title = re.sub(r'\s*—\s*', ' : ', s['title']).strip()
    out = [f"Diapo {s['n']}. {title}" + ('' if title.endswith(('?', '!')) else '.')]
    for line in s['notes'].split('\n'):
        line = line.strip()
        if not line or line.startswith(('⏱️', '⏭️', '🔸')):
            continue
        if line.startswith('🎯'):
            line = 'Le message : ' + re.sub(r'\([^)]*\)\s*$', '', line[1:]).strip()
        elif line.startswith('⚙️'):
            questions = re.findall(r'«\s*([^»]*\?)\s*»', line)   # on ne garde que les questions à la salle
            if not questions:
                continue
            line = 'À la salle : ' + ' '.join(questions)
        elif line.startswith('➡️'):
            line = 'Transition : ' + line[2:].strip()
        line = re.sub(r'^[•\-]\s*', '', line)
        if re.match(r'^(Sources?|En réserve|Si besoin)\b', line):
            continue
        line = re.sub(r'\s*\([^()]*\)', '', line)           # apartés et références entre parenthèses
        line = re.sub(r'[\U0001F300-\U0001FAFF☀-➿️]', '', line)   # emojis
        line = line.replace('« ', '').replace(' »', '').replace('«', '').replace('»', '')
        line = line.replace(' : ', ', ').replace(' → ', '. Réponse : ').replace('→', 'puis')
        out.append(line.strip())
    return '\n'.join(out)


async def main():
    os.makedirs(OUT, exist_ok=True)
    files = []
    for s in slides():
        path = os.path.join(OUT, f"diapo-{s['n']:02d}.mp3")
        for attempt in range(4):
            try:
                await edge_tts.Communicate(speakable(s), VOICE, rate='+5%').save(path)
                break
            except Exception as e:
                print('  nouvel essai', s['n'], e)
                await asyncio.sleep(3 * (attempt + 1))
        files.append(path)
        print('✓ diapo', s['n'])
    lst = os.path.join(OUT, 'liste.txt')
    with open(lst, 'w') as f:
        f.writelines(f"file '{os.path.basename(p)}'\n" for p in files)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy',
                    os.path.join(OUT, 'conference-complete.mp3')], check=True)
    os.remove(lst)
    print('→ audio/conference-complete.mp3')


asyncio.run(main())
