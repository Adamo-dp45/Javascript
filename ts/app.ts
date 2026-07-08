/**
 * Typescript
 */

const a: string = "username"
const b: number = 15
const c: boolean = true
const d: null = null
const arr: string[] = ['aa', 'bb']
const ar: any[] = ['aa', 'bb', 15]
const user: {username: string, lastname?: string} = {username: "John"}
const users: {username: string, [key: string]: string} = {username: "John", lastname: "Doe"} // Pour avoir un nombre infini de clé
const date: Date = new Date()
const cb: Function = (e: MouseEvent): void => {}
const cbr: (e: MouseEvent) => void = (e: MouseEvent): number => { // Quand on écrit void on précise que le retour ne sera pas utilisé, donc ici même si la fonction ne retourne pas la même définition ça ne posera pas de problème
    return 3
}

const compteur = document.querySelector('#compteur') as HTMLButtonElement // Ou .. <HTMLButtonElement>document.. ici on force le type de l'élément
// document.querySelector('#compteur')! -- Permet de faire du 'Narrowing' de force, compteur ne peut pas être null, dans ce cas typescript ne fera pas de vérification
let i: number
const incrementer = (e: Event) => {
    e.preventDefault()
    i++
    const span = compteur?.querySelector('span')
    if(span) {
        span.innerHTML = i.toString()
    }
}
compteur?.addEventListener('click', incrementer) // '?' N'utilise addEventListener que si compteur est définie ou le faire avec un if

// --- Narrowing : Permet à typescript d'éliminer des cas et de reduire les types possibles pour nos variables --- //
function isDate(a: any): a is Date /* boolean */ { // Quand on fais ça on lui dit que quand le retour est true c'est qu'on connaît le type plutôt que de mettre boolean
    return a instanceof Date
}

let de = new Date()

if(isDate(de)) {
    de // Date
}

function printId(id: number | string): void { // Peut être considérer comme du narrowing grâce à typeof
    if(typeof id === 'number') {
        console.log((id * 3).toString())
    } else {
        console.log(id.toUpperCase())
    }
}

function example(a: string | boolean, b: string, c: number | boolean, d: string | Date, e: string | string[], f: MouseEvent | HTMLInputElement) { // Va détecter les types en commun
    if(a === b) {
        a // string
    } else if(a === c) {
        a // boolean
    }

    if(d instanceof Date) { // Peut être considérer comme du narrowing grâce à instanceof
        d // Date
    }

    if(Array.isArray(e)) {
        return e[0] // string[]
    }
    // return e -- string

    if('value' in f) {
        f // HTMLInputElement car il a value dans ses cléf, mais si on met une cléf qui n'existe pas on aura un type 'never' qui dit qu'on n'est pas censé arrivé dans la condition
    }
}

// -- Alias & Generics de type -- //
type User = {
    firstname: string,
    lastname: string
}
type DateString = string
type Identity<ArgType> = (arg: ArgType) => ArgType // On a un type qui a un générique
type P = keyof User // P dépend des clés de User
type Username = User['firstname']

const extirpe = {username: 'Adama', age: 23}
type Ext = typeof extirpe // On extirpe le type depuis une variable existante

const usersType: User = {firstname: "John", lastname: "Doe"}
const dates: DateString = "12/10/2025"

// -- Generics : Utile si on ne connaît pas le type de l'argument à l'avance
function identity<ArgType>(a: ArgType): ArgType { // On indique que la fonction prend un type en entrée et va donner ce même type en sortie et on peut le nommer comme on veut e: <T>
    return a;
}
const aa = identity<number>(3) // Va comprendre que 'aa' est de type 'number' car le number va être le type de retour, on peut ne pas mettre le type devant

function first<Type>(arg: Type[]): Type {
    return arg[0]
}
const bb = first(['aze', 'cze']) // 'bb' est 'string'
const cc: Array<string | number> = ['aze', 'cze', 25] // cc est string ou number, on peut indiquer aussi grace à Array

function consoleSize<Type extends {length: number}>(arg: Type): Type { // On contraint le type
    console.log(arg.length)
    return arg
}
const abb = consoleSize(['3', 2])

// 'readonly' indique que quelque chose est en lecture seule
function reverse<T>(arr: readonly T[]): T[] { // 'readonly' indique que le tableau en entrée ne peut pas être modifié (mutté) vu que la fonction 'reverse' modifie le tableau original par défaut
    // return arr.reverse()
    return [...arr].reverse()
}














// Le type unknown

// 'unknown' comme le type any mais ne peut pas utiliser avant d'être précisé alors le any désactive la vérif des types
function da(a: unknown) {
    if(a instanceof HTMLInputElement) {
        a.value = 'Hello'
    }
    // a.value = 'Hello' -- Ne marchera pas ici
}

const ba = {isPrivate: true, isPublic: false} as const // On force le type, b.isPrivate sera de type true pas boolean et on ne peut pas modifier la valeur, ou isPrivate: true as 'const ou true'

