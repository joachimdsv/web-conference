# Images de la diapo « Apprendre par l'exemple » (Wikimedia Commons)

| Fichier | Image d'origine | Auteur | Licence |
|---|---|---|---|
| chat-1.jpg | [Cat November 2010-1a.jpg](https://commons.wikimedia.org/wiki/File:Cat_November_2010-1a.jpg) | Alvesgaspar | CC BY-SA 3.0 |
| chat-2.jpg | [Felis catus-cat on snow.jpg](https://commons.wikimedia.org/wiki/File:Felis_catus-cat_on_snow.jpg) | Von.grzanka | CC BY-SA 3.0 |
| chat-3.jpg | [Cat03.jpg](https://commons.wikimedia.org/wiki/File:Cat03.jpg) | Fir0002 | GFDL 1.2 |
| chien.jpg | [Golden Retriever Dukedestiny01 drvd.jpg](https://commons.wikimedia.org/wiki/File:Golden_Retriever_Dukedestiny01_drvd.jpg) | Janneke Vreugdenhil, retouche Anka Friedrich | Domaine public |

## Diapo « Des couches inspirées du cerveau »
- `tete.jpg` : recadrage de *Cat November 2010-1a.jpg* (Alvesgaspar, CC BY-SA 3.0), version 960 px.
- `contours.jpg` : contours calculés à partir de `tete.jpg` avec ImageMagick
  (`convert tete.jpg -colorspace gray -blur 0x1 -canny 0x1.5+8%+22% -negate contours.jpg`).
- Les formes (couche 2) et les morceaux (couche 3) sont dessinés en SVG dans `slides-src/demos.html` : c'est une illustration, pas la sortie réelle d'un réseau.
