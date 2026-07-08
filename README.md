### JavaScript `developer.mozilla.org/fr/docs/Web/JavaScript`


le principe du

En js tout les types de variable sont des objets
NaN Not a number le résultat de cette opération n'est pas un nombre




- **Important !**
    > Le javascript exécute toujours en premier le fil principale avant le fil sécondaire `async`
    > La fonction fléché n'altère pas et ne modifie pas le contexte de `this`

- **Util..**
    > `caniuse.com` pour voir la compatiblité des fonctions js sur les navigateurs
    > `jsdoc.app` la documentation pour écrire les commentaires en javascript
    > `UNDERSCORE.JS` && `lodash` un ensemble d'outils pour travailler avec javascript, `youmightnotneed.com/lodash` nous donne le code lodash en clair
    > `aria` Le standard de l'accessibilité `a11y`
        > `aria tabs html` pour avoir ce qu'on doit mettre en place pour que notre système d'onglets soit accessible
        > `aria modal` !! pour les modals
    > `ecma-international.org` la standardisation javascript
    > `dev.docs.io` une documentation pour tous les technologies
    > `json.org` permet de représenter des données et d'échanger les informations avec une api tiers
    > `json.schema.org` une spécification qui permet de valider un json
    > `roadmap.sh` un cursus pour apprendre un langage
    > `github.com/explore` les projets tendance
    > `business.google.com` Google Ads ou `fr-fr.facebook.com/business/ads` Facebook Ads pour faire de la pub
    > `pagespeed.web.dev` pour voir la vitesse de chargement de notre page
        > `Total Blocking Time` le temps de blocage de notre page lorsqu'il parse le javascript et qu'on ne peut rien faire
    > `lighthouse` !! voir les performances de notre site, disponible via l'inspecteur
    > `hacker news`, `lobsters` les nouveautés sur la programmation et les technologies
    > `smashingmagazine.com` !! tendances web, ux et accessibilité
    > `stackoverflow.com` un forum de programmation
    > `dev.to` un blog collaboratif de devs
    > `hashnode.com` pour des articles et tutos
    > `indiehackers.com` !! sur le hacker
    > `feedly.com` regroupe les sources blogs, news
    > `javascriptweekly.com` les actualités du javascript

- **Outils - Ecosystème node**
    > Le `bundler` permet de combiner plusieurs fichiers en un seule
        > Webpack `webpack.js.org`, Rollup `rollupjs.org`, Vite `vite.dev`, Parcel `parceljs.org`, Rspack `rspack.rs`, Esbuild `esbuild.github.io`, Glup `gulpjs.com`, Swc `swc.rs`
    > !! `linter` !! faire une analyse statique du code
        > Eslint `eslint.org` permet d'éviter les erreurs en amont, de promouvoir de meilleurs pratiques et d'assurer une cohérence en équipe
    > !! `formatter` !! mettre en forme le code
        > Prettier `prettier.io`, Eslint
    > !! `transpiler` transformer un langage en javascript compatible
        > Babel `babeljs.io`, Tsc, Esbuild : Permet de supporter d'anciens navigateurs et d'utiliser des syntaxes alternatives comme typescript, jsx
    > !! `starter kit` !! démarrer rapidement un projet
        > Vite `vite.dev`
    > !! `package manager` !! d'utiliser des librairies tiers
        > Yarn `yarnpkg.com`, Pnpm `pnpm.io`, Npm `npmjs.com`, Bun `bun.com`

- **Volta `volta.sh`** : Permet d'installer node et npm
    > volta install node@18 ou node : Permet aussi de gérer plusieurs version de node
        > .. `npm init` et pour spécifier que dans notre projet on utilise une version de node `volta pin node@18`
- **Insomnia `insomnia.rest`**, **Postman `postman.com`**, **Hoppscotch `hoppscotch.io`**, **Apidog `apidog.com`** pour tester des requêtes d'api

- **Babel**
    > npm install --save-dev @babel/core @babel/cli @babel/preset-env
        > `@babel/core` le cœur de Babel
        > `@babel/cli` pour utiliser babel en ligne de commande
        > `@babel/preset-env` !! transformer le javascript moderne selon l'environnement ciblé
        > `babel-loader` plugin webpack pour exécuter babel
        > `@babel/preset-react` pour react
    > `.babelrc` le fichier de configuration de babel {"presets": ["@babel/preset-env"]}
    > npx babel src --out-dir dist : Pour compiler le code

- **polyfill.io** : Un service qui permet de charger différents polyfill pour notre application, c'est du code js qu'on met avant notre js qui va permettre de rajouter des fonctionalités sur des navigateurs qui ne le supporte pas et on doit éviter d'avoir du polyfill charger sur une page sensible comme celui de paiement

- **Eslint**
    > npm install eslint --save-dev
    > npx eslint --init : Pour générer le fichier de configuration `.eslintrc` et installe aussi l'extension `esLint microsoft` pour analyser le code en live
    > npx eslint . : Permet d'analyser tous les fichiers js de notre code, `--fix` pour corriger le fichier automatiquement
        > npx eslint index.js : Pour analyser un fichier

- **Prettier**
    > npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
        > `prettier` le formateur
        > `eslint-plugin-prettier` pour exécuter prettier comme règle esLint
        > `eslint-config-prettier` !! désactiver les règles esLint en conflit avec prettier
    > La configuration `prettier.config.js`
    > npx prettier --write . : Permet de formater un projet, ou `npx eslint .` pour analyser avec prettier inclus

- Le `CDN` un réseau mondial de serveurs répartis dans plusieurs régions du monde qui permet d'héberger et récupérer des fichiers sur un serveur pour optimiser les performances d'une application
    > Cloudflare, Imgix, BunnyCDN, AWS CloudFront, Google Cloud CDN, Scaleway Object Storage..

