/**
 * Affiche ou Masque un élément avec un effet de repli
 * 
 * @param {HTMLElement} element
 * @param {Number} duration
 * @returns {Promise<boolean>}
 */
export function slideUp (element, duration = 500) {
    return new Promise(resolve => {
        element.style.height = `${element.offsetHeight}px`
        element.style.transitionProperty = 'height, margin, padding'
        element.style.transitionDuration = `${duration}ms`
        // Ou -- element.style.transition = `height${duration}`
        element.offsetHeight // eslint-disable-line no-unused-expressions, Ici on lui demande d'abord de dessiner les éléments avant de passer la hauteur à zéro, là on aura comme un petit timer
        element.style.overflow = 'hidden'
        element.style.height = 0
        element.style.paddingTop = 0
        element.style.paddingBottom = 0
        element.style.marginTop = 0
        element.style.marginBottom = 0
        window.setTimeout(() => {
            element.style.display = 'none'
            element.style.removeProperty('height')
            element.style.removeProperty('padding-top')
            element.style.removeProperty('padding-bottom')
            element.style.removeProperty('margin-top')
            element.style.removeProperty('margin-bottom')
            element.style.removeProperty('overflow')
            element.style.removeProperty('transition-duration')
            element.style.removeProperty('transition-property')
            resolve(element)
        }, duration)
    })
}

/**
 * Affiche un élément avec un effet de dépliement
 * 
 * @param {HTMLElement} element
 * @param {Number} duration
 * @returns {Promise<boolean>}
 */
export function slideDown (element, duration = 500) {
    return new Promise(resolve => {
        element.style.removeProperty('display')
        let display = window.getComputedStyle(element).display // Calculer le type de display qui est trouver par rapport au css
        if (display === 'none') display = 'block' // Au cas ou le display est à none dans mon css on le met en block
        element.style.display = display
        const height = element.offsetHeight
        element.style.overflow = 'hidden'
        element.style.height = 0
        element.style.paddingTop = 0
        element.style.paddingBottom = 0
        element.style.marginTop = 0
        element.style.marginBottom = 0
        element.offsetHeight // eslint-disable-line no-unused-expressions
        element.style.transitionProperty = 'height, margin, padding'
        element.style.transitionDuration = `${duration}ms`
        element.style.height = `${height}px`
        element.style.removeProperty('padding-top')
        element.style.removeProperty('padding-bottom')
        element.style.removeProperty('margin-top')
        element.style.removeProperty('margin-bottom')
        window.setTimeout(() => {
            element.style.removeProperty('height')
            element.style.removeProperty('overflow')
            element.style.removeProperty('transition-duration')
            element.style.removeProperty('transition-property')
            resolve(element)
        }, duration)
    })
}

// DOMAnimations static slideUp - slideDown __ DOMAnimations.slideUp - DOMAnimations.slideDown

/**
 * Désactive le bouton d'un formulaire lors de la soumission et le soumet
 *
 * @param {HTMLFormElement} element
 */
export function buttonFormDisable(element) {
    if(form === null) {
        return
    }
    const form = document.querySelector(element)
    form.addEventListener('submit', e => {
        e.preventDefault()
        const button = e.submitter
        button.setAttribute('disabled', '')
        button.innerText = ''

        const loader = createElement('span')
        loader.classList.add('loader')
        button.style.display = 'flex'
        button.style.alignItems = 'center'
        button.style.justifyContent = 'center'
        button.append(loader)

        form.submit()
    })
}

/**
 * Créer un élement avec des attributs si définie
 * 
 * @param {string} tagName 
 * @param {object} attributes 
 * @return {HTMLElement}
 */
export function createElement(tagName, attributes = {}) {
    const element = document.createElement(tagName)
    for(const [attribute, value] of Object.entries(attributes)) { // 'entries' au niveau d'un objet permet d'avoir la valeur et la cléf de l'objet
        if(value !== null) {
            element.setAttribute(attribute, value)
        }
    }
    return element
}

/**
 * Permet de cloner un template
 * 
 * @param {string} id 
 * @returns {DocumentFragment}
 */
export function cloneTemplate(id) {
    return document.getElementById(id).content.cloneNode(true)
}

