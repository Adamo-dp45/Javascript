import fs from "node:fs"
import {copyFile, readFile, unlink} from "node:fs/promises"
import { writeFile } from "node:fs/promises"
import { open } from "node:fs/promises"

// -- La lecture de fichier
const content = fs.readFileSync('node/file.txt', {encoding: 'utf8'}) // sync
console.log(
    content // On obtient un buffer, tableau de taille fixe qui va permettre d'obtenir l'ensemble des octets du fichier, 'utf8' permet de les avoir sous forme de texte
)
const contentAsync = fs.readFile('node/file.txt', {encoding: 'utf8'}, function (err, content) {
    console.log(
        content // Contenu
    )
}) // async

// - Pour avoir la nouvelle version de ces api avec promesse
const contentAwait = await readFile('node/file.txt', {encoding: 'utf-8'})
console.log(contentAwait)

const contentAll = Promise.all([
    readFile('node/file.txt', {encoding: 'utf-8'}),
    readFile('node/app.js', {encoding: 'utf-8'})
])
console.log(contentAll)

// -- L'écriture dans un fichier
await writeFile('node/demo.txt', 'Bonjour les gens ', {
    flag: 'a' // Permet d'écrire à la fin du fichier
})
await copyFile('node/demo.txt') // Copier un fichier
await unlink('node/demo.txt') // Supprimer un fichier
const i = stat('node/demo.txt') // Permet d'obtenir des informations sur le fichier
console.log(i) // Informations sur le fichier, utile pour avoir la date de création

// --- Ouverture de fichier
const file = await open('node/demo.txt', 'a') // 'a' pour écrier à la fin du fichier
file.write(' Hello')
file.close // Il est important de la fermer dans ce cas personne ne pourra acceder à ce niveau là - L'avantage de cette méthode est que ça permet d'ouvrir ce fichier qu'une seule fois si on a besoin d'écrire à plusieurs reprise dans une boucle