// Tupple : permet de faire la distinction entre un tableau qui a une taille non définie et un tableau qui a une taille fixe

// 'tupple' un tableau de taille fixe, à l'intérieur on peut avoir soit des types générics soit des types litéral ..
type ListItem = [string, number]

const q: ListItem = ['q', 2]
const v: ListItem = ['v', 2]

function merge<T extends unknown[], U extends unknown[]>(a: T, b: U): [...T, ...U] {
    return [...a, ...b]
}
const m = merge(q, v) // [string, number, string, number]

// Enum

// 'enum' permet de sauvegarder des métadonnées
enum STEPS {
    Intro = 'Intro', // Ou sans valeur dans ce cas la valeur sera un nombre
    Selection = 'Selection',
    Panier = 'Panier',
    Paiement = 'Paiement' // On peut changer le nom de cléf, peut servir au debbug
}

const step: STEPS = STEPS.Selection

// if(step === STEPS.Intro) {} -- Là il ralle parcequ'il est capable de déviner que la condition ne sera jamais vrai
console.log(step) // Va donner '1' car il nomme les clés par des nombres si on ne change pas leur nom, Ou ..
console.log(STEPS[step])

const enum ST { // N'est pas pris en compte lors de la compilation
    Intro = 'Intro',
    Panier = 'Panier'
}

const st: ST = ST.Intro // Sera remplacé par la valeur lors de la compilation


// --- Type utilitaire : Typescript propose des types utilitaires dans la documentation pour filtrer les données --- //
/*
    - On a Partial<Type> qui prendre un type et rendre toutes ses propriétés optionnel, utile dans le cadre d'un ORM ou on ne peut modifier que certaines propriétés
    - !! Required<Type> toutes les propriétés optionnel deviennent réquise
    - !! Readonly<Type> va transformer toutes les propriétés en mode 'readonly'
    - !! Record<Keys, Type> permet de créer un objet qui a des clés d'un certains type
    - !! Pick<Type, Keys> permet de prendre à partir d'un type seulement certaines clés
    - !! Omit<Type, Keys> permet de retirer certaines propriétés
    - !! Exclude<Type, ExcludeUnion> permet de retirer d'un union de type certaines valeurs
    - !! Extract<Type, Union> permet de faire l'inverse
    - !! NonNullable<Type> permet de retirer les options null
    - !! Parameters<Type> permet d'extraire un tupple
    - !! ConstructorParameters<Type> !! mais pour les constructeurs
    - !! ReturnType<Type> renvoi le type de retour d'une fonction
    - !! InstanceType<Type> nous donne un type qui correspondra à l'instance d'une class
    - !! ThisParameterType<Type> permet d'extraire le 'this' d'un type
    - !! OmitThisParameterType<Type> !! retirer un this
    - !! ThisType<Type> permet d'obtenir le this d'un type

    - On n'a des manipulations qui permettent de modifier les chaines de caractères
        - Upercase<StringType>, LowerCase<StringType>, Capitalize<StringType>, Uncapitalize<StringType>
*/
// --- Type conditionnel
class Poisson {
    cri() {
        return false
    }
}

class Chat {
    cri() {
        return 'miaou'
    }
}

/*
    function generator<T extends {nager: any} | {sauter: any}>(options: T): T extends {nager: any} ? Poisson : Chat {
    if('nager' in options) { -- Sans le cri
        return new Poisson()
    } else {
        return new Chat()
    }
    }
    const k = generator({sauter: 'azaz'}) -- Chat
*/

// - On peut inférer le type à partir de la condition
type AnimalCri<T> = T extends {cri: () => infer U} ? U : never // On a un type qui a un générique
type A = AnimalCri<Chat> // type string car un chat crie
type B = AnimalCri<Poisson> // type boolean


// Opérateur satisfies : Permet de typer les variables un peu comme le 'as' mais sans en avoir les inconvenients
type Colors = Record<string, [number, number, number] | string>

function dema(c: Colors) {
}

const colors = {
    blue: [0, 0, 255],
    red: '#FF0000',
    green: [0, 255, 0]
} satisfies Colors // as Colors -- Quand on force le type ici, on perd l'indentité de notre objet, donc si on fais ..
// colors.green.map(v => v / 2) -- Ne marchera pas car map ne fonctionne pas sur une chaîne de caractère puisque j'ai forcé le type à Colors chaque valeur associé aux cléf de mon objet sont soit une chaîne de caractère ou soit un tupple de taille 3, c'est la que l'opérateur 'satisfies' intervient, il va permettre de dire que notre objet va satisfaire l'interface défini par le type Colors mais ne pas changer complètement le type de colors pour le faire correspondre au type Colors

colors.green.map(v => v / 2) // Là ça va marché
dema(colors) // Passe car j'ai forcé le type de colors sinon non

// -- Dans le cas de l'initialisation de variable le 'as' reste toujours pertiant
