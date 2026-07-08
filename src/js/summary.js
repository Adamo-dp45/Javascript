/*
    - On cherche tous les titres dans un container
    - On prépare l'élément qui va accueillir notre somaire
    - Pour chaque titre
        On crée un lien <li><a>Lien</a></li>
        On le place dans le <ul> du parent (suivant le niveau)
            Si le parent n'a pas de <ul> on le crée
        On grèffe l'évènement pour le scroll
*/

const container = document.getElementById('content')
const tocContainer = document.querySelector('.summary')
const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
const rootUl = document.createElement('ul')
tocContainer.appendChild(rootUl)

let currentLevels = [rootUl] // Stack des <ul> par niveau

headings.forEach((heading, index) => {
    if (!heading.id) {
        heading.id = 'heading-' + index
    }
    const level = parseInt(heading.tagName.substring(1)) // h1 => 1, h2 => 2 ..
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = '#' + heading.id
    a.textContent = heading.textContent
    li.appendChild(a)

    while (currentLevels.length > level) { // Ajuste la pile des niveaux
        currentLevels.pop() // On remonte
    }

    if (!currentLevels[level - 1]) {
        const ul = document.createElement('ul')
        currentLevels[level - 2].lastElementChild.appendChild(ul) // On ajoute <ul> au dernier <li>
        currentLevels[level - 1] = ul
    }
    currentLevels[level - 1].appendChild(li)

    a.addEventListener('click', function (e) {
        e.preventDefault()
        document.getElementById(heading.id).scrollIntoView({ // Gestion du scroll
            behavior: 'smooth'
        })
    })
})