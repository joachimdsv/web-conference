# Le discours, diapo par diapo

L'intelligence artificielle · Conférence · MJC du Val d'Ajol · 06/11/2026 · 43 diapos · environ 62 min 30 de conférence + 25 min de débat, pour 90 min maximum, tout compris.

Légende : 🎯 le message à faire passer · • à dire · ⚙️ à faire · ⏱️ point de contrôle du temps · ➡️ transition vers la suite · 🔸 à raccourcir si on est en retard · ⏭️ diapo sautée par défaut.
Ces points sont aussi dans les notes de la régie, sur la télécommande, et dans la page imprimable 🖨️ Notes.

## Le déroulé horaire (1 h 30 maximum)

| Partie | Diapos | Début prévu | Durée |
|---|---|---|---|
| Ouverture | 1-3 | 0:00 | 3 min 30 |
| Chapitre 01 · Qu'est-ce que l'IA ? | 4-12 | 3:30 | 10 min |
| Chapitre 02 · L'IA dans notre quotidien | 13-17 | 13:30 | 6 min 30 |
| Chapitre 03 · L'IA en pratique : les démonstrations | 18-27 | 20:00 | 21 min |
| Chapitre 04 · Impacts et enjeux | 28-32 | 41:00 | 6 min |
| Chapitre 05 · Les bonnes pratiques | 33-36 | 47:00 | 3 min |
| Chapitre 06 · Et demain ? + démo finale | 37-40 | 50:00 | 11 min 30 |
| Conclusion | 41-42 | 1:01:30 | 26 min |
| Débat et fin | 43-43 | 1:27:30 | 1 min |
| Marge de sécurité | | 1:28:30 | 1 min 30 |

Les ⏱️ points de contrôle (diapos 18, 25 et 38) disent quoi couper si vous avez plus de 5 minutes de retard. Le chrono de la régie affiche l'avance ou le retard en continu. En cas de retard, c'est le débat qui l'absorbe (20 minutes minimum).

> Fichier généré à partir de `js/deck.js` (`node tools/generer-discours.js`) : modifiez les notes là-bas, pas ici.

---

## Ouverture (diapos 1 à 3, environ 3 min 30)

### 1 · Titre — 1 min · prévu à 0:00

**🎯 Créer le contact et rassurer.**

- Bonjour à tous, merci d'être venus, et merci à la MJC du Val d'Ajol de m'accueillir.
- Me présenter en 2 ou 3 phrases : qui je suis, mon lien avec le numérique, pourquoi j'ai eu envie de faire cette conférence.
- La promesse : « Ce soir, pas besoin d'être informaticien. Vous allez comprendre ce qu'est l'IA, la voir travailler en direct, et repartir avec de bons réflexes. »
- Durée : environ une heure de conférence, puis un peu plus de 20 minutes de débat ensemble. Fin à 1 h 30 au plus tard.

> ➡️ « Voici le programme. »

### 2 · Plan — 1 min · prévu à 1:00

**🎯 Donner le fil de la soirée, sans tout dévoiler.**

- En une phrase : « D'abord comprendre ce qu'est l'IA et où on la croise déjà ; ensuite la voir en action ; enfin réfléchir ensemble à ce qu'elle change et à la bonne façon de s'en servir. »
- Ne pas lire les 6 parties : le public les a sous les yeux. Pointer seulement la 03 (« cinq démos, en direct ») et la 06 : « Et à la fin, on fabriquera ensemble quelque chose en direct… je ne vous en dis pas plus. Puis on prendra le temps d'en débattre. »
- Il y aura des petits jeux : vous voterez à main levée.
- « Le débat, ce sera pour vos questions, vos avis, vos expériences. Mais si un mot n'est pas clair pendant la présentation, levez la main tout de suite : il n'y a pas de question bête. »

> ➡️ « Mais d'abord, j'aimerais savoir à qui je parle. »

### 3 · Brise-glace — Et vous ? — 1 min 30 · prévu à 2:00

**🎯 Mettre tout le monde à l'aise, novices comme habitués.**

- *⚙️ Dire : « Levez la main, il n'y a pas de mauvaise réponse ! » (ce n'est plus écrit sur la diapo). Poser les 3 questions une par une, laisser le temps aux mains de se lever, commenter ce qu'on voit.*
- « Qui a déjà utilisé ChatGPT ou une autre IA ? »
  - Presque personne : « Parfait, vous allez tout découvrir ce soir. »
  - Presque tout le monde : « Alors vous allez voir qu'elle sait faire bien plus que ce que vous imaginez… et qu'elle se trompe aussi. »
  - 🔸 Repérer ceux qui n'ont pas levé la main : on les retrouve à la diapo 14.
- « Qui s'en sert au moins une fois par semaine ? »
- « Qui s'en méfie un peu… ou beaucoup ? » → « Très bien : c'est une méfiance saine, on va en parler. »
  - 🔸 Retenir à peu près combien de mains : on reposera la question au débat (diapo 42).
- « Que vous l'utilisiez tous les jours ou jamais, vous êtes au bon endroit. »

> ➡️ « Commençons par le commencement : c'est quoi, au juste, l'intelligence artificielle ? »

---

## Chapitre 01 · Qu'est-ce que l'IA ? (diapos 4 à 12, environ 10 min)

### 4 · Chapitre 01 — Qu'est-ce que l'IA ? — 30 s · prévu à 3:30

**🎯 Partir de ce que le public imagine.**

- *⚙️ Demander : « Quel mot vous vient quand on dit "intelligence artificielle" ? » Reprendre 1 ou 2 réponses (robot, ChatGPT, Terminator, danger…).*
- Si quelqu'un dit « Terminator » ou « robot » : « Gardez ce mot en tête, on y reviendra à la fin. » (Reprise à la diapo 39.)
- « Le cinéma nous a montré des robots qui pensent et qui ont des sentiments. La réalité est à la fois plus simple… et plus impressionnante. »
- Annoncer les 3 temps du chapitre : une définition, un peu d'histoire, comment elle fonctionne.

### 5 · Définition — 1 min 30 · prévu à 4:00

**🎯 L'IA imite certaines capacités humaines, mais elle ne pense pas comme nous.**

- L'accroche : « Intelligente, oui. Consciente, non. »
- La définition de l'encadré : « Le physicien Max Tegmark, chercheur au MIT, propose une définition toute simple dans son livre La Vie 3.0 : l'intelligence, c'est la capacité à atteindre des objectifs complexes. Gagner aux échecs, traduire un texte, trouver un itinéraire : ce sont des objectifs. Plus ils sont complexes et variés, plus on est intelligent. »
- Ce qui est important : « Cette définition ne parle pas de conscience. On peut être très compétent sans rien ressentir. »
- Si on vous demande la définition officielle (elle n'est plus sur la diapo), celle du Parlement européen : « reproduire des comportements liés aux humains, tels que le raisonnement, la planification et la créativité ». Depuis 2024, la loi européenne sur l'IA en donne aussi une version juridique ; la révision de juillet 2026 ne l'a pas modifiée.
- Concrètement, elle sait faire trois choses :
  - Percevoir : voir (reconnaître un visage sur une photo), entendre (comprendre « Dis Siri »), lire un texte ;
  - Apprendre : s'améliorer à partir d'exemples, au lieu de suivre des instructions écrites une par une ;
  - Décider : choisir une action pour atteindre un but, comme proposer un itinéraire, un film ou une réponse.
- Ce qu'elle n'est pas : elle n'a ni conscience, ni émotions, ni intentions (d'où l'accroche). Ce qu'elle « comprend » vraiment fait encore débat chez les spécialistes… on pourra en reparler pendant le débat.
- L'image à retenir : un perroquet extraordinairement doué qui aurait lu toute une bibliothèque. Il parle très bien… sans savoir de quoi il parle. (Marquer une petite pause.)

> ➡️ « Cette idée de machine intelligente n'est pas née avec ChatGPT… elle a plus de 70 ans. »

### 6 · Histoire — 2 min · prévu à 5:30

**🎯 L'idée est ancienne ; ce qui change tout depuis peu, c'est que tout le monde y a accès… et qu'elle commence à agir seule.**

- 1950 · Alan Turing (photo), mathématicien britannique qui a aidé à casser le code secret allemand Enigma, pose la question « Une machine peut-elle penser ? ». Il imagine un test : si, en discutant, on n'arrive pas à savoir si on parle à une machine ou à un humain, alors on peut dire qu'elle « pense ».
- 1956 · John McCarthy (photo), chercheur américain, lance l'expression « intelligence artificielle » lors d'une conférence à Dartmouth, aux États-Unis. « Le mot a donc 70 ans cette année ! »
- Ensuite : de grands espoirs, puis des déceptions qu'on a appelées les « hivers de l'IA ». Les ordinateurs étaient trop lents et il n'y avait pas assez de données.
- 1997 · Deep Blue (photo : la vraie machine d'IBM) bat Garry Kasparov, champion du monde d'échecs. Mais il ne savait faire que ça : calculer des millions de coups. Et en 2016, AlphaGo, une IA de Google, bat l'un des meilleurs joueurs du monde au jeu de go, bien plus difficile que les échecs. (On retrouve les échecs et le go « sous l'eau » à la diapo 16.)
- 2012 · Le deep learning. L'équipe de Geoffrey Hinton (photo) montre qu'une machine peut apprendre à reconnaître des images bien mieux qu'avant, grâce à internet (énormément d'exemples) et aux puces des jeux vidéo (beaucoup de puissance). Hinton a reçu le prix Nobel de physique en 2024.
- 2022 · ChatGPT. Pour la première fois, tout le monde peut parler à une IA en langage courant. Environ 100 millions d'utilisateurs en deux mois, selon les estimations : un record.
- 2025 · Les agents (illustration : une IA qui clique à votre place). On ne se contente plus de discuter avec l'IA : on lui confie une mission (comparer des offres, remplir un formulaire, préparer une présentation) et elle l'accomplit seule, en utilisant le web et des logiciels comme nous. C'est le grand changement de ces derniers mois, et on en reparlera à la fin.
- Les photos viennent de Wikimedia Commons ; les crédits sont en bas de la diapo.

