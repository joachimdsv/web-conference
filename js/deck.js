/*
 * Configuration de la présentation.
 * ---------------------------------------------------------------
 * - slideCount / image()  : où trouver les images des diapos (générées depuis le PDF)
 * - media                 : vidéos / images fournies avec le site (dossier media/)
 * - slides[n]             : réglages par diapo (n commence à 1)
 *     title    : titre court (affiché dans la régie et la télécommande)
 *     minutes  : temps indicatif passé sur la diapo (sert au minutage dans la régie)
 *     notes    : notes de l'orateur (modifiables aussi depuis la régie)
 *     media    : ids de médias proposés en raccourci sur cette diapo
 *     prompts  : prompts à copier en un clic depuis la régie [{ label, text }]
 *     links    : sites à ouvrir pendant la démo [{ label, url }]
 *     elements : éléments interactifs posés sur la diapo, révélés en direct
 *        rect    : [gauche, haut, largeur, hauteur] en % de la diapo
 *        type    : 'answer' (cadre + étiquette révélée) ou 'zone' (emplacement pour une image / vidéo)
 *        choices : étiquettes possibles pour 'answer' ; answer = index de la bonne réponse
 *        pill    : 'bottom' pour placer l'étiquette en bas au centre (sinon à droite)
 *        fit     : 'contain' pour afficher l'image entière dans une zone (sinon recadrée)
 *        default : id d'un média de `media` affiché d'office dans la zone
 *
 * Les diapos elles-mêmes : slides-src/ordre.txt + slides-src/demos.html (voir README).
 * Notes : « • » = idée à dire, « ⚙️ » = manipulation à faire, « 🔸 » = diapo à sauter si on est en retard.
 */
