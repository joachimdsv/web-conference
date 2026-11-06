#!/usr/bin/env python3
"""Les anecdotes de la conférence, diapo par diapo : ANECDOTES.md et presentation/anecdotes.pdf.
Usage : python3 tools/anecdotes.py   (le PDF est fabriqué avec Playwright, via node)"""
import html, json, os, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# (diapo, titre, [(anecdote, à dire, source)])
A = [
 (1, "Ouverture", [
  ("Le discours écrit par une IA", "Lire le mot d'accueil généré la veille par ChatGPT, puis : « Ce petit discours… ce n'est pas moi qui l'ai écrit. C'est une IA, en dix secondes. »", "")]),
 (4, "Chapitre 01", [
  ("Terminator", "Si quelqu'un dit « Terminator » : « Gardez ce mot en tête, on y reviendra à la fin. » La reprise est à la diapo 40 (les fourmis et le barrage).", "")]),
 (5, "Définition de l'IA", [
  ("Le perroquet", "« Un perroquet extraordinairement doué, qui aurait lu toute une bibliothèque. Il parle très bien… sans savoir de quoi il parle. »", ""),
  ("La définition de Tegmark", "« L'intelligence, c'est la capacité à atteindre des objectifs complexes. » Elle ne dit rien de la conscience.", "Max Tegmark, La Vie 3.0 (2017)")]),
 (6, "Histoire", [
  ("Turing et Enigma", "Le mathématicien qui a aidé à casser le code secret allemand Enigma pose en 1950 la question : une machine peut-elle penser ?", ""),
  ("Le test de Turing réussi", "En 2025, une IA a été prise pour un humain dans 73 % des cas, plus souvent que les vrais humains de l'expérience.", "Jones et Bergen, UC San Diego, 2025 (GPT-4.5)"),
  ("Le mot a 70 ans", "« Intelligence artificielle » est inventé en 1956 par John McCarthy, pour une conférence à Dartmouth.", ""),
  ("Kasparov accuse IBM", "Battu par Deep Blue en 1997, Kasparov était si surpris qu'il a accusé IBM d'avoir fait jouer un humain en cachette.", ""),
  ("Hinton quitte Google", "Prix Nobel de physique 2024, il a quitté Google en 2023 pour alerter librement sur les risques de ce qu'il avait aidé à créer.", ""),
  ("Le record de ChatGPT", "Environ 100 millions d'utilisateurs en deux mois : un record.", "estimations 2023")]),
 (7, "Apprendre par l'exemple", [
  ("Le recruteur sexiste d'Amazon", "Entraînée sur les CV des anciens employés, surtout des hommes, l'IA pénalisait les CV contenant le mot « femmes », comme « capitaine du club d'échecs féminin ». Amazon l'a abandonnée.", "Reuters, 10 octobre 2018")]),
 (8, "Les réseaux de neurones", [
  ("L'ordre de grandeur", "Sur la diapo, 3 couches. GPT-3, l'ancêtre de ChatGPT (2020), en avait 96, avec 175 milliards de réglages.", "OpenAI, 2020")]),
 (9, "Prédire le mot suivant", [
  ("La tombola", "« Tapis » a 41 tickets dans le chapeau, « canapé » 23, « toit » 14… La machine tire un ticket : d'où des réponses différentes à la même question.", ""),
  ("La température", "En réserve : le réglage qui dose le hasard. Basse : prévisible mais plat. Haute : créatif mais risqué.", "")]),
 (10, "Les tokens", [
  ("Le Val-d'Ajol découpé", "ChatGPT voit « Le · Val · -d · ' · Aj · ol ». Et « anticonstitutionnellement » devient « ant · icon · stitution · nel · lement ».", "découpage réel, tiktoken o200k_base"),
  ("Strawberry", "En 2024, ChatGPT soutenait qu'il y avait 2 « r » dans strawberry, au lieu de 3 : il ne voit pas les lettres, seulement des morceaux.", "")]),
 (11, "Deux étapes d'apprentissage", [
  ("Des dizaines de millions de livres", "L'IA de Meta, Llama 3, a lu 15 000 milliards de tokens.", "Meta, avril 2024"),
  ("L'élève et le professeur", "« L'élève qui a lu toute la bibliothèque… puis le professeur qui corrige ses copies. »", "")]),
 (12, "Les familles d'IA", [
  ("« Netflix, c'est juste un algorithme »", "Réponse : « Oui, mais un algorithme qui a appris de nos habitudes, et c'est ça qui en fait une IA. »", "")]),
 (14, "L'IA sans le savoir", [
  ("La reprise du brise-glace", "« Tout à l'heure, certains n'ont pas levé la main… Pourtant, ce matin, vous l'avez sûrement déjà croisée. »", "")]),
 (15, "Quiz", [
  ("Le lave-linge « intelligent »", "Souvent du marketing. Si quelqu'un cite les machines « AI DD » de LG : « Certaines récentes, si. La seule façon de le savoir : ont-elles appris à partir d'exemples ? »", ""),
  ("Le parking sans ticket", "La surprise : lire une plaque sale, de nuit, en biais, demande une IA entraînée sur des milliers de photos de plaques.", "")]),
 (16, "L'IA et le travail", [
  ("La mer qui monte", "Chaque colline est une compétence humaine, l'IA est la mer qui monte. Calcul, échecs et go sont déjà sous l'eau.", "Hans Moravec, repris par Max Tegmark"),
  ("Le paradoxe de Moravec", "Calculer, c'est facile pour la machine ; plier du linge, c'est très difficile. Reprise à la diapo 39 avec le robot NEO.", ""),
  ("Le plombier dans une vieille maison", "Une infirmière, un artiste, un plombier face à l'imprévu : la mer aura du mal à monter jusque-là.", "")]),
 (17, "Des usages surprenants", [
  ("AlphaFold", "Une IA qui prédit la forme des protéines, ce qui prenait des années en laboratoire : prix Nobel de chimie 2024.", "")]),
 (19, "Humain ou IA ?", [
  ("Jupiter, le piège", "L'affiche qui a tout d'une IA a été créée par des graphistes de la NASA en 2016, avant que les IA d'images existent.", "NASA/JPL, Visions of the Future"),
  ("La chanteuse qui n'existe pas", "Kassia Morel et sa tournée sont entièrement inventées par une IA, sans aucune faute.", ""),
  ("Le faux événement dans une vraie salle", "Les Nuits Créatives utilisent le nom d'une vraie salle parisienne et de vrais logos de partenaires.", "")]),
 (20, "Les indices", [
  ("Le QR code qui ne mène nulle part", "L'IA dessine ce qui ressemble à un QR code, sans comprendre à quoi il sert.", "")]),
 (21, "Créer une affiche", [
  ("L'idée reçue du « graphiste expert »", "Écrire « Tu es un graphiste expert » ne sert pas à grand-chose : ce qui compte, c'est d'expliquer sa situation.", ""),
  ("HORCAPLE", "L'affiche de secours ratée, au titre illisible : la preuve qu'il faut toujours vérifier.", "")]),
 (22, "Rédiger un e-mail", [
  ("L'article de loi", "Elle cite un article avec aplomb. Souvent, c'est l'article 6 de la loi du 6 juillet 1989… mais qui serait allé vérifier ?", "Légifrance"),
  ("Le joint du robinet", "La nuance oubliée : les petites réparations sont à la charge du locataire.", "décret du 26 août 1987"),
  ("« Je me permets de vous solliciter… »", "Personne n'écrit comme ça : le propriétaire devinera tout de suite.", "")]),
 (23, "Budget dans Excel", [
  ("Les courses à +32 €", "La colonne « Écart » passe au rouge : on voit tout de suite où le budget dérape.", "")]),
 (24, "Apprendre une langue", [
  ("La pizza margarita", "Faire exprès l'erreur « I want a pizza margarita » pour montrer la correction bienveillante.", ""),
  ("Le professeur de 3 heures du matin", "Disponible à toute heure, il ne juge jamais : on ose parler, même avec un accent épouvantable.", "")]),
 (30, "Gagner du temps", [
  ("2 entreprises sur 3… 1 sur 3", "67 % des entreprises françaises l'utilisent, mais 31 % seulement en voient déjà le gain.", "Banque de France, 2026")]),
 (31, "Les découvertes scientifiques", [
  ("29 % de cancers en plus", "Essai suédois sur plus de 100 000 femmes : l'IA aide à trouver 29 % de cancers du sein en plus, et les radiologues ont presque moitié moins de clichés à lire.", "essai MASAI, The Lancet Digital Health, 2025"),
  ("87 % d'herbicide en moins", "Des caméras repèrent chaque mauvaise herbe et ne traitent qu'elle.", "Université du Nebraska, Greeneye, 2024"),
  ("Les antibiotiques du MIT", "Une IA imagine des millions de molécules, dont de nouveaux antibiotiques contre des bactéries résistantes.", "Cell, août 2025"),
  ("La voix retrouvée", "Paralysée depuis 18 ans, une femme parle à nouveau avec sa propre voix, reconstituée à partir d'une vidéo de son mariage.", "UC Berkeley et UCSF, Nature Neuroscience, 2025"),
  ("Les papyrus d'Herculanum", "En réserve : brûlés par le Vésuve il y a 2 000 ans, l'IA a permis d'en lire un titre en 2025 sans les dérouler.", "")]),
 (32, "L'impact sur la planète", [
  ("Les datacenters, une deuxième France", "Ils consomment déjà presque autant d'électricité que toute la France, et deux fois plus en 2030.", "AIE 2025 ; RTE 2024"),
  ("Un térawattheure", "La consommation de plus de 200 000 foyers français pendant un an.", ""),
  ("La bouteille d'eau par question", "Un chiffre viral très contesté : ne pas le citer.", "")]),
 (33, "Le coût économique", [
  ("2 milliards par jour", "Les géants de la tech investissent environ 700 milliards de dollars par an dans l'IA.", "Forbes, octobre 2026"),
  ("L'ordinateur à 950 €", "La mémoire part dans les datacenters : un ordinateur à 800 € en coûtera bientôt 950.", "IDC, TrendForce 2026")]),
 (34, "Les travailleurs invisibles", [
  ("12,50 $ facturés, 2 $ payés", "Au Kenya, des travailleurs payés 1,32 à 2 $ de l'heure triaient des textes violents pour apprendre à ChatGPT à les refuser.", "TIME, janvier 2023"),
  ("1,5 milliard pour les auteurs", "Anthropic a accepté de verser environ 3 000 $ par livre piraté utilisé pour entraîner ses IA.", "accord Bartz contre Anthropic, 2026")]),
 (35, "L'IA et l'apprentissage", [
  ("Les lycéens turcs", "+48 % aux exercices avec ChatGPT… mais −17 % au contrôle sans lui. Avec une IA « prof » qui donne des indices : pas de baisse.", "Bastani et al., PNAS, 2025"),
  ("Le documentaire de Micode", "Si quelqu'un l'a vu : « La fabrique à idiots » raconte ces expériences.", "Underscore_")]),
 (36, "La cybersécurité", [
  ("PHP2Shell", "Des failles trouvées grâce à l'IA cet été, corrigées le 21 octobre… et exploitées par des pirates 4 jours avant même le correctif.", "CISA, Amazon Threat Intelligence, octobre 2026"),
  ("« Maman, j'ai eu un accident »", "3 secondes d'enregistrement suffisent pour cloner une voix. Le réflexe : raccrocher et rappeler soi-même, ou un mot de passe secret en famille.", "McAfee, 2023"),
  ("La France, 2e pays le plus touché", "Cegedim Santé : environ 15 millions de patients. ANTS : environ 11,7 millions de comptes.", "Surfshark, 1er trimestre 2026")]),
 (37, "Désinformation et démocratie", [
  ("La fausse voix de Biden", "Deux jours avant une élection, au moins 5 000 électeurs reçoivent « N'allez pas voter ». Coût : 150 $. Amende : 6 millions $.", "FCC, 2024"),
  ("Les municipales 2026", "Viginum a détecté 4 ingérences étrangères, à la portée très limitée… mais 2027 sera une cible.", "Viginum, juin 2026")]),
 (38, "L'AI Act", [
  ("Le feu tricolore", "Rouge : interdit (la notation sociale). Orange : surveillé (CV, prêts, notes). Vert : autorisé mais signalé, à partir du 2 décembre 2026.", "règlement 2024/1689 et omnibus numérique 2026")]),
 (39, "L'IA de demain", [
  ("Le robot NEO", "Un humanoïde à 20 000 $ qui plie le linge… encore souvent piloté à distance par un humain : le paradoxe de Moravec.", "1X, 2026")]),
 (40, "Les risques à venir", [
  ("Les fourmis et le barrage", "« Vous ne détestez pas les fourmis. Mais si vous construisez un barrage et qu'une fourmilière est dans la vallée… tant pis pour elles. » L'IA n'a pas besoin d'être méchante pour nous nuire.", "Max Tegmark, La Vie 3.0"),
  ("Knight Capital", "En réserve : en 2012, un programme de bourse s'emballe, 440 millions de dollars perdus en 45 minutes.", "")]),
 (42, "Le grand défi : le résultat", [
  ("Les horaires inventés", "« Ces horaires, cette adresse… elle les a inventés ! » La preuve qu'il faut toujours un regard humain.", "")]),
 (43, "Débat", [
  ("La lettre de 2023", "Plus de mille chercheurs et patrons, dont Elon Musk, demandent une pause de six mois. Max Tegmark est l'un des organisateurs.", "Future of Life Institute, mars 2023"),
  ("Les enfants de l'esprit", "Hans Moravec voyait les robots comme nos « enfants de l'esprit », qui prendraient un jour la relève.", "H. Moravec, Mind Children, 1988")]),
 (44, "Merci !", [
  ("La phrase de fin", "« Ni peur, ni naïveté. Le futur de l'IA, ce n'est pas ce qui va nous arriver… c'est ce qu'on en fera. »", "inspirée de Max Tegmark")]),
]