> ➡️ « Mais comment une machine fait-elle pour apprendre ? C'est ce qui a tout changé. »

### 7 · Apprendre par l'exemple — 1 min · prévu à 7:30

**🎯 On ne lui écrit plus des règles : on lui montre des exemples.**

- AVANT : on programmait chaque règle à la main. Pour reconnaître un chat : « deux oreilles pointues, des moustaches… ». Impossible ! Un chat de dos, dans le noir ou à moitié caché ne respecte aucune règle.
- MAINTENANT : on lui montre des milliers de photos marquées « chat » ou « pas chat » (montrer les photos et le chien !), et elle trouve elle-même ce qu'elles ont en commun.
- C'est comme un enfant : on ne lui donne pas la définition d'un chat, on lui en montre, et il finit par les reconnaître.
- Conséquence importante : elle n'est jamais meilleure que les exemples qu'on lui donne. Si les exemples sont mauvais ou déséquilibrés, elle apprend de travers : c'est ce qu'on appelle un biais.
- L'exemple vrai : « Amazon avait entraîné une IA à trier les CV avec ceux de ses anciens employés… surtout des hommes. Résultat : elle pénalisait les CV qui contenaient le mot "femmes", comme "capitaine du club d'échecs féminin". Amazon l'a abandonnée en 2018. » (Source : Reuters, 10 octobre 2018.)

> ➡️ « Et comment fait-elle, concrètement, pour trouver ces points communs ? Avec des couches de calcul inspirées… du cerveau. »

### 8 · Réseaux de neurones — 1 min · prévu à 8:30

**🎯 Un empilement de filtres, vaguement inspiré du cerveau.**

- On parle de « réseaux de neurones ». Le nom vient du cerveau, mais ce ne sont que des calculs.
- Suivre la chaîne de gauche à droite, avec notre chat de tout à l'heure :
  - au départ, la photo ;
  - couche 1 : la machine repère les contours (cette image a vraiment été calculée à partir de la photo) ;
  - couche 2 : elle assemble ces traits en formes simples, des triangles, des ronds ;
  - couche 3 : elle reconnaît des morceaux, des oreilles, des yeux, un museau ;
  - résultat : « C'est un chat ! ».
- L'ordre de grandeur : « Ici, j'ai dessiné 3 couches. GPT-3, l'ancêtre de ChatGPT sorti en 2020, en avait 96, avec 175 milliards de réglages. » (Les chiffres des modèles plus récents ne sont pas publiés.)
- Personne n'écrit ces filtres : ils se règlent tout seuls pendant l'apprentissage, à force d'exemples.
- Pas besoin d'en retenir plus : c'est cette mécanique qui a permis les progrès récents.

> ➡️ « Pour les images, elle repère des formes. Et pour le texte, comme ChatGPT ? Elle joue à un jeu très simple… deviner le mot suivant. »

### 9 · Prédire le mot suivant — 2 min · prévu à 9:30

**🎯 Elle devine la suite la plus probable… pas forcément la vraie, et pas toujours la même.**

- *⚙️ Les probabilités sont cachées au départ. Faire compléter par la salle : « Le chat est sur le… ? » Laisser répondre (tapis, canapé, toit…).*
- « Vous venez de faire exactement ce que fait ChatGPT : deviner le mot le plus probable, d'après tout ce que vous avez déjà lu ou entendu. »
- *⚙️ 1er appui sur R : les probabilités apparaissent.*
- « Voilà ce que la machine envisage. Elle ne sait pas où est le chat ! "Tapis" arrive en tête simplement parce que c'est ce qu'elle a le plus souvent lu après "Le chat est sur le…" : livres pour enfants, exercices de français… Les chiffres sont un exemple, mais c'est vraiment comme ça qu'elle fonctionne. »
- « Mais alors, pourquoi ChatGPT ne répond-il pas toujours la même chose à la même question ? »
- *⚙️ 2e appui sur R : la phrase « Elle tire au sort… » apparaît.*
- La tombola : « Imaginez une tombola. "Tapis" a 41 tickets dans le chapeau, "canapé" 23, "toit" 14… La machine tire un ticket. Le plus souvent elle tombe sur "tapis", mais de temps en temps, elle tire "canapé" ou "toit". »
- Pourquoi ce hasard ? « Si elle prenait toujours le mot favori, ses textes seraient monotones et répétitifs. Ce petit hasard les rend plus naturels et plus créatifs. »
- Elle fait ça mot après mot, très vite, et ça finit par donner des textes entiers.
- Le point essentiel : « C'est pour ça que si vous posez deux fois la même question, vous n'aurez pas exactement la même réponse. Et c'est aussi pour ça qu'elle se trompe parfois : de temps en temps, elle tire un mot moins probable… et elle continue sur sa lancée, avec assurance. Elle cherche ce qui est probable, pas ce qui est vrai. »
- Le mot à connaître : « Quand elle invente quelque chose avec assurance, on appelle ça une hallucination. Vous en verrez une en direct tout à l'heure, dans la démo de l'e-mail. »
- Le nom technique (en haut de la diapo) : « ChatGPT est ce qu'on appelle un LLM, un grand modèle de langage : un programme qui a lu d'énormes quantités de textes pour apprendre à deviner la suite. »
- En réserve pour le débat : les concepteurs règlent la dose de hasard avec un paramètre appelé « température ». Basse : elle prend presque toujours le mot favori (prévisible, mais plat). Haute : elle ose des mots moins probables (créatif, mais plus risqué). Les assistants comme ChatGPT utilisent un réglage intermédiaire. Autre raison des réponses différentes : le contexte (ce qui a été dit avant, la version de l'outil) n'est jamais tout à fait le même.

> ➡️ « Et d'ailleurs, ces mots qu'elle devine… ce ne sont même pas vraiment des mots. »

### 10 · Les tokens — 30 s · prévu à 11:30

**🎯 Passer vite (30 s) : la machine ne lit pas des mots, elle calcule avec des nombres.**

- « Petit détail amusant : elle ne lit même pas des mots entiers. Elle découpe le texte en petits morceaux, qu'on appelle des "tokens". Et ce découpage est réel : c'est vraiment comme ça que ChatGPT voit "Le Val-d'Ajol" : "Le", "Val", "-d", l'apostrophe, "Aj", "ol". »
- « Et "anticonstitutionnellement" ? "ant", "icon", "stitution", "nel", "lement". Elle ne coupe pas comme à l'école : elle coupe selon les morceaux qu'elle a le plus souvent rencontrés. »
- « Sous chaque morceau, son numéro. Elle ne manipule que ces nombres : elle calcule, elle ne lit pas vraiment. »
- L'anecdote (à l'oral) : « En 2024, ChatGPT soutenait qu'il y avait 2 "r" dans le mot anglais strawberry, au lieu de 3. Normal : il ne voit pas les lettres, seulement des morceaux ! Les modèles récents, qui réfléchissent avant de répondre, ne font plus cette erreur. »
- Source du découpage : outil tiktoken d'OpenAI, encodage o200k_base (celui de GPT-4o).

> ➡️ « Mais pour deviner aussi bien, il faut avoir énormément lu… et avoir été corrigé. C'est ce qu'on appelle l'apprentissage, en deux étapes. »

### 11 · Deux étapes d'apprentissage — 30 s · prévu à 12:00

**🎯 Elle lit d'abord énormément, puis des humains la corrigent. (30 s, peut être raccourcie)**

- Photo 1, la bibliothèque. Étape 1, le pré-entraînement : « Elle "lit" une immense quantité de textes, sites internet, livres, articles, et s'entraîne des milliards de fois à deviner le mot suivant. Pour donner un ordre d'idée : l'IA de Meta, Llama 3, a lu 15 000 milliards de tokens, nos petits morceaux de tout à l'heure. Des dizaines de millions de livres ! Elle devient très forte en langue… mais elle a aussi lu le pire d'internet. »
- Photo 2, le texte annoté au stylo. Étape 2, l'ajustement humain : « Ensuite, des personnes lui posent des questions et notent ses réponses : utile ? polie ? dangereuse ? Elle apprend ainsi à se comporter en assistant serviable. » Le nom technique : RLHF, apprentissage par renforcement à partir de retours humains.
- La reprise : « Ces humains qui corrigent, on en reparlera : ils sont souvent très mal payés, au Kenya ou ailleurs. » (Diapo 30.)
- L'image à retenir : « L'élève qui a lu toute la bibliothèque… puis le professeur qui corrige ses copies. »

> ➡️ « Voilà pour ChatGPT et les IA qui écrivent. Mais il existe d'autres familles d'IA… »

### 12 · Familles d'IA — 1 min · prévu à 12:30

**🎯 L'IA, ce n'est pas que ChatGPT. (≈ 1 min 15 ; en retard : une phrase par carte + la phrase clé)**

- Intro : « Quand on parle d'IA, on pense tout de suite à ChatGPT. Mais il y a en réalité plusieurs familles d'IA… et vous en utilisez déjà plusieurs sans le savoir. »
- Génératives : « Les premières, ce sont les IA qui créent. Vous leur demandez un texte, une image, une musique, une vidéo… et elles le fabriquent. ChatGPT écrit, Midjourney dessine. C'est ce qu'on vient de voir : pour le texte, elles devinent la suite la plus probable, mot après mot. »
- Perceptives : « Les deuxièmes, ce sont les IA qui reconnaissent. Quand votre téléphone se déverrouille en voyant votre visage, ou quand Siri comprend ce que vous dites, c'est elle. Elle a appris à reconnaître des visages et des voix à partir de millions d'exemples… comme le chat de tout à l'heure. »
- Prédictives : « Les troisièmes, ce sont les IA qui anticipent. Elles regardent le passé pour deviner l'avenir : la météo de demain, ou le film que vous avez le plus de chances d'aimer. Netflix n'a pas de règle écrite à la main : son système a appris de ce que regardent des millions d'abonnés. Et c'est aussi elle qui bloque votre carte bancaire quand un paiement paraît suspect. »
- Agentives : « Et enfin, les plus récentes : les IA agents. Elles ne se contentent plus de répondre, elles agissent. Vous leur dites : "Trouve-moi un train pour Nancy samedi et réserve-le", et elles vont chercher sur internet, comparer, remplir le formulaire… toutes seules. C'est ce que font ChatGPT Agent ou Manus, cités sur la carte. »
- Phrase clé (marquer une pause) : « C'est ça qui change tout en ce moment : on ne demande plus à l'IA de répondre… on lui demande de faire. »
- Si quelqu'un objecte « Netflix, c'est juste un algorithme » : « Oui, mais un algorithme qui a appris de nos habitudes, et c'est ça qui en fait une IA. » (Netflix met aussi en avant ses propres productions : l'IA trie et personnalise, elle ne décide pas seule.)

