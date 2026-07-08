const button = document.querySelector('button')
button.addEventListener('click', function (event) { // "pointerleave" marche avec un pointer
    alert('Bienvenue')
    console.log(
        event.target, // L'élément qui a déclenché l'évènement
        event.currentTarget, // L'élément sur lequel on a cliqué
        this, // this est l'équivalent d'un currentTarget
        event.type, // Le type de l'évènement
        event.timeStamp, // Le temps de l'évènement
        event.clientX, // La position du click dans la fenêtre
        event.clientY // La position du click dans la fenêtre
    )
})

/**
 * @param {PointerEvent} event
*/
function onButtonClick(event) {
    event.preventDefault() // Empêche le comportement par defaut de l'élément
    event.stopPropagation() // Stop la propagation, fait l'évènemnt sur celui qu'on a cliqué et ne remonte pas au autres éléments dans lesquelles il est contenu
    console.log(event.currentTarget) // Me donne les informations sur l'evenement
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', onButtonClick, {
        once: true, // Permet d'écouter l'évènement qu'une seule fois
        capture: false // Indique que l'évènement sera distribué au listener enregistrer avant d'être distribué sur les éléments enfants, si ma div a capture a true la propagation sera inversé, l'évènement ne vas pas décendre vers les enfants mais restera sur lui
    })
})

// Option passive: boolean .. permet de d'indiquer que mon element ne fera jamais de preventDefault() permer d'optimiser les performances .. Ex: Quand on écoute le scrool
document.addEventListener('scroll', (e) => {
    // e.preventDefault() -- Va donner une erreur car par défaut sur les navigateur c'est passive, et quand c'est passive on ne peut pas arrèter

    // element.scrollTop -- Distance entre le haut de l’élément et son contenu visible
    // element.scrollLeft -- Distance horizontale de défilement d’un élément
    // element.scrollHeight -- Hauteur totale du contenu d’un élément, même caché par le scroll
    // element.scrollWidth -- Largeur totale du contenu d’un élément
}, {
    passive: true
})

// element.scrollTo(x, y) -- Déplacer l’élément scrollable à (x, y)
// element.scrollIntoView({ behavior: "smooth" }) -- Faire défiler la page jusqu’à l’élément, 'smooth' pour un scroll fluide

document.querySelector('form').addEventListener('submit', (e) => {
    const form = e.currentTarget
    const data = new FormData(form)
    const firstname = data.get('nom')
    if(firstname.length < 3) {
        e.preventDefault()
    }
})

document.querySelector('input').addEventListener('change', (e) => { // Appeler après qu'on est focus et rempli, et quitter, si on refais en changeant la valeur il est encore appeler
    console.log('Changement..')
})

document.querySelector('input').addEventListener('input', (e) => { // Va detecter quand l'utilisateur tape dans le champ
    console.log('input', e.currentTarget.value)
}) // Sur les inputs on ne peut pas faire de .preventDefault()

document.querySelector('input').addEventListener('focus', (e) => { // Appeler quand un élément à le focus
    console.log('focus')
})

document.querySelector('input').addEventListener('blur', (e) => { // Appeler lorsqu'un élément a été focus et qu'on le quite
    console.log('blur')
})

document.addEventListener('keydown', (e) => { // Permet de detecter quand une cléf est pressé
    if(e.ctrlKey === true && e.key === 'k') {
        e.preventDefault() // Important sinon ça focus la barre d'adresse des navigateurs
        console.log('La touche ctr k')
    }
}) // On peut l'écouter sur n'importe quoi même sur le document et peut être appelé de manière repétitive

document.addEventListener('keypress', e => { // Détecte quand la touche est appuyé
    if(e.key === 'a') {
        console.log('Cléf a appuyé')
    }
})

document.addEventListener('keyup', e => { // Détecte quand la touche est relaché
    if(e.key === 'k') {
        console.log('Cléf k relaché')
    }
})

document.querySelector('input[type="checkbox"]').addEventListener('change', e => {
    console.log(e.currentTarget.checked)
})

document.querySelector('select').addEventListener('change', (e) => {
    console.log(
        e.currentTarget.value, // Option séléctionné
        e.currentTarget.selectedOptions, // Elément séléctionné en HTMLCollection, si le select est multiple on aura plusieurs
        Array.from(e.currentTarget.selectedOptions) // Sous forme de tableau
            .map(option => option.value)
    )
})

let video = document.querySelector('video')
video.addEventListener('play', () => { // On a aussi 'pause', 'ended'
    console.log('Vidéo en lecture')
})

// -- Spoiler
document.querySelectorAll('.spoiler').forEach(spoiler => {
    spoiler.addEventListener('click', e => {
        e.currentTarget.classList.remove('spoiler') // Ici il enlève les spoiler que l'utilisateur clique
    })
})

window.addEventListener('online', () => console.log('En ligne'))
window.addEventListener('offline', () => console.log('Hors ligne'))

// document.addEventListener('contextmenu') -- Le menu contextuelle lors du click droit sur notre page

// -- Revelé tous les spoiler a la fois
// const spoilers = document.querySelectorAll('.spoiler')
// function revealSpoiler () {
//    spoilers.forEach(spoiler => spoiler.classList.remove('spoiler'))
// }
// spoilers.forEach(spoiler => {
//    spoiler.addEventListener('click', revealSpoiler) 
// })


