### Fastify `fastify.io` - npm i fastify

- Pour les modules qu'on peut rajouter on vas dans `Documentation` - `Ecosystem` 
    > Pour le moteur de template `@fastify/view` : On a choisi `npm i @fastify/view ejs` et pensé à ajouter l'extension ejs, `nunjucks` block
    > !! le formulaire : Vu que par défaut fastify ne comprend pas les requêtes de formulaire, on utilise le module `npm i @fastify/formbody`
    > !! l'authentification `npm i @fastify/auth`
        > Pour la session utilisateur on n'a le module `@fastify/session` et `@fastify/secure-session`, la différence est que `secure-session` créer un cookie sur le poste de l'utilisateur qui contient ces informations mais va signé ce cookie de sorte que si l'utilisateur modifie le cookie nous on vas le détecté parcequ'il n'y a que le serveur qui va être capable de générer ce type de cookie, l'inconvenient est que si quelqu'un a la cléf de notre signature il pourra se connecter à n'importe qui, `session` donne à l'utilisateur un token qui fera correspondre à cette chaîne de caractère les informations et sera stocké quelque part sur le serveur
            > npm i @fastify/secure-session @fastify/cookie
                > Pour utiliser le secure-session il faut générer une cléf `npx @fastify/secure-session | Out-File -Encoding default -NoNewline -FilePath secret-key` - Créer un fichier `secret-key` qui sera à la racine qui permettra de générer des cookies et sera utilisé par le serveur pour vérifier qu'il est valide
        > Pour le hashage de mot de passe on a `@phc/argon2` qui permet de vérifier ou d'hasher une chaîne de caractère
    > !! les assets static `npm i @fastify/static` : Permet de charger des fichiers comme le css, js..
    > !! la base de données : Pour communiquer il faudra chercher sur `npmjs`, on a des packages comme `npm i better-sqlite3` ou `sqlite3`, `npm i @fastify/mysql` pour mysql

- **Important !**
    > Pour qu'il puisse supporter le import on doit ajouter le `type` a `module` dans le `package.json`