> ➡️ « Ça, c'est la théorie. Mais en vrai, vous l'avez déjà croisée plusieurs fois aujourd'hui… »

---

## Chapitre 02 · L'IA dans notre quotidien (diapos 13 à 17, environ 6 min 30)

### 13 · Chapitre 02 — Quotidien — 30 s · prévu à 13:30

**🎯 Elle est déjà partout. (30 s : une respiration, ne pas s'attarder)**

- « On a vu comment elle fonctionne. Maintenant, la vraie question : où est-elle, concrètement ? Et la réponse va peut-être vous surprendre : partout. Dans votre poche, chez le médecin, à l'usine, et même dans les centres de tri. Souvent sans qu'on la voie. »
- Annoncer le programme du chapitre (les 4 étiquettes) : là où on l'utilise sans le savoir, un petit quiz, la mer qui monte, et quelques usages surprenants.

> ➡️ « Et d'ailleurs, je parie que vous l'avez déjà utilisée aujourd'hui, avant même d'arriver ici… »

### 14 · L'IA sans le savoir — 1 min · prévu à 14:00

**🎯 Vous l'utilisez déjà sans le savoir. (1 min ; chaque carte montre le moment et un exemple, développer à l'oral)**

- La reprise de la diapo 3 : « Tout à l'heure, certains d'entre vous n'ont pas levé la main quand j'ai demandé qui avait déjà utilisé une IA… Pourtant, ce matin, vous l'avez sûrement déjà croisée. Regardez. »
- Matin, Trajet : « Le matin, le GPS qui vous fait éviter les bouchons : il prédit le trafic à partir des déplacements de millions de téléphones. »
- Midi, Smartphone : « À midi, votre téléphone classe vos photos par visage… et le clavier vous propose le mot suivant. C'est le principe de ChatGPT, en miniature ! »
- Après-midi, Messagerie : « L'après-midi, au travail, les spams sont triés tout seuls, et la traduction automatique vous dépanne. »
- Soir, Achats : « Le soir, si vous payez en ligne, votre banque bloque un paiement qui paraît suspect. Et les sites marchands vous proposent "vous aimerez aussi…". Et Netflix, on en a déjà parlé ! »
- *⚙️ Question à la salle (à l'oral, elle n'est plus sur la diapo) : « Et vous, combien en avez-vous croisé aujourd'hui ? Une ? Trois ? Plus de cinq ? » (mains levées)*
- Conclure : « Elle travaille surtout en coulisses : on ne la voit pas, mais elle est là. »

> ➡️ « Bon, maintenant que vous êtes des experts… on va vérifier ça avec un petit quiz ! »

### 15 · Quiz — IA ou pas IA ? — 2 min 30 · prévu à 15:00

**🎯 Électronique ne veut pas dire IA : l'IA, c'est quand la machine a appris à partir d'exemples.**

- *⚙️ Pour chaque proposition : « Qui pense que c'est de l'IA ? » (mains levées), puis touche R pour révéler.*
- 1. Une calculatrice → PAS IA : « Elle applique des règles fixes. 2 + 2, c'est toujours 4 : elle n'a rien appris, elle calcule. » (départ facile pour lancer le jeu)
- 2. Les sous-titres automatiques (YouTube, la télé…) → IA : « Elle a appris à reconnaître la voix humaine en écoutant des milliers d'heures d'enregistrements. C'est pour ça qu'elle se trompe parfois avec un accent ou du bruit. »
- 3. Un lave-linge « intelligent » → PAS IA (le piège) : « Le plus souvent, ce sont des programmes et des capteurs réglés d'avance : il pèse le linge et choisit dans un tableau. Le mot "intelligent" sur l'emballage, c'est souvent du marketing. »
  - Si quelqu'un objecte (certaines machines récentes, comme la fonction « AI DD » de LG, disent avoir appris à partir de données) : « La plupart, non. Certaines récentes, si : la seule façon de le savoir, c'est de vérifier si elles ont appris à partir d'exemples. Le mot "intelligent" sur l'emballage ne suffit pas. »
- 4. Le parking sans ticket → IA (la surprise) : « Une caméra lit votre plaque d'immatriculation. Et pour lire des lettres sur une plaque sale, de nuit, en biais, il a fallu une IA entraînée sur des milliers de photos de plaques. »
- Morale : « Ce n'est pas parce qu'un appareil est électronique, ou marqué "intelligent", que c'est de l'IA. Et à l'inverse, elle se cache parfois là où on ne l'attend pas. L'IA, c'est quand la machine a appris à partir d'exemples. »

> ➡️ « Et ça ne concerne pas que nos appareils : elle monte aussi dans le monde du travail… comme la mer. »

### 16 · La mer monte (le travail) — 1 min 30 · prévu à 17:30

**🎯 L'IA monte comme la mer : elle recouvre d'abord les tâches répétitives ; ce qui reste au sec, c'est le contact humain, la créativité et l'imprévu. (1 min 30)**

- L'accroche : « La mer monte. Qu'est-ce qui restera au sec ? »
- L'image : « C'est une image du chercheur Hans Moravec, reprise par le physicien Max Tegmark dans son livre La Vie 3.0. Imaginez un paysage : chaque colline, c'est une compétence humaine. Et l'IA, c'est la mer qui monte. »
- Sous l'eau : « Le calcul, depuis longtemps. Les échecs, depuis 1997. Le jeu de go, on l'a vu tout à l'heure. Là, l'humain n'a plus aucune chance. »
- Le rivage : « Traduire, écrire un texte, et même coder, écrire des programmes informatiques : l'eau est en train de les atteindre, vous le verrez dans les démos. Et dans tous les métiers : à l'hôpital, elle aide à lire les radios ; dans l'industrie, ici dans les Vosges, elle prévoit les pannes d'une machine ; à l'école, elle propose des exercices sur mesure. »
- Le paradoxe de Moravec (écrit à gauche) : « Ce qui est difficile pour nous, calculer, jouer aux échecs, est facile pour la machine. Et ce qui est facile pour nous, marcher, plier du linge, est très difficile pour elle. C'est pour ça que les sommets restent au sec. Vous verrez à la fin un robot qui plie le linge… encore souvent piloté à distance par un humain ! » (Diapo 38.)
- Les sommets : « Ce qui reste au sec, Tegmark le résume en trois questions à se poser sur un métier : est-ce qu'il demande de s'occuper des autres ? D'inventer des solutions nouvelles ? De se débrouiller dans un environnement imprévu ? Une infirmière, un artiste, un plombier qui intervient dans une vieille maison : la mer aura du mal à monter jusque-là. »
- *⚙️ Question à la salle : « Et vous, votre métier, il est plutôt sur le rivage ou sur un sommet ? » (2 ou 3 réponses, ça prépare le débat)*
- Conclure : « La mer monte, mais on peut choisir où construire. » (On y reviendra avec le revers, diapo 39.)
- Sources : H. Moravec, « When will computer hardware match the human brain? » (1998) ; M. Tegmark, La Vie 3.0 (Dunod, 2018), chapitre 3. AlphaGo bat Lee Sedol en mars 2016.

> ➡️ « Et elle se cache aussi là où on ne l'attend pas… »

### 17 · Usages surprenants — 1 min · prévu à 19:00

**🎯 Elle sert aussi là où on ne l'attend pas. (1 min, une phrase par carte)**

- Les protéines : « AlphaFold, une IA de Google DeepMind, prédit la forme des protéines, ce qui prenait parfois des années en laboratoire. C'est très utile pour créer de nouveaux médicaments, et ça a valu le prix Nobel de chimie 2024 à ses créateurs. »
- Le tri des déchets : « Dans les centres de tri, des caméras et des bras robotisés reconnaissent le plastique, le carton ou le métal sur les tapis. »
- La traduction en direct : « Vous parlez dans votre langue, votre interlocuteur vous entend dans la sienne, presque instantanément. On y reviendra tout à l'heure avec une démo. »

> ➡️ « Et maintenant… place à la pratique. »

---

## Chapitre 03 · L'IA en pratique : les démonstrations (diapos 18 à 27, environ 21 min)

### 18 · Chapitre 03 — En pratique — 1 min · prévu à 20:00

**🎯 On passe à la pratique, et on annonce les démos. (1 min)**

- « Assez parlé ! Place à la pratique. Je vais vous montrer ce qu'elle sait faire, et on va la tester ensemble, en direct. Et attention : vous allez devoir jouer… et peut-être vous faire piéger ! »
- Les étiquettes, sans les détailler : « Des images, un e-mail, un tableau Excel, une langue étrangère… Certaines démos sont préparées à l'avance, parce que c'est trop long ou trop aléatoire en direct, comme les images. Les autres, je les fais devant vous… avec le risque que ça rate. Et si ça rate, ce sera instructif aussi ! Et pour finir, une démo plus ambitieuse : créer le site de la MJC, en direct. »
- *⚙️ Avant de commencer : internet OK, comptes connectés, son branché.*
- **⏱️ POINT DE CONTRÔLE 1 : on devrait en être à 20 min. Plus de 5 min de retard ? Raccourcir les démos 4 et 5 (voir leurs notes). Le reste du retard sera pris sur le débat.**

> ➡️ « On commence par un jeu. Je vais vous montrer trois affiches… à vous de deviner. »

### 19 · Démo 1 — Humain ou IA ? (3 affiches) — 3 min · prévu à 21:00

**🎯 On ne peut plus se fier à ses yeux seuls.**

