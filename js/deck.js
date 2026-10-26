/*
 * Configuration de la présentation.
 * ---------------------------------------------------------------
 * - slideCount / image()  : où trouver les images des diapos (générées depuis le PDF)
 * - media                 : vidéos / images fournies avec le site (dossier media/)
 * - slides[n]             : réglages par diapo (n commence à 1)
 *     title    : titre court (affiché dans la régie et la télécommande)
 *     notes    : notes de l'orateur (modifiables aussi depuis la régie)
 *     media    : ids de médias proposés en raccourci sur cette diapo
 *     elements : éléments interactifs posés sur la diapo, révélés en direct
 *        rect    : [gauche, haut, largeur, hauteur] en % de la diapo
 *        type    : 'answer' (cadre + étiquette révélée) ou 'zone' (emplacement pour une image / vidéo)
 *        choices : étiquettes possibles pour 'answer' ; answer = index de la bonne réponse
 *        pill    : 'bottom' pour placer l'étiquette en bas au centre (sinon à droite)
 */
window.DECK = {
  title: "L'intelligence artificielle",
  subtitle: "Conférence · MJC du Val d'Ajol · 06/11/2026",
  slideCount: 32,
  image: (n) => `slides/slide-${String(n).padStart(2, '0')}.jpg`,
  thumb: (n) => `slides/thumbs/slide-${String(n).padStart(2, '0')}.jpg`,
  durationMinutes: 60,

  // Médias livrés avec le site : déposez vos fichiers dans media/ puis déclarez-les ici.
  // Exemple : { id: 'turing', name: 'Le test de Turing', src: 'media/turing.mp4' }
  // Les liens YouTube fonctionnent aussi : { id: 'yt', name: 'Démo', src: 'https://youtu.be/xxxx' }
  media: [],

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
    19: { title: 'Démo n°1 — Texte', notes: 'Bouton « Partager une fenêtre » (onglet Outils) pour montrer le chatbot sans quitter la présentation.' },
    20: { title: 'Démo n°2 — Image', notes: 'Générer l\'image, la copier puis Ctrl+V dans la régie pour l\'afficher en grand.' },
    21: {
      title: 'Jeu — Vraie photo ou IA ?',
      notes: 'Glisser deux images dans la médiathèque, les placer dans les zones A et B, faire voter, puis révéler.',
      elements: [
        { id: 'A', type: 'zone', label: 'Image A', rect: [7.8, 31.5, 26.1, 42.6] },
        { id: 'B', type: 'zone', label: 'Image B', rect: [35.7, 31.5, 26.0, 42.6] },
        { id: 'rA', type: 'answer', label: 'Réponse A', rect: [7.8, 31.5, 26.1, 42.6], choices: ['📸 Vraie photo', '🤖 Image IA'], answer: 1, pill: 'bottom' },
        { id: 'rB', type: 'answer', label: 'Réponse B', rect: [35.7, 31.5, 26.0, 42.6], choices: ['📸 Vraie photo', '🤖 Image IA'], answer: 0, pill: 'bottom' },
      ],
    },
    22: { title: 'Chapitre 04 — Impacts', notes: '' },
    23: { title: 'Opportunités / risques', notes: '' },
    24: { title: 'Questions éthiques', notes: '' },
    25: { title: 'Qui décide des règles ?', notes: 'AI Act : entré en vigueur en 2024, application progressive.' },
    26: { title: 'Productivité', notes: '' },
    27: { title: 'Chapitre 05 — Bonnes pratiques', notes: '' },
    28: { title: 'Le bon prompt', notes: 'Contexte + tâche + format. Montrer un avant/après si le temps le permet.' },
    29: { title: 'Esprit critique', notes: '' },
    30: { title: 'À faire / à éviter', notes: '' },
    31: { title: 'Et demain ?', notes: 'Question ouverte au public.' },
    32: { title: 'Merci !', notes: 'Questions / réponses.' },
  },
};
