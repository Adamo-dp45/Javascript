import Button from "bootstrap/js/src/button"
import Collapse from "bootstrap/js/src/collapse"
import Al from 'bootstrap/js/src/alert'
import Carousel from 'bootstrap/js/src/carousel'
import Dropdown from 'bootstrap/js/src/dropdown'
import Moda from 'bootstrap/js/src/modal'
import Offcanvas from 'bootstrap/js/src/offcanvas'
import Tabu from 'bootstrap/js/src/tab'
import Popover from 'bootstrap/js/src/popover'
import ScrollSpy from 'bootstrap/js/src/scrollspy'
import Toast from 'bootstrap/js/src/toast'
import Tooltip from 'bootstrap/js/src/tooltip'
// ----- //
import './css/app.css'
// ----- //
import ScrollTop from "./js/modules/ScrollTop"
import '@grafikart/drop-files-element'
import SpinningDots from '@grafikart/spinning-dots-element'
import { Modal } from "./js/modules/Modal"
import Tabs, { TabLink } from "./js/modules/Tabs"
import { Alert, flash, FloatingAlert } from "./js/modules/Alert"
import Skeleton from "./js/modules/Skeleton"
import CookieBanner from "./js/modules/CookieBanner"
// ----- //
import { Flipper } from 'flip-toolkit'
import Swup from 'swup'
import EasyMDE from "easymde"
import * as FilePond from 'filepond'
import 'filepond/dist/filepond.min.css'
import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"
import { French } from "flatpickr/dist/l10n/fr"
import { Theme } from "flatpickr/dist/themes/confetti.css"
import $ from 'jquery'
import select2 from 'select2'
import "select2/dist/css/select2.css"
import $script from "scriptjs"
// ----- //
import './js/menu'
import { jsPDF } from 'jspdf'
import { writeFile, utils } from 'xlsx'
import Turbolinks from 'turbolinks'
import './library/Tilt'
import 'dropzone/dist/dropzone.css'
import Dropzone from 'dropzone'
// import 'htmx.org'

try {
    customElements.define('spinning-dots', SpinningDots)
} catch(e) {
    if(e instanceof DOMException) {
        console.error('DOMException: ' + e)
    } else {
        throw e
    }
}
ScrollTop.register()
Modal.register()
Tabs.register()
customElements.define('tab-bar', TabLink)
customElements.define('alert-message', Alert)
customElements.define('alert-floating', FloatingAlert)
customElements.define('skeleton-box', Skeleton)
function toast ({
    element, message,
    color = 'red',
    durationStart = 10,
    durationEnd = 3000
}) {
    const toast = document.createElement('div')
    toast.className = 'toast'
    if(color !== null) {
        toast.style.backgroundColor = color
    }
    toast.textContent = message
    element.appendChild(toast)

    setTimeout(() => {
        toast.classList.add('show')
    }, durationStart)

    setTimeout(() => {
        toast.classList.remove('show')

        setTimeout(() => {
            element.removeChild(toast)
        }, durationEnd)
    }, durationEnd)
}
toast({
    element: document.querySelector('#toast'),
    message: 'Notification Toast',
    color: 'green'
})
customElements.define('cookie-banner', CookieBanner)
// ----- //
Turbolinks.start()

document.addEventListener('turbolinks:load', () => {
    console.log(
        'Au chargement de la page'
    )
})

document.addEventListener('turbolinks:request-start', () => { // Permet d'afficher le loader dès que l'utilisateur clique sur un lien
    // document.getElementById('loader').style.display = 'block'
})

document.addEventListener('turbolinks:before-visit', function(event) { // Permet d'écouter certains événements pour déclencher des actions avant ou après la redirection
    console.log(
        'Redirection en cours...'
    )
})