- *⚙️ PRÉPARÉ : les 3 affiches s'affichent toutes seules (dossier media/). Réponses : A = pas IA, B = IA, C = IA. Pour changer l'ordre : glisser les images sur les zones dans la régie et ajuster les réponses.*
- Règle du jeu : « Voici trois affiches. Certaines ont été faites par un humain, d'autres par une IA. À vous de jouer ! » (Ne pas dire combien : c'est plus drôle.)
- *⚙️ Pour chaque affiche : « Qui pense que c'est une IA ? » (mains levées). Puis révéler avec R : la touche révèle C, puis B, puis A, pour finir sur le piège.*
- 1) C, IA (la plus facile, on commence par elle) : « Celle-ci se trahit si on regarde de près : l'enseigne du bâtiment est écrite en lettres qui ne veulent rien dire, et le QR code en bas ne mène nulle part. Pourtant elle utilise le nom d'une vraie salle parisienne et de vrais logos de partenaires : c'est un faux événement qui a l'air vrai. » (On regarde ces détails en gros plan juste après.)
- 2) B, IA (la bluffante) : « Celle-ci a l'air d'une vraie affiche de concert, très pro… et pourtant elle a été entièrement fabriquée par une IA. La chanteuse n'existe pas, la tournée non plus. Les textes sont parfaits : il n'y a presque rien pour la démasquer. »
- 3) A, PAS IA (le piège, on finit par lui) : « Et maintenant… piège ! Celle-ci a tout d'une image d'IA : des couleurs irréelles, des montgolfières dans des aurores boréales… Et pourtant elle a été créée par des graphistes de la NASA, en 2016, avant que les IA d'images existent. C'est une fausse affiche de voyage vers Jupiter. » (Le message : une image qui a l'air « trop belle » n'est pas forcément une IA.)
- Commenter les votes : l'affiche C se repère quand on cherche les détails ; la B trompe presque tout le monde ; et la A, beaucoup l'ont prise pour une IA alors qu'elle est humaine. On peut se tromper dans les deux sens.
- Sources : A = « Visions of the Future », NASA/JPL-Caltech, 2016 (domaine public). B et C générées par IA (voir media/SOURCES.md).

> ➡️ « Alors, comment ne pas se faire avoir ? Voici quelques indices… »

### 20 · Démo 1 — Les indices — 1 min · prévu à 24:00

**🎯 Quelques indices… mais surtout, vérifier la source. (1 min)**

