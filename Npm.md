### NPM - Gestionnaire de dépendance

- npm init -y : Initialiser npm, `-y` repond oui à toutes les questions
- npm install package : Installer une dépendance, `npm i` raccourci
- npm install --save-dev package : Installer en dépendance de developpement
- npm i --global package : Installer une dépendance globalement
- npm uninstall|remove package : Désinstaller une dépendance
- npm update : Mettre à jour toues les dépendances, `react@18.3.1` ex pour une seule
- npm cache clean --force : Pour nettoyer le cache
- npm outdated : Vérifier les mises à jour
- npm audit : Vérifier les vulnérabilités
- npm audit fix : Corriger automatiquement
- npm list --depth=0 : Lister les dépendances installés 

- Dans package.json - "scripts" - On peut rajouter une clé qui va permettre d'éxécuter notre script
    > npm run dev : dev nom du script
- npx nodemon app.js | ./node_modules/bin/exe app.js : Pour exécuter un binaire dans le gestionnaire de package

- `npm semver calculator` pour tester les symbôles de versions de dépendance

## Publish - Publier un package sur npm

- npm init -y
- npm link : Créer un lien global, permet de vérifie si ton package fonctionne localement en l’installant comme un module dans un autre projet
- npm link my-package : Tester dans un autre projet

- **Se connecter à npm** - Ensuite, se connecter dans le terminal
- npm login : Il te demandera ton nom d’utilisateur, mot de passe et email

- npm search my-package-name : S'assurer que le package a un nom unique
- npm publish : Si le nom est disponible, le publié
- npm install my-package : Installer et utiliser le package

- npm publish : Mettre à jour le package, si on apportes des modifications, augmente la version dans package.json 1.0.1
- npm unpublish my-package --force : Supprimer un package


- **Yarn** → Rapide que npm, caching agressif et installation parallèle
    > npm install --global yarn
    > yarn init -y : Initialiser yarn
    > yarn add react : Installer une dépendance
    > yarn add --dev webpack : Installer en dépendance de developpement
    > yarn remove react : Supprimer une dépendance
    > yarn upgrade : Mettre à jour toutes les dépendances, ` react@18.3.1` pour une seule
    > yarn install --frozen-lockfile : Installer sans modifier
    > yarn list : Lister toutes les dépendances
    > yarn cache clean : Néttoyer le cache

- **pnpm** → Plus rapide, utilise un système de stockage global en dur pour éviter les duplications de dépendances
    > npm install --global pnpm
    > pnpm init -y : Initialiser pnpm
    > pnpm add react : Installer une dépendance
    > pnpm add -D webpack : Installer en dépendance de developpement
    > pnpm remove react : Supprimer une dépendance
    > pnpm update : Mettre à jour toutes les dépendances, ` react@18.3.1` pour une seule
    > pnpm install --frozen-lockfile : Installer sans modifier
    > pnpm list : Lister toutes les dépendances
    > pnpm store prune : Néttoyer le cache