const lis = document.querySelectorAll('li') // Nous donne un nodelist dans lequel on aura nos différents éléments
// console.log(lis[2])
lis.forEach(v => console.log(v)) // Permettra de parcourir chaque element, mais il n'a pas les prototype d'un tableau, donc si on fais un 'filter' ça ne fonctionne pas, il faut ..
// console.log(Array.from(lis)) -- Donne un tableau à partir d'un nodelist, on pourra ensuite faire un 'filter'

// -- Autres selecteurs
console.log(document.querySelector('ul > li'))
console.log(document.querySelector('ul > li:first-child'))

console.error('error') // Affiche les informations sous forme d'erreur
console.warn('warning') // Affiche les informations sous forme d'alerte
console.table('table') // Affiche les informations sous forme de tableau

// debugger -- Permet de mettre en pause notre script et on pourra ensuite debeuger

const ul = document.querySelector('ul') // ca va selectionné le premier ul
console.log(ul.querySelector('li')) // Selectionne tous les "li" qui sont dans cet élément ul
console.log(
    ul.nodeName, // Donne le nom du noeud html sur lequel on n'es et est toujours en majuscule
    ul.innerHTML, // Donne le structure html à l'intérieur
    ul.innerText, // Nous donne le texte sans les balises et les espaces
    ul.textContent // Donne le texte sans enlever les espaces, même le js
)

// -- Pour caher un element ou enlevé le cache
ul.setAttribute('hidden', 'hidden') // Cache un élément, l'attribut hidden devient hidden
ul.removeAttribute('hidden') // Enlève le cache

const li = document.querySelector('ul li:first-child') // Sélectionne le premier li
const li2 = document.querySelector('ul li:nth-child(2)')
console.log(
    li.getAttribute('class') // Donne la valeur de l'attribut class
)
li.classList.remove('red') // Supprime la classe .red de l'élément HTML
setInterval(() => {
    li.classList.add('red') // Ajoute la classe .red de l'élément HTML
}, 2000)
setInterval( () => {
    li2.classList.toggle('blue') // Il va supprimé la class si elle existe et l'ajouter si elle n'existe pas en 1s
}, 1000)

// -- Donner un sytle à un élément comme en html/css
const li3 = document.querySelector('li:nth-child(3)')
    li3.style.color= 'orange'
    li3.style.fontWeight='bold'
console.log(
    getComputedStyle(li), // Pour avoir le style globale d'un element avec le style appliqué dessus
    getComputedStyle(li).color // Couleur de l'élément
)

// -- Ajouter un éléments à la page HTML
const newLi = document.createElement('li')
newLi.innerHTML = 'Element ajouté'
newLi.classList.add('blue')
ul.append(newLi) // 'append' peut être utiliser sur un élément or appendChild : Ne peut être utiliser que sur un noeud; - On peut utiliser 'prepend', mais il ajoute l'élément au tout début
// Remarque : Si on ajoute le même élément et on le réajoute on l'aura qu'une seule fois car quand un élément est ajouté au DOM c'est toujours la même référence qui est utilisé

// -- Inserer un élément
const div = document.createElement('div')
div.innerHTML = 'Insertion d\'élément'
ul.insertAdjacentElement('beforebegin', div) // Il a plusieurs attribut dont 'beforebegin' : Mettre avant l'elément - 'afterbegin' : Se met dans l'élément, 'beforeend' : Va être ajouter comme un append, 'afterend' : Va être ajouter après l'élément

console.log(
    ul.children, // 'children' va nous donner une collection avec l'ensemble des enfants, il est en live, si on supprime un enfant dans l'inpsecteur(DOM) se mettra à jour
    ul.childNodes, // && Renvoi les noeuds textuelles
    ul.firstChild, // Renvoi le premier noeud enfant
    ul.firstElementChild, // Renvoi le premier noeud qui est un élément enfant
    ul.childElementCount // Le nombre d'éléments qu'on a à l'intérieur ou .children.length
)

console.log(
    // li.remove(), -- Supprimer le li du DOM
    li.parentElement, // Nous donne le parent de l'élément
    li.parentNode, // Nous donne le noeud parent
    li.nextElementSibling, // L'élément qui juste après
    li.nextSibling, // Le noeud qui est après, dans ce cas ça serai du text
    li.previousElementSibling, // L'élément qui juste après
    li.previousSibling // Le noeud qui est après, dans ce cas ça serai du text
)

const i = document.querySelector('li')
const u = document.querySelector('ul')
u.append(i.cloneNode(true)) // cloneNode() copie seulement l'element or avec la valeur (true) il clone aussi tous les enfants
console.log(ul.contains(li)) // Renvoi la valeur true dans notre console si l'élément contient l'élément

// history.back() -- Retourner a la page précédente

// --- Posts
/**
 * Créer un élément HTML représentant un article
 * @param {{title: string, body: string}} posts 
 * @return {HTMLElement}
 */