- Le texte (gros plan de l'affiche C) : « Regardez l'enseigne du bâtiment : des lettres qui ressemblent à des lettres, mais qui ne veulent rien dire. C'est l'indice le plus fréquent : fautes, lettres inventées, date ou lieu incohérents. »
- Incohérences (gros plan de l'affiche C) : « Et ce QR code : il a l'air vrai, mais il ne mène nulle part. L'IA dessine ce qui ressemble à un QR code, sans comprendre à quoi il sert. Même chose pour les logos de partenaires qui n'ont jamais donné leur accord. »
- Mains, visages : « Sur les personnages, regardez les mains : des doigts en trop ou fusionnés, des visages flous dans une foule. »
- Le style : « Trop lisse, trop parfait, une impression de "déjà vu" : ça peut être une IA… mais souvenez-vous de Jupiter : ça peut aussi être un graphiste talentueux. Le style, c'est un indice, pas une preuve. »
- Pour des photos (si question) : les ombres et les reflets incohérents, les objets du fond qui se fondent les uns dans les autres.
- LE réflexe (bande du bas, avec le nom des outils en dessous) : « Mais le vrai réflexe, c'est de vérifier la source : d'où vient cette image ? Qui l'a publiée ? Pour une affiche, on vérifie la date et le lieu sur le site officiel. Pour une photo, on peut faire une "recherche d'image inversée" avec Google Lens, pour voir où elle apparaît ailleurs. »
- « Les IA progressent vite : ces défauts seront de moins en moins visibles. Le réflexe de vérifier la source, lui, restera toujours valable. »

> ➡️ « Et justement, si une IA sait faire une affiche… on va en créer une ensemble, en direct. »

### 21 · Démo 2 — Créer une affiche — 4 min · prévu à 25:00

**🎯 Plus la demande est précise, plus le résultat vous ressemble. (4 min)**

- *⚙️ EN DIRECT. Copier le prompt « Affiche » (régie), le coller dans ChatGPT ou Copilot, et partager la fenêtre.*
- « On va créer l'affiche d'une fête imaginaire : la Fête de la Myrtille, à Saint-Myrtil. Le "prompt", c'est simplement la demande qu'on écrit à l'IA. »
- Pendant que l'image se fabrique (environ 30 secondes), expliquer les 5 couleurs du prompt affiché :
  - vert = le contexte (qui je suis, à quoi sert l'affiche, pour qui) : le plus important !
  - bleu = le format (affiche verticale A3) ;
  - orange = les textes exacts, entre guillemets, « sans faute » (les IA écrivent bien mieux ainsi) ;
  - violet = le style (illustration joyeuse, sapins, myrtilles, lampions) ;
  - rose = les contraintes (une bande vide pour les logos).
- L'idée reçue : « On croit souvent qu'il faut écrire "Tu es un graphiste expert". En réalité, ce qui compte, c'est de lui expliquer votre situation, comme à un vrai graphiste : qui vous êtes, à quoi sert l'affiche, et ce qui doit être écrit dessus. » (On retrouvera cette méthode à la diapo 36.)
- « Une demande vague donne un résultat banal. Une demande précise donne un résultat qui vous ressemble. »
- *⚙️ Copier l'image, Ctrl+V dans la régie, puis « → affiche » pour l'afficher à droite.*
- Regarder ensemble le texte de l'affiche : il y a souvent des fautes ou des lettres bizarres (comme tout à l'heure !). « On ne recommence pas tout : on continue la conversation. » Prompt « Retouche » : agrandir le titre, ajouter des paniers de myrtilles et des lampions, vérifier l'orthographe.
- Conclusion : « Un formidable outil pour un premier jet. Mais on vérifie, on fait relire, et pour une vraie affiche, on fait attention aux droits. »
- *⚙️ Plan B (déjà en place à droite si rien n'est collé) : media/demo2-affiche.jpg, générée avec un outil gratuit… son titre est raté (« HORCAPLE »), ce qui illustre bien le besoin de vérifier. La remplacer la veille par une affiche faite avec ChatGPT si possible.*

> ➡️ « Une affiche, c'est bien. Mais passons à ce qui peut vraiment vous servir au quotidien : écrire un e-mail. »

<details><summary>Prompts de la démo</summary>

- **Affiche** : Je suis bénévole au comité des fêtes de Saint-Myrtil, un village des Vosges. Crée l'affiche de notre Fête de la Myrtille : elle sera collée chez les commerçants et doit donner envie aux familles de venir. Affiche verticale, format A3. Textes à écrire exactement, sans faute : « Fête de la Myrtille » en grand titre, « Samedi 19 juin · 14 h – 22 h », « Saint-Myrtil ». Style : illustration joyeuse et colorée, forêts de sapins, paniers de myrtilles, lampions. Laisse une bande vide en bas pour les logos des partenaires.
- **Retouche** : Agrandis le titre, ajoute des paniers de myrtilles et des lampions colorés, et vérifie que tout le texte est écrit sans faute.

</details>

### 22 · Démo 3 — Rédiger un e-mail (pièges) — 4 min · prévu à 29:00

**🎯 Un gain de temps énorme… à condition de connaître les pièges. (4 min)**

- *⚙️ EN DIRECT. Outils → Montrer une fenêtre, puis copier le prompt « E-mail ». Les 4 pièges sont cachés : touche R pour les révéler un par un, au moment où on les montre.*
- Montrer le prompt : « Même méthode que pour l'affiche : le contexte (je suis locataire, la fuite), la tâche (l'e-mail au propriétaire), le ton et le format. »
- Lire le résultat à voix haute : en 10 secondes, un e-mail poli et bien construit. Un vrai gain de temps pour ceux qui n'aiment pas écrire.
- *⚙️ Copier le prompt « Piège : la loi ». Puis R → Piège 1.*
- Piège 1, il invente : elle cite un article de loi avec beaucoup d'assurance… mais est-ce le bon ? On vérifie sur service-public.fr ou Légifrance. Quand elle invente quelque chose qui a l'air vrai, on appelle ça une « hallucination » : c'est le mot écrit sur la carte, celui de la diapo 9.
- Si elle a raison (souvent : article 6 de la loi du 6 juillet 1989) : « Cette fois, elle a raison… mais qui d'entre vous serait allé vérifier ? » Et on vérifie sur Légifrance.
- Bon à savoir (vérifié) : le propriétaire doit entretenir le logement et prend en charge les canalisations (loi du 6 juillet 1989, art. 6) ; mais les petites réparations, comme le joint d'un robinet, sont à la charge du locataire (décret du 26 août 1987). Tout dépend donc d'où vient la fuite : c'est le genre de nuance que l'IA oublie souvent.
- *⚙️ R → Piège 2.*
- Piège 2, vos données : « On ne met jamais son nom, son adresse ou son numéro de contrat dans le prompt. On les ajoute ensuite, dans sa propre messagerie. »
- À savoir (à dire) : « Et par défaut, vos conversations avec ChatGPT peuvent servir à entraîner l'IA. On peut le désactiver dans les paramètres, rubrique "Contrôle des données". » (Option « Améliorer le modèle pour tous ».)
- *⚙️ R → Piège 3, puis copier le prompt « Plus naturel ».*
- Piège 3, le ton « robot » (« Je me permets de vous solliciter… ») : montrer la différence avec la version plus naturelle. On peut aussi demander « plus court », « plus chaleureux », « une version pour un SMS ».
- *⚙️ R → Piège 4.*
- Piège 4, envoyer sans relire : « C'est vous qui signez, c'est vous qui êtes responsable. »

> ➡️ « Écrire, c'est bien. Mais elle sait aussi compter… enfin, presque. Voyons avec un budget. »

<details><summary>Prompts de la démo</summary>

- **E-mail** : Je suis locataire d'un appartement. Depuis 3 jours, il y a une fuite d'eau sous l'évier de la cuisine. Rédige un e-mail à mon propriétaire pour lui signaler et lui demander d'intervenir cette semaine. Ton cordial mais ferme, 10 lignes maximum.
- **Piège : la loi** : Ajoute la référence exacte de l'article de loi qui oblige le propriétaire à intervenir.
- **Plus naturel** : Réécris-le de façon plus naturelle, comme si je l'avais écrit moi-même, sans formules toutes faites.

</details>

### 23 · Démo 4 — Budget dans Excel — 2 min 30 · prévu à 33:00

**🎯 Plus besoin de connaître les formules : on décrit ce qu'on veut en français. (2 min 30)**

- *⚙️ EN DIRECT. Copier le prompt « Budget » dans ChatGPT. Le tableau d'exemple à droite est caché : R pour le révéler quand le fichier arrive.*
- « Même méthode : le contexte (une famille de 4), la tâche, le format. Je ne lui parle pas de formules ou de cellules : je lui décris ce que je veux, comme à quelqu'un. »
- *⚙️ Télécharger le fichier, l'ouvrir (Excel, LibreOffice ou Google Sheets) et cliquer sur un total : la formule est là, le calcul se fait tout seul. R pour montrer le tableau d'exemple.*
- *⚙️ Copier le prompt « Amélioration » : la colonne « Écart » passe en rouge quand on dépasse le budget (ici, les courses : +32 €).*
- Les réflexes :
  - vérifier un ou deux totaux à la main, car elle peut se tromper de case ;
  - tester avec des chiffres inventés ;
  - ne jamais y coller ses vrais relevés bancaires.
- « Ça marche aussi pour un planning de vacances, une liste de courses ou le suivi des cotisations d'une association. »
- Bon à savoir : ChatGPT crée de vrais fichiers à télécharger, même en version gratuite (avec une limite d'usage). Pas besoin d'Excel pour les ouvrir.
- *⚙️ Plan B : ouvrir media/budget-famille.xlsx (vraies formules, écart en rouge, graphique). Vérifier la veille qu'il s'ouvre sur l'ordinateur de la conférence.*
- **⏱️ En retard ? Un seul prompt (« Budget »), sans l'amélioration : on gagne environ 1 min 30.**

> ➡️ « Et pour finir avec le quotidien, une démo que vous pouvez faire dès ce soir, avec votre téléphone : apprendre une langue. »

<details><summary>Prompts de la démo</summary>

- **Budget** : Nous sommes une famille de 4 personnes et nous voulons mieux suivre nos dépenses. Crée un tableau Excel pour notre budget du mois : les revenus, les dépenses par catégorie (logement, courses, transport, loisirs), avec le prévu et le réel, les totaux calculés automatiquement, le reste à vivre et un graphique. Mets des montants d'exemple et donne-moi le fichier à télécharger.
- **Amélioration** : Ajoute une colonne « Écart » entre le prévu et le réel, en rouge quand je dépasse mon budget.

</details>

### 24 · Démo 5 — Apprendre une langue — 2 min 30 · prévu à 35:30

**🎯 Un professeur patient, disponible à toute heure, qui ne juge pas. (2 min 30)**

- *⚙️ EN DIRECT, à voix haute : mode vocal de l'appli ChatGPT ou Gemini (gratuit, avec une limite de durée), son du téléphone relié à la sono. TESTER LA VEILLE avec la sono de la MJC.*
- Décortiquer le prompt : « Toujours la même méthode : mon contexte (je pars à Londres, je suis débutant), la scène (le serveur, une question à la fois), et la méthode (corriger gentiment, en français). »
- Le rôle : « Ici, je lui donne un rôle : pas pour qu'elle soit plus forte, mais pour qu'elle joue la scène avec moi. »
- *⚙️ Jouer la scène et faire exprès une erreur (« I want a pizza margarita ») pour montrer la correction bienveillante.*
- *⚙️ « Qui veut commander son plat en anglais ? » Faire essayer une réplique à une personne du public : le moment le plus vivant, à garder même rapide.*
- Les atouts : disponible 24 h/24, patient, adapté à votre niveau, sans jugement, autant de fois que nécessaire. On ose parler, même avec un mauvais accent.
- La traduction en direct (promesse de la diapo 17) : « Et ce même mode vocal sait aussi traduire en direct : vous parlez français, il répond en anglais à votre interlocuteur. C'est l'usage surprenant dont je vous parlais tout à l'heure. »
- Les limites : elle ne remplace pas un vrai échange avec des humains, ni un voyage, ni un professeur pour progresser vraiment.
- *⚙️ Plan B : la conversation d'exemple est cachée à droite, R pour la révéler.*
- **⏱️ En retard ? Montrer seulement une réplique, sans volontaire, ou passer directement à la suite après avoir lu le prompt (on gagne 2 min).**

> ➡️ « C'est impressionnant… mais ça pose aussi des questions. »

<details><summary>Prompts de la démo</summary>

- **Serveur à Londres** : Je pars à Londres cet été et je suis débutant en anglais. Joue le serveur d'un restaurant : pose-moi une question à la fois, en anglais simple. Quand je fais une erreur, corrige-moi gentiment en français, puis continue la scène.

</details>

### 25 · Chapitre 04 — Impacts — 30 s · prévu à 38:00

**🎯 Prendre du recul : ce qu'elle change pour nous. (30 s)**

- « Justement, prenons un peu de recul. On a vu ce qu'elle sait faire. Maintenant, la vraie question : qu'est-ce qu'elle change pour nous ? Les bons côtés, ce qu'elle coûte, et qui fixe les règles. »
- **⏱️ POINT DE CONTRÔLE 2 : on devrait en être à 38 min. Plus de 5 min de retard ? Une seule idée par diapo jusqu'à la diapo 38 (le débat permettra d'y revenir) et une seule amélioration pendant la démo finale.**

### 26 · Ce qu'elle apporte — du temps — 1 min · prévu à 38:30

**🎯 Elle fait gagner un temps fou… mais pas automatiquement. (1 min)**

- L'accroche (lire le titre) : « Ce qui prenait une heure… prend une minute. Vous l'avez vu tout à l'heure. »
- Les barres, en rappelant les démos : « L'e-mail au propriétaire : un quart d'heure à chercher ses mots… 10 secondes. Le tableau du budget : une heure… une minute. Le premier jet d'une affiche : une heure… 30 secondes. Regardez la taille des barres : c'est à la même échelle ! »
- Honnêteté : « Ce sont des ordres de grandeur, et il faut ajouter le temps de relire et de corriger. »
- Les entreprises (carte de droite) : « En France, deux entreprises sur trois l'utilisent déjà… mais seulement une sur trois en voit déjà le gain. Pourquoi ? Parce qu'il faut apprendre à bien s'en servir, et que le temps gagné est souvent repris par autre chose. » (Banque de France, 2026 : 67 % des entreprises de 20 salariés et plus l'utilisent, 31 % des utilisatrices constatent un gain. Ce n'est pas « 31 % de productivité en plus ».)
- Le bon partage : « Le répétitif, le tri, le premier jet : l'IA. Juger, décider, la relation : l'humain. Automatiser des tâches… pas des humains. »
- Si question sur l'emploi : « On en a parlé avec la mer qui monte, et on y revient à la fin avec le revers. » (Diapos 16 et 39 ; sinon, garder la question pour le débat.)

> ➡️ « Et au-delà du temps gagné, elle fait avancer la science. »

### 27 · Ce qu'elle apporte — des découvertes — 1 min 30 · prévu à 39:30

**🎯 Elle ne remplace pas les chercheurs : elle les aide à voir plus, et plus vite. (1 min 30)**

- L'accroche : « Et surtout… elle voit ce qu'on ne voyait pas. Quatre exemples. »
- Santé (+29 %) : « En Suède, un grand essai sur plus de 100 000 femmes : avec l'IA pour aider au dépistage du cancer du sein, on a trouvé 29 % de cancers en plus. Et les radiologues ont eu presque moitié moins de clichés à lire. C'est toujours le médecin qui décide. » (Essai MASAI, The Lancet Digital Health, 2025 : 338 cancers contre 262, −44 % de lecture.)
- Agriculture (−87 %) : « Dans les champs, des caméras sur le pulvérisateur reconnaissent chaque mauvaise herbe, et ne traitent qu'elle, au lieu d'arroser tout le champ. Résultat dans un essai universitaire : 87 % d'herbicide en moins. Bon pour la nature… et pour le portefeuille de l'agriculteur. » (Université du Nebraska-Lincoln, système Greeneye, 2024. Les fabricants annoncent 70 à 90 % ; ces machines restent chères.)
- Médicaments (des millions) : « Au MIT, une IA a imaginé des millions de molécules, et parmi elles, de nouveaux antibiotiques contre des bactéries devenues résistantes. Ils ont marché sur la souris ; il faudra encore des années d'essais avant la pharmacie. » (Cell, août 2025.)
- Parole (18 ans) : « Et mon exemple préféré : en Californie, une femme paralysée après un AVC ne pouvait plus parler depuis 18 ans. Grâce à un implant dans le cerveau, ce qu'on appelle une interface cerveau-machine, et une IA qui transforme en mots les signaux de son cerveau quand elle essaie de parler, elle a pu parler à nouveau, presque en temps réel… avec sa propre voix, reconstituée à partir d'une vidéo de son mariage. » (UC Berkeley et UCSF, Nature Neuroscience, mars 2025. Encore expérimental : vocabulaire limité, pas toujours exact. Elle ne lit pas les pensées : elle décode la parole que la personne essaie de prononcer.)
- En réserve si question : AlphaFold (prix Nobel de chimie 2024, déjà cité diapo 17) ; les papyrus d'Herculanum, brûlés par le Vésuve il y a 2 000 ans, dont l'IA a permis de lire un titre en 2025 sans les dérouler.

> ➡️ « Voilà la face brillante. Retournons la pièce : tout ça a un prix. »

---

## Chapitre 04 · Impacts et enjeux (diapos 28 à 32, environ 6 min)

### 28 · Ce qu'elle coûte — la planète — 1 min · prévu à 41:00

**🎯 Retourner la pièce : l'IA consomme énormément d'énergie. (1 min)**

- L'accroche (titre en rouge) : « Voilà la face brillante. Retournons la pièce… tout ça a un prix. Et d'abord pour la planète. »
- Les barres : « Les datacenters, ces immenses entrepôts d'ordinateurs, consommaient 415 térawattheures d'électricité en 2024. En 2030 : 945. Plus du double en six ans. Pour comparer : toute la France consomme environ 450 térawattheures par an. Les datacenters du monde consomment donc déjà presque autant que la France… et en 2030, plus de deux fois la France. Et l'IA est le principal moteur de cette hausse. » (AIE, « Energy and AI », avril 2025 ; RTE, bilan électrique 2024 ; barres à l'échelle.)
- Si besoin, le térawattheure : « Un térawattheure, c'est un milliard de kilowattheures : la consommation de plus de 200 000 foyers français pendant un an. » (Environ 4 600 kWh par foyer et par an.)
- L'eau : « Et il faut beaucoup d'eau pour refroidir ces machines, jour et nuit. » (Rester à l'oral : les chiffres viraux du type « une question = une bouteille d'eau » sont très contestés.)
- Le bon réflexe (bande du bas) : « Une image ou une vidéo consomme bien plus qu'une simple question. Utilisons-la quand elle apporte vraiment quelque chose. »

> ➡️ « Et ce prix, on le paie aussi… avec notre portefeuille. »

### 29 · Ce qu'elle coûte — nos portefeuilles — 1 min · prévu à 42:00

**🎯 La course à l'IA coûte des fortunes… et fait monter nos prix. (1 min)**

- L'accroche : « Une course à l'argent… que nous payons aussi. »
- Les géants : « Amazon, Microsoft, Google et Meta vont investir cette année environ 700 milliards de dollars dans l'IA et les datacenters. C'est environ 2 milliards… par jour. » (Prévisions des entreprises, entre 700 et 745 milliards selon les estimations ; Forbes, octobre 2026.)
- La mémoire : « Pour faire tourner leurs IA, il leur faut énormément de mémoire, la RAM. Plus de 7 puces mémoire haut de gamme sur 10 produites cette année partent dans leurs datacenters. Les fabricants les servent en priorité, parce qu'ils paient plus cher. Résultat : pénurie. » (TrendForce, 2026.)
- Pour nous : « Et c'est nous qui payons : les fabricants d'ordinateurs ont annoncé 15 à 20 % de hausse pour la fin 2026. Un ordinateur à 800 euros en coûtera bientôt 950. Votre prochain ordinateur ou téléphone coûtera plus cher… à cause de l'IA. » (IDC et constructeurs ; 800 → 950 € est un exemple de calcul.)
- Si question « bulle » : certains économistes se demandent si ces investissements seront rentables ; pour l'instant, en dehors des géants, les gains restent difficiles à mesurer.

> ➡️ « Il y a aussi un prix humain, qu'on ne voit jamais. »

### 30 · Ce qu'elle coûte — les petites mains — 1 min · prévu à 43:00

**🎯 Derrière l'IA, il y a des humains invisibles… et mal payés. (1 min)**

- L'accroche : « Derrière la machine… des humains invisibles. »
- Le rappel (vignette) : « Vous vous souvenez de l'étape 2 de l'apprentissage, "on la corrige" ? Des humains lisent ses réponses et les notent. Une partie de ce travail est faite dans des pays pauvres. Ceux-là, au Kenya, on leur faisait étiqueter des textes violents pour apprendre à ChatGPT à les refuser. On appelle ça l'annotation de données. »
- Les barres : « Une enquête du magazine TIME a révélé qu'au Kenya, l'entreprise qui a créé ChatGPT payait son sous-traitant 12,50 dollars de l'heure… et les travailleurs, eux, touchaient entre 1,32 et 2 dollars. Pour lire et trier, toute la journée, des textes horribles et violents, afin que ChatGPT apprenne à les refuser. Regardez la différence. » (TIME, janvier 2023 ; le sous-traitant Sama dit que les 12,50 $ couvraient aussi l'encadrement et les locaux. Depuis, des travailleurs du secteur se sont syndiqués à Nairobi.)
- Les auteurs : « Et pour apprendre, les IA ont "lu" des millions de livres, souvent sans autorisation. Cette année, l'entreprise Anthropic a accepté de verser 1,5 milliard de dollars à des auteurs dont les livres piratés avaient servi à entraîner ses IA : environ 3 000 dollars par livre. C'est le plus gros accord de ce genre, et d'autres procès sont en cours, comme celui du New York Times contre OpenAI. » (Accord Bartz contre Anthropic, approuvé définitivement le 20 juillet 2026 ; Anthropic n'a pas reconnu sa responsabilité.)
- La phrase à retenir : « L'IA n'est pas magique : elle repose sur le travail de beaucoup de gens… qu'on ne voit pas, et qu'on ne paie pas toujours. »

