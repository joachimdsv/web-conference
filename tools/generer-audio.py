#!/usr/bin/env python3
"""Lit TOUTES les notes de js/deck.js à voix haute, pour s'entraîner (voix gratuite de Microsoft Edge).

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
         "for(let n=1;n<=D.slideCount;n++){const s=D.slides[n]||{};r.push({n,title:s.title||'',notes:s.notes||'',minutes:s.minutes||0,skip:!!s.skip})}" \
         "console.log(JSON.stringify(r))"
    return json.loads(subprocess.run(['node', '-e', js], cwd=ROOT, capture_output=True, text=True, check=True).stdout)


def duree(m):
    m = float(m or 0)
    if not m:
        return ''
    mn, sec = int(m), int(round((m - int(m)) * 60))
    txt = (f"{mn} minute{'s' if mn > 1 else ''}" if mn else '') + (f" {sec} secondes" if sec else '')
    return txt.strip()


def nettoyer(line):
    line = re.sub(r'https?://\S+', '', line)                      # adresses web
    line = re.sub(r'\b[\w.-]+/[\w./-]+\.\w{2,4}\b', '', line)     # chemins de fichiers (media/…)
    line = re.sub(r'\s*\[[^\]]*\]', '', line)                     # passages à compléter, entre crochets
    line = re.sub(r'[\U0001F300-\U0001FAFF☀-➿️]', '', line)       # emojis
    line = re.sub(r'\s*\(([^()]*)\)', r', \1,', line)               # les parenthèses deviennent des incises
    line = line.replace('« ', '').replace(' »', '').replace('«', '').replace('»', '')
    line = re.sub(r'\s*→\s*(PAS IA|IA)\b', r'. Réponse : \1', line)                 # quiz : la réponse
    line = re.sub(r'\s*→\s*', ', puis ', line)                               # menus et étapes
    line = line.replace(' : ', ', ')
    line = re.sub(r'\s*:\s*([.,])', r'\1', line)
    line = re.sub(r',\s*,', ',', line).replace(',.', '.').replace(', .', '.')
    return re.sub(r'\s{2,}', ' ', line).strip(' ,')


def speakable(s):
    """Version complète pour s'entraîner : le message, tout le texte à dire, les anecdotes,
    les réponses en réserve, les actions à faire, les sources et les repères de temps."""
    title = re.sub(r'\s*—\s*', ' : ', s['title']).strip()
    out = [f"Diapo {s['n']}. {title}" + ('' if title.endswith(('?', '!')) else '.')]
    if duree(s.get('minutes')):
        out.append(f"Durée prévue, {duree(s.get('minutes'))}.")
    for line in s['notes'].split('\n'):
        line = line.strip()
        if not line or line.startswith('—'):
            continue
        if line.startswith('🎯'):
            line = 'Le message : ' + re.sub(r'\s*\([^()]*\bmin\b[^()]*\)\s*$', '', line[1:]).strip()
        elif line.startswith('⚙️'):
            line = 'À faire : ' + line[2:].strip()
        elif line.startswith('⏱️'):
            line = 'Repère de temps : ' + line[2:].strip()
        elif line.startswith('🔸'):
            line = 'À retenir pour la suite : ' + line[1:].strip()
        elif line.startswith('➡️'):
            line = 'Transition : ' + line[2:].strip()
        line = re.sub(r'^[•\-]\s*', '', line)
        line = nettoyer(line)
        if line:
            out.append(line if line.endswith(('.', '!', '?', '…')) else line + '.')
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
