# Préparer la conférence du 6 novembre

Le détail diapo par diapo (ce qu'il faut dire, ce qu'il faut faire, le temps prévu) se trouve dans les notes de la régie
et dans la page imprimable **🖨️ Notes** (`notes.html`). Ce document résume l'essentiel.

---

## 1. Ce qu'il reste à fournir ou à décider

### À fournir (fichiers)
- [ ] **Démo 1 (diapo 21) : 3 images**, toutes au même format (carré ou presque) et sur un même thème pour que la comparaison soit juste :
  - une **vraie photo** (idéalement prise par vous au Val d'Ajol, sans personne reconnaissable) ;
  - une **image d'IA réussie** sur le même sujet ;
  - une **image d'IA ratée** : demandez une scène avec des mains, du texte (une enseigne) ou une foule, ce sont les défauts les plus visibles.
- [ ] **Démo 3 (diapo 24) : 2 vidéos** de 5 à 15 secondes, en .mp4, sur le même thème (une rivière, un chat, une rue…) : une filmée, une générée (Sora, Veo, Kling…).
- [ ] **Plans B**, si internet ou un outil ne fonctionne pas :
  - l'affiche déjà générée ;
  - le fichier Excel du budget ;
  - le site de la MJC déjà créé **et déjà en ligne**, avec son adresse et une capture d'écran.
- [ ] Copier ces fichiers dans `media/` et décommenter les lignes correspondantes dans `js/deck.js`, ou simplement les glisser dans la régie la veille, sur l'ordinateur de la conférence.

### À vérifier ou à remplacer par de vraies informations
- [ ] **Date de l'affiche** : « samedi 20 juin, 14 h – 22 h » est un exemple inventé. Mettez une vraie date d'événement de la MJC, dans la diapo 23 (`slides-src/demos.html`) et dans le prompt (`js/deck.js`).
- [ ] **Activités de la MJC** citées dans le prompt du site (danse, théâtre, musique, informatique, sport) : à remplacer par les vraies.
  Sinon le site contiendra des informations inventées. C'est d'ailleurs un bon exemple à commenter dans la diapo 40.
- [ ] **Couleurs du logo** (rose, violet, bleu, vert, jaune) : à vérifier.
- [ ] **Diapo 42 « Pour essayer chez vous »** : si la MJC propose un atelier numérique, l'annoncer à l'oral, ou me demander de l'ajouter sur la diapo.
- [ ] **Accord de la MJC** pour créer et montrer publiquement un site à son nom pendant la démo.

### À décider : la durée
Le minutage prévu fait **environ 64 minutes hors questions**, pour un créneau annoncé d'une heure. Selon le temps réel :
- **Créneau de 1 h 30** : tout passe, avec 20 minutes de questions.
- **Créneau d'1 h strict** : sauter les diapos marquées 🔸 (10 « tokens », 11 « deux étapes », 17 « usages surprenants », soit environ 2 min 30), faire **une seule** des démos 5 et 6 (environ 3 min), et limiter la démo finale à une seule amélioration (environ 3 min).
- Le chrono de la régie affiche « X min de retard / d'avance » par rapport à ce minutage : un coup d'œil suffit pour savoir s'il faut couper.

---

## 2. Le jour J : check-list matérielle

**La veille**
- [ ] Répétition complète chronométrée, démos comprises.
- [ ] Ouvrir la régie sur l'ordinateur de la conférence et y glisser les médias (ils restent mémorisés dans le navigateur).
- [ ] Se connecter à ChatGPT, Copilot, Claude et Netlify dans Chrome. Vérifier que l'on peut encore générer des images, car les comptes gratuits ont des limites journalières.
- [ ] Imprimer les notes (bouton 🖨️ Notes).

**Sur place, 30 minutes avant**
- [ ] Brancher le projecteur (prévoir l'adaptateur HDMI) et le chargeur.
- [ ] Tester internet. Solution de secours : le partage de connexion du téléphone.
- [ ] Relier le son de l'ordinateur à la sono et tester une vidéo et le mode vocal.
- [ ] Activer le mode « Ne pas déranger » et fermer les onglets et applications personnels : **le partage de fenêtre montre tout ce qui s'y trouve**.
- [ ] Agrandir l'affichage du chatbot (Ctrl + « + », 125 à 150 %) pour qu'il soit lisible au fond de la salle.
- [ ] Ouvrir l'écran public, cliquer dedans (plein écran et son), scanner la télécommande avec le téléphone.
- [ ] Lancer le chrono au début de la conférence (touche T).

---

## 3. Ce qu'il faut dire, dans les grandes lignes

**Le fil rouge** : *« L'IA est un outil puissant, déjà partout, qui se trompe parfois avec assurance. Bien utilisée, elle fait gagner du temps ; c'est à nous de garder la main. »*

| Partie | L'idée à faire passer | Une image pour l'expliquer simplement |
|---|---|---|
| Ouverture | Pas besoin d'être informaticien : on va comprendre, voir et essayer. | Le brise-glace à main levée. |
| 01 · Qu'est-ce que l'IA ? | Elle n'est pas intelligente comme nous : elle repère des régularités dans des milliards d'exemples et devine la suite la plus probable. | Un perroquet ultra doué qui aurait lu toute une bibliothèque. « Le chat est sur le… tapis ! » |
| 02 · Au quotidien | Vous l'utilisez déjà sans le savoir. | Une journée type : GPS, clavier du téléphone, anti-spam, Netflix. |
| 03 · Démos | Elle crée des images, des vidéos et des textes bluffants… et parfois faux. | Le jeu des images et des vidéos : même nous, on se fait avoir. |
| 04 · Enjeux | Ni bonne ni mauvaise : tout dépend de l'usage. Vigilance sur les fausses informations, la vie privée et l'énergie. | L'e-mail avec l'article de loi inventé. |
| 05 · Bonnes pratiques | Bien demander, vérifier, ne rien partager de sensible. | « Parlez-lui comme à un stagiaire très doué qui ne vous connaît pas. » |
| 06 · Démo finale | Elle fait le gros du travail en quelques minutes ; l'humain vérifie et décide. | « L'IA accélère, l'humain valide. » |
| Conclusion | Les 3 choses à retenir, puis l'invitation à essayer. | Commencer par une petite tâche : une recette, un e-mail. |

### Des mots simples pour tous les publics
| Au lieu de… | Dites plutôt… |
|---|---|
| prompt | « la demande qu'on écrit à l'IA » |
| hallucination | « elle invente, avec beaucoup d'assurance » |
| modèle, LLM, algorithme | « le programme », « la machine » |
| tokens | « des petits morceaux de mots transformés en nombres » (ou sauter la diapo) |
| code HTML / CSS | « la langue dans laquelle sont écrits les sites internet » |
| données d'entraînement | « tous les exemples qu'on lui a montrés » |
| hébergement, nom de domaine | « l'endroit où le site est rangé » et « son adresse » |

### Les questions qu'on vous posera probablement
- **« L'IA va-t-elle remplacer mon métier ? »** Elle remplace surtout des tâches répétitives. Les métiers changent, comme avec l'ordinateur. Ceux qui savent s'en servir auront un avantage.
- **« Que deviennent mes données ? »** Ce que vous écrivez peut être conservé et servir à améliorer l'outil. Dans les réglages, on peut souvent le refuser. Règle simple : n'écrivez rien que vous ne mettriez pas sur une carte postale.
- **« C'est payant ? »** Les versions gratuites suffisent pour commencer. Les versions payantes coûtent environ 20 € par mois et sont plus rapides et plus puissantes.
- **« Comment savoir si un texte ou une image vient d'une IA ? »** Souvent, on ne peut pas en être sûr, et les détecteurs se trompent. Le bon réflexe : vérifier la source.
- **« Est-ce dangereux pour les enfants ? »** Comme internet : accompagner, en parler, expliquer qu'elle peut se tromper. C'est aussi un très bon outil pour réviser.
- **« Est-ce que ça pollue ? »** Oui : les centres de données consomment beaucoup d'électricité et d'eau. Une image ou une vidéo coûte bien plus qu'une question simple. Il faut l'utiliser quand elle apporte vraiment quelque chose.
- **« Laquelle choisir ? »** Pour commencer, peu importe : ChatGPT, Le Chat (française), Gemini et Copilot font très bien l'essentiel.