> ➡️ « Et il y a un prix… pour notre propre cerveau. »

### 31 · Ce qu'elle coûte — notre cerveau — 1 min 30 · prévu à 44:00

**🎯 On apprend grâce à l'effort : si l'IA le fait à notre place, rien ne reste. (1 min 30)**

- L'accroche : « Apprendre, c'est l'effort… que l'IA nous fait sauter. »
- Comment on apprend (ligne du haut) : « Souvenez-vous de l'école. D'abord la leçon : la théorie rentre dans un coin de notre tête. Puis les exercices : on applique, on se trompe, on cherche. Puis la correction, la note : on voit nos erreurs. Et c'est tout ce chemin, avec ses efforts, qui fait que ça reste. »
- Avec l'IA (ligne du bas) : « Aujourd'hui, on peut poser la question et obtenir directement la réponse. On saute l'effort… et le cerveau n'a rien eu à faire, donc il ne garde rien. »
- Le mot (écrit en petit) : « Les chercheurs appellent ça la décharge cognitive : on décharge l'effort sur la machine… et le cerveau ne s'entraîne plus. »
- Le mot (écrit en petit) : « Les chercheurs appellent ça la décharge cognitive : on décharge l'effort sur la machine… et le cerveau ne s'entraîne plus. »
- L'expérience (carte de droite) : « Des chercheurs l'ont mesuré avec près de 1 000 lycéens, en maths. Ceux qui s'entraînaient avec ChatGPT réussissaient beaucoup mieux leurs exercices : +48 %. Mais au contrôle, sans ChatGPT, ils faisaient 17 % de moins que ceux qui n'avaient jamais eu l'IA. Ils avaient eu les bonnes réponses… sans apprendre. » (Bastani et al., PNAS, 2025, lycées en Turquie.)
- La bonne nouvelle : « Le même groupe avec une IA "prof", qui donne des indices mais pas la réponse, n'a pas eu cette baisse. Tout dépend donc de la façon de s'en servir. »
- Pour les parents : « Pour les devoirs : "explique-moi", "pose-moi des questions", "corrige-moi"… pas "fais-le à ma place". »
- Si quelqu'un a vu le documentaire de Micode (« La fabrique à idiots », Underscore_) : il raconte justement ces expériences. Autre étude possible si question : le MIT (2025), où 83 % des étudiants qui avaient écrit un texte avec ChatGPT ne pouvaient pas en citer une phrase juste après (petite étude, 54 personnes).

> ➡️ « Autre prix, très concret : notre sécurité. »

### 32 · Ce qu'elle coûte — notre sécurité — 1 min 30 · prévu à 45:30

**🎯 L'IA est une arme à double tranchant : pour les défenseurs… et pour les pirates. (1 min 30)**

