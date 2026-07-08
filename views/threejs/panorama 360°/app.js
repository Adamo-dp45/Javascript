const container = document.body
const tooltip = document.querySelector('.tooltip')
let spriteActive = false

class Scene {

    constructor (image, camera) {
        this.image = image
        this.points = []
        this.sprites = []
        this.scene = null
        this.camera = camera
    }

    createScene (scene) {
        this.scene = scene
        const geometry = new THREE.SphereGeometry(50, 32, 32)
        const texture = new THREE.TextureLoader().load(this.image)
        texture.wrapS = THREE.RepeatWrapping
        texture.repeat.x = -1
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
        })
        material.transparent = true
        this.sphere = new THREE.Mesh(geometry, material)
        this.scene.add(this.sphere)
        this.points.forEach(this.addTooltip.bind(this))
    }

    addPoint (point) {
        this.points.push(point)
    }

    addTooltip (point) {
        let spriteMap = new THREE.TextureLoader().load('info.png')
        let spriteMaterial = new THREE.SpriteMaterial({
            map: spriteMap
        })
        let sprite = new THREE.Sprite(spriteMaterial)
        sprite.name = point.name
        sprite.position.copy(point.position.clone().normalize().multiplyScalar(30))
        this.scene.add(sprite)
        this.sprites.push(sprite)
        sprite.onClick = () => {
            this.destroy()
            point.scene.createScene(scene)
            point.scene.appear()
        }
    }

    destroy () {
        TweenLite.to(this.sphere.material, 1, {
            opacity: 0,
            onComplete: () => {
                this.scene.remove(this.sphere)
            }
        })
        this.sprites.forEach((sprite) => {
            TweenLite.to(sprite.scale, 1, {
                x: 0,
                y: 0,
                z: 0,
                onComplete: () => {
                this.scene.remove(sprite)
                }
            })
        })
    }

    appear () {
        this.sphere.material.opacity = 0
        TweenLite.to(this.sphere.material, 1, {
            opacity: 1
        })
        this.sprites.forEach((sprite) => {
            sprite.scale.set(0, 0, 0)
            TweenLite.to(sprite.scale, 1, {
                x: 1,
                y: 1,
                z: 1
            })
        })
    }

}

// Scene & Controls
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200) // 0.1, 200 tous ce qui est entre 0.1 et 1000 seront visible
const controls = new THREE.OrbitControls(camera)
controls.rotateSpeed = 0.2
controls.enableZoom = false
controls.enablePan = false
controls.enableZoom = false
camera.position.set(-0.1, 0, 0.1)
controls.update()

// Sphere
let s = new Scene('360.jpg', camera)
let s2 = new Scene('3602.jpg', camera)
s.addPoint({
    position: new THREE.Vector3(14, 1.9, -47),
    name: 'Entrée',
    scene: s2
})
s2.addPoint({
    position: new THREE.Vector3(-1, 2, 49.8),
    name: 'Sortie',
    scene: s
})
s.createScene(scene)

// Rendu
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
container.appendChild(renderer.domElement)

function animate () {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

animate()

function onResize () {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
}

const rayCaster = new THREE.Raycaster()

function onClick (e) {
    let mouse = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
    )
    rayCaster.setFromCamera(mouse, camera)
    let intersects = rayCaster.intersectObjects(scene.children)
    intersects.forEach(function (intersect) {
        if (intersect.object.type === 'Sprite') {
            intersect.object.onClick()
            if (spriteActive) {
                tooltip.classList.remove('is-active')
                spriteActive = false
            }
        }
})
/*
    intersects = rayCaster.intersectObject(s.sphere)
    if (intersects.length > 0) {
        console.log(intersects[0].point)
    }
*/
}

function onMouseMove (e) {
    let mouse = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
    )
    rayCaster.setFromCamera(mouse, camera)
    let foundSprite = false
    let intersects = rayCaster.intersectObjects(scene.children)
    intersects.forEach(function (intersect) {
        if (intersect.object.type === 'Sprite') {
            let p = intersect.object.position.clone().project(camera)
            tooltip.style.top = ((-1 * p.y + 1) * window.innerHeight / 2) + 'px'
            tooltip.style.left = ((p.x + 1) * window.innerWidth / 2) + 'px'
            tooltip.classList.add('is-active')
            tooltip.innerHTML = intersect.object.name
            spriteActive = intersect.object
            foundSprite = true
        }
    })
    if (foundSprite) {
        container.classList.add('hover')
    } else {
        container.classList.remove('hover')
    }
    if (foundSprite === false && spriteActive) {
        tooltip.classList.remove('is-active')
        spriteActive = false
    }
}

window.addEventListener('resize', onResize)
container.addEventListener('click', onClick)
container.addEventListener('mousemove', onMouseMove)