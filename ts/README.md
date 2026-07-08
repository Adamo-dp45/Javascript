### Typescript `typescriptlang.org` - Javascript avec des types statiques

- npm i typescript --save-dev
- Pour convertir :
    > npx tsc app.ts : Pour le convertir en js en utilisant typescript, `--outDir dist` pour spécifier le dossier, on a aussi le `--watch`
    > Pour l'intégration avec `webpack` on n'a le loader `ts-loader`
    > On peut faire la conversion sur le site de typescript
- On peut avoir un fichier de configuration `tsconfig.json`, ensuite pour lancer `npx tsc`
- Pour utiliser les imports de modules dans notre projet on doit lui indiquer de chercher aussi dans le système de résolution de node js et qu'il cherche dans 'node_modules' dans `tsconfig.json` - `moduleResolution` car par défaut il le cherche dans notre projet

- Important !!
    > La vérification des types ne se fais pas à l'exécution mais à la compilation
    > Nous offre une meilleur autocomplétion et documentation que jsdoc
    > Peut être compilé pour des versions qui vont de `ES3` à `ESNext` ce qui permet de se passer de `babel`
    > On peut utiliser typescript à différents niveaux
        > Pour faire de la vérification de code comme un éditeur
        > !! checké en fonction de la jsdoc
        > !! le complet dans lequel on mais directement les types dans la syntaxe de base du code

- Les inconvenients
    > L'un d'eux est avec l'écosystème du javascript car pour fonctionner typescript a besoin de connaître le type de tous ce qui rentre dans notre code, le soucis est que si on utilise une librairie qui n'a été typé typescript ne va comprendre de quoi il en retourne
        > La 1ère solution est de désactiver le typage pour la librairie
        > La 2ème est de créer un fichier de définition pour la librairie pour que typescript sache à quoi ça ressemble

- Le fichier de declaration
    > Pour utiliser la declaration on ajoute `declaration` à true dans `tsconfig.json` ce qui va crée un fichier de déclaration qui correspondra à notre librairie en plus du fichier js lors de la compilation pour que les personnes qui consomme notre class par ex est de l'autocomplétion
    > Si une librairie n'a pas de fichier de déclaration, on aurra aussi une erreur, donc il faudra en crée, donc si on utilise une librairie il faut régarder si elle a le bando [Ts] pour savoir si elle a un fichier de déclaration
    > On a aussi une librairie `@types/react` à l'intérieur on a un github `DefinitelyTyped` qui contient les fichiers de déclarations de beaucoup de librairies qui permet d'avoir une meilleur adpotion du typescript

- Pour les types utilitaires, on a aussi une librairie `npm install utility-types` qui a des types supplémentaires en plus de celle de la doc



app.ts, type.ts, class.ts, interface.ts, enum, declaration, type utilitaire et conditionnel aussi les mapped type