function createArticle(post) {
    const article = document.createElement('article')
    /*
        const h2 = document.createElement('h2')
        h2.innerText = post.title
        article.append(h2)
        const p = document.createElement('p')
        p.innerText = post.body
        article.append(p)
    */
    article.append(createElementWithText('h2', post.title))
    article.append(createElementWithText('p', post.body))
    /* -- N'est pas sécurisé car il interprête le code à l'intérieur
        article.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
        `
    */
    return article
}

function createElementWithText(tagName, content) {
    const element = document.createElement(tagName)
    element.innerText = content
    return element
}

async function main() {
    const wrapper = document.querySelector('#posts')
    const loader = document.createElement('p')
    loader.innerHTML = 'Chargement...'
    wrapper.append(loader)
    try { // Lorsqu'on se trompe au niveau du nom de domaine, cela renvoie une erreur c'est pour ça qu'on mais le try
        const r = await fetch('https://jsonplaceholder.typicode.com/posts', {
            headers: {
                "Accept": "application/json"
            }
        })
        if(!r.ok) {
            throw new Error('Erreur serveur')
        }
        const posts = await r.json()
        loader.remove() // Supprimer le contenu de l'élément

        for(let post of posts) {
            wrapper.append(createArticle(post))
        }

    } catch(e) {
        loader.innerHTML = 'Impossible de charger les articles'
        loader.style.color = 'red'
        return
    }
}

main()

// -- localStorage : Permet de sauvegarder et persister des informations même si la page est actualisé, mais on n'a pas de garanti de temps de sauvegarde dépend du navigateur et nous alloue 5M environ  - sessionStorage : Conserve les informations sur un onglet
document.getElementById('add').addEventListener('click', () => {
    localStorage.setItem('clef', 'dark') // Permet d'ajouter une information au localStorage, dépend du nom de domaine
})
console.log(localStorage.getItem('clef')) // Recupère la valeur de la cléf

document.getElementById('clear').addEventListener('click', () => {
    localStorage.clear() // Permet de nettoyer le localStorage
    localStorage.removeItem('clef') // Permet de supprimer une cléf
})

sessionStorage.setItem('ma session', 'FF')
console.log(sessionStorage.getItem('ma session'))

/*
    - IndexedDB : Une api de stockage côté client qui permet de stocker des objets complexes, des fichiers, des images.. et utilise une base de données NoSQL
    - Cache Storage : Permet de stocker des ressources réseau comme du html,css,js,images pour une application web hors ligne ou pour améliorer les performances de chargement
    - StorageManager : Permet de fournir des informations sur l'utilisation et la disponibilité du stockage côté client pour de vérifier l'espace de stockage disponible, de demander des quotas de stockage supplémentaires et de gérer les politiques de stockage pour une application web
*/

// -- FONCTION USUELLE
const h1 = document.querySelector('h1')
console.log(
    'Position par rapport au haut',
    window.scrollY + h1.getBoundingClientRect().y, // Calculer la position de l'élément par rapport au haut de la page
    recursiveOffsetTop(h1), // -

    // .getBoundingClientRect() : Nous donne les informations sur la position de l'élément a partir de sa fenêtre comparé à la position de haut de la fenêtre, x,y,width,height,top,right,bottom,left
    // h1.offsetTop(), -- Nous donne la position de l'element par rapport a son parent relatif, le parent qui aura une 'position relative'
    // h1.offsetHeight(), -- Calculer par rapport au parent relatif
    // h1.offsetWidth(), --
    // h1.offsetLeft(), --
    // h1.offsetParent(), - Pour connaitre l'element parent relatif
)

/**
 * Calculer la position de l'élément par rapport au haut de la page
 * @param {HTMLElement} element 
 */
function recursiveOffsetTop (element) {
    if(element.offsetParent) {
        return element.offsetTop + recursiveOffsetTop(element.offsetParent)
    } else {
        return element.offsetTop
    } // Ou..

    // let top = 0
    // while(element.offsetParent) {
    //    top += element.offsetTop
    //    element = element.offsetParent
    // }
    // return top
}

let p = document.querySelector('.div')
console.log(
    p.dataset.user // Permet de récupérer les attributs 'data-' d'un élément
)
p.dataset.hello = 'Bonjour' // Pour définir manuellement
console.log(p.dataset)

// -- Media query - Remplace le window.innerWidth et window.innerHeight
const mediaQuery = window.matchMedia("(min-width: 500px)") // Permet de savoir si la media query est active ou pas, aussi 'min-height', 'orientation: landscape' ou 'portrait'
if(mediaQuery.matches) {
    console.log('L\'écran fait au moins 500px de large')
} else {
    console.log('L\'écran fait moins de 500px de large')
}

mediaQuery.addEventListener('change', e => { // Ecouter les changements de la media query
    console.log(e.matches)
})

window.addEventListener('resize', function() { // Ou écouter le redimensionnement de l'écran mais pas recommandé
    let media500 = window.matchMedia("(min-width: 500px)")
    if(media500.matches) {
        console.log('L\'écran fait au moins 500px de large')
    }
})

// const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked) ||
//                      Array.from(radios).some(radio => radio.checked); - Vérifie si au moins un checkbox ou un radio est coché

// import('./incre.js').then(({default: incr}) => {
//    return incr.incrementer()
// })