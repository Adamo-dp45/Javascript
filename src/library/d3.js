import { create } from "d3"
import { update } from "three/examples/jsm/libs/tween.module.js"

const width = window.innerWidth 
const height = window.innerHeight

const $svg = create('svg') // Ce 'svg' créer n'est pas directement un élément html mais une 'Selection' un peu comme le querySelectorAll
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)

const data = [
    {color: 'red', x: 100, y: 100},
    {color: 'green', x: 200, y: 200},
    {color: 'blue', x: 300, y: 150},
]

$svg.selectAll()
    .data(data, d => d.color) // Prend en deuxième params une cléf ou id pour chaque élément
        .join('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('fill', d => d.color)
        .attr('r', 10)

setTimeout(() => {
    const data = [
        {color: 'red', x: 100, y: 100},
        {color: 'green', x: 200, y: 200}
    ]
    $svg.selectAll('circle')
        .data(data, d => d.color)
        .join(
            enter => enter,
            update => update
                .transition()
                .duration(700)
                .attr('cx', d => d.x)
                .attr('cy', d => d.y),
            exit => exit
                .transition()
                .duration(700)
                .attr('r', 0)
                .remove()
        )
}, 1000)

document.body.appendChild($svg.node()) // '.node' pour avoir le noeaud html qui correspond à l'élément