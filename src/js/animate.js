const button = document.querySelector('button')
button.animate([
    { 
        transform: 'translateY(0px)',
        color: 'red',
        rotate: '10deg'
    }, // On commençe par ça, on n'est pas obligé de mettre la position de depart
    { transform: 'translateY(100px)', color: 'blue', rotate: '0deg' } // On finit par ça
], {
    duration: 1000, // Durée de l'animation
    iterations: Infinity, // Nombre d'itérations, si on met 2 ça fait 2 fois l'animation
    direction: 'alternate', // Sens de l'animation
    easing: 'ease-in-out', // Accélération
    fill: 'forwards' /*
        Une fois l'animation terminée, on peut choisir de garder le style final ou initial :
            'both' : Reste sur la position final de l'animation
            'backwards' : Garde la position initiale
            'forwards' : Garde la position final
            'none' : Ne garde aucun style
    */
})

// --- Reveal --- //
const ratio = .1
const options = {
    root: null, // L'élément racine, elle servira de zone d'affichage, dans notre cas on veut détecter quand l'élément est visible dans notre écran
    rootMargin: '0px', // Marge sur les côté de notre zone d'affichage pour dire il faut que ça aille dépassé cette marge pour être visible
    threshold: ratio // Permet d'indiquer à partir de quelle moment notre système d'intersection va être détecté, 1 veut dire que l'entièreté de l'élément doit être visible à l'ècran
}

const handleIntersect = function (entries, observer) {
    entries.forEach(function (entry) {
        if(entry.intersectionRatio > ratio) {
            entry.target.classList.remove('reveal')
            observer.unobserve(entry.target) // Si l'élément est visible on arrête de l'observer
        }
    })
}

document.documentElement.classList.add('reveal-loader') // Si je veux que tous le bloc de reveal s'affiche en une fois, sinon je peux laisser le faite que si l'utilisateur scroll qu'à moitié certains éléments restent invisible jusqu'a ce qu'il soit vu --
window.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver(handleIntersect, options)
    this.document.querySelectorAll('.reveal').forEach(function (r) { // A ce niveau je laisse [class*="reveal-"] --
        observer.observe(r)
    })
})

// --- Dark mode --- //
const toggle = document.querySelector('.toggle')
const body = document.body
const getTheme = localStorage.theme

if(getTheme) {
    body.classList.add(getTheme)
}

toggle.addEventListener('click', () => {
    body.classList.toggle("dark")
    const theme = body.classList.contains('dark') ? 'dark' : ''
    localStorage.theme = theme
})

// -- Pour utiliser le thème de Google
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    body.classList.remove('dark')
    localStorage.theme = ''
    if(e.matches) {
        body.classList.add('dark')
        localStorage.theme = 'dark'
    }
})

// -- Avec un checkbox
/*
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    if(isDarkMode) {
        document.body.classList.add('dark')
        toggle.classList.add("active")
        toggle.setAttribute("checked", '')
    }
    toggle.addEventListener('click', () => {
        toggle.classList.toggle("active");
        toggle.setAttribute("checked", '')
        document.body.classList.toggle('dark')
        const darkModeEnabled = document.body.classList.contains('dark')
        localStorage.setItem('darkMode', darkModeEnabled)
    })
*/

// --- Animation frame --- //
const requestAnimation = document.querySelector('.request')
let left = 0
const updateLeft = function() {
    requestAnimation.classList.add('right')
    window.setTimeout(function () {
        requestAnimationFrame(function() {
            requestAnimation.classList.remove('right')
            window.setTimeout(function() {
                requestAnimationFrame(updateLeft)
            }, 3000)
        })
    }, 3000)
}
requestAnimationFrame(updateLeft)

/*
    const updateLeft = function () {
        left = left + 10
        if(left > 550) {
            left = 0
        }
        requestAnimation.style.transform = 'translateX(' + left + 'px)'
        requestAnimationFrame(updateLeft)
    }
    requestAnimationFrame(updateLeft)
*/
// setTimeout(() => cancelAnimationFrame(animationId), 2000) -- Annuler après 2 secondes
// setInterval(updateLeft, 18)

// --- Scroll reveal --- //
const revealElements = document.querySelectorAll("[data-reveal]")
const scrollReval = () => {
    for(let i = 0, len = revealElements.length; i < len; i++) {
        const isElementOnScroll = revealElements[i].getBoundingClientRect().top < window.innerHeight
        if(isElementOnScroll) {
            revealElements[i].classList.add('revealed')
        } else {
            revealElements[i].classList.remove('revealed')
        }
    }
}
window.addEventListener('scroll', scrollReval)
window.addEventListener('load', scrollReval)