/*
    - Pour éviter de réavaluer le js on mais dans le script data-turbolinks-eval='false'
    - Pour ne pas qu'il applique a nouveau le 'load' sur le retour, il a doit avoir l'attribut data-appended='true'
    - Pour qu'un element soit permanent de page en page on lui donne un id et on lui ajoute l'attribut
        - data-turbolinks-permanent - Ex une sidebar : Si on modifie à l'inspecteur il sera conserver
    - Pour desactiver le cache sur une page on met la balise <meta name="trubolinks-cache-control" content="no-cache" /> - La page sera chargé a nouveau à chaque fois
    - Pour personnaliser la progress bar dans le css '.turbolinks-progress-bar'
    - Pour la redirection : La page qui redirige fera header('Location: /') - La page sur laquelle on n'est rediriger fera header('Turbolinks-Location: /') pour pouvoir détecter l'url
    - Pour qu'il prenne en charge les modification des assets on donne attribut data-turbolinks-track='reload' a notre balise script de default.php
        - Ce qui veut dire que lorsque le js a changer je veut que tu recharge ce fichier dark.js par Ex, et pour que ca fonction on utilise le versionning des assets et il faut que le script soit dans la partie head, fonctionne aussi sur les links et sur les meta
    - Pour lui indiquer de prendre en root que tous les liens qui commence par /admin on utilise une <meta name="turbolinks-root" content="/admin">
    - data-turbolinks='false' permet de désactiver turbolinks pour des liens ou des boutons spécifiques, cela force un rechargement complet de la page
    - Pour déclancher un rechargement complet de la page <meta name="trubolinks-visit-control" content="reload" />
    - Turbolinks.clearCache() -- Supprime les pages mis en cache par turbolinks
    - Turbolinks.visit('/nouvelle-page') -- Redirection vers une nouvelle page sans recharger entièrement
*/

// ----- //
const swup = new Swup({ // Si on ne met pas de params par défaut il cherche un élément qui l'id swupp et c'est lui qu sera remplacé d'une page à l'autre comme un block content
    plugins: [
        // new SwupThme() -- On peut rajouter des thème - Doc - Avec ça plus besoin du css de transition-fade
    ],
    // cache: false -- Pour activer le cache
})
// swup.on('contentReplaced', demo) -- Lors du chargement de la page
// swup.on('WillReplaceContent', demo) -- Lors du remplaçement de la page, on pourrait supprimer des évènements
// ----- //
flatpickr("#piker", {
    locale: French,
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    minDate: "today",
    maxDate: new Date().fp_incr(100), // Jours à partir de maintenant
    // defaultDate: "2024-08-13",
})
// ----- //
$('[data-select]').select2({ // .on('change', function() { $(this).val() - Valeur du champ }) -- Change
    placeholder: "Sélectionnez un pays", // Ou dans le html
    allowClear: true, // Permet de supprimer la sélection
    // data: countries -- On peut lui envoyer des données en amont
    // tags: true,
    // tokenSeparators: [',', ' '] // Ceux par quoi on peut séparer
    // minimumInputLength: 2,
    // ajax: { -- Requête ajax
    //      url: 'https://api',
    //      dataType: 'json',
    //      delay: 250,
    //      processResults: function (data) {
    //          return {
    //              results: data.items
    //      }
    // }, cache: true }
})
// ----- //
new EasyMDE({
    element: document.getElementById('mdn'),
    toolbar: ["bold", "italic", "heading", "code", "quote", "strikethrough", "undo", "|", "link", "image", "|", "preview", "side-by-side", "fullscreen"],
    spellChecker: false,  // Désactiver le correcteur orthographique si non nécessaire
    placeholder: "Rédigez votre texte en Markdown...",
})
// --- Partage sur les réseaux sociaux --- //
/*
    let focus = window.open('http://localhost', 'Partage', 'scrollbars=yes, width=640, height=340, top=0, left=0') -- Permet d'ouvrir une fenêtre, Partage nom de la fenêtre
    focus.focus() -- On veut forcer le focus sur cette fenêtre
*/
// ----- //
FilePond.create(document.querySelector('.filepond'), {
    // labelIdle: `Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`,
    // imagePreviewHeight: 170,
    // imageCropAspectRatio: '1:1',
    // imageResizeTargetWidth: 200,
    // imageResizeTargetHeight: 200,
    // stylePanelLayout: 'compact circle',
    // styleLoadIndicatorPosition: 'center bottom',
    // styleProgressIndicatorPosition: 'right bottom',
    // styleButtonRemoveItemPosition: 'left bottom',
    // styleButtonProcessItemPosition: 'right bottom',
})
// --- Header scroll --- //
let lastScrollY = window.scrollY
let navbar = document.querySelector('.header')
window.addEventListener('scroll', () => {
    let currentScrollY = window.scrollY
    if (currentScrollY > lastScrollY) {
        navbar.style.transform = 'translateY(-100%)' // Si on défile vers le bas la navigation est caché
    } else {
        navbar.style.transform = 'translateY(0)' // Si on défile vers le haut la navigation est affiché
    }
    lastScrollY = currentScrollY
})
// ----- //
const alert = document.querySelectorAll('.m-alert-close')
if(alert !== null) {
    alert.forEach(close => {
        close.addEventListener('click', function() {
            this.parentElement.style.display = 'none'
        })
    })
}
// ----- //
const bottom = document.querySelector('.bottom')
bottom.addEventListener("click", function () {
    window.scrollBy({
        top: document.body.scrollHeight, // permet d'aller tout en bas de la page, ou 'window.innerHeight  * 100' pour ajuster
        behavior: "smooth"
    })

    /*
        -- Descendre d’une hauteur de fenêtre
            const step = window.innerHeight
            window.scrollTo({ top: window.scrollY + step, behavior: 'smooth' })
    */
})
// --- Export --- //
const buttonPdf = document.getElementById('pdf')
if(buttonPdf !== null) {
    buttonPdf.addEventListener('click', e => {
        const jsPdf = new jsPDF()
        const tablePdf = document.getElementById('table').innerHTML
        jsPdf.html(tablePdf, { // 'html' permet d'ajouter un contenu HTML dans le Pdf
            callback: function (jspdf) {
                jspdf.save('rapport.pdf')
            },
            margin: [10, 10, 10, 10]
        })
    })
}
// ----- //
const buttonXlsx = document.getElementById('excel')
if(buttonXlsx !== null) {
    buttonXlsx.addEventListener('click', e => {
        const tableExcel = document.getElementById('table');
        const wb = utils.table_to_book(tableExcel, { // Convertir le tableau HTML en un format compatible avec Excel
            sheet: 'Sheet 1'
        })
        writeFile(wb, 'rapport.xlsx') // On sauvegarde le fichier
    })
}
// ----- //
const cursorDot = document.querySelector("[data-cursor-dot]")
const cursorOutline = document.querySelector("[data-cursor-outline]")

