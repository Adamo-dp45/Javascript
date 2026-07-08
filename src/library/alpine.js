// -- On le charge avant alpine
document.addEventListener('alpine:init', () => { // 'alpine:init' pour savoir quand alpine est chargé
    Alpine.data('tabs', (defaultTab) => ({ // Une sorte de model pour nos données
        tab: defaultTab,
        toggleTab(e) {
            this.tab = e.target.getAttribute('href').replace('#', '')
        },
        isActive(tab) {
            return tab === this.tab
        }
    }))

    Alpine.store('posts', { // Dans notre cas on n'a déplacer la logique dans un store pour pouvoir percister les infos
        loading: false,
        posts: [],
        loaded: false, // Permet de savoir si on n'a charger ou pas les articles
        loadPosts() {
            if(this.loaded) {
                return
            }
            this.loading = true
            fetch('')
            .then(r => r.json())
            .then(json => {
                this.posts = json
                this.loaded = true,
                this.loading = false
            })
        }
    })

    Alpine.data('posts', () => ({
        init() { // Permet de rajouter un comportement à l'initialiser du composant
            this.$store.posts.loadPosts() // Va charger les données dès !!
        }
    }))

    Alpine.directive('active-page', (el, {expression}, {effect, evaluateLater}) => {
        const onActiveChange = evaluateLater(expression)
        effect(() => {
            console.log('OK')
            onActiveChange(active => {
                if(active) {
                    el.classList.add('active')
                    el.setAttribute('aria-current', 'page')
                } else {
                    el.classList.remove('active')
                    el.removeAttribute('aria-current')
                }
            })
        })
    }) /*
        - 'effect' va être relancer à chaque changement dans notre composant
        - 'evaluate' permet d'évaluer une expression
            - 'evaluateLater' permet de faire du comportement lorsqu'on n'a un changement d'état
    */
})

// --
import Alpine from 'alpinejs'

window.Alpine = Alpine
Alpine.start()