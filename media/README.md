# Médias livrés avec le site

Déposez ici les vidéos / images que vous voulez retrouver sur n'importe quel ordinateur,
puis déclarez-les dans `js/deck.js` :

```js
media: [
  { id: 'turing', name: 'Le test de Turing', src: 'media/turing.mp4' },
],
slides: {
  5: { title: 'Histoire', media: ['turing'] },   // raccourci affiché sur la diapo 5
},
```

Pour un usage ponctuel, pas besoin de ce dossier : glissez simplement le fichier dans
l'onglet **Médias** de la régie (il reste mémorisé dans le navigateur de cet ordinateur).
Les fichiers de plus de 100 Mo ne peuvent pas être poussés sur GitHub : gardez-les en local.