window.addEventListener('DOMContentLoaded', () => { // Charger la dernière position du curseur
    const savedX = localStorage.getItem('cursorX')
    const savedY = localStorage.getItem('cursorY')
    if (savedX && savedY) {
        cursorDot.style.left = `${savedX}px`
        cursorDot.style.top = `${savedY}px`
        cursorOutline.style.left = `${savedX}px`
        cursorOutline.style.top = `${savedY}px`
    }
})

window.addEventListener("mousemove", function(e) {
    const posX = e.clientX
    const posY = e.clientY
    localStorage.setItem('cursorX', posX)
    localStorage.setItem('cursorY', posY)
    cursorDot.style.left = `${posX}px`
    cursorDot.style.top = `${posY}px`

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, {
        duration: 500,
        fill: 'forwards'
    })
})
// ----- //
const grid = document.getElementById('grid')
const toggleButton = document.getElementById('toggle-view')
toggleButton.addEventListener('click', () => {
    if (grid.classList.contains('list-view')) {
        grid.classList.remove('list-view')
        grid.classList.add('grid-view')
        toggleButton.textContent = 'Changer en Liste'
    } else {
        grid.classList.remove('grid-view')
        grid.classList.add('list-view')
        toggleButton.textContent = 'Changer en Grille'
    }
})
// ----- //
/*
    const tabs = document.querySelector('.tabs')
    tabs.addEventListener('click', e => {
        const tabsContent = document.querySelectorAll('.tab')
        Array.from(tabs.children).forEach((item) => {
            if(item.dataset.id === e.target.dataset.id) {
                item.classList.add('active')
            } else {
                item.classList.remove('active')
            }
        })
        tabsContent.forEach((item) => {
            if(item.id === e.target.dataset.id) {
                item.classList.add('active')
            } else {
                item.classList.remove('active')
            }
        })
    })
*/
// ----- //
const dropzone = document.querySelector('.dropzone')
new Dropzone(dropzone, {
    // url: "/file/post"
})