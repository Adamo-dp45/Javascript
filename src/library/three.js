// --- Three permet de travailler comme dans une scène, dans cette scène on vas créer différents objet et on vas créer une caméra qui va pouvoir regarder ces objets --- //

import { AxesHelper, BoxGeometry, BoxHelper, BufferGeometry, Clock, Float32BufferAttribute, Group, Line, LineBasicMaterial, MathUtils, Mesh, MeshBasicMaterial, MeshNormalMaterial, PerspectiveCamera, PlaneGeometry, Points, PointsMaterial, Scene, SphereGeometry, TextureLoader, WebGLRenderer } from "three"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import { vertexColor } from "three/tsl"

const textureLoader = new TextureLoader() // Pour changer une texture
// const circleTexture = textureLoader.load('/circle.png') -- Fond blanc
// const alphaMap = textureLoader.load('/alphamap.png') -- Fond noir et mieux adapté

const scene = new Scene() // Créer une scène

// -- Img
const texture = textureLoader.load('./2.jpg')
const plane = new Mesh(
    new PlaneGeometry(4, 3), // Largeur et hauteur
    new MeshBasicMaterial({
        map: texture,
        // transparent: true,
        // opacity: 0.5
    })
)
scene.add(plane)
// --

// --
// scene.add(new AxesHelper()) // -- Debug - on peut changer la taille de l'helper dans son constructeur
const camera = new PerspectiveCamera( // Perspective de la caméra
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
)
camera.position.z = 2 // La position z, plus ça augmente et ça zoom
camera.position.y = 0.5 // La positon horizontale de la caméra
camera.position.x = 0.5 // La position verticale de la caméra
scene.add(camera)

const count = 100
const distance = 4
const size = 0.2 // Taille des particules
const points = new Float32Array(count * 3) // On peut créer un simple tableau [], mais celui ci est plus adapté, est construit avec le nombre d'éléments qu'on vas avoir on multiplié par '3' car chaque point a des coordonnées en x,y,z
const colors = new Float32Array(count * 3)
for(let i = 1; i < points.length; i++) { // < count
    points[i] = MathUtils.randFloatSpread(distance * 2)
    // points[i + 1] = MathUtils.randFloatSpread(distance * 2)
    // points[i + 2] = MathUtils.randFloatSpread(distance * 2)
    colors[i] = Math.random() * 0.5 + 0.5 // '* 0.5 + 0.5' pour éviter les couleurs foncés
}

// const cubeGeometry = new BoxGeometry(1, 1, 1)
const geometry = new BufferGeometry() // Permettra de créer des points aléatoirement
geometry.setAttribute('position', new Float32BufferAttribute(points, 3)) // 3 prend les éléments trois par trois vu qu'on aura 300
geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))
const pointsMaterial = new PointsMaterial({
    // color: 0xff0000, -- On va chager les couleurs de manière aléatoire
    vertexColors: vertexColor, // Pour avoir la couleur aléatoirement
    size: size,
    // sizeAttenuation: false -- Permet de retraissir quelque chose qui est éloigné de la caméra

    // map: circleTexture -- Pour changer la texture a utilisé on aura un cercle
    alphaTest: 0.01, // Valeur a laquel ça devient transparent
    transparent: true, // Pour que les textures passe bien l'une sur l'autre
    // alphaMap: alphaMap, -- On peut le charger plutôt que - map, permet d'avoir un univers de particule plus propre
})
const pointsObject = new Points(geometry, pointsMaterial)
// const cube = new Mesh(
//    new BoxGeometry(1, 1, 1), -- Largeur, hauteur, profondeur
//    new MeshNormalMaterial() -- Utiliser pour le debug permet de coloriser les faces en fonction de la caméra
// )
// scene.add(pointsObject)

const group = new Group() // Permettra de faire bouger les particules
// pointsObject.visible = false -- Rendre les points invisible
group.add(pointsObject)

const lineMaterial = new LineBasicMaterial({
    color: 0x000000, // Couleur du trait
    opacity: 0.05,
    // depthTest: false -- Les lignes ne vont pas passé au dessus
    depthWrite: false // Le système de trait n'est plus utilisé dans le calcule de la profondeur
})
const lineObject = new Line(geometry, lineMaterial)
// lineObject.visible = false -- Rendre les lignes invisible
group.add(lineObject)

/*
    group.add( -- Debug, le gros shpère
        new Mesh(
            new SphereGeometry(),
            new MeshNormalMaterial()
        )
    )
*/

scene.add(group)
// --

const renderer =  new WebGLRenderer({
    // canvas: document.querySelector('.canvas'), -- Si je veux afficher mon titre au dessus, 'canvas' permet de spécifier le canvas à utiliser
    antialias: true, // Permet de désactiver l'éffet de pixélisation
    alpha: true // Pour pouvoir changer la couleur de fond
}) // On rend la scène à l'écran
renderer.clearColor(0x000000, 0) // Pour préciser la couleur de fond
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Si on a un éran 4K ou la dansité de pixel est suppérieur à 1, par 2 pour économiser des réssources sur les écrans qui ont une dansité de pixel importante

document.body.appendChild(renderer.domElement) // Rendre la scène

const controls = new OrbitControls(camera, renderer.domElement) // -- Debug : permet de controller la caméra en la fesant bougé, gère la caméra et le contrôle
controls.enableDamping = true // Amortissement pour effet plus fluide
// controls.enablePan = true -- Permet de déplacer la caméra horizontalement et verticalement
// controls.enableZoom = true -- Permet le zoom avant et arrière
// controls.enableRotate = true -- Permet de tourner autour de la photo

const clock = new Clock()
// -- Pour le faire bouger via la souris
let mouseX = 0
window.addEventListener('mousemove', e => {
    mouseX = e.clientX
})

function tick() {
    const time = clock.getElapsedTime()

    renderer.render(scene, camera)
    controls.update() // -- Debug

    // camera.position.x += 0.01 -- Fais bouger la caméra
    // camera.lookAt(0, 0, 0) -- On lui demande de regarder le centre
    requestAnimationFrame(tick) // Permet de relancer une fonction lors d'un nouveau rendu, ici on aura un rendu en permanence

    // group.rotation.y = time * 0.01 -- Permet d'animé, la camera bougera automatiquement au rendu de la page
    const ratio = (mouseX / window.innerWidth - 0.5) * 2 // La caméra bouge en fonction de la souris
    group.rotation.y = ratio * Math.PI * 0.1
}

tick()

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})