// -- Evènement personnalisé
button.addEventListener('click', e => {
    button.dispatchEvent( // Sync, Lorsqu'on fais un dispatchEvent tous les listeners vont être exécuté de manière sync ensuite on passera à la tâche suivante
        new CustomEvent('delete', { // On peut lui passer des options
            detail: 'Supprime un bouton', // Permet d'afficher plus d'infos dans l'évènement
            bubbles: true // Permet de propager l'évènement
        })
    )
})

button.addEventListener('delete', e => {
    console.log('delete')
})

const e = new CustomEvent('delete', {
    cancelable: true, // Permet d'indiquer si l'évènement peut être annuler ou pas, donne des infos supplémentaires sur l'évènement et on pourra utilisé le .preventDefault() et on peut vérifier s'il a été annuler
})

if(e.defaultPrevented) { // Vérifie si quelqu'un a fais un .preventDefault()
    // return -- On peut décider de ne rien faire dans ce cas
}

// -- Supprimer un évènement
let i = 0
const listner = e => {
    i++
    console.log('click', i)
    if(i >= 3) {
        button.removeEventListener('click', listner) // Permet de supprimer un écouteur d'évènement, on doit séparer la fonction pour pouvoir la réutiliser sinon si on le fait à l'intérieur du addEventListener la fonction est créer à la demande
    }
}
button.addEventListener('click', listner) // On doit utiiliser la même variable pour avoir la même référence
// ---
let img = document.querySelector('img')
img.addEventListener('load', () => { // Quand l'image est chargée
    console.log(
        img.width, // N'est pas la valeur réelle de l'image mais celui des attributs width et height de la balise img
        img.height, // --
        img.naturalWidth, // Valeur réelle de l'image
        img.naturalHeight // --
    )
})
img.addEventListener('error', () => { // Si l'image ne se charge pas
    console.log('L\'image ne s\'est pas chargée')
})
// ---
const pt = document.querySelector('.div')
pt.addEventListener('mousemove', e => { // Lorsque la souris bouge sur l'élément
    console.log(
        e.screenX, // Position du curseur par rapport à l'écran
        e.screenY, // --
        e.pageX, // Position du curseur par rapport à la page, relative à notre document
        e.pageY, // --
        e.offsetX, // Position du curseur par rapport à notre élément div
        e.offsetY // --
    )
})


// -- Événements de souris
/*
    - click : Clique sur un élément
    - dblclick : Double clique
    - contextmenu : clique droit de la souris pour afficher un menu contextuelle
    - mousedown : Bouton de souris enfoncé
    - mouseup : Bouton relâché
    - mousemove : Déplacement souris
    - mouseenter : Entrée dans un élément (ne se propage pas)
    - mouseover : Entrée dans un élément (se propage)
    - mouseleave : Sortir d'un élément (ne se propage pas)
    - mouseout : Sortie d'un élément (se propage)
    - wheel : Molette souris
*/

// -- Événements clavier
/*
    - keydown : Touche enfoncée
    - keypress : Touche enfoncée (déprécié, à éviter)
    - keyup : Touche relâchée
*/

// -- Événements tactiles
/*
    - touchstart : Doigt posé
    - touchmove : Doigt glissé
    - touchend : Doigt levé
    - touchcancel : Annulation
*/

// -- Événements de formulaire
/*
    - submit : Soumission d’un formulaire
    - input : Saisie dans un champ
    - change : Valeur modifiée (perte du focus)
    - focus : Elément actif
    - blur : Perte du focus
    - reset : Reset du formulaire
    - focusin
    - focusout
    - invalid
    - select
*/

// -- Événements liés à la fenêtre - document
/*
    - load : Page ou ressource chargée
    - DOMContentLoaded : DOM chargé sans attendre les images/ressources
    - resize : Redimensionnement fenêtre
    - scroll : Défilement
    - beforeunload : Avant de quitter la page
    - unload : Quand la page est fermée
    - hashchange
    - popstate
    - scrollend
*/

// -- Événements pointeurs - Remplacent souris + tactile + stylet
/*
    - pointermove : Version moderne de mousemove
    - pointerenter : && de mouseenter
    - pointerleave : && de mouseleave
    - pointerdown : && de mousedown
    - pointerup : && de mouseup
    - pointerover
    - pointerout
    - pointercancel
    - gotpointercapture
    - lostpointercapture
*/

// -- Événements multimédia
/*
    - play, pause, ended : Contrôle audio/vidéo
    - timeupdate : Progression du média
    - volumechange : Changement de volume
    - loadeddata, canplay, waiting : Etat de chargement
    abort

    - canplaythrough - durationchange - emptied - error - loadedmetadata - loadstart - playing - progress - ratechange - seeked - seeking - stalled - suspend
*/

// -- Événements animations & transitions CSS
/*
    - animationstart, animationend, animationiteration : CSS animations
    - transitionend : Fin d’une transition CSS
*/

// -- Événements Drag & Drop
/*
    - drag - ragstart - dragend - dragenter - dragover - dragleave - drop
*/

// -- Événements réseau & système
/*
    - online - offline - error (chargement ressource) - abort
*/

// -- Événements divers
/*
    - error : Erreur chargement script/image
    - copy, cut, paste : Presse-papiers
*/