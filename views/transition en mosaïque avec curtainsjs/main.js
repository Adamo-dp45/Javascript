import {Curtains, Plane} from 'curtainsjs'

function createButton (text, onClick, className) {
    const button = document.createElement('button')
    button.addEventListener('click', onClick)
    button.classList.add(className)
    button.innerText = text
    return button
}

function constraint (value, limit) {
    if (value > limit) {
        return 0
    } else if (value < 0) {
        return limit
    }
    return value
}

/**
 * @property {Curtains} curtain
 * @property {Texture|null} activeTexture
 * @property {Texture|null} nextTexture
 */
class SlideShow {

    currentIndex = 0
    startTime = 0
    speed = 1000
    isChanging = false
    direction = 1

    /**
     * @param {HTMLElement} element
     */
    constructor (element) {
        this.curtain = new Curtains({
        container: document.body,
        pixelRatio: Math.min(2, window.devicePixelRatio)
    })

    // On crée les boutons
    const nextButton = createButton('Suivant', () => this.move(1), 'next')
    const prevButton = createButton('précédent', () => this.move(-1), 'prev')
    element.appendChild(nextButton)
    element.appendChild(prevButton)

    const plane = new Plane(this.curtain, element, {
        vertexShaderID: 'vertexShader',
        fragmentShaderID: 'fragmentShader',
        uniforms: {
            uProgress: {
                name: 'uProgress',
                type: '1f',
                value: 0
            },
            uResolution: {
            name: 'uResolution',
            type: '2f',
            value: [element.clientWidth, element.clientHeight]
            },
            uDirection: {
                name: 'uDirection',
                type: '1f',
                value: 1
            }
        }
        })
        plane.onRender(this.render.bind(this))
        plane.onLoading(() => {
        this.activeTexture = plane.createTexture({
            sampler: 'uActiveTexture',
            fromTexture: plane.textures[0]
        })
        this.nextTexture = plane.createTexture({
            sampler: 'uNextTexture',
            fromTexture: plane.textures[0]
        })
        })
        this.curtain.disableDrawing()
        window.addEventListener('resize', () => {
            plane.uniforms.uResolution.value = [
                element.clientWidth,
                element.clientHeight
            ]
        })
    }

    render () {
        if (this.startTime === 0) {
            return
        }
        const progress = (Date.now() - this.startTime) / this.speed
        const plane = this.curtain.planes[0]
        plane.uniforms.uProgress.value = progress
        if (progress > 1) {
            this.currentIndex = constraint(this.currentIndex + this.direction, plane.images.length - 1)
            this.activeTexture.setSource(plane.images[this.currentIndex])
            this.startTime = 0
            plane.uniforms.uProgress.value = 0
            this.curtain.disableDrawing()
            this.isChanging = false
        }
    }

    /**
     * @param {number} direction
     */
    move (direction) {
        if (this.isChanging) {
            return
        }
        const plane = this.curtain.planes[0]
        const nextIndex = constraint(this.currentIndex + direction, plane.images.length - 1)
        this.nextTexture.setSource(plane.images[nextIndex])
        this.isChanging = true
        this.startTime = Date.now()
        this.direction = direction
        plane.uniforms.uDirection.value = direction
        this.curtain.enableDrawing()
    }

}

new SlideShow(document.querySelector('#slideshow'))
