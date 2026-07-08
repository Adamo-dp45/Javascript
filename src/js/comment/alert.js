/**
 * Renvoie un élément HTML représentant une alerte
 * @param {string} message 
 * @param {string} type 
 * @return {HTMLElement}
*/
export function alertElement(message, type = 'danger') {
    // firstElementChild : va nous permettre d'avoir unn élément, si non la méthode remove ne marche pas sur le document fragment
    /** @type {HTMLElement} */
    const el = document.querySelector('#alert').content.firstElementChild.cloneNode(true) // Ici on lui dit que notre template ne contient qu'un enefant
    el.classList.add(`alert-${type}`)
    el.querySelector('.js-text').innerText = message
    el.querySelector('button').addEventListener('click', e => {
        e.preventDefault()
        el.remove()
        // Ici pour le tp
        el.dispatchEvent(new CustomEvent('close')) // Veut dire qu'on a fermé notre alerte, comme ça on pourra avoir des écouteurs sur le parent
    })
    return el
}

