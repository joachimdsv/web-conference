/*
 * Configuration de la présentation.
 * ---------------------------------------------------------------
 * - slideCount / image()  : où trouver les images des diapos (générées depuis le PDF)
 * - media                 : vidéos / images fournies avec le site (dossier media/)
 * - slides[n]             : réglages par diapo (n commence à 1)
 *     title    : titre court (affiché dans la régie et la télécommande)
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
 */
window.DECK = {
  title: "L'intelligence artificielle",
  subtitle: "Conférence · MJC du Val d'Ajol · 06/11/2026",
  version: 2, // à incrémenter si l'ordre des diapos change (réinitialise notes et épingles locales)
  slideCount: 40,
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
    1: { title: 'Titre', notes: "Bonjour à tous ! Se présenter rapidement. Objectif : comprendre ce qu'est l'IA, la voir en action, et repartir avec de bons réflexes." },
    2: { title: 'Plan', notes: "6 parties. Annoncer qu'il y aura des démos en direct et un petit jeu." },
    3: { title: 'Chapitre 01 — Qu\'est-ce que l\'IA ?', notes: 'Question au public : pour vous, c\'est quoi l\'IA ?' },
    4: { title: 'Définition', notes: 'Percevoir (voir, entendre), apprendre (à partir de données), décider (choisir une action). L\'IA imite, elle ne "pense" pas comme nous.' },
    5: { title: 'Histoire', notes: '1950 Turing · 1956 Dartmouth · 1997 Deep Blue vs Kasparov · 2012 deep learning (ImageNet) · 2022 ChatGPT : 100 millions d\'utilisateurs en 2 mois.' },
    6: { title: 'Apprendre par l\'exemple', notes: 'Exemple : reconnaître un chat. Impossible d\'écrire toutes les règles → on montre des milliers de photos.' },
    7: { title: 'Réseaux de neurones', notes: 'Couches successives : contours → formes → objets.' },
    8: { title: 'Prédire le mot suivant', notes: 'Faire compléter la phrase par le public : « Le chat est sur le… »' },
    9: { title: 'Les tokens', notes: 'La machine manipule des nombres, pas du sens.' },
    10: { title: 'Deux étapes d\'apprentissage', notes: 'Pré-entraînement (lecture massive) puis ajustement humain (RLHF).' },
    11: { title: 'Familles d\'IA', notes: 'Génératives, perceptives, prédictives, agentives.' },
    12: { title: 'Chapitre 02 — Quotidien', notes: '' },
    13: { title: 'L\'IA sans le savoir', notes: 'Demander : combien en avez-vous croisé aujourd\'hui ?' },
    14: {
      title: 'Quiz — IA ou pas IA ?',
      notes: 'Faire lever les mains pour chaque proposition, puis révéler une par une.\n1 Calculatrice : pas IA (calcul exact, programmé)\n2 GPS : IA (prédiction du trafic)\n3 Déverrouillage visage : IA (reconnaissance faciale)\n4 Four à minuteur : pas IA',
      elements: [
        { id: 'q1', type: 'answer', label: '1 · Calculatrice', rect: [7.8, 39.8, 41.3, 14.9], choices: ['IA', 'Pas IA'], answer: 1 },
        { id: 'q2', type: 'answer', label: '2 · GPS', rect: [50.9, 39.8, 41.3, 14.9], choices: ['IA', 'Pas IA'], answer: 0 },
        { id: 'q3', type: 'answer', label: '3 · Visage', rect: [7.8, 57.9, 41.3, 14.9], choices: ['IA', 'Pas IA'], answer: 0 },
        { id: 'q4', type: 'answer', label: '4 · Four', rect: [50.9, 57.9, 41.3, 14.9], choices: ['IA', 'Pas IA'], answer: 1 },
      ],
    },
    15: { title: 'Tous les métiers', notes: '' },
    16: { title: 'Usages surprenants', notes: 'AlphaFold : prix Nobel de chimie 2024.' },
    17: { title: 'Chapitre 03 — En pratique', notes: '' },
    18: { title: 'Panorama', notes: '' },

    // ---------- Démonstrations ----------
    19: {
      title: 'Programme des démos',
      notes: "Annoncer les 6 démos. Les « Préparé » ont été faites avant (génération trop longue en direct), les « Direct » se font devant eux.\nVérifier : connexion internet, compte ChatGPT/Claude connecté dans le navigateur, son branché.",
    },
    20: {
      title: 'Démo 1 — Vraie photo ou IA ? (3 images)',
      notes: "PRÉPARÉ. 3 images : une vraie photo (idéalement prise au Val d'Ajol), une image IA réussie, une image IA ratée (mains, texte…).\nPlacer A, B, C (onglet Médias → A/B/C, ou glisser sur la zone). Faire voter à main levée, puis révéler avec R.\nLes réponses par défaut supposent A = vraie photo, B = IA réussie, C = IA ratée : choisissez la bonne étiquette dans la régie si l'ordre diffère.",
      elements: [
        { id: 'A', type: 'zone', label: 'Image A', rect: [7.8, 35.2, 26.6, 46.3], default: 'photo-a' },
        { id: 'B', type: 'zone', label: 'Image B', rect: [36.7, 35.2, 26.6, 46.3], default: 'photo-b' },
        { id: 'C', type: 'zone', label: 'Image C', rect: [65.6, 35.2, 26.6, 46.3], default: 'photo-c' },
        { id: 'rA', type: 'answer', label: 'Réponse A', rect: [7.8, 35.2, 26.6, 46.3], choices: ['📸 Vraie photo', '🤖 IA réussie', '😬 IA ratée'], answer: 0, pill: 'bottom' },
        { id: 'rB', type: 'answer', label: 'Réponse B', rect: [36.7, 35.2, 26.6, 46.3], choices: ['📸 Vraie photo', '🤖 IA réussie', '😬 IA ratée'], answer: 1, pill: 'bottom' },
        { id: 'rC', type: 'answer', label: 'Réponse C', rect: [65.6, 35.2, 26.6, 46.3], choices: ['📸 Vraie photo', '🤖 IA réussie', '😬 IA ratée'], answer: 2, pill: 'bottom' },
      ],
    },
    21: {
      title: 'Démo 1 — Les indices',
      notes: "Revenir sur l'image ratée (⛶ pour la remontrer en grand) et pointer les défauts au laser / zoom.\nMessage clé : l'IA réussie est presque indétectable → le meilleur réflexe reste de vérifier la source.",
    },
    22: {
      title: 'Démo 2 — Créer une affiche',
      notes: "EN DIRECT. Copier le prompt (bouton ci-dessous), le coller dans ChatGPT ou Copilot.\nPendant la génération (~30 s), expliquer les 5 ingrédients colorés.\nCopier l'image générée, Ctrl+V dans la régie, puis bouton « → affiche » (ou ⛶ pour la montrer en plein écran).\nMontrer les fautes éventuelles dans le texte, puis demander une retouche.\nPlan B : affiche préparée à l'avance (media/demo2-affiche.png).",
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
    23: {
      title: 'Démo 3 — Vidéo : filmée ou générée ?',
      notes: "PRÉPARÉ. 2 vidéos courtes (5-15 s) : une filmée, une générée (Sora, Veo, Kling…).\nElles tournent en boucle et en muet dans les cadres ; ⛶ pour en lancer une en plein écran avec le son.\nFaire voter, révéler, puis revoir la vidéo IA au ralenti en pointant les défauts.\nRéponses par défaut : 1 = filmée, 2 = IA (à ajuster dans la régie).",
      elements: [
        { id: 'V1', type: 'zone', label: 'Vidéo 1', rect: [7.8, 30.6, 41.1, 41.1], default: 'video-1' },
        { id: 'V2', type: 'zone', label: 'Vidéo 2', rect: [51.0, 30.6, 41.1, 41.1], default: 'video-2' },
        { id: 'r1', type: 'answer', label: 'Réponse 1', rect: [7.8, 30.6, 41.1, 41.1], choices: ['🎥 Filmée', '🤖 Générée par IA'], answer: 0, pill: 'bottom' },
        { id: 'r2', type: 'answer', label: 'Réponse 2', rect: [51.0, 30.6, 41.1, 41.1], choices: ['🎥 Filmée', '🤖 Générée par IA'], answer: 1, pill: 'bottom' },
      ],
    },
    24: {
      title: 'Démo 4 — Rédiger un e-mail (pièges)',
      notes: "EN DIRECT (partager la fenêtre du chatbot : Outils → Montrer une fenêtre).\n1. Prompt de base → lire le résultat à voix haute.\n2. Piège n°1 : demander la référence de loi → elle peut l'inventer avec aplomb. Vérifier sur Légifrance.\n3. Montrer les formules « robot » et demander une version plus naturelle.\nRappel : jamais d'adresse ni de n° de contrat dans le prompt.",
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
    25: {
      title: 'Démo 5 — Budget dans Excel',
      notes: "EN DIRECT. ChatGPT génère un fichier .xlsx à télécharger : l'ouvrir dans Excel et cliquer sur une cellule total pour montrer la formule.\nInsister : vérifier les formules, tester avec des chiffres fictifs, ne jamais coller ses vrais relevés bancaires.\nPlan B : fichier préparé à l'avance.",
      prompts: [
        { label: 'Budget', text: "Crée un tableau Excel pour suivre le budget mensuel de ma famille : revenus, dépenses par catégorie (logement, courses, transport, loisirs), un total automatique, le reste à vivre et un graphique. Utilise des montants d'exemple. Donne-moi le fichier à télécharger." },
        { label: 'Amélioration', text: "Ajoute une colonne « Écart » entre le prévu et le réel, en rouge quand je dépasse mon budget." },
      ],
      links: [{ label: 'ChatGPT', url: 'https://chatgpt.com/' }],
    },
    26: {
      title: 'Démo 6 — Apprendre une langue',
      notes: "EN DIRECT, idéalement en mode vocal (appli ChatGPT ou Gemini, son branché sur la sono).\nJouer la scène du restaurant, faire volontairement une erreur pour montrer la correction.\nProposer à une personne du public de tester !",
      prompts: [
        { label: 'Prof d\'anglais', text: "Tu es mon professeur d'anglais, patient et encourageant. Je suis débutant. Jouons une scène : je commande au restaurant. Pose-moi une question à la fois, corrige mes erreurs en français, puis continue." },
      ],
      links: [
        { label: 'ChatGPT', url: 'https://chatgpt.com/' },
        { label: 'Gemini', url: 'https://gemini.google.com/' },
      ],
    },
    // ---------- Chapitres 04 à 06 ----------
    27: { title: 'Chapitre 04 — Impacts', notes: '' },
    28: { title: 'Opportunités / risques', notes: '' },
    29: { title: 'Questions éthiques', notes: '' },
    30: { title: 'Qui décide des règles ?', notes: 'AI Act : entré en vigueur en 2024, application progressive.' },
    31: { title: 'Productivité', notes: '' },
    32: { title: 'Chapitre 05 — Bonnes pratiques', notes: '' },
    33: { title: 'Le bon prompt', notes: 'Contexte + tâche + format. Montrer un avant/après si le temps le permet.' },
    34: { title: 'Esprit critique', notes: '' },
    35: { title: 'À faire / à éviter', notes: '' },
    36: { title: 'Et demain ?', notes: 'Question ouverte au public.' },
    // ---------- Démo finale ----------
    37: {
      title: 'Démo finale — Le site de la MJC',
      notes: "EN DIRECT, la plus technique. Annoncer les 4 étapes, puis partager la fenêtre de l'outil (Outils → Montrer une fenêtre).\nPlan B : capture d'écran du site préparé (media/site-mjc.png).",
      links: [
        { label: 'Claude', url: 'https://claude.ai/' },
        { label: 'ChatGPT', url: 'https://chatgpt.com/' },
      ],
    },
    38: {
      title: 'Démo finale — Le cahier des charges',
      notes: "Copier le prompt, le coller dans Claude (aperçu direct du site) ou ChatGPT (Canvas).\nFaire 2-3 itérations proposées par le public.\nMise en ligne : télécharger le fichier HTML, le glisser sur Netlify Drop (compte gratuit) → lien public, à ouvrir sur un téléphone (QR code).",
      prompts: [
        { label: 'Site vitrine', text: "Crée un site vitrine d'une seule page pour la MJC du Val d'Ajol (Vosges). Sections : un accueil avec une grande image, nos activités (danse, théâtre, musique, informatique, sport), l'agenda des événements, les horaires et un contact avec une carte. Style moderne, coloré et chaleureux, lisible sur téléphone. Tout le code HTML et CSS dans un seul fichier." },
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
    39: {
      title: 'Démo finale — Bilan',
      notes: "Message clé : l'IA a fait 80 % du travail technique en quelques minutes, mais les 20 % restants (contenus vrais, vérification, accessibilité, RGPD) restent humains.",
    },
    40: { title: 'Merci !', notes: 'Questions / réponses. Rappeler les bons réflexes : contexte, vérifier, protéger ses données.' },
  },
};