/**
 * Renvoie un élément HTML représentant une alerte
 * 
 * @param {string} message 
 * @param {string} type 
 * @return {HTMLElement}
 */
export function alertElement(message, type = 'danger') {
    // firstElementChild nous permet d'avoir q'un enfant si non la méthode remove ne marche pas sur le document fragment
    /** @type {HTMLElement} */
    const el = document.querySelector('#alert').content.firstElementChild.cloneNode(true)
    el.classList.add(`alert-${type}`)
    el.querySelector('.js-text').innerText = message
    el.querySelector('button').addEventListener('click', e => {
        e.preventDefault()
        el.remove()
        // On a fermé notre alerte, comme ça on pourra avoir des écouteurs sur le parent
        el.dispatchEvent(new CustomEvent('close')) // On ajoute un évèment personnalisé qu'on pourra traiter
    })
    return el
}

/**
 * Renvoie la hauteur de la fenêtre
 *
 * @return {number}
 */
export function windowHeight () {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}

/**
 * Renvoie la largeur de la fenêtre
 *
 * @return {number}
 */
export function windowWidth () {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
}

/**
 * Version asynchrone du timeout
 *
 * @param {number} duration
 */
export function wait (duration) {
    return new Promise(resolve => {
        window.setTimeout(resolve, duration)
    })
}

/**
 * @param {RequestInfo} url
 * @param params
 * @return {Promise<Object>}
*/
export async function jsonFetch (url, params = {}) {
    if (params.body instanceof FormData) { // Si on reçoit un FormData on le convertit en objet
        params.body = Object.fromEntries(params.body)
    }

    if (params.body && typeof params.body === 'object') { // Si on reçoit un objet on le convertit en chaine JSON
        params.body = JSON.stringify(params.body)
    }
    params = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        ...params
    }

    const response = await fetch(url, params)
    if (response.status === 204) {
        return null
    }
    const data = await response.json()
    if (response.ok) {
        return data
    }
    throw new Error(data, response.status)
}

/**
 * @param {RequestInfo} url
 * @param params
 * @return {Promise<Object>}
 */
export async function jsonFetchOrFlash (url, params = {}) {
    try {
        return await jsonFetch(url, params)
    } catch (e) {
        if (e instanceof ApiError) {
            flash(e.name, 'danger', 4)
        } else {
            flash(e, 'danger', 4)
        }
        return null
    }
}

/**
 * Trouve la position de l'élément par rapport au haut de la page de manière recursive
 *
 * @param {HTMLElement} element
 * @param {HTMLElement|null} parent
 */
export function offsetTop(element, parent = null) {
    let top = element.offsetTop;
    while ((element = element.offsetParent)) {
        if (parent === element) {
            return top;
        }
        top += element.offsetTop;
    }
    return top;
}

/**
 * Transform une chaine en élément DOM
 * 
 * @param {string} str
 * @return {DocumentFragment}
 */
export function strToDom(str) {
    return document.createRange().createContextualFragment(str).firstChild;
}

/**
 * @param {string} selector
 * @return {HTMLElement}
 */
export function $(selector) {
    return document.querySelector(selector);
}

/**
 * @param {string} selector
 * @return {HTMLElement[]}
 */
export function $$(selector) {
    return Array.from(document.querySelectorAll(selector));
}

/**
 * Convertit les données d'un formulaire en objet JavaScript
 *
 * @param {HTMLFormElement} form
 * @return {{[p: string]: string}}
 */
export function formDataToObj(form) {
    return Object.fromEntries(new FormData(form));
}

/**
 * Masque un élément avec un effet de repli
 * @param {HTMLElement} element
 * @param {Number} duration
 * @returns {Promise<boolean>}
 */
export async function slideUpAndRemove (element, duration = 500) {
    const r = await slideUp(element, duration)
    element.parentNode.removeChild(element)
    return r
}

/**
 * Scroll vers l'élément en le plaçant au centre de la fenêtre si il n'est pas trop grand
 *
 * @param {HTMLElement|null} element
 */
export function scrollTo (element) {
    if (element === null) {
        return
    }
    const elementOffset = offsetTop(element)
    const elementHeight = element.getBoundingClientRect().height
    const viewHeight = windowHeight()
    let top = elementOffset - 100
    if (elementHeight <= viewHeight) {
        top = elementOffset - (viewHeight - elementHeight) / 2
    }
    window.scrollTo({
        top,
        left: 0,
        behavior: 'smooth'
    })
}

