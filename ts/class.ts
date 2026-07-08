class A {

    private a = 3 // Va être privée par contre quand il va compiler la proriété sera accéssible, le private n'est utile que dans le cas de typescript
    protected b = 5 // Va être protégé
    public c = 6 // Va être publique, par défaut si on ne met rien ça équivaut à public

    #d = 8 // va être privée et fonctionnel au niveau de js

    constructor( // On peut définir les propriété dans le constructeur
        private f: number
    ) {

    }

    on(this: HTMLInputElement, name: string) { // Pour changer le context de this, mais va être annulé dans la compliation donc pour qu'il soit pris en compte il faut une fonction flèché
        // this.addEventListener() -- Ici on aura les propriétés de HTMLInputElement
    }

    one = (name: string) => { // L'inconveniant de cette approche est que chaque instance aura ça propre fonction one ce qui peut être conséquent au niveau de la mémoire
    }

    log() {
        console.log(this.a)
        console.log(this.#d)
    }
}

class B extends A {

    log(): void {
        console.log(this.b)
    }
}

const aInstance = new A(4)
aInstance['a'] // Ici ça passe mais pas avec #d

class Collection<T> {

    constructor(private items: T[]) {}

    first(): T | null {
        return this.items[0] || null
    }
}

const cInstance = new Collection<number>([1, 2]) // On peut l'écrire sans le number
let c = cInstance.first() // number ou null

abstract class Geometry { // class abstraicte permet de définir des sortes de model de class
    x = 0
    y = 0
    abstract surface(): number // Sera rétirer à la compilation

    public static origin = {a: 12, b: 13} // Dans le cas de private on ne peut y acceder que dans la class

    static #nu: {a: number, b: number} // Pour faire une initialisation static
    static {
        Geometry.#nu = {a: 10, b: 15}
    }
}

class Triangle extends Geometry { // Si une class extends d'une class abstract elle doit implémenter toutes les méthodes abstract de la class parent

    surface(): number {
        return 5
    }
}

class Carre {
    x = 0
    y = 0
}

Geometry.origin

// On peut avoir des types instanciables
type instanciableShape = {
    new (x: number, y: number):{
        surface: () => number
    }
}

function shapeGenerator(shapeType: instanciableShape, x: number, y: number) {
    return new shapeType(x, y).surface()
}

shapeGenerator(Triangle, 10, 20)
// shapeGenerator(Carre, 10, 20) -- Ne vas pas marcher ici car le carré n'a pas de méthode surface