md = ["# Les anecdotes de la conférence, diapo par diapo", "",
      "Une ligne par histoire, pour s'en souvenir d'un coup d'œil. Le texte complet est dans les notes (`presentation/notes.pdf`).", ""]
for n, t, items in A:
    md.append(f"## Diapo {n} · {t}")
    md.append("")
    for name, txt, src in items:
        md.append(f"- **{name}** : {txt}" + (f" _({src})_" if src else ""))
    md.append("")
open(os.path.join(ROOT, 'ANECDOTES.md'), 'w', encoding='utf-8').write('\n'.join(md))

e = html.escape
body = ''.join(
    f'<section><h2><span>Diapo {n}</span> {e(t)}</h2>' + ''.join(
        f'<div class="a"><b>{e(name)}</b><p>{e(txt)}</p>' + (f'<small>{e(src)}</small>' if src else '') + '</div>'
        for name, txt, src in items) + '</section>' for n, t, items in A)
page = f'''<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>
@page {{ size: A4; margin: 13mm; }}
body {{ font: 10.5pt/1.45 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color: #1d2140; }}
h1 {{ font-size: 18pt; margin: 0 0 2px; }} .sub {{ color: #5d6385; margin: 0 0 12px; }}
section {{ break-inside: avoid; margin: 0 0 10px; }}
h2 {{ font-size: 12.5pt; margin: 10px 0 4px; padding-bottom: 3px; border-bottom: 2px solid #e3e6f5; }}
h2 span {{ font: 700 9pt/1 monospace; color: #7c5cff; letter-spacing: .06em; text-transform: uppercase; margin-right: 6px; }}
.a {{ padding: 4px 0 4px 10px; border-left: 3px solid #ffb347; margin: 4px 0; }}
.a b {{ color: #8a4b00; }} .a p {{ margin: 1px 0; }} .a small {{ color: #7a809e; font-size: 8.5pt; }}
</style></head><body><h1>Les anecdotes de la conférence</h1>
<p class="sub">L'intelligence artificielle · MJC du Val d'Ajol · 06/11/2026 · diapo par diapo</p>{body}</body></html>'''
tmp = os.path.join(ROOT, 'presentation', '.anecdotes.html')
open(tmp, 'w', encoding='utf-8').write(page)
js = ("const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();"
      f"await p.goto('file://{tmp}');await p.pdf({{path:{json.dumps(os.path.join(ROOT, 'presentation', 'anecdotes.pdf'))},format:'A4',printBackground:true}});await b.close()}})()")
subprocess.run(['node', '-e', js], check=True, env={**os.environ, 'NODE_PATH': subprocess.run(['npm', 'root', '-g'], capture_output=True, text=True).stdout.strip()})
os.remove(tmp)
print(sum(len(i) for _, _, i in A), 'anecdotes ->', 'ANECDOTES.md et presentation/anecdotes.pdf')