/**
 * Vérifie si un élément existe et ensuite fais un traitement
 * 
 * @param {HTMLElement} el 
 * @param {callback} callback 
 * @returns 
 */
export function el(el, callback) {
    if(el === null) {
        return
    }
    callback(el)
}

/**
 * Permet de retarder l'exécution de la fonction jusqu'à ce qu'il n'y ai plus d'événements déclenchés pendant une certaine période - input, click, resize, scroll
 */
export function debounce(func, wait, immediate) {
    let timeout
    return function (...args) { // 'args' renvoi un tableau des différents paramètres qui sont passés à la fonction
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            timeout = null
            if (!immediate) {
                func.apply(this, args) // 'this' récupérer l'élément
            }
        }, wait)
        if (immediate && !timeout) {
            func.apply(this, args)
        }
    }
}

/**
 * Permet d'appelé la fonction qu’à des intervalles réguliers - scroll, input, resize
 */
export function throttle(callback, delay) {
    let last
    let timer
    return function () {
        let context = this
        let now = +new Date() // Le temps actuelle
        let args = arguments
        if (last && now < last + delay) {
            // -- Si le délai n'est pas écoulé on reset le timer
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

/**
 * Ajoute des sauts de ligne automatiquement sur une chaine
 *
 * @param {string} str
 * @return {string}
 */
export function nl2br (str) {
    return str.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2')
}

/**
 * Formatte un nombre
 *
 * @param {number} amount
 * @return {string}
 */
export function formatMoney (amount) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount)
}

/**
 * Trouve une valeur aléatoire entre min et max
 *
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function randomBetween (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Force une valeur entre min et max
 *
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function clamp(value, min, max) {
    if (value < min) {
        return min
    }
    if (value > max) {
        return max;
    }
    return value
}

const loadedScripts = [] // Cache les scripts qui ont déjà été chargées sur la page

/**
 * Charge un script de manière asynchrone
 *
 * @param {string|array<string>} url
 * @param {string|null} globalName Nom de la variable générée par le script
 * @return {Promise}
 */
export function importScript (url, globalName = null) {
    if (Array.isArray(url)) {
        return Promise.all(url.map(item => importScript(item)))
    }

    return new Promise((resolve, reject) => {
        if (loadedScripts.includes(url)) {
            resolve(globalName ? window[globalName] : null)
            return
        }
        const t = document.getElementsByTagName('script')[0]
        const script = document.createElement('script')

        script.type = 'text/javascript'
        script.src = url
        script.async = true
        script.onload = script.onreadystatechange = function () {
            if (!loadedScripts.includes(url) && (!this.readyState || this.readyState === 'complete')) {
                loadedScripts.push(url)
                resolve(globalName ? window[globalName] : null)
            }
            }
        script.onerror = script.onabort = reject
        t.parentNode.insertBefore(script, t)
    })
}

export class AutoSubmit extends HTMLFormElement {
    connectedCallback () {
        Array.from(this.querySelectorAll('input, select')).forEach(input => {
            input.addEventListener('change', () => {
                this.submit()
            })
        })
    }
}

/**
 * Représentation d'un commentaire de l'API
 * @typedef {{id: number, username: string, avatar: string, content: string, createdAt: number, replies: CommentResource[]}} CommentResource
 */

/**
 * @param {number} target
 * @return {Promise<CommentResource[]>}
 */
export async function findAllComments (target) {
    return await jsonFetch(`/api/comments?content=${target}`)
}

/**
 * @param {{target: number, username: ?string, email: ?string, content: string}} data
 * @return {Promise<Object>}
 */
export async function addComment (body) {
    return jsonFetch('/api/comments', {
        method: 'POST',
        body
    })
}

/**
 * @param {int} id
 * @return {Promise<null>}
 */
export async function deleteComment (id) {
    return jsonFetch(`/api/comments/${id}`, {
        method: 'DELETE'
    })
}

/**
 * @param {int} id
 * @param {string} content
 * @return {Promise<CommentResource>}
 */
export async function updateComment (id, content) {
    return jsonFetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ content })
    })
}