/**
 * @property {HTMLElement} element
 * @property {string[]} images Chemins des images de la lightbox
 * @property {string} url Image actuellement affiché
 */
class LightBox {

    static init() {
        const links = Array.from(document.querySelectorAll('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"]'))
        const gallery = links.map(link => link.getAttribute('href'))
        links.forEach(link => link.addEventListener('click', e => {
                e.preventDefault()
                new LightBox(e.currentTarget.getAttribute('href'), gallery)
            }))
    }

    /**
     * 
     * @param {string} url URL de l'image
     * @param {string[]} images
     */
    constructor(url, images) {
        this.element = this.buildDom(url)
        this.images = images
        this.loadImage(url)
        this.onKeyup = this.onKeyup.bind(this) // On le fais ici pour éviter de créer a chaque fois une nouvelle version de la fonction
        document.body.appendChild(this.element)
        // disableBodyScroll(this.element) -- this.element permet d'indiquer que l'élément doit être scrollable
        document.addEventListener('keyup', this.onKeyup)
    }

    /**
     * Permet de fermer la lightbox
     * @param {MouseEvent|KeyboardEvent} e 
     */
    close(e) {
        e.preventDefault()
        this.element.classList.add('fadeOut') // Ou utiliser un 'transitionend'
        // enableBodyScroll(this.element) -- On réactive la possibilité d'être scrollé sur l'élément
        window.setTimeout(() => {
            this.element.parentElement.removeChild(this.element) // Ou faire '.remove()' simplement, nouvelle api
        }, 500)
        document.removeEventListener('keyup', this.onKeyup)
    }

    /**
     * 
     * @param {KeyboardEvent} e 
     */
    onKeyup(e) {
        if(e.key === 'Escape') {
            this.close(e)
        } else if(e.key === 'ArrowLeft') {
            this.prev(e)
        } else if(e.key === 'ArrowRight') {
            this.next(e)
        }
    }

    /**
     * 
     * @param {MouseEvent|KeyboardEvent} e 
     */
    next(e) {
        e.preventDefault()
        let i = this.images.findIndex(image => image === this.url)
        if(i === this.images.length - 1) { // Signifie qu'on n'est au bout de la liste
            i = -1
        }
        this.loadImage(this.images[i + 1])
    }

    /**
     * 
     * @param {MouseEvent|KeyboardEvent} e 
     */
    prev(e) {
        e.preventDefault()
        let i = this.images.findIndex(image => image === this.url)
        if(i === 0) {
            i = this.images.length // i égale à la dernière image
        }
        this.loadImage(this.images[i - 1])
    }

    /**
     * 
     * @param {string} url URL de l'image
     * @returns {HTMLElement}
     */
    buildDom(url) {
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        dom.innerHTML = `<button class="lightbox-close">Fermer</button>
        <button class="lightbox-next">Suivant</button>
        <button class="lightbox-prev">Précédent</button>
        <div class="lightbox-container"></div>`
        dom.querySelector('.lightbox-close').addEventListener('click', this.close.bind(this))
        dom.querySelector('.lightbox-next').addEventListener('click', this.next.bind(this))
        dom.querySelector('.lightbox-prev').addEventListener('click', this.prev.bind(this))
        return dom
    }

    /**
     * 
     * @param {string} url URL de l'image
     */
    loadImage(url) {
        this.url = null
        const image = new Image()
        const container = this.element.querySelector('.lightbox-container')
        const loader = document.createElement('div')
        loader.classList.add('lightbox-loader')
        container.innerHTML = '' // Pour supprimer l'ancienne image
        container.appendChild(loader)
        image.onload = () => {
            container.removeChild(loader)
            container.appendChild(image)
            this.url = url
        }
        image.src = url
    }
}

LightBox.init()

// svg animated loader - SVG Loader Animation CodePen : Loader animée