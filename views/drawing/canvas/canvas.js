// --- Palette de dession --- //
class Dessin {
    /**
     * @param {HTMLCanvasElement} element 
     */
    constructor(element) {
        this.drow = false // Permet de savoir si quelqu'un déssine ou pas
        this.prevX = 0 // Données précédentes
        this.prevY = 0

        this.canvas = document.querySelector(element)
        this.ctx = this.canvas.getContext('2d')
        this.ctx.strokeStyle = 'black'
        this.ctx.lineWidth = 2

        this.canvas.addEventListener('mousedown', e => {
            this.drow = true // On dessine
            this.prevX = (e.clientX - this.canvas.offsetLeft) * 400 / this.canvas.clientWidth // On stocke les coordonnées de départ
            this.prevY = (e.clientY - this.canvas.offsetTop) * 400 / this.canvas.clientHeight
        })

        this.canvas.addEventListener('mousemove', e => {
            if(this.drow) {
                let currentX = (e.clientX - this.canvas.offsetLeft) * 400 / this.canvas.clientWidth
                let currentY = (e.clientY - this.canvas.offsetTop) * 400 / this.canvas.clientHeight
                this.dessine(this.prevX, this.prevY, currentX, currentY)
                this.prevX = currentX
                this.prevY = currentY
            }
        })

        this.canvas.addEventListener('mouseup', () => { // Si je laisse la souris
            this.drow = false
        })

        this.canvas.addEventListener('mouseout', () => { // Si je sort du cercle
            this.drow = false
        })
    }

    dessine(depX, depY, destX, destY) {
        this.ctx.beginPath()
        this.ctx.moveTo(depX, depY)
        this.ctx.lineTo(destX, destY)
        this.ctx.closePath()
        this.ctx.stroke()
    }

    setColor(color) {
        this.ctx.strokeStyle = color
    }

    biggerStroke() {
        this.ctx.lineWidth++
    }

    smallerStroke() {
        this.ctx.lineWidth = (this.ctx.lineWidth > 1) ? this.ctx.lineWidth - 1 : 1
    }

    erase() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}

let canva = new Dessin('#feuille')

document.querySelectorAll('#palette div').forEach((element) => {
    element.style.backgroundColor = element.dataset.color

    element.addEventListener('click', () => { // Change la couleur au clic
        canva.setColor(element.dataset.color)
    })
})

document.querySelector('#plus').addEventListener('click', () => {
    canva.biggerStroke()
})

document.querySelector('#moins').addEventListener('click', () => {
    canva.smallerStroke()
})

document.querySelector('#gomme').addEventListener('click', () => {
    canva.setColor('white')
})

document.querySelector('#croix').addEventListener('click', () => {
    canva.erase()
})

// --- Dessein canvas --- //
window.onload = () => {
    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d') // Usage, pas obligé

    // -- Rectangle plain
    ctx.fillStyle = 'blue'
    ctx.fillRect(300, 200, 50, 150)
    // -- Rectangle plain avec bordure
    ctx.strokeStyle = 'red'
    ctx.strokeRect(20, 20, 100, 100)
    ctx.fillRect(20, 20, 100, 100)
    // -- Triangle
    ctx.fillStyle = 'red'
    ctx.beginPath() // On démare un chemin
    ctx.moveTo(200, 200) // Coordonnées de l'endroit ou on vas plaçer notre crayon
    ctx.lineTo(100, 200) // Ligne droite
    ctx.lineTo(100, 300)
    ctx.fill() // Remplir la forme
    // -- Cercle
    ctx.beginPath()
    ctx.arc(300, 100, 25, 0, 90, false) // true - Tourne dans le sens d'aiguile d'une montre, 90 ou MATH.PI * 2
    ctx.fill()
}

// --- Signature --- //
class Signature {

    /**
     * @param {HTMLCanvasElement} el 
     */
    constructor(el) {
        this.sign = false
        this.prevX = 0
        this.prevY = 0

        this.canvas = document.querySelector(el)
        this.ctx = this.canvas.getContext('2d')
        this.ctx.strokeStyle = 'red'
        this.ctx.lineWidth = 2

        this.canvas.addEventListener('mousedown', e => {
            this.sign = true // On commençe à signé
            this.prevX = e.clientX - this.canvas.offsetLeft
            this.prevY = e.clientY - this.canvas.offsetTop
        })

        this.canvas.addEventListener('mousemove', e => {
            if(this.sign) {
                let currentX = e.clientX - this.canvas.offsetLeft
                let currentY = e.clientY - this.canvas.offsetTop
                this.signer(this.prevX, this.prevY, currentX, currentY)
                this.prevX = currentX
                this.prevY = currentY
            }
        })

        this.canvas.addEventListener('mouseup', () => { // Si je laisse la souris
            this.sign = false
        })

        this.canvas.addEventListener('mouseout', () => { // Si je sort du cercle
            this.sign = false
        })
    }

    signer(depX, depY, destX, destY) {
        this.ctx.beginPath()
        this.ctx.moveTo(depX, depY) // On démare le chemin au coordonnées de départ
        this.ctx.lineTo(destX, destY) // On dessine jusqu'au deux coordonnées de destination
        this.ctx.closePath()
        this.ctx.stroke()
    }

    erase() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    generateImg() {
        let image = this.canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
        location.href = image // Télécharge directement l'image
        // return image -- Retourne du base 64 pour backend
    }
}

let signature = new Signature('#signature')
document.querySelector('#effacer').addEventListener('click', e => {
    e.preventDefault()
    signature.erase()
})
document.querySelector('#enregistrer').addEventListener('click', e => {
    e.preventDefault()
    signature.generateImg()

    // Requête ajax pour enregistrer l'image sur notre serveur en envoyant l'image dans le body, voir image canvas 
})