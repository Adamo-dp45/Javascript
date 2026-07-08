/*
    - Le chemin absolue
*/
import {readFile} from "node:fs/promises"
import {fileURLToPath} from "node:url" // Permet de prendre une url de fichier et de le convertir en chemin
import {dirname, join} from "node:path"

console.log(
    fileURLToPath(import.meta.url) // Le  chemin du fichier
)
console.log(
    dirname(fileURLToPath(import.meta.url)) // dirname : Permet d'obtenir le dossier qui correspond à un chemin
)
console.log(join('/a/b', '/demo.txt')) // Permet de concatener plusierurs chemins ensemble, on aura \a\b\demo.txt

const dir = dirname(fileURLToPath(import.meta.url))
const filename = join(dir, 'demo.txt')
console.log(await readFile(filename, {encoding: 'utf-8'})) // Si on ne fais pas ça il va chercher le fichier à la racine ce qui va nous donner une erreur 'ENOENT'