- L'accroche : « L'IA trouve les failles… les pirates aussi. »
- PHP2Shell, la frise : « L'actualité d'il y a quelques jours. Cet été, des chercheurs, aidés par l'IA, ont trouvé deux failles très graves dans PHP, une technologie qui fait tourner près de 3 sites web sur 4. Le 21 octobre, le correctif est publié en urgence. Et le 26 octobre, les autorités américaines confirment que des pirates les exploitent. Pire : ils avaient commencé 4 jours avant même le correctif. La course entre défenseurs et pirates se joue maintenant en quelques jours. » (Correctifs PHP du 21/10/2026 ; CISA, liste des failles exploitées, 26/10 ; Amazon Threat Intelligence : exploitation 4 jours avant les correctifs. Découverte en juillet-août 2026 par Calif, avec un modèle d'OpenAI, et par Wiz, avec des outils d'IA ; les équipes ne sont pas d'accord sur qui était le premier.)
- *⚙️ Question à la salle : « Qui a reçu cette année un e-mail ou un courrier lui disant que ses données avaient fuité ? Levez la main. » (Il y aura beaucoup de mains.)*
- Les fuites : « Normal : la France a été le 2e pays le plus touché au monde par les fuites de données au début de l'année. Cegedim Santé, environ 15 millions de patients. L'ANTS, celle des cartes grises et des permis, environ 11,7 millions de comptes. » (Surfshark, 1er trimestre 2026. Pas de preuve que l'IA soit derrière ces fuites précises, mais elle aide les pirates à exploiter les données volées.)
- Les voix clonées (le « deepfake » vocal, écrit sur la carte) : « Avec ces données et l'IA, les arnaques deviennent sur mesure : des e-mails sans fautes, à votre nom… et même votre voix. Trois secondes d'enregistrement suffisent à l'IA pour l'imiter, par exemple une vidéo sur les réseaux sociaux. Et on appelle votre mère : "Maman, j'ai eu un accident, envoie-moi de l'argent." » (McAfee, 2023 : 3 secondes pour une voix ressemblante à 85 %.)
- Le bon réflexe (bande du bas) : « Un appel urgent, même avec une voix connue ? On raccroche, et on rappelle soi-même la personne, sur son numéro habituel. Certaines familles choisissent même un mot de passe secret. »

> ➡️ « Et enfin, un enjeu pour nous tous, citoyens : la démocratie… et qui fixe les règles. »

---

## Chapitre 05 · Les bonnes pratiques (diapos 33 à 36, environ 3 min)

### 33 · Ce qu'elle coûte — la démocratie — 1 min · prévu à 47:00

**🎯 Avec l'IA, on ne peut plus croire tout ce qu'on voit ou entend. (1 min)**

- L'accroche : « Une fausse voix coûte 150 dollars… et vise une élection. »
- L'exemple : « Janvier 2024, aux États-Unis. Deux jours avant une élection, des milliers d'électeurs, au moins 5 000, reçoivent un appel. C'est la voix du président Biden : "N'allez pas voter." Sauf que ce n'était pas lui : c'était une voix fabriquée par une IA, pour 150 dollars. Son auteur a écopé de 6 millions de dollars d'amende. » (Commission américaine des communications, FCC, 2024 ; NPR, CBS News. Estimations : 5 000 à 25 000 appels.)
  - En réserve, si question sur l'auteur : l'amende de la FCC est administrative ; au pénal, il aurait été relaxé en 2025 (à revérifier avant d'en parler, ne pas l'affirmer).
- En France : « Et chez nous ? Pendant les municipales de mars 2026, Viginum, le service de l'État qui surveille les ingérences, a détecté 4 opérations venues de l'étranger. Leur portée est restée très limitée… mais le gouvernement s'attend à bien pire pour la présidentielle de 2027. » (Viginum, rapport public du 11 juin 2026 : 4 campagnes, dont 2 pro-russes, portée « très limitée » ; le même jour, le Premier ministre a alerté les partis sur 2027.)
- En une phrase, si on a le temps : « Et ces IA sont fabriquées surtout par des géants américains et chinois. Qui décide de ce qu'elles disent, ou ne disent pas ? L'Europe a Mistral, mais elle est loin derrière. »
- Le bon réflexe (bande du bas) : « Une vidéo ou un message choc avant une élection ? On vérifie avant de partager. »

> ➡️ « Alors, face à tout ça… qui fixe les règles ? »

### 34 · Qui fixe les règles ? — 1 min · prévu à 48:00

**🎯 L'Europe a écrit la première loi au monde sur l'IA, et elle fonctionne comme un feu tricolore. (1 min)**

- L'accroche : « Face à tout ça, l'Europe a écrit la première loi au monde sur l'IA : l'AI Act. Et elle marche comme un feu tricolore. »
- Rouge, interdit : « Ce qui est trop dangereux est interdit : noter les citoyens selon leur comportement, comme ça se fait en Chine, ou manipuler les gens à leur insu. » (Depuis février 2025.)
- Orange, sous surveillance : « Quand l'IA peut changer une vie, elle est surveillée de près : trier des CV pour un recrutement, accorder un prêt à la banque, noter des élèves. Il faudra prouver qu'elle est fiable et qu'un humain garde la main. » (À partir du 2 décembre 2027 : c'était prévu pour août 2026, l'Europe l'a reporté.)
- Vert, autorisé mais signalé : « Pour tout le reste, c'est autorisé… à condition d'être transparent : on doit vous dire quand vous parlez à une IA, et une image ou une vidéo fabriquée par une IA devra le dire. Ça commence dans un mois, le 2 décembre. D'ici là… méfiance. » (Marquage des contenus générés : article 50, reporté du 2 août au 2 décembre 2026 par l'omnibus numérique.)
- Pour le public : « Concrètement : une vidéo étonnante sans cette mention ? Méfiance. »
- (Calendrier vérifié le 3 novembre 2026 : règlement européen 2024/1689, modifié par l'« omnibus numérique » adopté en juin-juillet 2026. Sources : FPF, CASRAI, Secure Privacy, NatLaw Review.)

> ➡️ « Alors, concrètement, comment bien s'en servir ? »

### 35 · Chapitre 05 — Bonnes pratiques — 30 s · prévu à 49:00

**🎯 Rassurer : la plupart des pièges s'évitent avec 3 réflexes. (30 s : une respiration)**

- « On a vu les bons côtés et les risques. La bonne nouvelle : la plupart des pièges s'évitent avec trois réflexes simples. Bien demander, vérifier, protéger ses données. Et vous les avez déjà vus en action pendant les démos. »

### 36 · Le bon prompt — 30 s · prévu à 49:30

**🎯 Rappel éclair : la recette du bon prompt, déjà vue à chaque démo. (30 s)**

- L'accroche : « Parlez-lui comme à un stagiaire très doué… qui ne vous connaît pas. »
- La recette : « C'est ce qu'on appelle un prompt, et vous l'avez vu à chaque démo : toujours le contexte d'abord (qui vous êtes, pour qui, pourquoi), puis ce que vous voulez, puis la forme (la longueur, le ton). »
- L'astuce (bande du bas) : « Et si le résultat ne vous plaît pas, on ne recommence pas tout : on continue la conversation. "Plus court", "plus simple", "avec un exemple". »

> ➡️ « Deuxième réflexe : vérifier. »

---

## Chapitre 06 · Et demain ? + démo finale (diapos 37 à 40, environ 11 min 30)

### 37 · Les 3 réflexes — 1 min · prévu à 50:00

**🎯 Les 3 réflexes en une image : un assistant brillant, mais c'est vous qui signez. (1 min)**

- L'accroche : « Un assistant brillant… mais c'est vous qui signez. »
- 1, bien demander : « On vient de le voir : le contexte d'abord, ce que vous voulez… et si ce n'est pas bien, on continue la conversation. »
- 2, vérifier : « Pour tout ce qui est important, la santé, le droit, l'argent, on recoupe avec une source fiable. Vous vous souvenez de l'article de loi de la démo de l'e-mail ? Pour une image, on se demande d'où elle vient, comme pour les affiches. Et on relit avant d'envoyer : c'est vous qui êtes responsable. » Astuce : poser la question autrement ; si les réponses se contredisent, méfiance.
- 3, protéger ses données : « Ce que vous tapez dans une IA peut être conservé, et parfois relu ou réutilisé pour l'entraîner. Donc jamais de mot de passe, de numéro de sécurité sociale, d'IBAN, ni de dossier médical. Et pas d'informations confidentielles de votre travail. Et un geste à faire en rentrant : dans les paramètres de ChatGPT, rubrique "Contrôle des données", on peut désactiver l'utilisation de vos conversations pour l'entraîner. »
- La diapo est un pense-bête : « Vous pouvez la prendre en photo ! »
- La phrase pour conclure le chapitre : « Utilisez-la comme un assistant… pas comme un cerveau de remplacement. »

> ➡️ « Et demain ? Qu'est-ce qui nous attend ? »

### 38 · Et demain ? — 1 min · prévu à 51:00

**🎯 Demain, elle ne fera plus que répondre : elle agira… et vous, qu'en attendez-vous ? (1 min)**

- L'accroche : « Et demain ? Elle ne fera plus que répondre… elle agira. »
- Elle fait pour vous, les agents (« 1 phrase » sur la carte) : « Les agents, dont on a parlé au début, vont devenir courants. Vous lui direz "organise mes vacances", et elle réservera elle-même le train, l'hôtel, le restaurant. Question : si elle se trompe, à qui la faute ? »
- Elle a un corps : « L'IA entre dans des robots. Une entreprise américaine vend déjà un robot humanoïde pour la maison, qui plie le linge et vide le lave-vaisselle : environ 20 000 dollars, premières livraisons fin 2026 aux États-Unis. Pour l'instant, il est encore souvent piloté à distance par un humain ! Vous vous souvenez du paradoxe de Moravec ? Plier du linge, c'est facile pour nous… et encore si difficile pour un robot. » (Robot NEO de 1X ; Europe à partir de 2027.)
- Plus sobre, l'IA embarquée : « Et des IA plus petites, qui tournent directement dans le téléphone, sans internet : elles consomment moins et vos données restent chez vous. »
- **⏱️ POINT DE CONTRÔLE 3 : on devrait en être à 51 min. Plus de 5 min de retard ? Pas de question au public sur cette diapo et une seule amélioration du site. Le débat doit commencer au plus tard à 1 h 09.**

> ➡️ « Voilà le futur rêvé. Mais il y a aussi un revers… »

### 39 · Et demain ? Le revers — 1 min 30 · prévu à 52:00

**🎯 Le futur n'est pas écrit : il peut aussi nous échapper, si on laisse faire. (1 min 30)**

- L'accroche : « Mais si on la laisse faire… elle peut nous échapper. »
- Nos emplois : « Le Fonds monétaire international estime que près de 4 emplois sur 10 dans le monde seront touchés par l'IA… et 6 sur 10 dans les pays riches comme la France. Touchés, ça ne veut pas dire supprimés : certains seront aidés, d'autres remplacés. Toute la question, c'est de nous y préparer. » (FMI, janvier 2024.)
- Ses buts, pas les nôtres (l'« alignement », écrit sur la carte) : « Vous vous souvenez de Terminator, au début ? Au cinéma, on a peur d'une IA méchante. Max Tegmark dit que le vrai danger est ailleurs : une IA très compétente, dont les buts ne sont pas exactement les nôtres. Son image : vous ne détestez pas les fourmis. Mais si vous construisez un barrage et qu'une fourmilière se trouve dans la vallée… tant pis pour les fourmis. L'IA n'a pas besoin d'être méchante pour nous nuire : il suffit qu'elle poursuive son but sans tenir compte de nous. »
- En réserve, seulement si question : « Et quand on la laisse agir seule, une erreur va très vite. En 2012, un programme de la société de bourse Knight Capital s'est emballé : 440 millions de dollars perdus en 45 minutes. » (Exemple cité dans La Vie 3.0 ; c'était un bug, pas une IA moderne.)
- Tout surveiller (la « notation sociale ») : « Reconnaître chaque visage dans la rue, noter chaque citoyen selon son comportement : techniquement, c'est déjà possible, et certains pays le font. En Europe, c'est interdit… pour l'instant, et c'est à nous de veiller à ce que ça le reste. »
- Les inégalités : « Les meilleures IA sont payantes, jusqu'à 200 dollars par mois. Ceux qui peuvent payer prennent l'avantage, et quelques géants gagnent un pouvoir énorme : c'est aussi pour ça que les ateliers gratuits, comme à la MJC, comptent. »

> ➡️ « Le futur dépendra de ce qu'on en fait. Alors, pour finir, je vous propose une dernière démo, la plus ambitieuse : la preuve qu'elle peut nous aider… si c'est nous qui gardons la main. »

### 40 · Démo finale — Le site de la MJC — 8 min · prévu à 53:30

**🎯 Le défi : un vrai site internet, en direct, en quelques minutes… et c'est la salle qui décide. (8 min en tout : 1 min d'annonce, 7 min de démo)**