- **Library**
    > jquery `jquery.com` : Un framework front javascript, `Jquery Plugins Registry` le catalogue officiel des plugins
        > `jqueryui.com` pour l'interface utilisateur
    > datatables.net, gridjs.io : Pour afficher les tableaux
    > axios-http.com : !! de faire des requêtes ajax
    > tom select `tom-select.js.org` : Permet de faire une selection multiple avec un interface intiutive
    > lightbox : Pour les galleries photos
        > photoswipe.com
        > lightgalleryjs.com
        > fslightbox.com
        > biati-digital.github.io/glightbox
        > feimosi.github.io/baguetteBox.js
        > dbrekalo.github.io/simpleLightbox
        > getuikit.com/docs/lightbox
    > hammer.js : Permet de gérer les gestes tactiles sur les interfaces web
    > dropzone.js `dropzone.dev` : !! gérer le glisser déposer de fichiers pour l'upload
    > slickjs `kenwheeler.github.io/slick`, swipper `swiperjs.com`, glide.js `glidejs.com`, splidejs `splidejs.com`, flickity `flickity.metafizzy.co`, owl carousel 2 : !! du carousel
    > anime.js `animejs.com`, motion `motion.dev`, gsap `gsap.com` : !! l'animation
    > turbolinks, turbo `turbo.hotwired.dev`, swupp `swup.js.org`, barba.js `barba.js.org` : !! d'accélèrer la naviagtion
    > easymde, simplemde `simplemde.com`, alloyeditor `alloyeditor.com`, trumbowyg `alex-d.github.io/Trumbowyg`, ckeditor `ckeditor.com`, tinymce, summernote : Pour un éditeur de texte markdown, pour inclure une image il faut se branché sur leur évènement d'ajout d'image
    > select2 `select2.org`, choices.js `choices-js.github.io/Choices` : !! du design select et checkbox
    > flatpickr `flatpickr.js.org` : Une interface d'affichage et traitement de date
    > canvas-confetti : !! confetti de félicitation
    > flip-toolkit : Un affichage des éléments avec des éffets de rebond
    > nouislider `refreshless.com/nouislider` : !! les champs de type range
    > curtainsjs `curtainsjs.com` : !! un effet de déformation
    > chartjs `chartjs.org`, recharts `recharts.github.io`, d3js `d3js.org` : !! du graphique
    > threejs `threejs.org`, particlesjs 2d `vincentgarreau.com/particles.js` : !! créer des particules 3d
    > vanta.js `vantajs.com` : !! du background animé comme three.js
    > timeago.js : !! le temps relatif
    > moment.js : !! analyser, valider, manipuler et afficher les dates et les heures en javascript
    > cropperjs `fengyuanchen.github.io/cropperjs` : !! cropper une image
    > typed.js `mattboldt.github.io/typed.js` : !! afficher et cacher du text avec une animation
    > dynamics.js : !! animer le svg
    > scriptjs : !! charger du javascript de manière async
    > sweetalert2.github.io : !! des popups élégantes, réactives et hautement personnalisables
    > micromodal.vercel.app : !! modals accessibles `a11y` selon les standards `WAI-ARIA UX` fluide
    > pwstabs : !! onglets accessibles
    > apvarun.github.io/toastify-js, carlosroso.com/notyf, notif.js, toastr : !! créer des notifications `toast`
    > sortablejs.github.io/Sortable, interact.js : !! du `drag n drop` pour créer des listes réordonnables par glisser déposer
    > filepond `pqina.nl/filepond` : !! l'upload d'image avec prévisualisation et redimenssionnement en live
    > codemirror `codemirror.net` : !! créer un éditeur de texte en ligne avec une expérience similaire à un ide
    > micku7zu.github.io/vanilla-tilt.js : !! avoir des éffets de rotation 3d au survol `data-tilt`
    > scrollrevealjs.org, aos `michalsnik.github.io/aos`, perfect-scrollbar : !! faire des animations au scroll

    > @grafikart/drop-files-element : Pour un champ d'uploads de plusieurs fichiers
    > @grafikart/spinning-dots-element : !! loader animée
    > filemanager-element : !! la gestion de fichiers

- **Micro framework backend**
    > fastify `fastify.dev` : Un framework rapide et performant, optimisé pour les api avec json et un faible overhead
    > express.js `expressjs.com` : !! minimaliste et flexible qui permet de créer des api rapidement 
    > hono `hono.dev` : !! idéal pour créer une api léger et rapide, orienté edge computing
    > nestjs `nestjs.com` : !! inspiré par angular, basé sur typescript et idéal pour api et microservices
    > elysia.js `elysiajs.com` : !! inspiré de nest mais hyper rapide et typeScript natif
    > koa.js `koajs.com` : !! conçu par les créateurs d'express, plus moderne avec async/await et middleware modulables
    > foalts `foalts.org` : !! basé sur typeScript
    > hapi.js `hapi.dev` : !! robuste, pour les applications d'entreprise et sécurisée
    > feathers.js `feathersjs.com` : !! pour des microservices, simplifie la création d'api temps réel et REST
    > marko `markojs.com` : !! crée par eBay, SSR + streaming
    > total.js `totaljs.com` : !! permet de faire du websockets, IoT-ready

- **Framework Tout en Un**
    > adonis `adonisjs.com` : Un framework inspiré de laravel et basé sur typescript
    > astro `astro.build` : !! optimisé pour les sites statiques et multi frameworks comme react et vue
    > meteor.js `meteor.com` : !! avec temps réel natif avec synchronisation client-serveur automatique, intégration facile avec mongoDB
    > loopback `loopback.io` : !! api-first, génération automatique de documentation, support openapi, adapté pour microservices
    > sails.js `sailsjs.com` : !! inspiré de ruby on rails, webSocket intégré, ORM intégré `Waterline` et génération d'api rest

- **Framework Front-End**
    > react `fr.react.dev` : Un framework créer par facebook, basé sur les composants et le virtual dom
        > preact `preactjs.com` : Une version plus légère de react
    > vue `vuejs.org` : !! progressif, simple à intégrer, basé sur le modèle `MVVM`, reactive et modulable
    > angular `angular.dev` : !! créer par google, basé sur typescript `g`
        > écosystème : `Angular cli`, `RxJS` programmation réactive, `NgRx` gestion d’état
    > svelte `svelte.dev` : !! compiler qui convertit le code en javascript optimisé, pas de virtual dom
        > écosystème : `SvelteKit` SSR, fullstack et routing natif
    > solid.js `solidjs.com` : !! inspiré par react, basé sur composants réactifs, très rapide mais sans virtual dom
    > ember.js `emberjs.com` : !! idéal pour applications front robustes et utilise la structure `MVC`
    > lit `lit.dev` : !! basé sur web components, léger et moderne, compatible avec tous les frameworks
    > alpine.js `alpinejs.dev` : Permet de dynamisé du code html à travers des attributs pour faire de l'interaction front
        > `alpine ui components` pour des composants alpine
    > htmx `htmx.org` : !! faire des requêtes ajax piloté depuis des attributs html
    > mitosis.js `mitosis.builder.io` : !! génèrer du code multi-framework react, vue, svelte..

