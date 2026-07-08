### Node `nodejs.org` - Javascript côté serveur

- Pour qu'il puisse supporter le import lorsqu'on fait `node app.js`
    > On peut écrire le fichier avec l'extension `app.mjs`
    > Ou dans le `package.json` on rajoute une clé *"type": "module"*

- **chalk** : Package qui permet de mettre des couleurs dans la console
- **nodemon** : Permet de surveiller des script et relancer notre code en fonction, *mais pour les versions récentes de node on n'a pas besoin de ses package car il a été rajouté grâce au drapeau `--watch`*

- **Deno** et **Bun** permettent de faire du javascript côté serveur

- Le principe de `node` est qu'au lieu d'attentre des retours système lorsqu'on traitre une requête `sync`, on vas concevoir notre système comme une série d'évènement qui va être capturer par notre code javascript `async`