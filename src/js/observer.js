// -- Intersection observer : Permet de détecter quand un élément devient visible à l'écran
const observer = new IntersectionObserver((entries) => { // 'entries' représente tous les éléments qui vont être observer par notre observer, le callback est appelé a chaque fois qu'un élément devient visible ou disparaît de l'écran
	for(const entry of entries) {

		console.log(
			entry.intersectionRatio // Ratio de l'élément visible
		)

		if(entry.isIntersecting) { // isIntersecting : Permet de savoir si l'élément est visible
			entry.target.animate([
				{ transform: 'translateX(-50px)', opacity: 0 },
				{ transform: 'translateX(0px)', opacity: 1 },
			], {
				duration: 800
			})
			observer.unobserve(entry.target) // Permet d'arrêter l'observation sur un élément s'il a été déjà été observer
		}
	}
}, {
	threshold: .5, // Quand notre élément sera a 50% visible sur la page il sera considéré comme visible
	rootMargin: '50px 50px 50px 50px', // Permet d'agrandir la zone d'observation
	// root: document.querySelector('.container') -- Elément qui va être utiliser comme racine pour vérifier la visibilité
})

observer.observe(document.querySelector('.btn-1')) // observe : Permet d'observer un élément
observer.observe(document.querySelector('.btn-2'))

// observer.disconnect() -- Permet de desactiver tous les oberveur, on peut en ajouter après le disconnect, et il observera à nouveau

/*
	-- 'ResizeObserver' permet d'observer les changements de taille d'un élément, sa pertinance étant donné qu'on a l'évènement 'resize' sur windows est qu'il va déclenché le comportement seulement si l'élément lui même à changé de taille
		- Lorsque l'élément disparaît du dom on n'a quand l'observeur qui est déclanché dans ce cas la largeur et la hauteur de l'élément ont des valeurs 0
		- Le 'ResizeObserver' est appelé initialement
*/
const resizeOberser = new ResizeObserver((entries) => {
	console.log(entries)

	for(const entry of entries) {
		console.log(
			entry.borderBoxSize[0], // Permet de connaître la taille de l'élément, on récupère l'index 0 si notre élément est un rectangle car 'borderBoxSize' prévoit le futur ou des éléments multi colonnes ont plusieurs boîtes
			entry.borderBoxSize[0].inlineSize, // La largeur
			entry.borderBoxSize[0].blockSize // La hauteur
		)

		entry.target.textContent = entry.borderBoxSize[0].inlineSize > 760 ? 'big' : 'small'
	}
	// resizeOberser.disconnect() -- Si on veut avoir le comportement qu'une fois
})

resizeOberser.observe(document.getElementById('element'))
// resizeOberser.unobserve(document.getElementById('element')) -- 'unobserve' pour arrêter d'observer un élément
// resizeOberser.disconnect() -- 'disconnect' pour tous déconnecter



// MutationObserver - Permet de surveiller le dom