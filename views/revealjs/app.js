// -- Permet de créer des présentations avec HTML, Css et Javascript
import Reveal from 'reveal.js'
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js'
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js'
import RevealNotes from 'reveal.js/plugin/notes/notes.esm.js'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/dracula.css'
import 'reveal.js/plugin/highlight/monokai.css'

// let deck = new Reveal({
//    plugins: [Markdown],
// })

Reveal.initialize({
    // width: 1920, -- Pour prendre en compte notre écran
    // height: 1080
    hash: true, // Pour activer la navigation par hash
    plugins: [RevealNotes, Markdown, Highlight],
})

// Exporter sous forme de PDF, on tape dans l'url '?print-pdf'
// Lorsqu'on active le 'RevealNotes' on a la possibilité en appuyant sur la touche 's' dans le navigateur d'activer la 'Spiker view' qui nous permettra d'obsever la section suivante
// 'Markdown' permet de créer du slide directement en utilisant du markdown
// 'Highlight' pour interpreter la syntaxe des langages

// slides.com : Permet aussi de faire des présentations en proposant un éditeur visuel