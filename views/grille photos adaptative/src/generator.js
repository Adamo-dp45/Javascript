// Ce code permet de générer une gallerie avec des images de remplacement (il ne sert que pour la démo)
const grid = document.querySelector('photos-grid')
const images= Array.from(grid.children)
const baseId = 10
for (let k in images) {
    k = parseInt(k)
    const image = images[k]
    image.setAttribute('href', `https://picsum.photos/id/${k + baseId}/1280/720`);
    image.firstChild.setAttribute('src', `https://picsum.photos/id/${k + baseId}/${image.firstChild.getAttribute('width')}/${image.firstChild.getAttribute('height')}`)
}