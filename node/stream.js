// -- Stream - Permet de travailler de manière éfficace avec des flux de données
import { createReadStream, createWriteStream } from "node:fs"
import {readFile, stat, writeFile} from "node:fs/promises"
// import { readFile } from "node:fs" -- Sync

// const content = await readFile('video.mp4') -- On pourrait le faire en sync ici et ça aurait le même résultat
// await writeFile('video-copy.=mp4', content) // Le code ici n'est pas éfficace car il va lire l'entièté du contenu de la video dans une variable, donc si la video fait 2GB, il occupera beaucoup d'espace au niveau de la mémoire

// -- C'est là que les streams interviennent, il écrive morceau par morceau
const stream = createReadStream('video.mp4') // Renvoi des évènements sur lesquelles on peut faire des traitements
const {size} = await stat('video.mp4') // Taille du fichier, nous permettra d'avoir la progression de la lecture
let read = 0
stream.on('data', (chunk) => { // chunk : Tous les morceaux de données
    read += chunk.length // Taille du morceau, nombre d'octets
    console.log(
        Math.round(100 * read / size) // Quantité d'information lu divisé par la taille du fichier
    )
})
stream.on('close', () => { // Permet d'écouter la fin de la lecture
    console.log('close')
})

const writeStream = createWriteStream('video-copy.mp4') // Pour écrire dans le stream
stream.pipe(writeStream) // Prend le flux de lecture et envoie le dans le tuyau de writeStream, les deux vont se syncroniser, dès que write va pouvoir écouter il va demander la lecture au niveau du stream et ça évite d'avoir des problème de performances, on n'a pas eu besoin de sauvegarder en mémoire l'entirerter du fichier

// -- Utile quand on créer un serveur web quand on vas vouloir distribuer un fichier volumineux, on crée un readablestream pour lire un fichier sur notre disque et la renvoyé à la reponse