- **Framework Front-End qui font du Back-End**
    > next `nextjs.org`, remix `remix.run`, redwoodjs : Pour du rendu côté serveur avec react
    > nuxt : !! côté serveur avec vue
    > svelte
    > qwik `qwik.dev` : !! de la performance et rendu progressif, SSR optimisé

- **Tests** - Par défaut sur windows l'exécution des script n'est pas activé, il faut l'activer dans l'espace développeur
    > Mocha `mochajs.org` : Ne gère que la partie test, on vas pouvoir ensuite branché d'autres modules
        > npm i -D mocha chai : `chai` librarie d'assertion
        > ./node_modules/.bin/mocha test : Ou l'installer de manière globale
        > Type d'affichage
            > mocha -R dot : ...
            > mocha -R nyan : (^-^)
            > mocha -R landing : Un effet d'avion
            > mocha -R list : Une liste non indenté
        > mocha -b : Va s'arrêter quand il y'a une erreur au lieu d'exécuter les autres
        > mocha -g Demo : Permet de lancer un seule test, Demo est le partern du describe
        > mocha -g '#demoevolution' : Permet de lancer un seule test, #demoevolution autre describe dans Demo
        > mocha -g 'should to something' : Permet de lancer un seule test, provient du it
        > mocha init browser(nom dossier) : Test navigateur
    > Jasmine `jasmine.github.io` : Plus complet
        > npm install --save-dev jasmine
            > npx jasmine init : Pour l'initialiser dans notre projet
            > npx jasmine | ./node_modules/.bin/jasmine : Pour exécuter les tests
    > Karma `karma-runner.github.io` : Test multinavigateur, automatise les choses
        > npm i karma
    > Nightwatch.js `nightwatchjs.org` : Test End to End, fonctionnne avec java
        > npm init nightwatch
    > Cypress `cypress.io` : Test Fontionnels
        > npm install cypress --save-dev
    > Sinonjs `sinonjs.org` : Permet de faire des tests
        > npm install sinon

    > Tests code `-`
        > Tests unitaires : Permet de tester une fonction, une classe ou une méthode indépendamment du reste
        > Tests d'intégration : !! tester la combinaison de plusieurs modules ou fonctions
    > Tests fonctionnels `-`
        > Tests end-to-end E2E : !! d'automatiser les actions d'un utilisateur réel clics, remplissage de formulaires, navigation et utilise des outils comme `Cypress`, `Playwright`, `Selenium`
        > Tests d'acceptation : !! de valider que les fonctionnalités répondent aux exigences métiers, parfois écrits avec le client ex BDD avec `Gherkin`, `Behat`, `Cucumber`
    > Tests non-fonctionnels `-` : Permet de vérifier des propriétés non liées directement à la logique métier
        > Tests de performance : !! vérifier la rapidité et la stabilité sous charge avec `JMeter`, `k6`, `Locust`, on peut simuler 1000 utilisateurs pour tester un site
        > Tests de sécurité : !! tester les failles comme XSS, injection SQL, CSRF
        > Tests de compatibilité : !! de vérifier que l’application fonctionne sur différents navigateurs et appareils
        > Tests d’accessibilité : !! que l’application est utilisable par les personnes handicapées avec `axe`, `Lighthouse`

## Modules

**PWA Progressive Web Apps** `web.dev`
- voir `pwa/`
- Permet de faire en sorte que notre application se comporte comme une application native, les pwa se repose sur plusieurs éléments clés :
    > `Capable` : Notre application va avoir des capacités d'une application native, WebRTC, Géolocalisation, Notification psuh, WebGL, Web Assembly
    > La fiabilité : Faire en sorte que l'application fonctionne quelque soit l'état du réseau de l'utilisateur, pour que l'exp utilisateur soit le meilleur possible quand le réseau de l'utilisateur n'est pas dispo en affichant une interface sur lequel on peut lui permettre d'actualisé les contenu ou lui affiché du contenu qu'on a mis en cache précédemment, grâce au service worker
    > `Reliable` : Installable, peut être installer sur l'ordinateur du client via une interface dédié
- Critère du pwa :
    > L'application doit être servi au travers du `https`, dans le cas de localhost il me laisse le faire aussi
    > Inclure un `Web Apps Manifest` fichier json `manisfest.json` qui va contenir des informations qui permettent de représenter notre application et permettre à notre application d'être instalable
        > `start_url` url de démarage, permettra de savoir qu'on a démarrer une pwa, `?source=pwa` pour savoir si on a démarer une pwa
        > `display` l format d'affichage de la fenêtre
            > `standalone` standard
            > `minimal-ui` : Permet d'afficher une interface de navigateur avec un bouton pour revenir en arrière et un bouton pour actualiser
            > `fullscreen` : S'affiche en plein écran
        > `icons` la liste des icônes
        > `name` le nom de l'application
    > On doit enregistrer un service worker avec un handler pour fetch dans `sw.js`
- Pour savoir si notre fichier `manifest.json` est chargé il faut aller dans la partie `Application - Manifest` de l'inspecteur, et on verra qu'il a bien chargé notre manisfest mais avec une alerte qui montre que l'application n'est pas installable car on n'a pas encore enregistrer de service worker `sw.js` qui permet de rendre l'appli fonctionnelle offline, puis après lui avoir indiquer le chemin du `sw.js` dans `index.html` vide, il nous alerte que la page ne fonctionne pas offline







J'ai mis en place la notion du **Progressive Webapp** dans mon application, ensuite dans l'inspecteur je vois : 

