class Portfolio {

    /**
     * @param {string} selector 
     */
    constructor(selector) {
        this.activeContent = null
        this.activeItem = null
        this.container = document.querySelector(selector)
        if(this.container === null) {
            throw new Error(`L'élément ${selector} n'existe pas`)
        }
        this.children = Array.from(this.container.querySelectorAll('.js-item'))
        this.children.forEach((child) => {
            child.addEventListener('click', (e) => {
                e.preventDefault()
                this.show(child)
            })

            // --- Accessibilité
            child.addEventListener('keypress', (e) => {
                if(e.keyCode === 13) { // Cela veut dire qu'on a cliqué sur 'Entrer'
                    this.show(child)
                }
            })
        })

        // -- Si on veut un système de hash qui ouvrent le projet directement - Mais ça cause beaucoup de problème on préféra passer par les liens pour cibler nos projets
        if(window.location.hash.startsWith('#')) { // Ou window.location.hash !== ''
            let element = this.container.querySelector(window.location.hash)
            if(element !== null) {
                this.show(element)
            }
        } // -- Le defaut avec ce système de hash est qu'il va écraser automatiquement le comportement du système de scroll donc on a remedié à ça
    }

    /**
     * Affiche d=le contenu d'un élément
     * @param {HTMLElement} child 
     */
    show(child) {
        let offset = 0

        if(this.activeContent !== null) {
            this.slideUp(this.activeContent)

            if(this.activeContent.offsetTop < child.offsetTop) {
                offset = this.activeContent.offsetHeight
            }
        }

        if(this.activeItem === child) {
            this.activeContent = null
            this.activeItem = null
            window.location.hash = ''
        } else {
            let content = child.querySelector('.js-body').cloneNode(true) // On clone aussi tous les enfants du noeaud

            // child.after(content) -- On insère le clone après cet élément - Vu qu'elle vas changer selon la class on l'a commenté
            this.injectContent(child, content)

            this.slideDown(content) // Afficher le contenu avec une animation ou le faire en css en lui donnant une hauteur à 0 et en l'affichant lui donner une autre hauteur avec un éffet de transition

            this.scrollTo(child, offset) // Permet de scroller jusqu'à l'élément
            this.activeContent = content
            this.activeItem = child

            if(child.id !== '') { // Ou .. getAttribute('id')
                window.history.pushState(null, null, '#' + child.id) // Aucune donnée, on ne change pas le titre et on lui donne l'ancre
            }
        }
    }

    /**
     * Fais défiler la fenêtre jusqu'à l'élément
     * @param {HTMLElement} element 
     * @param {number} [offset=0]
     */
    scrollTo(element, offset = 0) {
        window.scrollTo({
            behavior: 'smooth',
            left: 0, // On ne veut pas scroller par rapport à la gauche
            top: element.offsetTop - offset // 'offset' pour que le scroll soit correcte, car au moment ou on calcule le offsetTop de l'élément à affiché l'ancien l'élément est toujours visible
        })
    }

    /**
     * Affiche l'élément avec un éffet d'animation
     * @param {HTMLElement} element 
     */
    slideDown(element) {
        let height = element.offsetHeight
        element.style.height = '0px'
        element.style.transitionDuration = '.5s'
        element.offsetHeight // On demande au navigateur de peindre mon élément en l'obligeant à faire un recalcule
        element.style.height = height + 'px'

        window.setTimeout(function() { // Pour ne pas l'élément reste figé si on redimensionne l'écran
            element.style.height = null
        }, 500)
    }

    /**
     * Masque l'élément avec un éffet d'animation
     * @param {HTMLElement} element 
     */
    slideUp(element) {
        let height = element.offsetHeight
        element.style.height = height + 'px'
        element.offsetHeight // On demande au navigateur de peindre mon élément en l'obligeant à faire un recalcule
        element.style.height = '0px' // En faisant ça, on déclanche l'animation

        window.setTimeout(function() { // Pour ne pas l'élément reste figé si on redimensionne l'écran
            element.parentNode.removeChild(element)
        }, 500)
    }

    /**
     * Insère le clone après l'élément
     * @param {HTMLElement} child 
     * @param {HTMLElement} content 
     */
    injectContent(child, content) {
        child.after(content)
    }
}

class PortfolioFlex extends Portfolio {

    /**
     * Insère le clone après l'élément
     * @param {HTMLElement} child 
     * @param {HTMLElement} content 
     */
    injectContent(child, content) {
        let index = this.children.findIndex(c => c === child) // On boucle sur tous les enfants, et si l'un d'eux a un offsetTop différent cela signifie qu'il est le dernier de la ligne
        let offsetTop = child.offsetTop
        let i
        for(i = index; i < this.children.length; i++) {
            if(this.children[i].offsetTop > offsetTop) { // Cela voudra dire que je suis un élément qui est à la ligne suivante
                break
            }
        }
        this.children[i - 1].after(content)
    }
}

new Portfolio('#js-portfolio')
new PortfolioFlex('#js-portfolio-flex')