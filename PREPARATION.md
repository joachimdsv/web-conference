# Préparer la conférence du 6 novembre

Le détail diapo par diapo (ce qu'il faut dire, ce qu'il faut faire, le temps prévu) se trouve dans les notes de la régie
et dans la page imprimable **🖨️ Notes** (`notes.html`). Ce document résume l'essentiel.

---

## 1. Ce qu'il reste à fournir ou à décider

### À fournir (fichiers)
- [x] **Démo 1 (diapo 19) : 3 affiches** : fournies dans `media/` (pas IA = affiche « Jupiter » de la NASA/JPL, 2016, qui a l'air d'une IA ; IA = une affiche de concert très réaliste et une affiche d'événement avec défauts). Sources dans `media/SOURCES.md`. Vous pouvez les remplacer par les vôtres (même noms de fichiers).
- [ ] **Plans B**, si internet ou un outil ne fonctionne pas :
  - l'affiche déjà générée : `media/demo2-affiche.jpg` est en place (titre raté) ; la remplacer la veille par une affiche faite avec ChatGPT si possible ;
  - le budget Excel : `media/budget-famille.xlsx` est prêt (formules, écart en rouge, graphique) ;
  - le site de la MJC : `media/site-mjc/index.html` est prêt (fait avec le même cahier des charges, bandeau « démonstration, informations fictives »). **La veille** : le glisser sur Netlify Drop (app.netlify.com/drop), noter l'adresse obtenue et tester le QR code. Capture d'écran : `media/site-mjc.png` (dans la régie, média « Site (plan B) ») ;
  - le fichier Excel du budget ;
  - le site de la MJC déjà créé **et déjà en ligne**, avec son adresse et une capture d'écran.
- [ ] Copier ces fichiers dans `media/` et décommenter les lignes correspondantes dans `js/deck.js`, ou simplement les glisser dans la régie la veille, sur l'ordinateur de la conférence.

### À vérifier ou à remplacer par de vraies informations
- [x] **Affiche de la démo 2** : événement fictif, la « Fête de la Myrtille » de Saint-Myrtil, samedi 19 juin, 14 h – 22 h.
- [ ] **Activités de la MJC** citées dans le prompt du site (danse, théâtre, musique, informatique, sport) : à remplacer par les vraies.
  Sinon le site contiendra des informations inventées. C'est d'ailleurs un bon exemple à commenter dans la diapo 41.
- [ ] **Couleurs du logo** (rose, violet, bleu, vert, jaune) : à vérifier.
- [ ] **Diapo 41 « Pour essayer chez vous »** : si la MJC propose un atelier numérique, l'annoncer à l'oral, ou me demander de l'ajouter sur la diapo.
- [ ] **Accord de la MJC** pour créer et montrer publiquement un site à son nom pendant la démo.

### La durée : 1 h 30 au total, conférence et débat compris
| Bloc | Durée | Fin prévue |
|---|---|---|
| Ouverture + chapitres 01 et 02 | 20 min | 0:20 |
| Démonstrations + lancement du grand défi (chapitre 03) | 20 min | 0:40 |
| Bonnes pratiques (chapitre 04) | 2 min | 0:42 |
| Impacts et enjeux (chapitre 05) | 11 min | 0:53 |
| Et demain ? | 2 min 30 | 0:55 |
| Pour essayer + résultat du grand défi | 4 min | 0:59 |
| **Débat** | **28 min** | **1:28** |
| Remerciements | 1 min | 1:29 |
| Marge de sécurité | 1 min 30 | 1:30 |

- **Environ 1 h 02 de conférence, puis 25 minutes de débat.** Le minutage de chaque diapo est réaliste (les démos comptent les temps d'attente et les votes). Le chrono de la régie affiche « X min de retard / d'avance » en continu.
- **Toutes les diapos sont dans le déroulé.** Si le temps manque, passez-en une en direct (flèche droite) : les diapos 10 « tokens », 11 « deux étapes » et 17 « usages surprenants » sont les plus faciles à raccourcir ou à sauter.
- **La diapo 43 « Quel futur voulez-vous ? »** lance le débat par un vote à main levée sur 4 futurs possibles (l'outil, le gardien, le frein, le relais), tirés des scénarios de Max Tegmark dans *La Vie 3.0*. La touche R (ou les boutons de la régie) encadre la carte dont on parle. Les notes gardent 4 thèmes de relance (école, travail, planète, MJC) et des conseils d'animation.
- **Inspirations de *La Vie 3.0* (Max Tegmark)** : diapo 5 (l'intelligence, c'est atteindre des objectifs complexes ; intelligente ≠ consciente), diapo 16 (la mer qui monte sur le paysage des compétences), diapo 40 (le danger, c'est la compétence, pas la méchanceté : les fourmis et le barrage), diapo 43 (quel futur voulez-vous ?).
- **4 points de contrôle** (diapos 18, 29, 39 et 41) : leurs notes disent quoi faire en cas de plus de 5 minutes de retard.
- **En cas de retard, c'est le débat qui l'absorbe**, mais il doit commencer **au plus tard à 1 h 09**, pour garder au moins 20 minutes d'échanges. Sinon, couper dans cet ordre :
  1. la diapo 11 « deux étapes » en une phrase : 30 s ;
  2. la démo 4 (Excel) avec un seul prompt : 1 min 30 ;
  3. la démo 5 (langue) sans volontaire : 2 min ;
  4. le résultat du grand défi en une minute, sans mise en ligne : 2 min.
- **En avance ?** Rien ne presse : le débat dispose de plus de temps. Vous pouvez aussi prendre un volontaire pour la démo 5 ou mettre le site du grand défi en ligne avec un QR code.
- **Ne jamais dépasser 1 h 30** : vers 1 h 23, « Encore une ou deux interventions ? ». Remercier vers 1 h 25, et proposer à ceux qui ont encore des questions de venir vous voir après.

---

## 2. Le jour J : check-list matérielle

**La veille**
- [ ] **Sans la régie ?** Projeter `presentation/presentation-finale.pdf` en plein écran (chaque révélation est une page). Les notes à dire sont dans `DISCOURS.md` (à imprimer). Pour les démos en direct, basculer vers la fenêtre du navigateur (Alt+Tab), puis revenir au PDF. Diapo 21 : la page montre l'affiche de secours ; si l'affiche a été refaite la veille, régénérer le PDF.
- [ ] **Affiche de secours (démo 2, diapo 21)** : générer l'affiche de la Fête de la Myrtille avec ChatGPT (prompt « Affiche » de la régie), vérifier que le texte est sans faute, et l'enregistrer à la place de `media/demo2-affiche.jpg` (l'actuelle a un titre raté, « HORCAPLE »).
- [ ] Répétition complète chronométrée, démos comprises.
- [ ] Ouvrir la régie sur l'ordinateur de la conférence et y glisser les médias (ils restent mémorisés dans le navigateur).
- [ ] Se connecter à ChatGPT, Copilot, Claude et Netlify dans Chrome. Vérifier que l'on peut encore générer des images, car les comptes gratuits ont des limites journalières.
- [ ] Imprimer les notes (bouton 🖨️ Notes).

**Sur place, 30 minutes avant**
- [ ] Brancher le projecteur (prévoir l'adaptateur HDMI) et le chargeur.
- [ ] Tester internet. Solution de secours : le partage de connexion du téléphone.
- [ ] Relier le son de l'ordinateur à la sono et tester le son et le mode vocal.
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
| 03 · Démos | Elle crée des images et des textes bluffants… et parfois faux. | Le jeu des affiches : même nous, on se fait avoir. |
| 05 · Enjeux | Ni bonne ni mauvaise : tout dépend de l'usage. Vigilance sur les fausses informations, la vie privée et l'énergie. | L'e-mail avec l'article de loi inventé. |
| 04 · Bonnes pratiques | Bien demander, vérifier, ne rien partager de sensible. | « Parlez-lui comme à un stagiaire très doué qui ne vous connaît pas. » |
| Le grand défi | Lancé à la fin des démos, elle construit le site seule ; on regarde le résultat juste avant le débat : l'humain vérifie et décide. | « L'IA accélère, l'humain valide. » |
| Conclusion | Les 3 choses à retenir, puis l'invitation à essayer. | Commencer par une petite tâche : une recette, un e-mail. |
| Débat | C'est le moment du public : on écoute, on reformule, on relance. | Le vote « Quel futur voulez-vous ? » (diapo 43). |

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

### Les questions qu'on vous posera probablement (pendant le débat)
- **« L'IA va-t-elle remplacer mon métier ? »** Elle remplace surtout des tâches répétitives. Les métiers changent, comme avec l'ordinateur. Ceux qui savent s'en servir auront un avantage.
- **« Que deviennent mes données ? »** Ce que vous écrivez peut être conservé et servir à améliorer l'outil. Dans les réglages, on peut souvent le refuser. Règle simple : n'écrivez rien que vous ne mettriez pas sur une carte postale.
- **« C'est payant ? »** Les versions gratuites suffisent pour commencer. Les versions payantes coûtent environ 20 € par mois et sont plus rapides et plus puissantes.
- **« Comment savoir si un texte ou une image vient d'une IA ? »** Souvent, on ne peut pas en être sûr, et les détecteurs se trompent. Le bon réflexe : vérifier la source.
- **« Est-ce dangereux pour les enfants ? »** Comme internet : accompagner, en parler, expliquer qu'elle peut se tromper. C'est aussi un très bon outil pour réviser.
- **« Est-ce que ça pollue ? »** Oui : les centres de données consomment beaucoup d'électricité et d'eau. Une image ou une vidéo coûte bien plus qu'une question simple. Il faut l'utiliser quand elle apporte vraiment quelque chose.
- **« Laquelle choisir ? »** Pour commencer, peu importe : ChatGPT, Le Chat (française), Gemini et Copilot font très bien l'essentiel.