```
Richer PWA Install UI won’t be available on desktop. Please add at least one screenshot with the form_factor set to wide.
Richer PWA Install UI won’t be available on mobile. Please add at least one screenshot for which form_factor is not set or set to a value other than wide.
```


Ce sont juste des avertissements informatifs de l'inspecteur (Lighthouse / onglet Application), pas des erreurs bloquantes — ta PWA fonctionne et reste installable normalement. Ça te dit simplement que tu n'as pas droit à la boîte de dialogue d'installation "enrichie" (avec captures d'écran et description, comme dans les stores d'applications) tant que le manifeste ne contient pas de `screenshots` adaptés à chaque format d'écran.

Chrome distingue deux facteurs de forme :
- `"form_factor": "wide"` → utilisé pour l'écran desktop
- pas de `form_factor` (ou `"narrow"`) → utilisé pour mobile

Il te faut donc **au moins une image de chaque catégorie** dans ton `manifest.json` :

```json
{
  "screenshots": [
    {
      "src": "screenshots/desktop-1.png",
      "sizes": "1280x800",
      "type": "image/png",
      "form_factor": "wide",
      "label": "Vue d'accueil sur ordinateur"
    },
    {
      "src": "screenshots/mobile-1.png",
      "sizes": "540x720",
      "type": "image/png",
      "form_factor": "narrow",
      "label": "Vue d'accueil sur mobile"
    }
  ]
}
```

Contraintes à respecter pour chaque image :
- Largeur et hauteur entre **320px et 3840px**
- La plus grande dimension ne doit pas dépasser **2,3× la plus petite** (donc pas de ratio trop extrême, ex. évite du 320×1200)
- Toutes les captures partageant le même `form_factor` doivent avoir le **même ratio d'aspect** entre elles
- Formats acceptés : **JPEG et PNG uniquement**
- Chrome affiche jusqu'à 8 captures max (au-delà, elles sont ignorées)

Pense aussi à ajouter un champ `description` dans le manifeste — recommandé (pas obligatoire) pour que la boîte de dialogue enrichie affiche un vrai texte de présentation en plus des captures.








Le champ `screenshots` dans le manifeste (`manifest.json`) d'une PWA sert à donner un aperçu visuel de ton application **avant l'installation**, un peu comme les captures d'écran qu'on voit sur une fiche d'app dans le Play Store ou l'App Store.

**Ce que ça fait concrètement :**

