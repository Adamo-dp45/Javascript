/*
    - Drag'n Drop Sorter : Réorganisation des éléments en grille
        - Qui soit animé
        - Qui supporte le mobile
        - Qui ne rame pas (60fps)
        - Qui scroll Lorsqu'on est sur une petite fenêtre
*/

import './interact.js'

function debounce(func, wait, immediate) {
    let timeout
    return function (...args) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        timeout = null
        if (!immediate) func.apply(this, args)
      }, wait)
      if (immediate && !timeout) func.apply(this, args)
    }
}

function throttle(callback, delay) {
    let last
    let timer
    return function () {
        let context = this
        let now = +new Date()
        let args = arguments
        if (last && now < last + delay) {
            clearTimeout(timer)
            timer = setTimeout(function () {
                last = now
                callback.apply(context, args)
            }, delay)
        } else {
            last = now
            callback.apply(context, args)
        }
    }
}

class Sortable {

    /**
     * @param {HTMLElement} element 
     * @param {*} scrollable 
     */
    constructor(element, scrollable) {
        this.scrollable = scrollable || null
        this.element = element
        this.items = this.element.querySelectorAll(this.element.dataset.sortable)
        this.element.style.position = 'relative'
        this.element.style.webkitTouchCallout = 'none'
        window.addEventListener('resize', debounce(this.setPosition.bind(this), 200))
        interact(this.element.dataset.sortable, {
            context: this.element // Selectionne que les éléments qui sont cet élément
        }).draggable({
            inertia: false,
            manualStart: ("ontouchstart" in window) || window.DocumentTouch && window.document instanceof window.DocumentTouch, // Si on veut que le drag commence à partir d'un moment ou pas
            autoScroll: {
                container: this.scrollable, // Précise l'élément qui doit être scroller
                margin: 50, // A partir de quand il doit être scroller
                speed: 600 // Vitesse de défilement
            },
            onmove: throttle(this.move.bind(this), 16) // Listerner qui va être lançer à chaque déplacement
        })
        .off('dragstart')
        .off('dragend')
        .off('hold')
        .on('dragstart', (e) => {
            let r = e.target.getBoundingClientRect()
            e.target.classList.add('is-dragged')
            e.target.style.transitionDuration = "0s";
            this.startPosition = e.target.dataset.position
            this.offset = {
                x: e.clientX - r.left,
                y: e.clientY - r.top
            }
            this.scrollTopStart = this.getScrollTop()
        }).on('dragend', (e) => {
            e.target.classList.remove('is-dragged')
            e.target.style.transitionDuration = null
            this.moveItem(e.target, e.target.dataset.position)
            this.sendResults()
        }).on('hold', (e) => { // Lorsque tu maintient la souris
            if(!e.interaction.interacting()) { // Si on est pas en train de dragger
                e.interaction.start({ // On démarre le drag
                    name: 'drag'
                }, e.interactable, e.currentTarget)
            } // Ce code permet de dragger en maintenant le doigt ou la souris
        })

        this.setPosition()
    }

    setPosition() {
        let rect = this.items[0].getBoundingClientRect()
        this.itemWidth = Math.floor(rect.width) // Largeur du premier élément
        this.itemHeight = Math.floor(rect.height) // Hauteur du premier élément
        this.cols = Math.floor(this.element.offsetWidth / this.itemWidth) // Nombres d'éléments que l'on rentre sur chacune des colones
        this.element.style.height = (this.itemHeight * Math.ceil(this.items.length / this.cols)) + "px" // Nous permet d'avoir du contenu après

        for(let i = 0; i < this.items.length; i++) {
            let item = this.items[i]
            item.style.position = 'absolute'
            item.style.top = '0px'
            item.style.left = '0px'
            item.style.transitionDuration = '0s'
            this.moveItem(item, item.dataset.position)
        }

        window.setTimeout(() => {
            for(let i = 0; i < this.items.length; i++) {
                let item = this.items[i]
                item.style.transitionDuration = null
            }
        }, 100)
    }

    /**
     * 
     * @param {MouseEvent} e 
     */
    move(e) {
        let p = this.getXY(this.startPosition)
        let x = p.x + e.clientX - e.clientX0
        let y = p.y + e.clientY - e.clientY0 + this.getScrollTop() - this.scrollTopStart
        e.target.style.transform = "translate3d(" + x + "px, " + y + "px, 0)"

        let oldPosition = e.target.dataset.position
        let newPosition = this.guessPosition(x + this.offset.x, y + this.offset.y)
        if(oldPosition != newPosition) {
            this.swap(oldPosition, newPosition)
            e.target.dataset.position = newPosition
        }
        this.guessPosition(x, y)
    }

    /**
     * Retourne la position en x et y d'un élément par rapport à sa position
     * @param {number} position 
     * @returns {x: number, y:number}
     */
    getXY(position) {
        let x = this.itemWidth * (position % this.cols)
        let y = this.itemHeight * Math.floor(position / this.cols)
        return {
            x: x,
            y: y
        }
    }

    /**
     * Devine la position
     * @param {number} x 
     * @param {number} y 
     */
    guessPosition(x, y) {
        let col = Math.floor(x / this.itemWidth)
        if(col >= this.cols) {
            col = this.cols - 1
        }
        if(col <= 0) {
            col = 0
        }
        let row = Math.floor(y / this.itemHeight)
        if(row < 0) {
            row = 0
        }
        let position = col + row * this.cols
        if(position >= this.items.length) {
            return this.items.length - 1
        }
        return position
    }

    swap(oldPosition, newPosition) {
        for(let i = 0; i < this.items.length; i++) {
            let item = this.items[i]
            if(!item.classList.contains('is-dragged')) {
                let position = parseInt(item.dataset.position, 10)
                if(position >= newPosition && position < oldPosition && newPosition < oldPosition) {
                    this.moveItem(item, position + 1)
                } else if(position <= newPosition && position > oldPosition && oldPosition > newPosition) {
                    this.moveItem(item, position - 1)
                }
            }
        }
    }

    moveItem(item, position) {
        let p = this.getXY(position)
        item.style.transform = "translate3d(" + p.x + "px, " + p.y + "px, 0)"
        item.dataset.position = position
    }

    sendResults() {
        let result = {}
        for(let i = 0; i < this.items.length; i++) {
            let item = this.items[i]
            result[item.dataset.id] = item.dataset.position
        }
        // -- On peut faire de la communication avec le serveur ici
        this.success(result)
    }

    success(result) {
        console.log(result)
    }

    getScrollTop() {
        return this.scrollable ? this.scrollable.scrollTop : (window.document.documentElement.scrollTop || window.document.body.scrollTop);
    }
}

new Sortable(document.getElementById('sort'))