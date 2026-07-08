// - On active le decorator dans tsconfig.js, Les décorateurs permettent de mettre des métadonnées sur nos fonctions, propriétés pour ajouter des comportements

function CustomElement(name: string) {
    return function(constructor: typeof HTMLElement) { // 'typeof' pour dire que ce qu'on lui passer en params est Demo pas une instance de HTMLElement
        customElements.define(name, constructor) // Ce code va être exécuter dès le lançement de notre script
    }
}

@CustomElement('demo-hello')
class Demo extends HTMLElement {

    connectedCallback() {
        this.innerHTML = 'Hello world'
    }
} // Plutôt que d'utiliser la fonctions 'customElements' on va lui mettre un decorator pour le définir

// -- Validation d'une propriété
function Constraint({min, max} : {min: number, max: number}) {
    return function<T>(target: T, key: keyof T) { // 'keyof' pour qu'il soit possible d'appliquer sur n'importe quel cléf de ma class
        let val = target[key] as any
        const getter = () => val
        const setter = (v: unknown) => {
            if(typeof v === 'number' && v > min && v < max) {
                val = v
                return
            }
            throw new Error(`On attend un nombre entre ${min} et ${max}`)
        }
        Object.defineProperty(target, key, { // On modifie notre objet
            set: setter,
            get: getter
        })
    }
}

class User {

    /*
        @Constraint({
            min: 0,
            max: 100
        })
    */
    age: number = 0
}

const user = new User()
user.age = 20
// user.age = "non" -- Ne passe pas