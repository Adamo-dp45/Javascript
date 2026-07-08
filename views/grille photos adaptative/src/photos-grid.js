

/**
 * @typedef Image
 * @type {{width: number, element: HTMLImageElement}}
 */

class PhotosGrid extends HTMLElement {

    /** @type {number} Espacement entre les images **/
    #gap = 0
    /** @type {number} Hauteur cible pour les lignes **/
    #rowHeight = 0
    /** @type {Image[]} */
    #images = []
    #resizeListener

    #observer // 'ResizeObserver'

    connectedCallback () {
        this.style.setProperty('display', 'flex')
        this.style.setProperty('flex-direction', 'column')
        this.style.setProperty('--gap', this.getAttribute('gap'))
        this.style.setProperty('gap', 'var(--gap)')

        this.#gap = parseFloat(getComputedStyle(this).rowGap)
        this.#rowHeight = parseFloat(this.getAttribute('rowheight'))

        // Sans hauteur cible le système ne peut pas travailler
        if (Number.isNaN(this.#rowHeight)) {
            console.error("Vous devez ajouter un rowheight sur l'élément <photos-grid>")
            return;
        }

        // Récupère la liste des enfants avec leur largeur adaptée à la hauteur cible
        this.#images = Array.from(this.children)
            .map(this.getImageDimension.bind(this))
            .filter(v => Boolean(v))

        // this.buildLines() -- 'ResizeObserver'
        let previousWith = true // Vu que le 'ResizeObserver' est appelé initialement

        let timer = null // Timer pour "debounce" le redimensionnement
        // this.#resizeListener = () => { -- 'ResizeObserver'
        const resizeListener = (entries) => {

            // -- 'ResizeObserver'
            const box = entries[0].borderBoxSize[0]
            if(previousWith === box.inlineSize) {
                return
            }
            if(previousWith === null) {
                this.buildLines()
                previousWith = box.inlineSize
                return
            }
            // --

            clearTimeout(timer)
            timer = setTimeout(() => {
                withTransition(() => {
                    this.buildLines()
                })
            }, 500)
        }
        // window.addEventListener('resize', this.#resizeListener) -- 'ResizeObserver'
        this.#observer = new ResizeObserver(resizeListener)
        this.#observer.observe(this)
    }

    disconnectedCallback () {
        // window.removeEventListener('resize', this.#resizeListener) -- 'ResizeObserver'
        this.#observer.disconnect()
    }

    /**
     * Transforme le DOM pour créer des lignes d'images
     */
    buildLines () {
        const containerWidth = this.getBoundingClientRect().width
        this.innerHTML = ''
        let index = 0
        let rowWidth = -this.#gap // Largeur calculée de la ligne en cours
        let rowStartAt = 0 // Index de la première image de la ligne

        while(index < this.#images.length) {
            const image = this.#images[index]
            const newRowWidth = rowWidth + image.width + this.#gap

            // Les images rentrent dans la ligne en cours
            if (newRowWidth < containerWidth) {
                index++
                rowWidth = newRowWidth
                continue;
            }

            // L'espace en moins est inférieur à l'espace en plus, on préfère tenter le redimensionnement sans la dernière image
            if (
                rowWidth > 0 &&
                newRowWidth - containerWidth > containerWidth - rowWidth
            ) {
                index--
            }

            const rowImages = this.#images.slice(rowStartAt, index + 1)
            this.buildLine(rowImages)

            // On réinitialise la ligne
            rowStartAt = index + 1
            rowWidth = -this.#gap
            index++
        }

        // Il reste des images orphelines sur la dernière ligne
        if (rowStartAt < this.#images.length) {
            const rowImages = this.#images.slice(rowStartAt)
            this.buildLine(rowImages, containerWidth - rowWidth - this.#gap)
        }
    }

    /**
     * Génère une ligne au niveau du DOM
     *
     * @param {Image[]} images
     * @param {number} space Ajoute un espace blanc à droite des images
     */
    buildLine (images, space = 0) {
        const div = document.createElement('div')
        div.style.setProperty('display', 'grid')
        div.style.setProperty('gap', 'var(--gap)')
        div.style.setProperty('grid-template-columns',
            images.map(image => `${image.width}fr`).join(' ') + (space === 0 ? '' : ` ${space}fr`)
        )
        for (const image of images) {
            div.appendChild(image.element)
        }
        this.appendChild(div)
    }

    /**
     * Récupère les dimensions de l'image
     *
     * @param {HTMLElement} element
     * @param {number} k
     * @return {Image|null}
     */
    getImageDimension (element, k) {
        element.style.setProperty('view-transition-name', `image-${k}`)
        const img = element.tagName === 'IMG' ? element : element.querySelector('img')

        if (img === null) {
            return null;
        }

        let width = parseFloat(img.getAttribute('width'))
        let height = parseFloat(img.getAttribute('height'))

        if (Number.isNaN(width) || Number.isNaN(height)) {
            console.error("Impossible de trouver les dimensions de l'image", img)
            width = 10
            height = 10
        }
        const ratio = width / height
        return {
            width: ratio * this.#rowHeight,
            element: element
        }
    }

}

/**
 * Crée une mutation en utilisant le système de transition CSS s'il est supporté
 * @param {Function} cb
 */
const withTransition = (cb) => {
    if (!document.startViewTransition) {
        cb()
        return;
    }
    document.startViewTransition(cb)
}

customElements.define('photos-grid', PhotosGrid)
