if (NodeList.prototype.forEach === undefined) { // Ce poliflie permet d'utiliser un forEach sur une NodeList
    NodeList.prototype.forEach = function (callback) {
        [].forEach.call(this, callback)
    }
}

const temp = [
    {
        time: 45,
        divide: 60,
        text: 'moins d\'une minute'
    }, {
        time: 90,
        divide: 60,
        text: 'environ une minute'
    }, {
        time: 45 * 60,
        divide: 60,
        text: '%d minutes'
    }, {
        time: 90 * 60,
        divide: 60 * 60,
        text: 'environ une heure'
    }, {
        time: 24 * 60 * 60,
        divide: 60 * 60,
        text: '%d heures'
    }, {
        time: 42 * 60 * 60,
        divide: 24 * 60 * 60,
        text: 'environ un jour'
    }, {
        time: 30 * 24 * 60 * 60,
        divide: 24 * 60 * 60,
        text: '%d jours'
    }, {
        time: 45 * 24 * 60 * 60,
        divide: 24 * 60 * 60 * 30,
        text: 'environ un mois'
    }, {
        time: 365 * 24 * 60 * 60,
        divide: 24 * 60 * 60 * 30,
        text: '%d mois'
    }, {
        time: 365 * 1.5 * 24 * 60 * 60,
        divide: 24 * 60 * 60 * 365,
        text: 'environ un an'
    }, {
        time: Infinity,
        divide: 24 * 60 * 60 * 365,
        text: '%d ans'
    }
]

document.querySelectorAll('[data-ago]').forEach(function (node) {

    let date = parseInt(node.dataset.ago, 10)

    function setText () {
        let secondes = Math.floor((new Date()).getTime() / 1000 - date) // .getTime - Renvoi un timestamp de la date 
        let prefix = secondes > 0 ? 'Il y a ' : 'Dans '
        let term = null
        secondes = Math.abs(secondes)
        for (term of temp) {
            if (secondes < term.time) {
                break
            }
        }
        node.innerHTML = prefix + term.text.replace('%d', Math.round(secondes / term.divide))

        let nextTick = secondes % term.divide
        if (nextTick === 0) {
            nextTick = term.divide
        }

        window.setTimeout(function () {
        if (node.parentNode) { // Si mon neaud n'a plus de parent tu ne fais rien
            if (window.requestAnimationFrame) { // Pour supporter les vieux navigateur
                window.requestAnimationFrame(setText) // Quand tu es prêt à rendre la page
            } else {
                setText()
            }
        }
        }, nextTick * 1000) // Ici je le multiplie par mille car avec nextTick j'ai fais le calcul en seconde
    }
    setText()
})


// -- CustomElement
const terms = [
    {
        time: 45,
        divide: 60,
        text: "moins d'une minute"
    },
    {
        time: 90,
        divide: 60,
        text: 'environ une minute'
    },
    {
        time: 45 * 60,
        divide: 60,
        text: '%d minutes'
    },
    {
        time: 90 * 60,
        divide: 60 * 60,
        text: 'environ une heure'
    },
    {
        time: 24 * 60 * 60,
        divide: 60 * 60,
        text: '%d heures'
    },
    {
        time: 42 * 60 * 60,
        divide: 24 * 60 * 60,
        text: 'environ un jour'
    },
    {
        time: 30 * 24 * 60 * 60,
        divide: 24 * 60 * 60,
        text: '%d jours'
    },
    {
        time: 45 * 24 * 60 * 60,
        divide: 24 * 60 * 60 * 30,
        text: 'environ un mois'
    },
    {
        time: 365 * 24 * 60 * 60,
        divide: 24 * 60 * 60 * 30,
        text: '%d mois'
    },
    {
        time: 365 * 1.5 * 24 * 60 * 60,
        divide: 24 * 60 * 60 * 365,
        text: 'environ un an'
    },
    {
        time: Infinity,
        divide: 24 * 60 * 60 * 365,
        text: '%d ans'
    }
]

/**
 * Custom element permettant d'afficher une date de manière relative
 * @property {number} timer
 */
class TimeAgo extends HTMLElement {

    connectedCallback () {
        const timestamp = parseInt(this.getAttribute('time'), 10) * 1000
        const date = new Date(timestamp)
        this.updateText(date)
    }

    disconnectedCallback () {
        window.clearTimeout(this.timer)
    }

    updateText (date) {
        const seconds = (new Date().getTime() - date.getTime()) / 1000
        let term = null
        const prefix = this.getAttribute('prefix')
        for (term of terms) {
            if (Math.abs(seconds) < term.time) {
            break
            }
        }
        if (seconds >= 0) {
            this.innerHTML = `${prefix || 'Il y a'} ${term.text.replace('%d', Math.round(seconds / term.divide))}`
        } else {
            this.innerHTML = `${prefix || 'Dans'} ${term.text.replace('%d', Math.round(Math.abs(seconds) / term.divide))}`
        }
        let nextTick = Math.abs(seconds) % term.divide
        if (nextTick === 0) {
            nextTick = term.divide
        }
        if (nextTick > 2147482) {
            return
        }
        this.timer = window.setTimeout(() => {
            window.requestAnimationFrame(() => {
                this.updateText(date)
            })
        }, 1000 * nextTick)
    }
}

customElements.define('time-ago', TimeAgo)
// <time-ago time="1752606500"></time-ago>