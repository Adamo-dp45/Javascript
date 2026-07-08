export default class SecondTimer extends HTMLElement {

    static get observedAttributes() { return ['prefix'] } // On déclare les attributs qu'on veut observer pour le attributeChangedCallback

    constructor() {
        super() // J'appelle le constructeur parent
        this.i = 0
        this.span = document.createElement('span')
        this.span.classList.add('badge')
        this.span.classList.add('badge-secondary')

        this.prefi = document.createElement('span')
        // this.prefi.innerHTML = this.getAttribute('prefix') -- Sert plus, car elle va déclancher grâce au attributeChangedCallback
        this.appendChild(this.prefi)

        this.span.innerHTML = this.i
        this.appendChild(this.span)
    }

    connectedCallback() { // Est appeler lorsque notre élément est connecté
        this.timer = window.setInterval(() => {
            console.log('Incrémenter')
            this.i++
            this.span.innerHTML = this.i
        }, 1000)
    }

    disconnectedCallback() { // Est appeler lorsque notre élément est deconnecter
        clearInterval(this.timer)
    }

    // Nom de l'attribut, ancienne valeur et nouvelle valeur
    // Permet de détecter quand je vais changer de préfix
    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'prefix' && oldValue !== newValue) {
            this.prefi.innerHTML = newValue + ' : '
        }
    }
}