/**
 * @return {Array<string>} - Tableau de chaîne de caractère
 * @return {string[]} - &&
 * @return {Promise<{id: number, title: string}>} - Promesse
 * @throws - Veut dire que cette méthode peut renvoyer une erreur
 * @private - Veut dire que la méthode ne sera pas utilisé à l'extérieur
 */

/**
 * @typedef {Object} Post - Sera réutilisable
 * @property {number} id
 * @property {string} title
 */

/**
 * @return {{id: number, title: string, content: string}}
 */
function fetchPost() {

}
const a = fetchPost()
a.id

/**
 * @return {Post[]}
 */
function fetchUser() {

}
const b = fetchUser()
b.forEach(c => c.id)

/**
 * @return {(() => number)} - On peut lui donner des params
 */
function fn() {

}
fn()()

/**
 * @property {string} name - Pas obligé ici car il le comprend à travers la class
 */
class A {

    constructor() {
        this.name = "Nom"
        /**
         * @type {string[]}
         */
        this.notes = []
    }
}
const d = new A()
d.name
d.notes

import data from '' with {type: 'json'} // Importer du json à partir du navigateur
console.log(data.posts)