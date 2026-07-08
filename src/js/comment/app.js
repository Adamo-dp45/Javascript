// -- La logique est que dès que cet élément visible dans la page, il faudra chargé de nouveaux commentaires
import { fetchJSON } from "../todolist/api.js"
import { alertElement } from "./alert.js"

class InfinitePagination {

    /** @type {string} */
    #endpoint // Je vais sauvegarder les data attribute sous forme de propriété car il vont me servir plustard
    /** @type {HTMLTemplateElement} */
    #template
    /** @type {HTMLElement} */
    #target
    /** @type {HTMLElement} */
    #loader
    /** @type {object} */
    #elements
    /** @type {IntersectionObserver} */
    #observer
    /** @type {boolean} */
    #loading = false
    /** @type {number} */
    #page = 1

    /**
     * 
     * @param {HTMLElement} element 
     */
    constructor(element) {
        this.#loader = element
        this.#endpoint = element.dataset.endpoint
        this.#template = document.querySelector(element.dataset.template)
        this.#target = document.querySelector(element.dataset.target)
        this.#elements = JSON.parse(element.dataset.elements) // Car dans le html je l'ai mis en Json
        // console.log(this.#target)

        this.#observer = new IntersectionObserver((entries) => {
            for(const entry of entries) {
                if(entry.isIntersecting) {
                    this.#loadMore() // Si notre éléments est intercepté tu appelle cette fonction pour charger plus de contenu
                }
            }
        })
        this.#observer.observe(element)
    }

    async #loadMore() {
        if(this.#loading) {
            return // Si le chargement est déjà vrai tu retourne
        }
        this.#loading = true
        try {
            const url = new URL(this.#endpoint)
            url.searchParams.set('_page', this.#page)
            const comments = await fetchJSON(url.toString()) // En temps normal fetchJSON
            // if(comments.length === 0) { // Si il n'y a plus commentaire
            if(this.#page === 3) { // On limit à la page 3 car l'API utiliser ici n'a pas de limite
                this.#observer.disconnect()
                this.#loader.remove()
                return
            }
            for (const comment of comments) {
                // Pour chaque commentaire il va faloir cloner le template
                const commentElement = this.#template.content.cloneNode(true)
                for(const [key, selector] of Object.entries(this.#elements)) {
                    commentElement.querySelector(selector).innerText = comment[key]
                }

                this.#target.append(commentElement)
            }
            this.#page++ // Une fois mes commentaires ont été chargé, il incrémente la page
            this.#loading = false
        } catch(e) {
            this.#loader.style.display = 'none'

            // Ici on donne la possiblité de relancer le chargement quand on ferme l'erreur
            const error = alertElement('Impossible de charger les contenues')
            error.addEventListener('close', () => {
                this.#loader.style.removeProperty('display')
                // Comme ça il récupérera son diplay normal
                this.#loading = false
            })
            this.#target.append(error)

            // this.#observer.disconnect()
            // this.#loader.remove()
        }
    }
}

document
    .querySelectorAll('.js-infinte-pagination')
    .forEach(el => new InfinitePagination(el))

class FetchForm {

    /** @type {string} */
    #endpoint // Je vais sauvegarder les data attribute sous forme de propriété car il vont me servir plustard
    /** @type {HTMLTemplateElement} */
    #template
    /** @type {HTMLElement} */
    #target
    /** @type {HTMLElement} */
    #loader
    /** @type {object} */
    #elements

    /**
     * @param {} form 
    */
    constructor(form) {
        form.addEventListener('submit', e => {
            e.preventDefault()
            this.#submitForm(e.currentTarget)
        })
        this.#endpoint = form.dataset.endpoint
        this.#template = document.querySelector(form.dataset.template)
        this.#target = document.querySelector(form.dataset.target)
        this.#elements = JSON.parse(form.dataset.elements) // Car dans le html je l'ai mis en Json
    }

    /**
     * @param {HTMLFormElement} form 
     */
    async #submitForm(form) {
        const button = form.querySelector('button')
        button.setAttribute('disabled', '')
        try {
            // FormData nous permet de récupérer les données du formulaire, et dans l'inspecteur il est dans la partie payload en cliquant sur le fichier reçu dans réseaux
            const data = new FormData(form)
            // Ensuite la logique du fetch
            const comment = await fetchJSON(this.#endpoint, {
                method: 'POST',
                // On va convertir les données du formulaire en JSON, les entrées du formulaire
                // body: JSON.stringify(Object.fromEntries(data)), -- Ou
                json: Object.fromEntries(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            // Pour chaque commentaire il va faloir cloner le template
            const commentElement = this.#template.content.cloneNode(true)
            for(const [key, selector] of Object.entries(this.#elements)) {
                commentElement.querySelector(selector).innerText = comment[key]
            }
            this.#target.prepend(commentElement) // En prepend car je souhaite l'afficher avant les autres commentaires

            // Après traitement
            form.reset()
            button.removeAttribute('disabled')
            form.insertAdjacentElement('beforebegin', // Juste avant mon formulaire je veux que rajoute l'element
                alertElement('Formulaire soumis avec success', 'success')
            )
        } catch(e) {
            const errorElement = alertElement('Erreur serveur')
            form.insertAdjacentElement('beforebegin', // Juste avant mon formulaire je veux que rajoute l'element
                errorElement
            )
            errorElement.addEventListener('close', () => { // Quand on ferme l'erreur 
                button.removeAttribute('disabled') // Remettre le formulaire avec un bouton non désactiver
            })
        }
    }
}

document
    .querySelectorAll('.js-form-fetch')
    .forEach(form => new FetchForm(form))
