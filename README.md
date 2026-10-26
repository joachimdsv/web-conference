# Web Conférence — contrôle de présentation en direct

Site 100 % statique pour projeter la conférence **« L'intelligence artificielle »** et la piloter en direct :
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

Liste complète des raccourcis : bouton `?` dans la régie.

## Mettre le site en ligne (GitHub Pages)

*Settings → Pages → Source : « Deploy from a branch »*, choisissez la branche et le dossier `/ (root)`.
Le site sera disponible à `https://<utilisateur>.github.io/web-conference/`. (Nécessaire pour la télécommande.)

## Personnaliser

- `js/deck.js` : titres, notes, médias livrés, éléments interactifs (positions en % de la diapo).
- Nouvelle version du PowerPoint : exportez-le en PDF puis `tools/pdf-vers-diapos.sh presentation.pdf`.
- `media/` : vidéos à embarquer avec le site (voir `media/README.md`).
