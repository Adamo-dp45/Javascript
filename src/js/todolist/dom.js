/**
 * Créer un élement avec des attributs si définie
 * @param {string} tagName 
 * @param {object} attributes 
 * @return {HTMLElement}
*/
export function createElement(tagName, attributes = {}) {
    const element = document.createElement(tagName)
    // entries au niveau d'un objet me permet d'avoir la valeur et clé de l'objet
    for(const [attribute, value] of Object.entries(attributes)) {
        if(value !== null) {
            element.setAttribute(attribute, value)
        }
    }
    return element
}

/**
 * 
 * @param {string} id 
 * @returns {DocumentFragment}
*/
export function cloneTemplate(id) {
    return document.getElementById(id).content.cloneNode(true)
}