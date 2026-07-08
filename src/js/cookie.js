// -- Les cookies sont des informations qui vont être stockés sur le navigateur de l'utilisateur et qui vont avoir une petite particularité contrairement au localStorage d'être envoyer au serveur et ils sont limités à un nom de domaine
console.log(
    document.cookie, // Nous montre tous les cookies, excepté ceux qui sont en 'Httponly' qui ne sont pas modifiable ni visible par le javascript
)

document.cookie = 'clef=myclef' // Pour ajouter un cookie - On ne doit sauvegarder trop d'info dans le cookie car ces infos sont utilisé lors de la communication avec le serveur car ils pourraient alourdir les requêtes

/**
 * Permet de récupérer un cookie
 * @param {string} name 
 * @returns {string|null}
 */
function getCookie(name) {
    const cookies = document.cookie.split('; ') // On split car les cookies sont séparer ainsi
    const value = cookies
        .find(c => c.startsWith(name)) // find : Correspond, startsWith : Le nom doit commencer par
        ?.split('=')[1] // ? : Car le find pour renvoyer undifined
    if(value === undefined) {
        return null
    }
    return decodeURIComponent(value) // Pour décoder une valeur, URL du genre
}

/**
 * Permet de définir un cookie
 * @param {string} name 
 * @param {string} value 
 * @param {number} days 
 */
function setCookie(name, value, days) {
    const date = new Date()
    date.setDate(date.getDate + days)
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()};` // encodeURIComponent : Pour encoder une valeur sous forme d'URL
    console.log(`${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()};`)
}

setCookie('hello', 'Bonjour les gens', 2)

console.log(
    getCookie('clef')
)

// Quand on veut utiliser fetch et qu'on a défini des cookies dans notre application, on peut décider de les envoyés au serveur qu'on contact grâce à l'option 'credentials' de fetch