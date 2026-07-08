// -- Version simple - Fonctionne si le menu ne change pas de forme
const menu = document.querySelector('.menu')
const menuItems = Array.from(menu.querySelectorAll('a'))
let activeItem = menu.querySelector('[aria-selected]')

const indicator = document.createElement('span')
indicator.classList.add('indicator')
menu.appendChild(indicator)
if (activeItem) {
    indicator.style.setProperty('transform', getTransform(activeItem))
}

/**
 * Permet de déplacer l'indicateur
 * @param {{currentTarget: HTMLElement}} e 
 */
function onItemClick(e) {
    if (e.currentTarget === activeItem) {
        return;
    }

    activeItem?.removeAttribute('aria-selected')
    e.currentTarget.setAttribute('aria-selected', 'true')

    indicator.animate([ // Animer le déplacement de l'indicateur
        {transform: getTransform(e.currentTarget)}
    ], {
        fill: 'both', // Garde les valeurs à la fin de l'animation
        duration: 600,
        easing: 'cubic-bezier(.48,1.55,.28,1)' // site `cubic-bezier` pour piloter le type d'animation
    })
    activeItem = e.currentTarget
}

/**
 * @param {HTMLElement} element
 * @return {string} 
 */
function getTransform (element) {
    const transform = {
        x: element.offsetLeft, // Position en x de l'élément actif
        scaleX: element.offsetWidth / 100 // Scale, taille de l'élément - 100 car j'ai donné une valeur de 100px à ma barre
    }
    return `translateX(${transform.x}px) scaleX(${transform.scaleX})` // Les transformations se lisent de la droite vers la gauche donc l'ordre a son importance
} 

menuItems.forEach((item) => {
    item.addEventListener('click', onItemClick) // 'mouseover' pour le hover
})