- L'accroche : « On vient de dire que tout dépend de qui garde la main. Alors pour finir, c'est vous qui allez décider. Un vrai projet : créer en direct le site internet de la MJC. Il y a quelques années, il fallait plusieurs semaines et un professionnel. »
- Les 4 étapes, une phrase chacune : « Je le décris en français, comme à un graphiste. L'IA le fabrique, en une minute. Vous proposez des améliorations. Et on le met en ligne : vous l'ouvrirez sur vos téléphones. »
- *⚙️ Faire participer tout de suite : « Pendant que ça se fabrique, réfléchissez : qu'est-ce que vous aimeriez voir sur le site de la MJC ? Une couleur, une rubrique, une photo ? »*
- *⚙️ Plan B (sans le dire) : le site préparé, media/site-mjc/index.html, à mettre en ligne la veille sur Netlify Drop (noter l'adresse), et sa capture media/site-mjc.png.*
- — LA DÉMO —
- *⚙️ Copier le prompt « Site vitrine », le coller dans Claude (le site s'affiche directement) ou dans ChatGPT, et partager la fenêtre.*
- Lire le prompt : « Même recette que tout à l'heure : le contexte d'abord (qui je suis, pour qui est le site), puis ce que je veux (les rubriques), puis la forme (le style, lisible sur téléphone). »
- Pendant que le texte défile : « Ce que vous voyez défiler, c'est le code HTML, la langue dans laquelle sont écrits les sites. Pas besoin de la comprendre : l'IA l'écrit pour nous. »
- *⚙️ Montrer le résultat et le faire défiler.*
- *⚙️ Demander à la salle : « Qu'est-ce que vous ajouteriez ? » Choisir 1 ou 2 idées (galerie photo, couleurs du logo, inscription aux ateliers, gros caractères) et copier le prompt correspondant.*
- *⚙️ Mise en ligne (l'« hébergement », écrit sur la 4e carte) : télécharger le fichier, le glisser sur Netlify Drop, puis Outils → QR code à l'écran avec l'adresse obtenue.*
- « Sortez vos téléphones : ce site existe vraiment, maintenant, sur internet. »
- Faire remarquer que l'IA a inventé des choses (horaires, adresse, textes…). Ça prépare le bilan.
- **⏱️ Temps idéal : 8 min. En retard, une seule amélioration ; très en retard, montrer le site du plan B déjà en ligne et passer directement au QR code.**
- Pour finir la démo, sur le site encore ouvert : « Le site est prêt… mais il n'est pas fini. Regardez : ces horaires, cette adresse, elle les a inventés ! Il reste à vérifier chaque information, mettre les vraies photos, et surtout : qui va le tenir à jour ? Ce qui prenait des semaines prend quelques heures… mais demande toujours un regard humain. »
- La phrase de la soirée, lentement, en regardant la salle : « L'IA est un outil. C'est vous qui gardez la main. »

> ➡️ « Et pour garder la main, le mieux… c'est d'essayer. »

<details><summary>Prompts de la démo</summary>

- **Site vitrine** : Je suis bénévole à la MJC du Val d'Ajol, une maison des jeunes et de la culture des Vosges, ouverte à tous les âges. Nous voulons un site pour faire connaître nos activités aux familles du village. Crée un site vitrine d'une seule page. Sections : un accueil avec une grande image, nos activités (danse, théâtre, musique, informatique, sport), l'agenda des événements, les horaires et un contact avec une carte. Style moderne, coloré et chaleureux, lisible sur téléphone. Donne-moi le site complet dans un seul fichier.
- **Galerie** : Ajoute une section galerie photo avec 6 vignettes qui s'agrandissent au clic.
- **Couleurs** : Reprends les couleurs du logo de la MJC : rose, violet, bleu, vert et jaune vif sur fond clair.
- **Inscription** : Ajoute un formulaire d'inscription aux ateliers : nom, e-mail, atelier choisi, message.
- **Seniors** : Rends le site plus lisible pour les seniors : plus gros caractères, plus de contraste, boutons plus grands.

</details>

---

## Conclusion (diapos 41 à 42, environ 26 min)

### 41 · Pour essayer chez vous — 1 min · prévu à 1:01:30

**🎯 Donner envie d'essayer, dès ce soir, avec une seule question. (1 min)**

- L'accroche : « Ce soir, en rentrant, essayez… avec une seule question. »
- Les outils : « Les quatre ont une version gratuite : ChatGPT, le plus connu ; Le Chat, l'IA française de Mistral ; Gemini, de Google ; Copilot, de Microsoft, qui fait aussi des images. » Et si on vous le demande : « Claude, celui de la démo du site, a aussi une version gratuite : claude.ai. »
- Les idées : « Commencez par une petite chose du quotidien : une recette avec ce qu'il reste dans le frigo, un e-mail difficile à écrire, ou un courrier administratif à comprendre, en retirant vos informations personnelles. »
- Si la MJC propose un atelier numérique, l'annoncer ici.
- **⏱️ Prévu à 1 h 02. Le débat doit commencer vers 1 h 03, et au plus tard à 1 h 09 pour garder au moins 20 minutes d'échanges.**

> ➡️ « Et maintenant, c'est à vous : place au débat ! »

### 42 · Débat — 25 min · prévu à 1:02:30

**🎯 C'est le moment du public : faire parler la salle, pas refaire la conférence.**

- Reprise de la diapo 3 : « Au début de la soirée, plusieurs d'entre vous ont dit s'en méfier. Après tout ce qu'on a vu… vous vous en méfiez plus, ou moins ? » (main levée, 1 ou 2 réactions)
- Lancer : « Max Tegmark, dans La Vie 3.0, dit que la vraie question n'est pas "que va-t-il se passer ?", mais "que voulons-nous qu'il se passe ?". Il imagine une douzaine de futurs possibles. J'en ai gardé quatre. »
- Lire les 4 cartes, une phrase chacune :
  - L'outil : « L'IA reste un assistant, très puissant, mais ce sont les humains qui décident. C'est un peu le choix de l'Europe avec l'AI Act. » (diapo 34)
  - Le gardien : « Une IA bienveillante veille sur nous : fini les maladies, fini les guerres… mais c'est un peu elle qui décide. »
  - Le frein : « On la limite fortement, comme on l'a fait pour le nucléaire ou le clonage, quitte à renoncer à des progrès. En 2023, plus de mille chercheurs et patrons de la tech, dont Elon Musk, ont signé une lettre demandant une pause de six mois sur les IA les plus puissantes. Max Tegmark en était l'un des organisateurs. » (Lettre ouverte du Future of Life Institute, mars 2023.)
  - Le relais : « Les machines nous dépassent et prennent la suite, un peu comme des enfants qui dépassent leurs parents. Certains chercheurs trouvent ça souhaitable ! Hans Moravec, celui de la mer qui monte, voyait les robots comme nos "enfants de l'esprit", qui prendraient un jour la relève. » (H. Moravec, Mind Children, 1988.)
- *⚙️ Vote à main levée, carte par carte (encadrer chaque carte avec la régie pendant le vote, touche R ou boutons). Puis : « Ceux qui ont voté [la carte la moins choisie], qui veut nous dire pourquoi ? » Puis : « Vos questions, vos avis, vos expériences ? »*
- Animer :
  - donner la parole à tour de rôle, en priorité à ceux qui n'ont pas encore parlé ;
  - reformuler en une phrase avant de répondre (« Si je comprends bien, vous vous demandez… ») ;
  - répondre court (1 minute maximum) puis renvoyer à la salle : « Qui a un avis différent ? » ;
  - il n'y a pas de bonne réponse : c'est un échange, pas un cours.
- *⚙️ Si ça s'essouffle, relancer avec un de ces thèmes concrets (à l'oral, ils ne sont plus sur la diapo) :*
- L'école : « Une aide pour apprendre… ou une triche ? » Rappel de la diapo 31 : avec ChatGPT, les lycéens réussissaient mieux les exercices… et moins bien le contrôle ; avec une IA « prof », pas de baisse. Pistes : apprendre à s'en servir avec esprit critique plutôt qu'interdire ; « explique-moi » plutôt que « fais-le à ma place » ; accompagner, comme pour internet.
- Le travail : « Votre métier : aidé… ou remplacé ? » Rappel : la mer qui monte (diapo 16) ; 4 emplois sur 10 touchés dans le monde (FMI), ça ne veut pas dire supprimés. Pistes : quelles tâches lui confieriez-vous ? Qui doit former les salariés ? Qui est responsable si l'IA se trompe ?
- La planète et les inégalités : « Faut-il la limiter ? La rendre gratuite pour tous ? » Rappels : l'électricité des datacenters double d'ici 2030 ; les meilleures IA sont payantes. Pistes : l'utiliser seulement quand elle apporte vraiment quelque chose ; des ateliers gratuits pour que tout le monde en profite.
- La MJC : un atelier découverte, de l'aide aux associations (affiches, comptes rendus), l'accompagnement des seniors, un projet avec les jeunes… Noter les idées et les transmettre à la MJC.
- Si je ne sais pas : « Je préfère vérifier plutôt que vous dire une bêtise. Je vous réponds via la MJC. »
- Si un échange s'envenime ou si quelqu'un monopolise la parole : remercier, résumer son point en une phrase, puis « Laissons la parole à d'autres ».
- **⏱️ De 1 h 03 à 1 h 28 environ. Vers 1 h 25 : « Encore une ou deux interventions ? ». Si la conférence a pris du retard, c'est le débat qui l'absorbe, mais garder au moins 20 minutes.**

> ➡️ « Merci pour ces échanges… »

---

## Débat et fin (diapos 43 à 43, environ 1 min)

### 43 · Merci ! — 1 min · prévu à 1:27:30

**🎯 Terminer à l'heure, sur une note chaleureuse.**

- Remercier la MJC, les bénévoles et le public pour la richesse des échanges.
- Montrer la phrase affichée, et la redire lentement : « L'IA est un outil : c'est vous qui gardez la main. »
- « Si vous avez encore des questions, je reste quelques minutes après. » Et annoncer l'atelier numérique de la MJC s'il existe.
- **⏱️ Fin prévue vers 1 h 29. 1 h 30 maximum.**
