// -- utctime.net - Format de date ISO-8601

/*
    -- Sol 1 : On calcule la différence de date côté serveur et on envoi la différence au client
        - Calculer la différence en seconde entre les deux dates
        - On crée un objet qui contient les heures, minutes, secondes
        - On va envoyer cet objet à une fonction qui mettra à jour l'HTML

    -- Sol 2 : Le serveur nous renvoi une date et la compare à celle du client et on aura le nombre de secondes de différence et on vas pouvoir faire notre calcule, mais l'inconvenient est que si l'utilisateur a l'heure de son ordinateur qui décale de quelque minutes ça peut provoquer des problèmes
*/

const MINUTES = 60
const HOURS = 60 * MINUTES
const DAYS = 24 * HOURS
const elements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
}

let previousDiff = {} // Permet de mettre en cache la 'diff' si elle ne change pas comme 'days'
const countdown = document.querySelector('#countdown')
const launchDate = Date.parse(countdown.dataset.time) / 1000 // On converti au format 'timestamp', on divise par 1000 pour l'avoir en 's' au de 'ms'

function refreshCountdown() {
    const difference = launchDate - Date.now() / 1000

    // if (difference <= 0) { -- Va actualiser la page boucle si la date est dépasser si notre serveur ne change pas la page
    //    document.location.reload() -- Relance l'actualisation de la page si la date est dépassée
    //    return
    // }

    // La deuxième solution est de ne pas lancer la fonction 'refreshCountdown' si le compteur est déjà à 0
    if(difference <= 0) {
        return
    }

    const diff = {
        days: Math.floor(difference / DAYS), // Calcule du nombre de jours
        hours: Math.floor(difference % DAYS / HOURS), // -
        minutes: Math.floor(difference % HOURS / MINUTES), // -
        seconds: Math.floor(difference % MINUTES) // -
    }
    updateDom(diff)

    console.log('Hello')

    // -- Pour le poling, on peut utiliser un interval qui va s'exécuter tous les n secondes, ou utiliser un timeout qui va s'exécuter au bout d'une seconde et à la fin de ce timeout on lui demande de se réenclancher et on aura l'avantage de le mettre en pause si nécéssaire
    window.setTimeout(() => {
        window.requestAnimationFrame(refreshCountdown) // Sans le 'requestAnimationFrame' si l'utilisateur ouvre une autre fenêtre le code continurai à s'exécuter donc il permet d'optimiser les performences - On l'appelle lorsqu'il y'a un nouveau redessin qui fais
    }, 1000)
}

/**
 * Met à jour la structure HTML en fonction d'un nouvel interval
 * @param {{days: number, hours: number, minutes: number, seconds: number}} diff 
 */
function updateDom(diff) {
    Object.keys(diff).forEach((key) => { // Object.keys : Permet de récupérer les cléfs d'un objet
        if (previousDiff[key] !== diff[key]) {
            elements[key].innerText = diff[key]
        }
    })
    previousDiff = diff
} // Ou .. document.getElementById('days').innerText = diff.days

refreshCountdown()


// --- CustomElement --- //
const DAY = 1000 * 60 * 60 * 24
const HOUR = 1000 * 60 * 60
const MINUTE = 1000 * 60

class TimeCountdown extends HTMLElement {
    connectedCallback () {
        const timestamp = parseInt(this.getAttribute('time'), 10) * 1000
        const date = new Date(timestamp)
        this.updateText(date)
    }

    disconnectedCallback () {
        window.clearTimeout(this.timer)
    }

    updateText (date) {
        const now = new Date().getTime()
        const distance = date - now
        const days = Math.floor(distance / DAY)
        const hours = Math.floor((distance % DAY) / HOUR)
        const minutes = Math.floor((distance % HOUR) / MINUTE)
        const seconds = Math.floor((distance % MINUTE) / 1000)
        if (distance < 0) {
            this.innerText = ''
            return ''
        }
        let timeInterval = 1000
        if (days > 0) {
            this.innerText = `${days}j ${hours}h`
            timeInterval = HOUR
        } else if (hours > 0) {
            this.innerText = `${hours}h ${minutes}m`
            timeInterval = MINUTE
        } else {
            this.innerText = `${minutes}m ${seconds}s`
        }
        if (distance > 0) {
            this.timer = window.setTimeout(() => {
                if (window.requestAnimationFrame) {
                    window.requestAnimationFrame(() => this.updateText(date))
                } else {
                    this.updateText(date)
                }
            }, timeInterval)
        }
    }
}

customElements.define('time-countdown', TimeCountdown)