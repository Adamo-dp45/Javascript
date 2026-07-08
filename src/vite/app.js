// import './style.css'
import './style.scss'
import background from '../images/Partage reseaux - 2025-08-09 011549.png'

import('./counter.js').then((module) => {
    module.setupCounter(document.querySelector('button'))
})

console.log(background)
console.log(import.meta.env.VITE_NAME)