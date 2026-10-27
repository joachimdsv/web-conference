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
      notes: "• Bonjour, merci d'être là. Me présenter en 2 phrases : qui je suis, pourquoi l'IA me passionne.\n• Promesse : « Ce soir, pas besoin d'être informaticien. Vous allez comprendre ce qu'est l'IA, la voir travailler en direct, et repartir avec de bons réflexes. »",
    },
    2: {
      title: 'Plan', minutes: 1,
      notes: "• 6 étapes. Insister : il y aura des démonstrations en direct, des petits jeux, et on finira par créer ensemble le site de la MJC.\n• Les questions sont bienvenues à la fin (ou pendant, si c'est court).",
    },
    3: {
      title: 'Brise-glace — Et vous ?', minutes: 1,
      notes: "• Poser les 3 questions, faire lever les mains, commenter ce qu'on voit : « Je vois que beaucoup l'ont déjà essayée… et beaucoup s'en méfient, c'est très sain ! »\n• But : mettre tout le monde à l'aise, novices comme habitués.",
    },
    // ---------- Chapitre 01 ----------
    4: {
      title: 'Chapitre 01 — Qu\'est-ce que l\'IA ?', minutes: 0.5,
      notes: "• Question au public : « Pour vous, c'est quoi l'IA ? Un mot qui vous vient ? » (robot, ChatGPT, Terminator…). Rebondir sur 1 ou 2 réponses.",
    },
    5: {
      title: 'Définition', minutes: 1.5,
      notes: "• L'IA, c'est un programme qui imite certaines capacités humaines : percevoir (voir, entendre), apprendre, décider.\n• Elle ne « pense » pas et n'a pas de conscience : elle repère des régularités dans une énorme quantité d'exemples.\n• Image simple : un perroquet ultra doué qui aurait lu toute une bibliothèque.",
    },
    6: {
      title: 'Histoire', minutes: 1.5,
      notes: "• Ce n'est pas nouveau : l'idée a 70 ans (Turing en 1950, le mot « intelligence artificielle » en 1956).\n• 1997 : un ordinateur bat le champion du monde d'échecs.\n• 2022 : ChatGPT arrive, et pour la première fois tout le monde peut parler à une IA. 100 millions d'utilisateurs en 2 mois.",
    },
    7: {
      title: 'Apprendre par l\'exemple', minutes: 1,
      notes: "• Exemple du chat : impossible d'écrire toutes les règles qui définissent un chat (oreilles, moustaches…).\n• On lui montre des milliers de photos « chat / pas chat » et elle trouve elle-même ce qui les distingue. Comme un enfant à qui on montre des images.",
    },
    8: {
      title: 'Réseaux de neurones', minutes: 1,
      notes: "• Rester simple : c'est un empilement de « filtres ». Le premier repère des traits, le suivant des formes, puis des yeux, puis un visage entier.\n• « Inspiré du cerveau », mais ce n'est pas un cerveau.",
    },
    9: {
      title: 'Prédire le mot suivant', minutes: 1,
      notes: "• Faire compléter par la salle : « Le chat est sur le… » → tapis ! Vous venez de faire comme ChatGPT.\n• Il choisit le mot le plus probable, puis le suivant, etc. Il ne vérifie pas si c'est vrai : il cherche ce qui « sonne juste ». D'où les erreurs.",
    },
    10: {
      title: 'Les tokens', minutes: 0.5,
      notes: "🔸 Optionnelle si on est en retard.\n• Une phrase : la machine découpe les mots en petits morceaux et les transforme en nombres. Elle calcule avec des nombres, pas avec du sens.",
    },
    11: {
      title: 'Deux étapes d\'apprentissage', minutes: 1,
      notes: "🔸 Peut être raccourcie.\n• 1) Elle lit une immense partie d'internet et s'entraîne à deviner le mot suivant.\n• 2) Des humains notent ses réponses pour la rendre utile et polie. Comme un élève : d'abord il lit beaucoup, ensuite un prof le corrige.",
    },
    12: {
      title: 'Familles d\'IA', minutes: 1,
      notes: "• Toutes les IA ne sont pas des ChatGPT : certaines créent (texte, image), d'autres reconnaissent (visage, voix), d'autres prédisent (Netflix, météo), et les nouvelles « agissent » toutes seules.",
    },
    // ---------- Chapitre 02 ----------
    13: { title: 'Chapitre 02 — Quotidien', minutes: 0.5, notes: "• Transition : « Vous l'utilisez déjà… souvent sans le savoir. »" },
    14: {
      title: 'L\'IA sans le savoir', minutes: 1,
      notes: "• Dérouler une journée : la météo et le GPS le matin, le clavier du téléphone, le filtre anti-spam, les suggestions Netflix le soir.\n• Demander : « Combien en avez-vous croisé aujourd'hui ? »",
    },
    15: {
      title: 'Quiz — IA ou pas IA ?', minutes: 2,
      notes: "⚙️ Lever les mains pour chaque proposition, puis révéler une par une (touche R).\n• Calculatrice : pas IA, elle applique des règles fixes.\n• GPS : IA, il prédit les bouchons.\n• Déverrouillage par le visage : IA, reconnaissance faciale.\n• Four à minuteur : pas IA, une simple minuterie.\n• Morale : l'IA, c'est quand la machine apprend à partir d'exemples, pas juste un appareil électronique.",
      elements: [
        { id: 'q1', type: 'answer', label: '1 · Calculatrice', rect: [7.8, 39.8, 41.3, 14.9], choices: ['IA', 'Pas IA'], answer: 1 },
        { id: 'q2', type: 'answer', label: '2 · GPS', rect: [50.9, 39.8, 41.3, 14.9], choices: ['IA', 'Pas IA'], answer: 0 },
        { id: 'q3', type: 'answer', label: '3 · Visage', rect: [7.8, 57.9, 41.3, 14.9], choices: ['IA', 'Pas IA'], answer: 0 },
        { id: 'q4', type: 'answer', label: '4 · Four', rect: [50.9, 57.9, 41.3, 14.9], choices: ['IA', 'Pas IA'], answer: 1 },
      ],
    },
    16: { title: 'Tous les métiers', minutes: 1, notes: "• Survoler, citer 2 exemples proches du public : le médecin qui s'aide de l'IA pour lire une radio, l'agriculteur qui surveille ses champs par drone.\n• Elle aide les métiers plus qu'elle ne les remplace." },
    17: { title: 'Usages surprenants', minutes: 1, notes: "🔸 Peut être raccourcie.\n• AlphaFold a fait gagner des années à la recherche médicale (prix Nobel 2024).\n• Le tri des déchets, la traduction à voix haute : l'IA rend aussi des services très concrets." },
    // ---------- Chapitre 03 : démonstrations ----------
    18: { title: 'Chapitre 03 — En pratique', minutes: 0.5, notes: "• « Assez parlé : place à la pratique ! »" },
    19: { title: 'Panorama', minutes: 1, notes: "• Il existe une IA pour chaque besoin : écrire, dessiner, composer de la musique, faire des vidéos, parler.\n• Pas besoin de tout retenir : on va en voir plusieurs en action." },
    20: {
      title: 'Programme des démos', minutes: 0.5,
      notes: "• 6 démos : certaines préparées à l'avance (quand la machine met trop longtemps), d'autres en direct devant vous.\n⚙️ Avant de commencer : internet OK, comptes connectés, son branché.",
    },
    21: {
      title: 'Démo 1 — Vraie photo ou IA ? (3 images)', minutes: 3,
      notes: "⚙️ PRÉPARÉ. Les 3 images doivent être en place (A, B, C).\n• « Parmi ces 3 images, une seule est une vraie photo. Une autre a été faite par une IA… et elle est réussie. La dernière est ratée. »\n• Vote à main levée pour chaque image, puis révéler (touche R).\n• Réaction attendue : l'image IA réussie trompe beaucoup de monde. C'est le message.\n• Les réponses par défaut supposent A = vraie photo, B = IA réussie, C = IA ratée : ajuster dans la régie si besoin.",
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
      notes: "⚙️ Remontrer l'image ratée en grand (⛶ sur la diapo précédente) et entourer les défauts au stylo ou au zoom.\n• Les indices marchent sur les images ratées… mais les IA progressent très vite.\n• Le seul vrai réflexe : « D'où vient cette image ? Qui l'a publiée ? »",
    },
    23: {
      title: 'Démo 2 — Créer une affiche', minutes: 4,
      notes: "⚙️ EN DIRECT. Copier le prompt, le coller dans ChatGPT ou Copilot.\n• Pendant que l'image se fabrique (~30 s), expliquer les 5 couleurs : le format, le sujet, le style, le texte, les contraintes. « Plus je suis précis, plus le résultat me ressemble. »\n⚙️ Copier l'image obtenue, Ctrl+V dans la régie, puis « → affiche ».\n• Regarder ensemble le texte de l'affiche : souvent une faute ! Demander une retouche.\n• Plan B : l'affiche préparée à l'avance.",
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
      notes: "⚙️ PRÉPARÉ. Les 2 vidéos tournent en boucle sans le son ; ⛶ pour en passer une en plein écran avec le son.\n• « L'une a été filmée, l'autre entièrement inventée par une IA. Laquelle ? »\n• Vote, révélation, puis revoir la vidéo IA en pointant ce qui cloche (eau, mains, texte…).\n• Message : demain, une vidéo ne sera plus une preuve à elle seule. Attention aux fausses vidéos de personnalités.\n• Réponses par défaut : 1 = filmée, 2 = IA (à ajuster dans la régie).",
      elements: [
        { id: 'V1', type: 'zone', label: 'Vidéo 1', rect: [7.8, 30.6, 41.1, 41.1], default: 'video-1' },
        { id: 'V2', type: 'zone', label: 'Vidéo 2', rect: [51.0, 30.6, 41.1, 41.1], default: 'video-2' },
        { id: 'r1', type: 'answer', label: 'Réponse 1', rect: [7.8, 30.6, 41.1, 41.1], choices: ['🎥 Filmée', '🤖 Générée par IA'], answer: 0, pill: 'bottom' },
        { id: 'r2', type: 'answer', label: 'Réponse 2', rect: [51.0, 30.6, 41.1, 41.1], choices: ['🎥 Filmée', '🤖 Générée par IA'], answer: 1, pill: 'bottom' },
      ],
    },
    25: {
      title: 'Démo 4 — Rédiger un e-mail (pièges)', minutes: 4,
      notes: "⚙️ EN DIRECT (Outils → Montrer une fenêtre pour afficher le chatbot).\n• Lancer le prompt de base et lire le résultat : « En 10 secondes, un e-mail propre. »\n• Piège 1 : demander la référence de la loi. L'IA répond avec assurance… mais a-t-elle raison ? On vérifie sur Légifrance. C'est ce qu'on appelle une « hallucination ».\n• Piège 2 : on ne met jamais son adresse ni son numéro de contrat dans la conversation.\n• Piège 3 : les formules toutes faites. Demander une version plus naturelle.\n• Conclusion : c'est vous qui signez, donc vous relisez.",
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
      notes: "⚙️ EN DIRECT. ChatGPT fabrique un vrai fichier Excel à télécharger : l'ouvrir et cliquer sur un total pour montrer que le calcul est automatique.\n• « Pas besoin de connaître les formules : on décrit ce qu'on veut en français. »\n• Réflexes : vérifier un ou deux totaux à la main, tester avec des chiffres inventés, ne jamais y coller ses vrais relevés bancaires.\n• Plan B : fichier préparé à l'avance.",
      prompts: [
        { label: 'Budget', text: "Crée un tableau Excel pour suivre le budget mensuel de ma famille : revenus, dépenses par catégorie (logement, courses, transport, loisirs), un total automatique, le reste à vivre et un graphique. Utilise des montants d'exemple. Donne-moi le fichier à télécharger." },
        { label: 'Amélioration', text: "Ajoute une colonne « Écart » entre le prévu et le réel, en rouge quand je dépasse mon budget." },
      ],
      links: [{ label: 'ChatGPT', url: 'https://chatgpt.com/' }],
    },
    27: {
      title: 'Démo 6 — Apprendre une langue', minutes: 3,
      notes: "⚙️ EN DIRECT, de préférence à voix haute (mode vocal de l'appli ChatGPT ou Gemini, son branché sur la sono).\n• Jouer la scène du restaurant et faire exprès une erreur pour montrer la correction bienveillante.\n• Idée forte : un professeur patient, disponible à toute heure, qui ne juge pas. Utile aussi pour les enfants et les seniors.\n• Proposer à une personne du public d'essayer une réplique !",
      prompts: [
        { label: 'Prof d\'anglais', text: "Tu es mon professeur d'anglais, patient et encourageant. Je suis débutant. Jouons une scène : je commande au restaurant. Pose-moi une question à la fois, corrige mes erreurs en français, puis continue." },
      ],
      links: [
        { label: 'ChatGPT', url: 'https://chatgpt.com/' },
        { label: 'Gemini', url: 'https://gemini.google.com/' },
      ],
    },
    // ---------- Chapitre 04 ----------
    28: { title: 'Chapitre 04 — Impacts', minutes: 0.5, notes: "• Transition : « C'est impressionnant… mais ça pose aussi des questions. »" },
    29: { title: 'Opportunités / risques', minutes: 1.5, notes: "• Les deux colonnes sont vraies en même temps. L'IA n'est ni bonne ni mauvaise : tout dépend de l'usage.\n• Faire le lien avec les démos : les erreurs (e-mail), les fausses images (démo 1)." },
    30: { title: 'Questions éthiques', minutes: 1.5, notes: "• Biais : si les exemples sont déséquilibrés, l'IA reproduit les préjugés.\n• Hallucinations : vous l'avez vu avec l'article de loi.\n• Vie privée : ce que vous tapez peut être conservé.\n• Droits d'auteur : des œuvres d'artistes ont servi à l'entraîner, souvent sans leur accord." },
    31: { title: 'Qui décide des règles ?', minutes: 1, notes: "• L'Europe a voté une loi sur l'IA (l'« AI Act ») : plus un usage est risqué, plus il est encadré.\n• Les fausses vidéos menacent les débats et les élections.\n• Quelques grandes entreprises, surtout américaines et chinoises, concentrent cette technologie." },
    32: { title: 'Productivité', minutes: 1.5, notes: "• L'IA automatise des tâches, pas des personnes : elle fait le premier jet, l'humain décide.\n• Ne pas oublier le coût caché : les centres de données consomment beaucoup d'électricité et d'eau. Utilisons-la quand elle est vraiment utile." },
    // ---------- Chapitre 05 ----------
    33: { title: 'Chapitre 05 — Bonnes pratiques', minutes: 0.5, notes: "• « Alors, comment bien s'en servir ? 3 réflexes. »" },
    34: { title: 'Le bon prompt', minutes: 1.5, notes: "• Le « prompt », c'est simplement la demande qu'on écrit à l'IA.\n• Parlez-lui comme à un stagiaire très doué mais qui ne vous connaît pas : qui vous êtes (contexte), ce que vous voulez (tâche), sous quelle forme (format).\n• Rappeler l'affiche : chaque couleur du prompt était un ingrédient." },
    35: { title: 'Esprit critique', minutes: 1, notes: "• Vérifier ce qui est important, reformuler si la réponse est bizarre, relire avant d'utiliser.\n• Et surtout : aucune donnée personnelle, médicale ou confidentielle." },
    36: { title: 'À faire / à éviter', minutes: 1, notes: "• Lire rapidement les deux colonnes. Phrase clé : « Utilisez-la comme un assistant, pas comme un cerveau de remplacement. »" },
    // ---------- Chapitre 06 ----------
    37: { title: 'Et demain ?', minutes: 1.5, notes: "• Des IA qui agissent seules, qui voient, entendent et parlent en même temps, et des modèles plus sobres qui tournent sur nos téléphones.\n• Question au public : « Et vous, qu'attendez-vous de l'IA ? » Recueillir 2 ou 3 réponses, puis : « Justement, je vous propose une dernière démo… »" },
    // ---------- Démo finale ----------
    38: {
      title: 'Démo finale — Le site de la MJC', minutes: 1,
      notes: "• « Pour finir, un vrai projet : créer en direct un site internet pour la MJC. Il y a encore quelques années, il fallait des semaines et un professionnel. »\n• Présenter les 4 étapes avec des mots simples.\n⚙️ Plan B : capture d'écran du site préparé à l'avance.",
      links: [
        { label: 'Claude', url: 'https://claude.ai/' },
        { label: 'ChatGPT', url: 'https://chatgpt.com/' },
      ],
    },
    39: {
      title: 'Démo finale — Le cahier des charges', minutes: 7,
      notes: "⚙️ Copier le prompt, le coller dans Claude (le site s'affiche directement) ou ChatGPT. Partager la fenêtre à l'écran.\n• Pendant la fabrication : « Je lui décris le site en français, comme je le ferais à un graphiste. »\n• Faire 2 ou 3 améliorations proposées par la salle (galerie, couleurs, gros caractères…).\n⚙️ Mise en ligne : télécharger le fichier, le glisser sur Netlify Drop, puis Outils → QR code à l'écran avec l'adresse obtenue. Le public l'ouvre sur son téléphone !\n• Rester sur le résultat, pas sur le code : « Ce que vous voyez défiler, c'est la langue des sites web. Pas besoin de la comprendre. »",
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
      notes: "• L'IA a fait en quelques minutes le gros du travail technique.\n• Mais le site n'est pas fini : les vraies photos, les vrais horaires, la vérification, l'accessibilité… ça reste notre travail.\n• Phrase clé : « L'IA accélère, l'humain valide. »",
    },
    // ---------- Conclusion ----------
    41: {
      title: '3 choses à retenir', minutes: 1,
      notes: "• Reprendre les 3 cartes lentement, c'est ce que le public doit retenir en sortant :\n  1. Elle prédit, elle ne sait pas → vérifiez.\n  2. Parlez-lui comme à un stagiaire → soyez précis.\n  3. Vos données sont précieuses → ne partagez rien de sensible.",
    },
    42: {
      title: 'Pour essayer chez vous', minutes: 1,
      notes: "• Toutes ces IA ont une version gratuite. Le Chat est française (Mistral).\n• Conseil : commencer par une petite tâche du quotidien, une recette, un e-mail, un résumé.\n• Si la MJC propose un atelier numérique, l'annoncer ici.",
    },
    43: { title: 'Merci !', minutes: 0, notes: "• Remercier la MJC et le public.\n• Questions / réponses. Si personne n'ose : « On me demande souvent si l'IA va remplacer notre métier… »" },
  },
};
