// -- Watcher qui permet de relancer des processus automatiquement dès qu'il y'a une modification sur un fichier js
import {exec, spawn} from "node:child_process" // exec : Permet d'intéragir avec des process enfant, 'spawn' : Permet de lancer un processus enfant et d'écouter ce qui se passe dessus
import { watch } from "node:fs/promises"

const [node, _, file] = process.argv // argv : Permet d'obtenir les arguments
exec('dir', (error, out, err) => { // Permet d'executer une commande et de récuperer le retour, 'ls' si on n'est sur Unix
    console.log({
        error, // Erreur
        out, // La sortie renvoyer par la commande
        err // Ce que renvoi la commande en cas d'erreur
    })
}) // exec : Permet d'éxécuter un sous processus et de lire les informations directement en retour
console.log(process.argv)
// node node/watcher.js readdir.js

// const pr = spawn('dir',[], {shell: true}) -- shell : Permet de préciser qu'on vas utiliser le même que notre shell courant
function spawnNode() {
    const pr = spawn(node, [file]) // spawn : Permet de lire les informations sous forme de stream
    // -- node node/watcher.js node/app.js : Nous renvoi 'Process exited : 0' si ok
    /*
    pr.stdout.on('data', (data) => {
        console.log(data.toString('utf8'))
    })
    pr.stderr.on('error', (data) => {
        console.log(data.toString('utf8'))
    }) // Ou ..
    */
   pr.stdout.pipe(process.stdout) // Permet de lire ou d'écrire des informations à la sortie
   pr.stderr.pipe(process.stderr) // On écoute si on n'a des erreurs
   // pr.stdin -- Lire les informations dépuis le terminal

    pr.on('close', (code) => {
        // if(code > 0) {
        //    throw new Error('Process exited : ' + code)
        // }

        if(code !== null) {
            process.exit(code) // Fermer le process
        }
    })
    return pr
}

let childNodeProcess = spawnNode()
// -- On relance le script à chaque fois qu'on a une lecture ou réecriture du fichier
const watcher = watch('./', {recursive: true}) // recursive : Permet d'observer les dossiers enfants
for await(const event of watcher) { // Le for await permet de boucler sur un itterateur de promesse et d'attendre le résultat de la promesse à chaque fois, permet d'éviter de le faire à l'intérieur de la boucle
    if(event.filename.endsWith('.js')) {
        childNodeProcess.kill('SIGKILL') // Fermer le process, SIGKILL : Pour kill de force
        childNodeProcess = spawnNode() // On rédemare le serveur -- node node/watcher.js node/server.js
        console.log(event)
    }
}
// node node/watcher.js -- Pour observer

// On a aussi le package 'nodemon' qui permet de surveiller des script et relancer notre code en fonction - npx nodemon app.js