Sans `screenshots`, quand un utilisateur clique sur "Installer" (ou que le navigateur propose l'installation), il voit juste une petite popup minimaliste avec le nom et l'icône de l'app — peu d'infos pour décider.

Avec `screenshots` (et idéalement `description`), le navigateur affiche une boîte de dialogue enrichie qui montre :
- Le nom et l'icône de l'app
- La description que tu as fournie
- Les captures d'écran, façon carrousel, pour donner un vrai aperçu de l'interface

Ça donne à l'utilisateur un contexte visuel concret sur ce à quoi ressemble l'app, ce qui augmente généralement le taux de conversion à l'installation — exactement le rôle que joue une fiche produit dans un store.

**Pourquoi deux jeux d'images (`wide` / `narrow`) :**

Le navigateur adapte l'aperçu selon l'appareil :
- Sur **desktop**, il affiche les captures marquées `"form_factor": "wide"` (format large, type capture d'écran horizontale d'une interface bureau)
- Sur **mobile**, il affiche celles sans `form_factor` ou marquées `"narrow"` (format vertical, type capture d'écran de téléphone)

C'est pour ça que les deux avertissements que tu avais s'affichaient séparément : il manquait une image pour chaque contexte d'affichage.

**Ce que ce n'est pas :** ce n'est pas la même chose que `icons` (qui définit le logo de l'app pour l'écran d'accueil, la barre des tâches, etc.) — `screenshots` sert uniquement à l'aperçu au moment de l'installation, jamais affiché ailleurs.









**Notification Push** - Le principe est que même si le navigateur du client est fermé il reçoit quand même la notification
- Si le naviagteur est en `Navigation privée` le service `push` ne fonctionne pas ou si on met la préférence `Ne pas concerver l'historique`
- Lorsqu'on envoi une demande de notification depuis notre serveur le système de service va avoir besoin de savoir si c'est nous qui faisons la demande, pour cela on utilise un système de signature avec une cléf privée et une cléf public donc côté serveur on vas devoir générer ces cléfs et on vas utilisé la cléf public au niveau de l'abonnement
    > Node : On a le package `web-push`
    > Php : !! `minishlink/web-push` ou `laravel-notification-channels/webpush`

**State machine** - La machine à état finis permet de décrire notre système comme une série d'état `edit, delete..` on vas pouvoir de créer des transitions qui vont permettre de passer d'un état à un autre 
- Les librairies pour la machine
    > `XState` xstate.js.org : Un package peu lourde
        > npm install xstate
        > Sur le site `xstate.js.org/viz` on peut lui coller notre machine et il va nous afficher un diagramme du processus
    > `Robot` regularhuman.dev : !! plus légère
        > npm install robot3

- **L'inspecteur**
    > L'onglet `Application` pour afficher les informations sur la page courante
        > localStorage - SessionStorage
    > !! `Network` !! et voir les requêtes, reponses, fichiers
        > Au clic sur un fichier
            > `Header` l'en tête de la requête et de la reponse
            > `Payload` les informations qu'on a envoyés au serveur
            > `Preview` l'perçu du retour
            > `Response` la reponse en brut, peut être du code html
            > `Initiator` les informations sur celui qui a fais la demande
            > `Timing` les performances
        > Options
            > `Disable cache` désactive le cache navigateur
            > `Preserve log` si on actualise la page nous garde les requête qui ont été précédement faites sur la page
            > `No throttling` pour simuler un réseau
    > !! `Console` !! d'exécuter du javascript en direct
        > `paramètre - Preserve log` préserver les informations en console même si on actualise la page
        > `CTRL + L` pour néttoyer la console ou cliqué le bouton de vidage
    > !! `Performance` !! d'analyser la performances de notre site
    > !! `Elements` pour analyser la structure html qui a été rendu par le navigateur
        > `Event listeners` pour voir les évènements qui sont sur nos éléments, disponible sur la sidebar de droite
    > !! `Source` donne les sources des fichiers js et css
        > On peut poser des breakpoints pour déboguer du javascript
    > !! `Security` montre les infos sur le certificat SSL, HTTPS..

- **Api open source**
    > `jsonplaceholder.typicode.com` : Une api pour posts, users, comments
    > `reqres.in` : !! pour users, login, register
    > `dummyjson.com` : !! pour produits, users, posts, carts
    > `fakestoreapi.com` : !! pour simuler une boutique en ligne
    > `randomuser.me` : !! pour génèrer des utilisateurs aléatoires
    > `pokeapi.co` : !! pour des pokémon
    > `rickandmortyapi.com`, `morty` : !! pour infos personnages, épisodes
    > `swapi.dev` : !! pour personnages, planètes, vaisseaux
    > `developers.themoviedb.org` : !! pour des films, séries, acteurs
    > `fr.openfoodfacts.org` : !! pour l’alimentation
    > `trefle.io` : !! pour des informations sur tout le monde végétal
    > `developers.giphy.com` : !! pour recupérer des gifs
    > `cloudconvert.com/api/v2` : !! qui permet de faire de multiples actions sur des fichiers

    > `picsum.photos` : !! pour des images aléatoires et placeholder
    > `dog.ceo/dog-api` : !! pour des images aléatoires de chiens
    > `thecatapi.com` : !! pour des images et infos sur les chats

    > `openweathermap.org/api` : !! pour des données météo actuelles et prévisions
    > `weatherapi.com` : !! pour des prévisions météo, historiques
    > `ip-api.com` : !! pour localisation ip, fuseau horaire
    > `coingecko.com/en/api` : !! pour des prix crypto, historiques, infos marché
    > `exchangerate.host` : !! pour des taux d'échange de monnaies
    > `countrylayer.com` : !! pour récupérer tout un tas de données sur les pays du monde entier
    > `countryflags.io` : !! pour afficher le drapeau d'un pays
    > `api.zippopotam.us/fr/33000` : !! qui permet à partir d’un code pays et d’un code postal, de récupérer toutes les informations d’une ville
    > `public-apis.io` : Une liste massive d’api publiques gratuites

## Tools

- **Webpack**
    > npm install --save-dev webpack
        > La caonfiguration `webpack.config.js` et utilise le type `module` dans `package.json`
    > npx webpack : Pour exécuter webpack
    > npx webpack --mode=development : !! ouvrir le serveur de developpement, `--watch` pour observer les changements 
    > npx webpack server --mode=development : !! le serveur de developpement avec `hot-reload`
    > npx webpack --mode=production : !! build

    > `Loaders` un outil que webpack utilise pour transformer un type de fichier avant de l'ajouter au bundle final
        > Babel : Permet de convertir du code js en ES5, aussi de convertir du js moderne en js moins moderne
            > npm i -D babel-plugin-syntax-dynamic-import : Pour le laizy loading `publicPath: './dist/'` dans le output
        > css-loader : !! d'interprêter le css ou le convertir en chaine de caractère
        > style-loader : !! d'ajouter le css dans la page
        > url-loader : !! a webpack de traiter les url, fait du base64
        > file-loader : Pratique sur les fonts L'ajoute dans le fichier css minifié
        > Assets module : !! de regrouper url et file dans webpack 5

    > `Plugins` permet d'ajouter des fonctionnalités globales au processus de build
        > terser-webpack-plugin : Permet de minifier le fichier js
        > MiniCssExtractPlugin : !! d'extraire le css
        > CssMinimizerWebpackPlugin : !! de minimiser le css
        > webpack-manifest-plugin : !! de générer un json qui le nom des fichier hasher
        > clean-webpack-plugin : !! de nottoyer le dossier de distribution avant de construire
        > image-minimizer-webpack-plugin : !! de minifier les images
        > eslint-webpack-plugin : !! de vérifier du code javascript

- **Vite**
    > npm create vite@latest
    > npm run dev : Pour ouvrir le serveur de developpement
    > npm run build : !! build le projet
    > npm run preview : !! pouvoir tester la version build
    > npm install -D sass : !! utiliser sass
    > `vitest.dev` pour faire des tests avec vite
    > On.. charger les fichiers de manière async `src/vite/app.js` dans ce cas si on build il va détecter qu'on a ce `counter.js` et il va séparer en 2 fichiers différents
    > !! utiliser `.env` et `.env.production`, les variables doivent être préfixer par `VITE_` et pour l'importer `import.meta.env.VITE_API_ENDPOINT`, en dev charge `.env` et en build charge `.env.production` sinon undifined
    > !! importer du `jpg` dans ce cas l'import contiendra le chemin du jpg, du `json` sera convertir sous forme d'objet js, aussi du css en mode dev il importer sur la page en prod il extrait dans fichier css séparé
    > Sur un projet existant `npm install -D vite`
        > script type module `localhost:5173/assets/main.js`
        > script type module `localhost:5173/@vite/client` pour avoir le hotereload
    > Pour charger l'url des images à partir du assets de dev il faut un fichier `vite.config.js`, on peut mettre en cache le manifest lors du chargement dans notre `base.php`
        > `manifest`.. php json_decode(file_get_contents('./assets/manifest.json'), true) - $manifest['assets/main.js']['file'] type module

- **Browser-sync** : Permet de synchroniser un navigateur pendant le développement `browsersync.io`
    > ..rafraîchir automatiquement la page quand on modifie notre code `hot reload`
    > ..synchroniser plusieurs navigateurs ou appareils en même temps
- npm install -g browser-sync
    > browser-sync start --server --files "index.html, css/*.css, js/*.js" : Pour cibler un index
        > `--server` démarre un petit serveur web local
        > `--files` surveille les fichiers listés, et recharge la page s’ils changent
    > browser-sync ./ --files "*.css" --files "*.html" --files "*.js" : Pour cibler plusieurs index
- La configuration `bsconfig.js`
    > browser-sync start --config bs-config.js
- Le `mode proxy` quand on a déjà un serveur 
    > browser-sync start --proxy "localhost:8000" --files "templates/*.html, static/css/*.css" : Va agir comme un proxy devant notre serveur existant et rajoute le rechargement auto

- **Uglifyjs** : Permet de minifier un fichier javascript ou css
    > npm install -g uglify-js
        > uglifyjs chemin/script.js -o chemin/script-min.js : Pour minifier un fichier
        > uglifyjs chemin/script.js chemin/script.js chemin/script.js > chemin/script-min.css : !! plusieurs fichier en un seul
    > Les options courantes
        > `--c` ou `--compress` permet d'activer les options de compression
        > `-m` ou `--mangle` !! de renommer les variables et les fonctions pour des noms plus courts
        > `--mangle-props` !! de renommer les propriétés des objets
        > `-o` ou `--output` !! de spécifier le fichier de sortie
    > ex: uglifyjs chemin/script.js -c -m -o  chemin/script-min.js

    > npm install -g uglifycss
        > uglifycss chemin/style.css > chemin/style-min.css : Pour minifier un fichier
        > uglifycss chemin/style.css chemin/style.css chemin/style.css > chemin/style-min.css : !! plusieurs fichier en un seul
    > Les options courantes
        > `--max-line-len` permet de spécifier la longeur maxiamle des lignes dans le fichier minifié
        > `--expand-vars` !! de développer les variables Css
        > `--ugly-comments` !! de conserver uniquement les commentaires importants
    > ex: uglifycss --max-line-len 80 --expand-vars chemin/style.css > chemin/style-min.css

## Framework

**Astro** : Permet d'avoir des pages qui utilise du js et d'autre qui sont seulement du html `astro.build`
- npm run astro add react : Pour intégrer un framework
- On.. une extension `astro` sur vscode
- Counter `client:load` pour qu'il le rend dynamique sinon il va rendre seulement l'html
    > `client:idle` pour les composants de second niveau, il va attendre que le navigateur ne soit pas occupé pour charger le composant
    > `client:visible` !! avoir un chargement que quand le composant est visible
    > `client:only` sont des composants qui ne vont pas être rendu au moment du rendu html, on aura que le rendu côté client
    > `client:media` !! avoir le rendu en fonction du média query qu'on vas spécifier
- *Le routing se fait côté serveur, on peut avoir des routes dynamiques voir doc - SSR voir doc - Si on mais du css dans une page elle sera scopper immédiatement, ne se mélange au css globale* - *const todos = await fetch().then(r => r.json()) -- Pas bsoin d'être dans une fonction - {todos.map()}*

**Adonis**
- npm init adonisjs@latest adonis
    > Type de projet [web]
        > `Api` pour une partie api, n'inclus pas les vues..
        > `Web` application web, inclus tous comme les vues, la connexion à la base de données..
- npm run dev
- On.. une extension `edge` sur vscode
- Route `start/routes.ts`, View `resources/views`
    > node ace make:controller Blog : Permet de créer un controller





























Bonne question 👍
npm update est souvent mal compris, donc voici une explication claire, précise et pratique.


---

📦 Que fait exactement npm update ?

👉 npm update met à jour les dépendances NPM… mais seulement dans certaines limites.


---

1️⃣ Ce que npm update FAIT ✅

🔹 Il met à jour :

Les packages listés dans package.json

Dans la plage de versions autorisée (^, ~, etc.)

En respectant package-lock.json


📌 Exemple :

"vite": "^5.0.0"

➡️ npm update peut passer de :

5.0.1 → 5.4.3

❌ mais PAS :

5.x → 6.x


---

2️⃣ Ce que npm update NE FAIT PAS ❌

🚫 Il ne met PAS à jour :

Les versions majeures

Les dépendances hors plage autorisée

Les dépendances non installées

Les dépendances supprimées du package.json


🚫 Il ne modifie PAS :

Les contraintes dans package.json

Les packages globaux (npm -g)



---

3️⃣ Différence entre npm update et npm install

Commande Effet

npm install Installe selon package.json + lock
npm update Met à jour dans les limites autorisées
npm install pkg@latest Force la dernière version
npm install (sans lock) Recalcule toutes les versions



---

4️⃣ Impact sur les fichiers

🔄 package-lock.json

✔️ Mis à jour si une version plus récente est trouvée

❌ package.json

❌ Jamais modifié par npm update


---

5️⃣ Exemple concret

Avant

"axios": "^1.4.0"

npm update

Après

axios 1.6.2  ✅


---

6️⃣ Mettre à jour vers les dernières versions (y compris majeures)

👉 npm update ne suffit pas

Solution 1 : paquet par paquet

npm install vite@latest

Solution 2 : outil dédié

npx npm-check-updates -u
npm install


---

7️⃣ Quand utiliser npm update ? 👍

✔️ Corrections de bugs
✔️ Mises à jour sécurité
✔️ CI / maintenance
✔️ Sans risque de breaking change majeur


---

8️⃣ Quand NE PAS l’utiliser ? ⚠️

🚫 Pour une montée majeure
🚫 Quand tu veux changer volontairement de version
🚫 Sans tests (sur gros projets)


---

9️⃣ Résumé ultra court

> npm update = mise à jour sûre dans les limites définies par package.json




---

🧠 Comparaison rapide avec Composer

npm composer

npm update composer update
package.json composer.json
package-lock.json composer.lock



---

Si tu veux, je peux :

Analyser ton package.json

Te dire quels packages vont être mis à jour

T’expliquer ^, ~, * en détail

Comparer avec yarn / pnpm


Dis-moi 👌









Parfait, allons droit au but 👌
npm update ne permet PAS une mise à jour majeure, donc voici les bonnes méthodes pour passer à une version majeure (ex: Vite 5 → 6).


---

🔼 Mettre à jour vers une version MAJEURE avec npm

🥇 Méthode recommandée : npm install @latest

👉 La plus simple et la plus utilisée

npm install vite@latest

Ou plusieurs packages :

npm install vite@latest @vitejs/plugin-vue@latest

✔️ Met à jour vers la dernière version (majeure incluse)
✔️ Met à jour package-lock.json
✔️ Met à jour la version dans package.json


---

🥈 Méthode propre pour tout mettre à jour : npm-check-updates

👉 Idéal pour gros projets

Installer (sans installation globale)

npx npm-check-updates

Voir ce qui peut être mis à jour

npx npm-check-updates

Mettre à jour les versions majeures

npx npm-check-updates -u '/.*/'
npm install

📌 Ça modifie package.json, puis réinstalle tout.


---

🥉 Méthode ciblée (une version précise)

npm install vite@6.0.0


---

1️⃣ Vérifier les breaking changes (IMPORTANT)

Avant / après une version majeure :

npm outdated

Et consulter :

CHANGELOG.md

BREAKING CHANGES

Documentation officielle



---

2️⃣ Nettoyage recommandé après upgrade majeur

rm -rf node_modules package-lock.json
npm install

💡 Évite les conflits de dépendances.


---

3️⃣ Exemple réel : Vite 5 → Vite 6

npm install vite@latest
npm install
npm run dev

Si erreur :

Adapter vite.config.js

Vérifier plugins (vite-plugin-symfony, Vue, React)



---

4️⃣ Différence clé avec npm update

Objectif Commande

Patch / mineur npm update
Majeur (1 package) npm install pkg@latest
Majeur (tout) npx npm-check-updates -u



---

5️⃣ Bonnes pratiques avant upgrade majeur

✅ Commit Git
✅ Lire changelog
✅ Mettre à jour un package à la fois
✅ Tester (npm run dev, npm run build)


---

✅ Résumé ultra clair

> 🔴 npm update ❌
🟢 npm install package@latest ✅
🟢 npm-check-updates ✅




---

Si tu veux, je peux :

Te guider package par package

Analyser un package.json

Vérifier la compatibilité Symfony + Vite

T’aider à corriger les erreurs post-upgrade


Dis-moi 👍








Très bonne question 👍
Les signes de version (^, ~, >, >=, *, etc.) viennent du SemVer (Semantic Versioning) et sont cruciaux pour comprendre npm (et Composer).

Je t’explique simplement, avec des exemples concrets.


---

🧠 Rappel : SemVer (x.y.z)

MAJEURE . MINEURE . PATCH

Exemple :

2.5.3

2 → version majeure (breaking changes)

5 → version mineure (nouvelles fonctionnalités)

3 → patch (bugs)



---

🔣 Les signes de version (npm)

1️⃣ ^ (caret) → le plus courant

👉 Autorise les mises à jour non breaking

"vite": "^5.0.0"

✔️ Autorisé :

5.0.1
5.3.2
5.9.0

❌ Interdit :

6.0.0

📌 Règle :

^x.y.z  →  x.*.*

⚠️ Cas particulier :

"lib": "^0.3.2"

➡️ Autorisé :

0.3.3

❌ Pas :

0.4.0


---

2️⃣ ~ (tilde) → plus strict

👉 Autorise seulement les PATCH

"axios": "~1.4.0"

✔️ Autorisé :

1.4.1
1.4.9

❌ Interdit :

1.5.0

📌 Règle :

~x.y.z → x.y.*


---

3️⃣ Sans signe (version figée)

"vue": "3.4.2"

✔️ Toujours cette version
❌ Jamais de mise à jour


---

4️⃣ * (joker total)

"lodash": "*"

✔️ Tout est autorisé
❌ Très dangereux ❌

🚫 À éviter en production.


---

5️⃣ >= et <= (comparaisons)

"node-fetch": ">=3.2.0"

✔️ 3.2.0 et plus
❌ Aucune limite haute → risqué


---

6️⃣ Intervalles

"react": ">=18.2.0 <19.0.0"

✔️ Très précis
✔️ Utilisé par les libs


---

7️⃣ || (OU)

"pkg": "^5.0 || ^6.0"

✔️ Autorise 5.x ou 6.x


---

📦 Impact avec npm

Signe npm install npm update

^ Dernière mineure Dernière mineure
~ Dernier patch Dernier patch
Figé Version exacte Jamais
* Dernière version Dernière version



---

🧠 Comparaison avec Composer (Symfony)

npm Composer

^1.2.0 ^1.2
~1.2.0 ~1.2
>=1.2 >=1.2



---

✅ Bonnes pratiques

✔️ Dépendances applicatives → ^
✔️ Librairies sensibles → ~
✔️ Éviter *
✔️ Toujours garder package-lock.json


---

🎯 Résumé express

^  → mineures + patch
~  → patch seulement
*  → tout


---

Si tu veux, je peux :

Analyser ton package.json

Te dire exactement ce que npm update fera

T’aider à choisir les bons signes

Comparer avec yarn / pnpm


Dis-moi 👌















# ❌ **1. Une clé privée NE DOIT JAMAIS être exposée dans du JavaScript**


Metabase : Des outils d'analyse open source qui répondent
Permettez à votre équipe et à vos clients d'interagir avec vos données, d'effectuer des requêtes en langage naturel et d'explorer grâce à des outils d'IA. Connectez-vous à votre base de données en quelques minutes pour des analyses fluides et rapides.








npm install @orchidjs/sifter : Une bibliothèque permettant la recherche textuelle de tableaux et de tables de hachage d'objets par propriété (ou plusieurs propriétés). Conçue spécifiquement pour la saisie semi-automatique.
    @orchidjs/unicode-variants : Un petit utilitaire pour comparer des chaînes de caractères avec des variantes Unicode













1. hhh
    - Liste
----
[Graiflart](https://..) Ou [Graiflart][1] qui redirige vers le lien
[1]: 'https://..'
![Raton](http..image)
~~Texte barré~~

| Nom | Prenom |
| ---  | --- |
| Adama | Ba |

```mermaid -- Pour les diagrammes

```






/*

const checkAll     = document.getElementById('checkAll')
const selectionBar = document.getElementById('selectionBar')
const selCount     = document.getElementById('selCount')
const btnPrintLabel= document.getElementById('btnPrintLabel')
const btnBatchPrint= document.getElementById('btnBatchPrint')
const btnDeselect  = document.getElementById('btnDeselect')
const btnSelectAll = document.getElementById('btnSelectAll')
const printError   = document.getElementById('printError')

const totalRows = () => document.querySelectorAll('tbody tr').length
const rowCbs    = () => document.querySelectorAll('.row-cb')
const checkedCbs= () => document.querySelectorAll('.row-cb:checked')

function updateState() {
  const total   = totalRows()
  const checked = checkedCbs().length

  checkAll.checked       = checked === total && total > 0
  checkAll.indeterminate = checked > 0 && checked < total

  selectionBar.classList.toggle('visible', checked > 0)
  selCount.textContent = checked === 1
    ? '1 ticket sélectionné'
    : `${checked} tickets sélectionnés`
  btnPrintLabel.textContent = checked <= 1
    ? 'Imprimer le ticket'
    : `Imprimer les ${checked} tickets`

  btnSelectAll.textContent = (checked === total && total > 0)
    ? 'Désélectionner tout'
    : 'Sélectionner tout'
}

function getSelectedIds() {
  return [...checkedCbs()].map(cb => cb.closest('tr').dataset.id)
}

rowCbs().forEach(cb => {
  cb.addEventListener('change', () => {
    cb.closest('tr').classList.toggle('sel', cb.checked)
    updateState()
  })
})

checkAll.addEventListener('change', () => {
  rowCbs().forEach(cb => {
    cb.checked = checkAll.checked
    cb.closest('tr').classList.toggle('sel', cb.checked)
  })
  updateState()
})

btnDeselect.addEventListener('click', () => {
  rowCbs().forEach(cb => { cb.checked = false; cb.closest('tr').classList.remove('sel') })
  updateState()
})

btnSelectAll.addEventListener('click', () => {
  const allChecked = checkedCbs().length === totalRows()
  rowCbs().forEach(cb => {
    cb.checked = !allChecked
    cb.closest('tr').classList.toggle('sel', !allChecked)
  })
  updateState()
})

btnBatchPrint.addEventListener('click', async () => {
  const ids = getSelectedIds()
  if (!ids.length) return

  btnBatchPrint.disabled = true
  btnBatchPrint.innerHTML = '<div class="spinner"></div> Génération…'
  printError.classList.remove('visible')

  try {
    const res = await fetch('/ticket/batch/print', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids })
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.detail ?? 'Erreur lors de la génération du PDF')
    }

    const blob = await res.blob()
    const url  = URL.createObjectURL(blob)
    window.open(url, '_blank')
    setTimeout(() => URL.revokeObjectURL(url), 10_000)

    rowCbs().forEach(cb => { cb.checked = false; cb.closest('tr').classList.remove('sel') })
    updateState()

  } catch (err) {
    printError.textContent = err instanceof Error ? err.message : 'Erreur inconnue'
    printError.classList.add('visible')
  } finally {
    btnBatchPrint.disabled = false
    btnBatchPrint.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg><span id="btnPrintLabel">Imprimer le ticket</span>`
  }
})

document.querySelectorAll('[data-delete-url]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation()
    if (!confirm('Supprimer ce ticket ?')) return
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = btn.dataset.deleteUrl
    const input = document.createElement('input')
    input.type = 'hidden'; input.name = '_method'; input.value = 'DELETE'
    form.appendChild(input)
    document.body.appendChild(form)
    form.submit()
  })
})

let openMenu = null

document.querySelectorAll('.ctx-trigger').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation()
    const menu = btn.nextElementSibling
    const isOpen = menu.classList.contains('open')
    closeAll()
    if (!isOpen) { menu.classList.add('open'); openMenu = menu }
  })
})

function closeAll() {
  document.querySelectorAll('.row-ctx-menu.open').forEach(m => m.classList.remove('open'))
  openMenu = null
}

document.addEventListener('click', closeAll)
document.querySelectorAll('.row-ctx-menu').forEach(m => m.addEventListener('click', e => e.stopPropagation()))
*/














Les View Transitions de Chrome permettent des animations fluides entre les navigations. Dans ton stack Symfony/Twig c'est simple à mettre en place.

**Deux niveaux d'implémentation :**

---

**Niveau 1 — Transitions entre pages (navigation classique)**

Dans `base.html.twig`, ajouter dans le `<head>` :

```html
<meta name="view-transition" content="same-origin"/>
```

Et dans ton CSS global :

```css
/* Transition par défaut sur toute la page */
@view-transition {
    navigation: auto;
}
```

C'est tout pour le minimum — Chrome applique automatiquement un crossfade entre les pages. Aucun JS requis.

---

**Niveau 2 — Transitions ciblées sur des éléments spécifiques**

Pour animer un élément précis (ex: une card qui s'agrandit vers la page show), donner un `view-transition-name` unique à l'élément sur les deux pages :

```twig
{# Sur la page index — card du voyage #}
<div style="view-transition-name: voyage-{{ v.id }}">
    {{ v.provenance }} → {{ v.destination }}
</div>

{# Sur la page show — même élément #}
<div style="view-transition-name: voyage-{{ voyage.id }}">
    {{ voyage.provenance }} → {{ voyage.destination }}
</div>
```

Chrome fait automatiquement l'animation morphing entre les deux.

---

**Niveau 3 — Personnaliser les animations**

```css
/* Personnaliser l'animation d'entrée/sortie */
::view-transition-old(root) {
    animation: 200ms ease-out fade-out;
}

::view-transition-new(root) {
    animation: 200ms ease-in fade-in;
}

@keyframes fade-out {
    to { opacity: 0; }
}

@keyframes fade-in {
    from { opacity: 0; }
}

/* Pour un élément spécifique */
::view-transition-old(voyage-4) {
    animation: 300ms ease-out slide-out;
}
```

---

**Niveau 4 — Avec les navigations React UX (Turbo/fetch)**

Si tu utilises Turbo Symfony (Stimulus/UX), les View Transitions s'intègrent via :

```js
// Dans ton app.js
import { startViewTransition } from '@hotwired/turbo'

document.addEventListener('turbo:before-render', (event) => {
    if (!document.startViewTransition) return
    event.preventDefault()
    document.startViewTransition(() => event.detail.resume())
})
```

---

**Compatibilité** — View Transitions sont supportées nativement dans Chrome 111+, Edge 111+, et Safari 18+. Pour Firefox, un polyfill existe mais la fonctionnalité reste progressive — si le navigateur ne supporte pas, la navigation se fait normalement sans animation.

Le minimum utile pour ton app est les niveaux 1 + 2 — ça donne déjà un résultat très propre sans aucun JS supplémentaire.