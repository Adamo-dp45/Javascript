const SIDEBAR_WITH = 'SidebarWith'

/**
 * Transform the element into a resizer handler
 * @param {HTMLElement} element 
 * @param {Function} cb 
 */
function resizer(element, cb) {

    element.addEventListener('pointerdown', onPointerDown) // 'pointerdown' fonctionne quelque soit le dispositive de pointage

    /**
     * @param {PointerEvent} e 
     */
    function onPointerDown(e) {
        e.preventDefault() // Pour éviter le survol de texte en cas de déplacement
        document.addEventListener('pointermove', onPointerMove)
        document.addEventListener('pointerup', onPointerUp, {
            once: true // Pour que l'événement ne soit déclenché qu'une seule fois ce qui évite de faire un removeEventListener de cet évènement aussi
        })
    }

    /**
     * @param {PointerEvent} e 
     */
    function onPointerUp(e) {
        document.removeEventListener('pointermove', onPointerMove)
    }

    /**
     * @param {PointerEvent} e 
     */
    function onPointerMove(e) {
        e.preventDefault()
        cb(e.pageX) // 'pageX' position en x du pointeur par rapport à la page
    }
}

resizer(document.querySelector('.resizer'), function(x) { // -- Entourer cette fonction de rafThrottle
    const sidebarWith = x + 'px'
    sessionStorage.setItem(SIDEBAR_WITH, sidebarWith)
    document.body.style.setProperty('--sidebar', sidebarWith)
})

const sidebarWith = sessionStorage.getItem(SIDEBAR_WITH)
if(sidebarWith !== null) {
    document.body.style.setProperty('--sidebar', sidebarWith)
}

function rafThrottle() {
    
}

// Pour améliorer on pourrait utiliser un 'throttle' pour éviter que le callback soit appelé tous le temps, il y'a 'request animation frame throlle - raf-throttle'

// Pour faire les tests sur les navigateurs mobiles, on tape dans l'url de google 'chrome://inspect/#divices' qui nous donne la liste des périphériques branchés et on branche notre téléphone et on appuie sur inspect