window.DECK = {
  title: "L'intelligence artificielle",
  subtitle: "Conférence · MJC du Val d'Ajol · 06/11/2026",
  version: 3, // à incrémenter si l'ordre des diapos change (réinitialise notes et épingles locales)
  slideCount: 43,
  image: (n) => `slides/slide-${String(n).padStart(2, '0')}.jpg`,
  thumb: (n) => `slides/thumbs/slide-${String(n).padStart(2, '0')}.jpg`,
  durationMinutes: 60,

  // Médias livrés avec le site : déposez vos fichiers dans media/ puis décommentez / déclarez-les ici.
  // Ceux qui portent un id utilisé en `default` ci-dessous s'afficheront automatiquement dans les zones.
  media: [
    // { id: 'photo-a', name: 'Démo 1 · Image A', src: 'media/demo1-a.jpg' },
    // { id: 'photo-b', name: 'Démo 1 · Image B', src: 'media/demo1-b.jpg' },
    // { id: 'photo-c', name: 'Démo 1 · Image C', src: 'media/demo1-c.jpg' },
    // { id: 'video-1', name: 'Démo 3 · Vidéo 1', src: 'media/demo3-video1.mp4' },
    // { id: 'video-2', name: 'Démo 3 · Vidéo 2', src: 'media/demo3-video2.mp4' },
    // { id: 'affiche', name: 'Démo 2 · Affiche (plan B)', src: 'media/demo2-affiche.png' },
    // { id: 'site', name: 'Démo finale · Site (plan B)', src: 'media/site-mjc.png' },
  ],

  slides: {
    // ---------- Ouverture ----------
    1: {
      title: 'Titre', minutes: 1,
      notes: "🎯 Créer le contact et rassurer.\n• Bonjour à tous, merci d'être venus, et merci à la MJC du Val d'Ajol de m'accueillir.\n• Me présenter en 2 ou 3 phrases : qui je suis, mon lien avec le numérique, pourquoi j'ai eu envie de faire cette conférence.\n• La promesse : « Ce soir, pas besoin d'être informaticien. Vous allez comprendre ce qu'est l'IA, la voir travailler en direct, et repartir avec de bons réflexes. »\n• Durée : environ une heure, puis un temps de questions.\n➡️ « Voici le programme. »",
    },
    2: {
      title: 'Plan', minutes: 1,
      notes: "🎯 Donner le fil de la soirée.\n• 6 étapes :\n  01 comprendre ce qu'est l'IA ;\n  02 voir qu'elle est déjà dans notre quotidien ;\n  03 la voir en action avec 6 démonstrations ;\n  04 réfléchir à ce qu'elle change ;\n  05 apprendre à bien s'en servir ;\n  06 regarder vers demain, avec une démo finale : on crée ensemble le site de la MJC.\n• Il y aura des petits jeux : vous voterez à main levée.\n• Les questions à la fin. Mais si un mot n'est pas clair, levez la main tout de suite : il n'y a pas de question bête.\n➡️ « Mais d'abord, j'aimerais savoir à qui je parle. »",
    },
    3: {
      title: 'Brise-glace — Et vous ?', minutes: 1,
      notes: "🎯 Mettre tout le monde à l'aise, novices comme habitués.\n⚙️ Poser les 3 questions une par une, laisser le temps aux mains de se lever, commenter ce qu'on voit.\n• « Qui a déjà utilisé ChatGPT ou une autre IA ? » → « Beaucoup d'entre vous ! » ou « Quelques-uns… vous allez voir, c'est très simple. »\n• « Qui s'en sert au moins une fois par semaine ? »\n• « Qui s'en méfie un peu… ou beaucoup ? » → « Très bien : c'est une méfiance saine, on va en parler. »\n• « Que vous l'utilisiez tous les jours ou jamais, vous êtes au bon endroit. »\n➡️ « Commençons par le commencement : c'est quoi, au juste, l'intelligence artificielle ? »",
    },
    // ---------- Chapitre 01 ----------
    4: {
      title: 'Chapitre 01 — Qu\'est-ce que l\'IA ?', minutes: 0.5,
      notes: "🎯 Partir de ce que le public imagine.\n⚙️ Demander : « Quel mot vous vient quand on dit \"intelligence artificielle\" ? » Reprendre 1 ou 2 réponses (robot, ChatGPT, Terminator, danger…).\n• « Le cinéma nous a montré des robots qui pensent et qui ont des sentiments. La réalité est à la fois plus simple… et plus impressionnante. »\n• Annoncer les 3 temps du chapitre : une définition, un peu d'histoire, comment elle fonctionne.",
    },
    5: {
      title: 'Définition', minutes: 1.5,
      notes: "🎯 L'IA imite certaines capacités humaines, mais elle ne pense pas.\n• Définition simple : un programme informatique capable de faire des choses qui demandent normalement de l'intelligence humaine.\n• Percevoir : voir (reconnaître un visage sur une photo) et entendre (comprendre « Dis Siri » ou « Ok Google »).\n• Apprendre : s'améliorer à partir d'exemples, au lieu de suivre des instructions écrites une par une.\n• Décider : choisir une action, comme proposer un itinéraire, un film ou une réponse.\n• Ce qu'elle n'est pas : elle n'a ni conscience, ni émotions, ni intentions. Elle ne « comprend » pas comme nous.\n• L'image à retenir : un perroquet extraordinairement doué qui aurait lu toute une bibliothèque. Il parle très bien… sans savoir de quoi il parle.",
    },
    6: {
      title: 'Histoire', minutes: 1.5,
      notes: "🎯 L'idée est ancienne. Ce qui est nouveau, c'est que tout le monde y a accès.\n• 1950 : Alan Turing, mathématicien britannique (celui qui a aidé à casser le code secret allemand Enigma), pose la question « Une machine peut-elle penser ? ». Il imagine un test : si, en discutant, on n'arrive pas à savoir si on parle à une machine ou à un humain…\n• 1956 : lors d'une conférence aux États-Unis (Dartmouth), des chercheurs inventent l'expression « intelligence artificielle ».\n• Ensuite : de grands espoirs, puis des déceptions qu'on a appelées les « hivers de l'IA ». Les ordinateurs étaient trop lents et il n'y avait pas assez de données.\n• 1997 : l'ordinateur Deep Blue d'IBM bat Garry Kasparov, champion du monde d'échecs. Mais il ne savait faire que ça : calculer des millions de coups.\n• 2012 : le « deep learning » (apprentissage profond). Grâce à internet, qui fournit énormément d'exemples, et aux puces des jeux vidéo, très puissantes, les machines apprennent enfin à reconnaître des images.\n• 2022 : ChatGPT. Pour la première fois, tout le monde peut parler à une IA en langage courant. Environ 100 millions d'utilisateurs en deux mois, selon les estimations : un record.",
    },
    7: {
      title: 'Apprendre par l\'exemple', minutes: 1,
      notes: "🎯 On ne lui écrit plus des règles : on lui montre des exemples.\n• AVANT : on programmait chaque règle à la main. Pour reconnaître un chat : « deux oreilles pointues, des moustaches… ». Impossible ! Un chat de dos, dans le noir ou à moitié caché ne respecte aucune règle.\n• MAINTENANT : on lui montre des milliers de photos marquées « chat » ou « pas chat », et elle trouve elle-même ce qu'elles ont en commun.\n• C'est comme un enfant : on ne lui donne pas la définition d'un chat, on lui en montre, et il finit par les reconnaître.\n• Conséquence importante : elle est aussi bonne que les exemples qu'on lui donne. Si les exemples sont mauvais ou déséquilibrés, elle apprend de travers. (On y reviendra avec les « biais ».)",
    },
    8: {
      title: 'Réseaux de neurones', minutes: 1,
      notes: "🎯 Un empilement de filtres, vaguement inspiré du cerveau.\n• On parle de « réseaux de neurones ». Le nom vient du cerveau, mais ce ne sont que des calculs.\n• L'image : une chaîne de filtres.\n  1re couche : les traits et les contours ;\n  2e couche : les formes (un rond, un angle) ;\n  3e couche : des morceaux (un œil, une oreille) ;\n  dernière couche : « c'est un chat ! ».\n• Personne n'écrit ces filtres : ils se règlent tout seuls pendant l'apprentissage, à force d'exemples.\n• Pas besoin d'en retenir plus : c'est cette mécanique qui a permis les progrès récents.",
    },
    9: {
      title: 'Prédire le mot suivant', minutes: 1,
      notes: "🎯 Elle devine la suite la plus probable… pas forcément la vraie.\n⚙️ Faire compléter par la salle : « Le chat est sur le… » → tapis ! (ou toit, canapé).\n• « Vous venez de faire exactement ce que fait ChatGPT : deviner le mot le plus probable, d'après tout ce que vous avez déjà lu ou entendu. »\n• Elle fait ça mot après mot, très vite, et ça finit par donner des textes entiers.\n• Le point essentiel : elle cherche ce qui est probable, pas ce qui est vrai. Le plus souvent c'est la même chose… mais pas toujours. C'est pour ça qu'elle peut inventer avec beaucoup d'assurance.",
    },
    10: {
      title: 'Les tokens', minutes: 0.5,
      notes: "🔸 Diapo à sauter si on est en retard.\n• La machine découpe le texte en petits morceaux (« intelli », « gence »…), qu'on appelle des « tokens ». Chaque morceau devient un nombre.\n• Elle ne manipule que des nombres : elle calcule, elle ne lit pas vraiment.\n• Anecdote : c'est pour ça qu'elle a parfois du mal à compter les lettres d'un mot, alors qu'elle écrit un poème sans difficulté.",
    },
    11: {
      title: 'Deux étapes d\'apprentissage', minutes: 1,
      notes: "🔸 Peut être raccourcie.\n• Étape 1, le pré-entraînement : elle « lit » une immense quantité de textes (sites internet, livres, articles) et s'entraîne des milliards de fois à deviner le mot suivant. Elle devient très forte en langue… mais elle a aussi lu le pire d'internet.\n• Étape 2, l'ajustement humain : des personnes lui posent des questions et notent ses réponses (utile ? polie ? dangereuse ?). Elle apprend ainsi à se comporter en assistant serviable.\n• L'image : l'élève qui a lu toute la bibliothèque, puis le professeur qui corrige ses copies.",
    },
    12: {
      title: 'Familles d\'IA', minutes: 1,
      notes: "🎯 L'IA, ce n'est pas que ChatGPT.\n• Génératives : elles créent du texte, des images, du son, des vidéos (ChatGPT, Midjourney…).\n• Perceptives : elles reconnaissent, par exemple le visage qui déverrouille le téléphone ou la voix de l'assistant vocal.\n• Prédictives : elles anticipent : la météo, les recommandations Netflix, la détection de fraude à la carte bancaire.\n• Agentives : les plus récentes. Elles agissent seules : chercher sur internet, remplir un formulaire, enchaîner plusieurs tâches.\n➡️ « Ça, c'est la théorie. Mais en vrai, vous l'avez déjà croisée plusieurs fois aujourd'hui… »",
    },
    // ---------- Chapitre 02 ----------
    13: { title: 'Chapitre 02 — Quotidien', minutes: 0.5, notes: "🎯 Elle est déjà partout.\n• « Vie de tous les jours, santé, industrie, culture : l'IA est déjà là, souvent sans qu'on la voie. »" },
    14: {
      title: 'L\'IA sans le savoir', minutes: 1,
      notes: "🎯 Vous l'utilisez déjà sans le savoir.\n• MATIN : l'appli météo (prévisions) et le GPS qui vous fait éviter les bouchons.\n• JOURNÉE : le téléphone qui classe vos photos par visage, le clavier qui vous propose le mot suivant (c'est le principe de ChatGPT en miniature !) et l'assistant vocal.\n• TRAVAIL : le filtre anti-spam et la traduction automatique.\n• SOIRÉE : Netflix, YouTube et Spotify qui vous recommandent quoi regarder ou écouter.\n⚙️ Demander : « Combien en avez-vous croisé aujourd'hui ? Une ? Trois ? Plus de cinq ? » (mains levées)\n• Elle travaille surtout en coulisses : on ne la voit pas, mais elle est là.",
    },
    15: {
      title: 'Quiz — IA ou pas IA ?', minutes: 2,
      notes: "🎯 Électronique ne veut pas dire IA.\n⚙️ Pour chaque proposition : « Qui pense que c'est de l'IA ? », mains levées, puis révéler avec la touche R.\n• 1. Calculatrice → PAS IA. Elle applique des règles fixes, donne toujours la même réponse et n'apprend rien.\n• 2. GPS qui recalcule → IA, en partie. Le calcul du trajet est un programme classique, mais la prévision des bouchons vient d'une IA qui apprend de millions de trajets.\n• 3. Déverrouillage par le visage → IA. Une reconnaissance faciale apprise sur des exemples, qui s'adapte même si vous mettez des lunettes ou laissez pousser la barbe.\n• 4. Four à minuteur → PAS IA. C'est une simple minuterie.\n• Morale : ce n'est pas parce qu'un appareil est électronique, ou marqué « intelligent » sur l'emballage, que c'est de l'IA. L'IA, c'est quand la machine a appris à partir d'exemples.",
      elements: [
        { id: 'q1', type: 'answer', label: '1 · Calculatrice', rect: [7.8, 39.8, 41.3, 14.9], choices: ['IA', 'Pas IA'], answer: 1 },
        { id: 'q2', type: 'answer', label: '2 · GPS', rect: [50.9, 39.8, 41.3, 14.9], choices: ['IA', 'Pas IA'], answer: 0 },
        { id: 'q3', type: 'answer', label: '3 · Visage', rect: [7.8, 57.9, 41.3, 14.9], choices: ['IA', 'Pas IA'], answer: 0 },
        { id: 'q4', type: 'answer', label: '4 · Four', rect: [50.9, 57.9, 41.3, 14.9], choices: ['IA', 'Pas IA'], answer: 1 },
      ],
    },
    16: { title: 'Tous les métiers', minutes: 1, notes: "🎯 Elle transforme presque tous les métiers.\n• Santé : elle aide à repérer des anomalies sur les radios et les scanners. C'est le médecin qui décide.\n• Éducation : des exercices adaptés au niveau de chaque élève, de l'aide aux devoirs.\n• Agriculture : drones et capteurs pour surveiller les cultures, et arroser ou traiter seulement là où il faut.\n• Industrie : prévoir une panne avant qu'elle arrive, contrôler la qualité avec des caméras.\n• Transport : l'aide à la conduite (freinage d'urgence, maintien dans la voie) et l'optimisation des tournées de livraison.\n• Culture : musique, images, écriture, effets spéciaux au cinéma.\n• Message : elle change la façon de travailler dans la plupart des métiers." },
    17: { title: 'Usages surprenants', minutes: 1, notes: "🔸 Peut être raccourcie.\n• Les protéines : AlphaFold, une IA de Google DeepMind, prédit la forme des protéines, ce qui prenait parfois des années en laboratoire. C'est très utile pour créer de nouveaux médicaments. Ses créateurs ont reçu le prix Nobel de chimie 2024.\n• Le tri des déchets : dans les centres de tri, des caméras et des bras robotisés reconnaissent le plastique, le carton ou le métal sur les tapis.\n• La traduction en direct : vous parlez dans votre langue, votre interlocuteur vous entend dans la sienne, presque instantanément.\n➡️ « Assez parlé : place à la pratique ! »" },
    // ---------- Chapitre 03 : démonstrations ----------
    18: { title: 'Chapitre 03 — En pratique', minutes: 0.5, notes: "🎯 Annoncer la partie pratique.\n• « On va faire un tour des outils, puis passer aux démonstrations, en direct, et à un petit jeu du vrai ou faux. »" },
    19: { title: 'Panorama', minutes: 1, notes: "🎯 Il existe une IA pour chaque besoin.\n• Texte : ChatGPT, Claude, Gemini, ou Le Chat de Mistral, une entreprise française. Pour discuter, écrire, résumer, expliquer.\n• Image : Midjourney, DALL-E. Une phrase devient une image.\n• Musique : Suno, Udio. Une chanson complète, avec paroles et voix, en une minute.\n• Vidéo : Sora, Veo. De courtes vidéos à partir d'un simple texte.\n• Voix : Whisper transcrit une réunion par écrit ; ElevenLabs fait parler une voix… y compris en imitant la vôtre.\n• Vision : Google Lens. On photographie une plante, un objet, un monument, et il l'identifie.\n• « Pas besoin de retenir les noms : ils changent tous les six mois. Retenez plutôt ce qu'on peut faire. »" },
    20: {
      title: 'Programme des démos', minutes: 0.5,
      notes: "🎯 Annoncer les 6 démos.\n• « Préparé » : fait à l'avance, parce que c'est trop long ou trop aléatoire en direct (images, vidéos).\n• « Direct » : devant vous, avec le risque que ça rate… et si ça rate, ce sera instructif aussi !\n• Et pour finir, la démo finale : le site de la MJC.\n⚙️ Avant de commencer : internet OK, comptes connectés, son branché.",
    },
    21: {
      title: 'Démo 1 — Vraie photo ou IA ? (3 images)', minutes: 3,
      notes: "🎯 On ne peut plus se fier à ses yeux seuls.\n⚙️ PRÉPARÉ : les 3 images doivent être en place (A, B, C).\n• Règle du jeu : « Parmi ces 3 images, une seule est une vraie photo. Une autre a été faite par une IA, et elle est réussie. La dernière aussi… mais elle est ratée. »\n⚙️ Pour chaque image : « Qui pense que c'est une vraie photo ? » (mains levées). Puis révéler avec R.\n• Commenter les votes : l'image ratée se repère assez bien. L'image réussie, elle, trompe beaucoup de monde.\n• « Cette image a été fabriquée en quelques secondes, gratuitement, avec une simple phrase. »\n⚙️ Réponses par défaut : A = vraie photo, B = IA réussie, C = IA ratée. Ajuster dans la régie si l'ordre est différent.",
      elements: [
        { id: 'A', type: 'zone', label: 'Image A', rect: [7.8, 35.2, 26.6, 46.3], default: 'photo-a' },
        { id: 'B', type: 'zone', label: 'Image B', rect: [36.7, 35.2, 26.6, 46.3], default: 'photo-b' },
        { id: 'C', type: 'zone', label: 'Image C', rect: [65.6, 35.2, 26.6, 46.3], default: 'photo-c' },
        { id: 'rA', type: 'answer', label: 'Réponse A', rect: [7.8, 35.2, 26.6, 46.3], choices: ['📸 Vraie photo', '🤖 IA réussie', '😬 IA ratée'], answer: 0, pill: 'bottom' },
        { id: 'rB', type: 'answer', label: 'Réponse B', rect: [36.7, 35.2, 26.6, 46.3], choices: ['📸 Vraie photo', '🤖 IA réussie', '😬 IA ratée'], answer: 1, pill: 'bottom' },
        { id: 'rC', type: 'answer', label: 'Réponse C', rect: [65.6, 35.2, 26.6, 46.3], choices: ['📸 Vraie photo', '🤖 IA réussie', '😬 IA ratée'], answer: 2, pill: 'bottom' },
      ],
    },
    22: {
      title: 'Démo 1 — Les indices', minutes: 1.5,
      notes: "🎯 Quelques indices… mais surtout, vérifier la source.\n⚙️ Remontrer l'image ratée en grand (⛶ sur la diapo précédente) et entourer les défauts au stylo ou au zoom.\n• Mains et doigts : six doigts, des doigts fusionnés, des articulations étranges.\n• Texte : des lettres inventées, des panneaux illisibles.\n• Ombres et reflets : une lumière qui vient de deux côtés, un reflet absent dans un miroir.\n• Fond : des objets qui se fondent les uns dans les autres, des motifs qui se répètent.\n• Trop parfait : une peau trop lisse, un effet « plastique ».\n• LE réflexe : d'où vient cette image ? Qui l'a publiée ? Un média connu ? On peut faire une « recherche d'image inversée » (Google Lens) pour voir où elle apparaît ailleurs.\n• Les IA progressent vite : ces défauts seront de moins en moins visibles. Le réflexe de vérifier la source, lui, restera toujours valable.",
    },
    23: {
      title: 'Démo 2 — Créer une affiche', minutes: 4,
      notes: "🎯 Plus la demande est précise, plus le résultat vous ressemble.\n⚙️ EN DIRECT. Copier le prompt « Affiche », le coller dans ChatGPT ou Copilot, et partager la fenêtre.\n• « Le \"prompt\", c'est simplement la demande qu'on écrit à l'IA. »\n• Pendant que l'image se fabrique (environ 30 secondes), expliquer les 5 couleurs :\n  bleu = le format (affiche verticale A3) ;\n  vert = le sujet (la fête, la date, les horaires) ;\n  violet = le style (festif, les Vosges, une illustration colorée) ;\n  orange = le texte exact à écrire ;\n  rose = les contraintes (de la place pour les logos).\n• « Une demande vague donne un résultat banal. Une demande précise donne un résultat qui vous ressemble. »\n⚙️ Copier l'image, Ctrl+V dans la régie, puis « → affiche » pour l'afficher sur la diapo.\n• Regarder ensemble le texte de l'affiche : il y a souvent des fautes ou des lettres bizarres. On demande une correction (prompt « Retouche »).\n• Conclusion : un formidable outil pour un premier jet. Mais on vérifie, on fait relire, et pour une vraie affiche on fait attention aux droits.\n⚙️ Plan B : l'affiche préparée à l'avance.",
      prompts: [
        { label: 'Affiche', text: "Crée une affiche verticale au format A3 pour la fête de la MJC du Val d'Ajol, le samedi 20 juin de 14 h à 22 h. Ambiance festive et familiale, montagnes des Vosges en fond, style illustration colorée. Titre bien lisible : « Fête de la MJC ». Laisse de la place en bas pour les logos." },
        { label: 'Retouche', text: "Agrandis le titre, ajoute des lampions colorés et vérifie que tout le texte est écrit sans faute." },
      ],
      links: [
        { label: 'ChatGPT', url: 'https://chatgpt.com/' },
        { label: 'Copilot (gratuit)', url: 'https://copilot.microsoft.com/' },
      ],
      elements: [
        { id: 'affiche', type: 'zone', label: 'Affiche générée', rect: [64.1, 18.5, 28.1, 72.2], fit: 'contain', default: 'affiche' },
      ],
    },
    24: {
      title: 'Démo 3 — Vidéo : filmée ou générée ?', minutes: 3,
      notes: "🎯 Bientôt, une vidéo ne sera plus une preuve.\n⚙️ PRÉPARÉ. Les 2 vidéos tournent en boucle, sans le son. ⛶ pour en passer une en plein écran avec le son.\n• « L'une a été filmée par une vraie caméra. L'autre a été entièrement inventée par une IA, à partir d'une simple phrase. Laquelle ? »\n⚙️ Vote à main levée, puis révéler avec R.\n• Revoir la vidéo IA en pointant ce qui cloche :\n  la physique (l'eau, les tissus, les cheveux qui bougent bizarrement) ;\n  les mains et les visages ;\n  le texte ;\n  les objets qui apparaissent ou disparaissent.\n• Le danger : les « deepfakes », ces fausses vidéos de personnalités qui leur font dire n'importe quoi. Avant de partager une vidéo choquante, on vérifie.\n⚙️ Réponses par défaut : 1 = filmée, 2 = IA. Ajuster dans la régie si besoin.\n➡️ « Passons à des usages plus utiles au quotidien. »",
      elements: [
        { id: 'V1', type: 'zone', label: 'Vidéo 1', rect: [7.8, 30.6, 41.1, 41.1], default: 'video-1' },
        { id: 'V2', type: 'zone', label: 'Vidéo 2', rect: [51.0, 30.6, 41.1, 41.1], default: 'video-2' },
        { id: 'r1', type: 'answer', label: 'Réponse 1', rect: [7.8, 30.6, 41.1, 41.1], choices: ['🎥 Filmée', '🤖 Générée par IA'], answer: 0, pill: 'bottom' },
        { id: 'r2', type: 'answer', label: 'Réponse 2', rect: [51.0, 30.6, 41.1, 41.1], choices: ['🎥 Filmée', '🤖 Générée par IA'], answer: 1, pill: 'bottom' },
      ],
    },
    25: {
      title: 'Démo 4 — Rédiger un e-mail (pièges)', minutes: 4,
      notes: "🎯 Un gain de temps énorme… à condition de connaître les pièges.\n⚙️ EN DIRECT. Outils → Montrer une fenêtre, puis copier le prompt « E-mail ».\n• Lire le résultat à voix haute : en 10 secondes, un e-mail poli et bien structuré. Un vrai gain de temps pour ceux qui n'aiment pas écrire.\n⚙️ Copier le prompt « Piège : la loi ».\n• Piège 1, les inventions : elle cite un article de loi avec beaucoup d'assurance… mais est-ce le bon ? On vérifie sur service-public.fr ou Légifrance. Quand elle invente quelque chose qui a l'air vrai, on appelle ça une « hallucination ».\n• Bon à savoir : le propriétaire doit entretenir le logement (loi du 6 juillet 1989), mais les petites réparations, comme un joint de robinet, sont souvent à la charge du locataire (décret du 26 août 1987). L'IA ne vous l'aurait peut-être pas dit !\n• Piège 2, les données personnelles : on ne met jamais son adresse, le nom de son propriétaire ou son numéro de contrat. On les ajoute ensuite, dans sa propre messagerie.\n• Piège 3, le ton « robot » (« Je me permets de vous solliciter… »). Copier le prompt « Plus naturel » pour montrer la différence.\n• Piège 4, envoyer sans relire : c'est vous qui signez, c'est vous qui êtes responsable.",
      prompts: [
        { label: 'E-mail', text: "Rédige un e-mail poli à mon propriétaire pour signaler une fuite d'eau sous l'évier depuis 3 jours. Ton cordial mais ferme, 10 lignes maximum. Je souhaite une intervention cette semaine." },
        { label: 'Piège : la loi', text: "Ajoute la référence exacte de l'article de loi qui oblige le propriétaire à intervenir." },
        { label: 'Plus naturel', text: "Réécris-le de façon plus naturelle, comme si je l'avais écrit moi-même, sans formules toutes faites." },
      ],
      links: [
        { label: 'ChatGPT', url: 'https://chatgpt.com/' },
        { label: 'Légifrance (vérifier)', url: 'https://www.legifrance.gouv.fr/' },
      ],
    },
    26: {
      title: 'Démo 5 — Budget dans Excel', minutes: 3,
      notes: "🎯 Plus besoin de connaître les formules : on décrit ce qu'on veut en français.\n⚙️ EN DIRECT. Copier le prompt « Budget ».\n• « Je ne lui parle pas de formules ou de cellules : je lui décris ce que je veux, comme à quelqu'un. »\n⚙️ Télécharger le fichier, l'ouvrir dans Excel et cliquer sur un total : la formule est là, le calcul se fait tout seul.\n⚙️ Copier le prompt « Amélioration » : la colonne « Écart » passe en rouge quand on dépasse le budget.\n• Les réflexes :\n  vérifier un ou deux totaux à la main, car elle peut se tromper de case ;\n  tester avec des chiffres inventés ;\n  ne jamais y coller ses vrais relevés bancaires.\n• Ça marche aussi pour un planning de vacances, une liste de courses ou le suivi des cotisations d'une association.\n⚙️ Plan B : le fichier préparé à l'avance.",
      prompts: [
        { label: 'Budget', text: "Crée un tableau Excel pour suivre le budget mensuel de ma famille : revenus, dépenses par catégorie (logement, courses, transport, loisirs), un total automatique, le reste à vivre et un graphique. Utilise des montants d'exemple. Donne-moi le fichier à télécharger." },
        { label: 'Amélioration', text: "Ajoute une colonne « Écart » entre le prévu et le réel, en rouge quand je dépasse mon budget." },
      ],
      links: [{ label: 'ChatGPT', url: 'https://chatgpt.com/' }],
    },
    27: {
      title: 'Démo 6 — Apprendre une langue', minutes: 3,
      notes: "🎯 Un professeur patient, disponible à toute heure, qui ne juge pas.\n⚙️ EN DIRECT, de préférence à voix haute (mode vocal de l'appli ChatGPT ou Gemini, son relié à la sono).\n• Décortiquer le prompt :\n  on lui donne un rôle (un professeur patient) ;\n  un niveau (débutant) ;\n  une situation (au restaurant) ;\n  une méthode (une question à la fois, corrections en français).\n⚙️ Jouer la scène et faire exprès une erreur (« I want a pizza margarita ») pour montrer la correction bienveillante.\n• Les atouts : disponible 24 h/24, patient, adapté à votre niveau, sans jugement. On ose parler, même avec un mauvais accent.\n• Les limites : elle ne remplace pas un vrai échange avec des humains, ni un voyage, ni un professeur pour progresser vraiment.\n⚙️ Proposer à une personne du public d'essayer une réplique !\n➡️ « C'est impressionnant… mais ça pose aussi des questions. »",
      prompts: [
        { label: 'Prof d\'anglais', text: "Tu es mon professeur d'anglais, patient et encourageant. Je suis débutant. Jouons une scène : je commande au restaurant. Pose-moi une question à la fois, corrige mes erreurs en français, puis continue." },
      ],
      links: [
        { label: 'ChatGPT', url: 'https://chatgpt.com/' },
        { label: 'Gemini', url: 'https://gemini.google.com/' },
      ],
    },
    // ---------- Chapitre 04 ----------
    28: { title: 'Chapitre 04 — Impacts', minutes: 0.5, notes: "🎯 Annoncer les enjeux.\n• « On a vu ce qu'elle sait faire. Regardons maintenant ce qu'elle change pour nous : les opportunités, les risques, et qui fixe les règles. »" },
    29: { title: 'Opportunités / risques', minutes: 1.5, notes: "🎯 Ni bonne ni mauvaise : tout dépend de l'usage.\n• Opportunités :\n  gagner du temps sur les tâches pénibles ;\n  des progrès en médecine et en science ;\n  l'accès au savoir pour tous (on se fait expliquer simplement, on traduit) ;\n  de nouveaux outils pour créer.\n• Risques :\n  les erreurs et les fausses informations (on l'a vu avec l'e-mail) ;\n  les biais et les discriminations ;\n  les atteintes à la vie privée ;\n  la dépendance, quand on perd l'habitude de réfléchir ou d'écrire par soi-même.\n• « C'est comme internet ou un couteau de cuisine : l'outil n'est ni bon ni mauvais, c'est l'usage qui compte. »" },
    30: { title: 'Questions éthiques', minutes: 1.5, notes: "🎯 Quatre questions à se poser.\n• Biais : l'IA reproduit les préjugés présents dans ses exemples. Un outil de recrutement d'Amazon défavorisait les CV de femmes, parce qu'il avait appris sur des recrutements passés surtout masculins. Il a été abandonné.\n• Hallucinations : elle invente avec aplomb (de faux articles de loi, de fausses références, des livres qui n'existent pas).\n• Vie privée : ce que vous tapez peut être conservé et réutilisé. Il existe souvent un réglage pour le refuser.\n• Droits d'auteur : des livres, des articles de presse, des œuvres d'artistes ont servi à l'entraîner, souvent sans leur accord et sans rémunération. Des procès sont en cours, par exemple celui du New York Times contre OpenAI." },
    31: { title: 'Qui décide des règles ?', minutes: 1, notes: "🎯 Il faut des règles, et l'Europe a été la première à en écrire.\n• Europe : l'AI Act est la première grande loi au monde sur l'IA. Le principe : plus un usage est risqué, plus il est encadré.\n  Interdit : par exemple, noter les citoyens selon leur comportement.\n  Très contrôlé : le recrutement, la santé.\n  Obligatoire : signaler quand un contenu a été fabriqué par une IA.\n  Sa mise en place est progressive, entre 2024 et 2027 (calendrier à vérifier).\n• Démocratie : les fausses vidéos et les faux messages peuvent influencer les élections. En 2024, un faux message vocal imitant la voix de Joe Biden demandait aux électeurs de ne pas aller voter.\n• Souveraineté : quelques géants, surtout américains et chinois, concentrent cette technologie. L'Europe a aussi ses acteurs, comme Mistral AI en France." },
    32: { title: 'Productivité', minutes: 1.5, notes: "🎯 Automatiser des tâches, pas des humains.\n• L'IA excelle pour :\n  les tâches répétitives ;\n  résumer et trier ;\n  produire un premier jet.\n• L'humain reste indispensable pour :\n  juger et décider ;\n  la relation et l'empathie ;\n  la responsabilité (si ça tourne mal, c'est un humain qui en répond).\n• La plupart des métiers seront transformés plutôt que supprimés. Ceux qui sauront s'en servir auront un avantage.\n• Le coût caché : les centres de données qui font tourner ces IA consomment beaucoup d'électricité, et d'eau pour les refroidir. Une image ou une vidéo consomme bien plus qu'une simple question. Utilisons-la quand elle apporte vraiment quelque chose.\n➡️ « Alors, concrètement, comment bien s'en servir ? »" },
    // ---------- Chapitre 05 ----------
    33: { title: 'Chapitre 05 — Bonnes pratiques', minutes: 0.5, notes: "🎯 Annoncer les 3 réflexes.\n• « Trois réflexes simples : bien demander, vérifier, protéger ses données. »" },
    34: { title: 'Le bon prompt', minutes: 1.5, notes: "🎯 Parlez-lui comme à un stagiaire très doué… qui ne vous connaît pas.\n• Le « prompt », c'est simplement la demande qu'on lui écrit. Trois ingrédients :\n• Contexte : qui vous êtes, pour qui, dans quel but. « Je suis bénévole dans une MJC et j'écris aux parents des enfants inscrits… »\n• Tâche : ce que vous voulez, précisément. « Rédige une invitation pour la fête de fin d'année. »\n• Format : la longueur, le ton, la forme. « 5 lignes, ton chaleureux, sous forme d'e-mail. »\n• Rappel : c'est exactement ce qu'on a fait avec l'affiche. Chaque couleur était un ingrédient.\n• Astuce : si le résultat ne convient pas, on continue la conversation. « Plus court », « plus simple », « avec un exemple »." },
    35: { title: 'Esprit critique', minutes: 1, notes: "🎯 Faites confiance, mais vérifiez.\n• Vérifier : pour toute information importante (santé, droit, argent), on recoupe avec une source fiable.\n• Reformuler : on pose la question autrement. Si les réponses se contredisent, méfiance !\n• Relire : vous êtes responsable de ce que vous utilisez ou envoyez.\n• La règle d'or : jamais de données personnelles, médicales ou confidentielles. « N'écrivez rien que vous ne mettriez pas sur une carte postale. »" },
    36: { title: 'À faire / à éviter', minutes: 1, notes: "🎯 Un assistant, pas un cerveau de remplacement.\n• À faire :\n  donner du contexte ;\n  affiner petit à petit ;\n  vérifier les faits ;\n  l'utiliser comme un assistant.\n• À éviter :\n  tout croire aveuglément ;\n  partager des données sensibles ;\n  lui déléguer sa réflexion ;\n  copier-coller sans relire.\n• Pour les parents : pour les devoirs, l'utiliser pour comprendre (« explique-moi autrement »), pas pour copier la réponse.\n• La phrase à retenir : « Utilisez-la comme un assistant, pas comme un cerveau de remplacement. »" },
    // ---------- Chapitre 06 ----------
    37: { title: 'Et demain ?', minutes: 1.5, notes: "🎯 Ce qui arrive… et ce que vous en attendez.\n• Agents autonomes : des IA qui enchaînent les tâches seules (chercher, comparer, réserver). Question : à qui la faute si elles se trompent ?\n• Multimodalité : une seule IA qui voit, entend et parle. On peut déjà montrer un objet à la caméra du téléphone et lui poser une question à voix haute.\n• IA plus sobre : des modèles plus petits qui tournent directement sur le téléphone, sans internet. Ils consomment moins et respectent mieux la vie privée.\n⚙️ Demander : « Et vous, qu'attendez-vous de l'IA ? » Recueillir 2 ou 3 réponses.\n➡️ « Justement, je vous propose une dernière démo, la plus ambitieuse. »" },
    // ---------- Démo finale ----------
    38: {
      title: 'Démo finale — Le site de la MJC', minutes: 1,
      notes: "🎯 Le défi : un vrai site internet, en direct, en quelques minutes.\n• « Pour finir, un vrai projet : créer en direct le site internet de la MJC. Il y a quelques années, il fallait plusieurs semaines et un professionnel. »\n• Les 4 étapes :\n  1. je décris le site en français ;\n  2. l'IA le fabrique ;\n  3. on l'améliore ensemble, avec vos idées ;\n  4. on le met en ligne, et vous l'ouvrez sur votre téléphone.\n⚙️ Plan B (sans le dire) : la capture d'écran du site préparé et son adresse en ligne.",
      links: [
        { label: 'Claude', url: 'https://claude.ai/' },
        { label: 'ChatGPT', url: 'https://chatgpt.com/' },
      ],
    },
    39: {
      title: 'Démo finale — Le cahier des charges', minutes: 7,
      notes: "🎯 On décrit, l'IA fabrique, on améliore ensemble.\n⚙️ Copier le prompt « Site vitrine », le coller dans Claude (le site s'affiche directement) ou dans ChatGPT, et partager la fenêtre.\n• Lire le prompt : « Je le décris comme je le ferais à un graphiste : pour qui, quelles rubriques, quel style, et lisible sur téléphone. »\n• Pendant que le texte défile : « Ce que vous voyez défiler, c'est le code, la langue dans laquelle sont écrits les sites. Pas besoin de la comprendre : l'IA l'écrit pour nous. »\n⚙️ Montrer le résultat et le faire défiler.\n⚙️ Demander à la salle : « Qu'est-ce que vous ajouteriez ? » Choisir 1 ou 2 idées (galerie photo, couleurs du logo, inscription aux ateliers, gros caractères) et copier le prompt correspondant.\n⚙️ Mise en ligne : télécharger le fichier, le glisser sur Netlify Drop, puis Outils → QR code à l'écran avec l'adresse obtenue.\n• « Sortez vos téléphones : ce site existe vraiment, maintenant, sur internet. »\n• Faire remarquer que l'IA a inventé des choses (horaires, adresse, textes…). Ça prépare le bilan.",
      prompts: [
        { label: 'Site vitrine', text: "Crée un site vitrine d'une seule page pour la MJC du Val d'Ajol (Vosges). Sections : un accueil avec une grande image, nos activités (danse, théâtre, musique, informatique, sport), l'agenda des événements, les horaires et un contact avec une carte. Style moderne, coloré et chaleureux, lisible sur téléphone. Donne-moi le site complet dans un seul fichier." },
        { label: 'Galerie', text: "Ajoute une section galerie photo avec 6 vignettes qui s'agrandissent au clic." },
        { label: 'Couleurs', text: "Reprends les couleurs du logo de la MJC : rose, violet, bleu, vert et jaune vif sur fond clair." },
        { label: 'Inscription', text: "Ajoute un formulaire d'inscription aux ateliers : nom, e-mail, atelier choisi, message." },
        { label: 'Seniors', text: "Rends le site plus lisible pour les seniors : plus gros caractères, plus de contraste, boutons plus grands." },
      ],
      links: [
        { label: 'Claude', url: 'https://claude.ai/' },
        { label: 'ChatGPT', url: 'https://chatgpt.com/' },
        { label: 'Netlify Drop (mise en ligne)', url: 'https://app.netlify.com/drop' },
      ],
    },
    40: {
      title: 'Démo finale — Bilan', minutes: 1.5,
      notes: "🎯 L'IA accélère, l'humain valide.\n• Ce que l'IA a fait en quelques minutes :\n  la structure et le design ;\n  le code ;\n  des textes de départ ;\n  l'adaptation au téléphone.\n• Ce qu'il reste à faire, par nous :\n  les vrais contenus et les vraies photos (avec l'accord des personnes photographiées) ;\n  vérifier chaque information (elle a inventé des horaires !) ;\n  rendre le site accessible (par exemple aux personnes malvoyantes) et respecter la vie privée (un formulaire collecte des données) ;\n  l'adresse du site, l'hébergement, et surtout les mises à jour : qui va le tenir à jour ?\n• « Ce qui prenait des semaines prend quelques heures… mais demande toujours un regard humain. »\n➡️ « Si vous ne deviez retenir que trois choses ce soir… »",
    },
    // ---------- Conclusion ----------
    41: {
      title: '3 choses à retenir', minutes: 1,
      notes: "🎯 Les 3 messages à emporter. Les dire lentement, en regardant la salle.\n• 1. Elle prédit, elle ne sait pas. Elle peut se tromper avec assurance : vérifiez ce qui compte.\n• 2. Parlez-lui comme à un stagiaire : contexte, tâche, format. Plus vous êtes précis, meilleur est le résultat.\n• 3. Vos données sont précieuses : rien de personnel, de médical ou de confidentiel.\n• Conclure : « L'IA est un outil. C'est vous qui gardez la main. »",
    },
    42: {
      title: 'Pour essayer chez vous', minutes: 1,
      notes: "🎯 Donner envie d'essayer, dès ce soir.\n• Elles ont toutes une version gratuite :\n  ChatGPT, la plus connue ;\n  Le Chat, de l'entreprise française Mistral ;\n  Gemini, de Google ;\n  Copilot, de Microsoft, qui fait aussi des images.\n• Conseil : commencer par une petite tâche du quotidien.\n  Une recette avec ce qu'il reste dans le frigo.\n  Un e-mail difficile à écrire.\n  Le résumé d'un long article.\n  L'explication d'un courrier administratif (en retirant vos informations personnelles).\n• Si la MJC propose un atelier numérique, l'annoncer ici.",
    },
    43: { title: 'Merci !', minutes: 0, notes: "🎯 Remercier et ouvrir les questions.\n• Remercier la MJC, les bénévoles et le public pour son attention et sa participation.\n• « Place à vos questions ! »\n• Si personne n'ose : « On me demande souvent si l'IA va remplacer notre métier… » (voir PREPARATION.md pour les réponses types).\n• Si je ne connais pas la réponse : « Je préfère vérifier plutôt que vous dire une bêtise. Je vous réponds via la MJC. » C'est cohérent avec le message de la soirée !" },
  },
};
