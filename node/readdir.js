// -- Pour lister les fichiers d'un dossier
import {readdir, stat} from "node:fs/promises"
import chalk from "chalk"

const files = await readdir('./', {withFileTypes: true}) // withFileTypes : Permet de savoir si un fichier est un fichier ou un dossier

/* -- Sol 1 
console.time('code') -- Permet de mésurer le temps
for (const file of files) { -- Le problème de cette aproche est que on doit attendre de faire le stat d'un fichier avant de faire pour un autre
    const parts = [
        file.isDirectory() ? 'D' : 'F',
        file.name
    ]
    if (!file.isDirectory()) {
        const {size} = await stat(file.name)
        parts.push(`${size}o`)
    }
    console.log(parts.join(' - '))
    -- Ou .. console.log(`${file.isDirectory() ? 'D' : 'F'} - ${file.name} - ${size}o`)
}
console.timeEnd('code')
*/

// - forEach(async) : N'est pas bon car on vas avoir le temps affiché avant même que notre opération ne termine

console.time('code')
await Promise.allSettled( // allSettled : On l'utilie ici car on s'en fou que notre promesse soit résoulu ou pas ici
    files.map(async (file) => { // map : Nous permettra d'obtenir un retour sous forme de promesse, on aura un tableau de promesse
        const parts = [
            file.isDirectory() ? 'D' : 'F',
            file.name
        ]
        if (!file.isDirectory()) {
            const {size} = await stat(file.name)
            parts.push(`${size}o`)
        }
        console.log(parts.join(' - '))
    })
)
console.timeEnd('code')

// -- Chalk
console.log(
    chalk.blue('Hello') // Sera afficher en bleu dans le terminal
)