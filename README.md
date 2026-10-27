# Web Conférence — contrôle de présentation en direct

Site 100 % statique pour projeter la conférence **« L'intelligence artificielle »** (43 diapos, démos incluses) et la piloter en direct :
vidéos, images, quiz révélés en live, pointeur laser, annotations, zoom, partage d'une fenêtre, télécommande sur téléphone.

## Les 3 pages

| Page | Rôle |
|---|---|
| `regie.html` | **Régie** sur votre ordinateur : diapo courante + suivante, notes, chrono, médiathèque, outils. |
| `ecran.html` | **Écran public**, en plein écran sur le projecteur. Il affiche ce que la régie décide. |
| `telecommande.html` | **Télécommande** sur téléphone (via le QR code de la régie). |

## Démarrage le jour J

1. Ouvrez `regie.html` (en ligne, ou double-clic sur le fichier : ça marche aussi hors connexion).
2. **Ouvrir l'écran public** → glissez la fenêtre sur le projecteur → cliquez dedans (plein écran + autorisation du son).
3. Avancez avec `→` / `Espace` ou votre clicker, depuis la régie ou l'écran public.

Utilisez Chrome ou Edge, et ouvrez les deux fenêtres dans le **même navigateur** (elles se synchronisent localement).

## Fonctionnalités

- **Vidéos / images / sons** : glissez-les dans l'onglet *Médias* (ou `Ctrl+V` pour coller une image), puis **▶ Afficher**.
  Contrôles depuis la régie : lecture/pause (`K`), ±10 s, position, volume, boucle. Les liens **YouTube** marchent aussi (avec internet).
  `→` ferme le média et revient aux diapos. Épinglez un média 📍 sur une diapo pour l'avoir sous la main.
- **Quiz « IA ou pas IA ? » (diapo 14)** : révélez les réponses une par une (`R`) ou toutes d'un coup.
- **Jeu « Vraie photo ou IA ? » (diapo 21)** : glissez une image directement sur la zone A ou B de l'aperçu, faites voter, puis révélez.
- **Montrer une fenêtre en direct** (onglet *Outils*) : partagez l'onglet du chatbot pendant les démos ; il s'affiche sur le projecteur sans quitter la présentation.
- **Pointeur laser** (`L`), **stylo** (`D`), **surligneur** (`H`), **zoom** (`Z`, clic ou molette), effacer (`C`).
- **Écran noir** (`B`), **blanc** (`W`), **pause** (`P`) avec message personnalisable.
- **Message à l'écran** (plein écran ou bandeau) et **compte à rebours** (30 s → 15 min).
- **Chrono** de la conférence (`T`) avec durée cible, heure, notes de l'orateur modifiables.
- **Télécommande mobile** : bouton *📱 Télécommande* → QR code. Suivante/précédente (ou balayage), laser au doigt, vidéos, médias, notes, chrono.
  Elle passe par un relais WebRTC public (PeerJS) : il faut internet sur le téléphone et l'ordinateur, et le site doit être en ligne.

- **QR code à l'écran** (onglet *Outils*) : le public ouvre un lien sur son téléphone, par exemple le site créé pendant la démo finale.
- **Minutage** : chaque diapo a une durée indicative ; sous le chrono, la régie indique si vous êtes en avance ou en retard.
- **Notes imprimables** : bouton *🖨️ Notes* (page `notes.html`), avec les miniatures, le minutage et les prompts.

Liste complète des raccourcis : bouton `?` dans la régie. Préparation du jour J : voir [`PREPARATION.md`](PREPARATION.md).

## Les démonstrations

| Diapo | Démo | Mode | À préparer |
|---|---|---|---|
| 20 | Programme des 6 démos | — | — |
| 21-22 | Vraie photo ou IA ? (3 images) | Préparé | 3 images : une vraie photo, une IA réussie, une IA ratée |
| 23 | Créer une affiche | Direct | Compte ChatGPT / Copilot connecté · plan B : une affiche déjà générée |
| 24 | Vidéo : filmée ou générée ? | Préparé | 2 vidéos courtes (une filmée, une générée) |
| 25 | Rédiger un e-mail + pièges | Direct | — |
| 26 | Budget dans Excel | Direct | Excel installé pour ouvrir le fichier · plan B : fichier préparé |
| 27 | Apprendre une langue | Direct | Mode vocal (appli ChatGPT/Gemini), son relié à la sono |
| 38-40 | Démo finale : site de la MJC | Direct | Compte Claude ou ChatGPT, compte Netlify · plan B : capture du site préparé |

Dans la régie, chaque diapo de démo affiche :
- **📋 Prompts à copier** : un clic copie le prompt, il ne reste qu'à le coller dans l'outil d'IA ;
- **🔗 Ouvrir pour la démo** : les sites utiles (ChatGPT, Copilot, Claude, Légifrance, Netlify Drop…) ;
- **✨ Interactions** : zones où placer images et vidéos (⛶ = plein écran avec le son), réponses à révéler (`R`) ;
- des notes d'orateur détaillées (déroulé, pièges à montrer, plan B).

Pour les démos en direct, utilisez **Outils → Montrer une fenêtre** : l'onglet du chatbot s'affiche sur le projecteur sans quitter la présentation. Une image générée se colle dans la régie avec `Ctrl+V`.

**Médias préparés à l'avance** : glissez-les dans la régie le jour J, ou, pour qu'ils s'affichent tout seuls dans les bons cadres,
copiez-les dans `media/` sous les noms `demo1-a.jpg`, `demo1-b.jpg`, `demo1-c.jpg`, `demo3-video1.mp4`, `demo3-video2.mp4`
et décommentez les lignes correspondantes dans `js/deck.js` (section `media`).

## Mettre le site en ligne (GitHub Pages)

*Settings → Pages → Source : « Deploy from a branch »*, choisissez la branche et le dossier `/ (root)`.
Le site sera disponible à `https://<utilisateur>.github.io/web-conference/`. (Nécessaire pour la télécommande.)

## Personnaliser

- `js/deck.js` : titres, notes, prompts, liens, médias livrés, éléments interactifs (positions en % de la diapo).
- `presentation/presentation.pptx` et `presentation.pdf` : la présentation complète à jour (version de secours, sans le site).
- Les nouvelles diapos de démo sont écrites en HTML dans `slides-src/demos.html` (ouvrez-le dans un navigateur pour les voir) ;
  l'ordre des 43 diapos est dans `slides-src/ordre.txt`. Après une modification : `tools/construire-diapos.sh`
  (Node + Playwright et Python avec Pillow / python-pptx).
- Nouvelle version du PowerPoint d'origine : exportez-la en PDF puis `tools/pdf-vers-diapos.sh presentation.pdf`.
- `media/` : vidéos à embarquer avec le site (voir `media/README.md`).
