# Base du site de la MJC du Val d'Ajol

Un site d'une seule page, prêt à compléter. Aucune information n'a été inventée : tout ce qui est **surligné en jaune** sur la page est à remplacer par les vraies informations de la MJC.

## Ce qu'il contient
- **Accueil** : le nom de la MJC, une phrase d'accroche, deux boutons.
- **Nos activités** : 6 cartes d'exemple (danse, théâtre, musique, numérique et IA, arts plastiques, sport et bien-être). Pour chacune : public, jour et heure, tarif. Gardez, supprimez ou ajoutez des cartes selon le vrai programme.
- **Agenda** : la conférence IA du 6 novembre, puis deux emplacements pour les prochains événements.
- **Infos pratiques** : horaires d'accueil, adhésion et tarifs, adresse et carte, contact.
- **Galerie** : 6 emplacements de photos, qui s'agrandissent au clic.
- **Contact** : un formulaire qui ouvre la messagerie du visiteur avec le message prérempli. Pas besoin de serveur.
- **Bouton « A+ Plus grand »** en haut : agrandit tout le texte, pratique pour les seniors. Le site s'en souvient.
- Lisible sur téléphone, aux couleurs du logo (rose, violet, bleu, vert, jaune).

## Comment le compléter
1. Ouvrez `index.html` avec un éditeur de texte (Bloc-notes, TextEdit, ou mieux : Visual Studio Code).
2. Cherchez `class="todo"` : chaque occurrence est un texte à remplacer. Une fois remplacé, supprimez aussi `class="todo"` pour enlever le surlignage.
3. Dans le script en bas de `index.html`, remplacez `adresse@exemple.fr` par l'adresse e-mail de la MJC (c'est elle qui recevra les messages du formulaire).
4. **Photos** : mettez-les dans le dossier `images/` (par exemple `photo-1.jpg`), puis remplacez chaque vignette `<button class="ph" …><span>Photo 1</span></button>` par `<button class="ph" style="background-image:url(images/photo-1.jpg); background-size:cover"></button>`. Demandez l'accord des personnes photographiées, et des parents pour les enfants.
5. **Logo** : `images/logo-mjc.png` est un extrait de la diapo de la conférence. Remplacez-le par le fichier officiel du logo.
6. **Mentions légales** (obligatoires) : nom de l'association, nom du ou de la responsable de la publication, hébergeur.

Astuce : on peut aussi demander à une IA de faire ces modifications, en lui donnant le fichier et les vraies informations. C'est exactement la méthode montrée pendant la conférence. Puis on relit tout.

## Comment le mettre en ligne (gratuit)
1. Allez sur **app.netlify.com/drop**.
2. Glissez le dossier `site-mjc-base` entier dans la page.
3. Le site est en ligne en quelques secondes, avec une adresse du type `xxx.netlify.app`. Créez un compte gratuit pour la garder et la renommer.
4. Pour une adresse personnalisée (par exemple `mjc-valdajol.fr`), il faut acheter un nom de domaine, environ 10 € par an.
