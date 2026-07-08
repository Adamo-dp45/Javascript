/*
    - Sélectionner tous les éléments avec un attribut title
    - Lorque l'on survol un de ces éléments, on créer une bulle d'information avec le bon titre, on place la bulle au dessus de l'élément
    - Anime l'apprition de cette bulle
    - Lorsque l'on quitte le survol
    - Anime la disparition de cette bulle
    - Supprime le tooltip du DOM
*/

class Tooltip {

    /**
     * Applique le système de bulle d'info sur les éléments
     * @param {string} selector 
     */
    static bind(selector) {
        document.querySelectorAll(selector).forEach(element => new Tooltip(element))
        // Ici en faisant ça, il va instancié une nouvelle instance de la class tooltip, comme ça chaque instance représentera un lien sur lequel je devrais appliquer le système de bulle d'info
    }

    /**
     * @param {HTMLElement} element 
     */
    constructor(element) {
        this.element = element
        let tooltipTarget = this.element.getAttribute('data-tooltip')
        if(tooltipTarget) {
            this.title = document.querySelector(tooltipTarget).innerHTML
        } else {
            this.title = element.getAttribute('title')
        }
        this.tooltip = null
        // mouseover -- au survol
        this.element.addEventListener('mouseover', this.mouseOver.bind(this)) // Pour que mouseOver face référence à mon Tooltip, sinon il fera référence à mon élément
        // mouseout -- lorsqu'on quitte l'élément
        this.element.addEventListener('mouseout', this.mouseOut.bind(this))
    }

    mouseOver() {
        let tooltip = this.createTooltip()
        let rect = this.element.getBoundingClientRect()
        let width = this.tooltip.offsetWidth
        let height = this.tooltip.offsetHeight
        let left = this.element.offsetWidth / 2 - width / 2 + rect.left + document.documentElement.scrollLeft // Position horizontale : centre du bouton - moitié de la tooltip
        let top = rect.top - height - 15 + document.documentElement.scrollTop // Position verticale : au-dessus de l’élément, pour que ça soit plus espacer 15px
        if(left < 20) {
            left = 20
        }
        tooltip.style.left = left + "px"
        tooltip.style.top = top + "px"
        tooltip.classList.add('visible')
    }

    mouseOut() {
        if(this.tooltip !== null) {
            this.tooltip.classList.remove('visible')
            this.tooltip.addEventListener('transitionend', () => {
                if(this.tooltip !== null) {
                    document.body.removeChild(this.tooltip)
                    this.tooltip = null
                }
            })
        }
    }

    /**
     * Créer et injecte la tooltip dans l'HTML
     * @returns {HTMLElement}
     */
    createTooltip() {
        if(this.tooltip === null) {
            let tooltip = document.createElement('div')
            tooltip.innerHTML = this.title
            tooltip.classList.add('tooltip')
            document.body.appendChild(tooltip)
            this.tooltip = tooltip
        }
        return this.tooltip
    }
}

Tooltip.bind('[title]')