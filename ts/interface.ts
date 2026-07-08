// Permet de définir le nom d'un objet, par rapport au 'type' les interfaces ne permettent de se basé sur d'autres types

interface Point { // Va rester ouverte et peut être modifier plutârd et les interfaces ne génère rien au niveau de la compilation pas comme les class absctract
    x: number
    get(): number
}

interface Point {
    y: number
}

class TodayPoint implements Point {

    x: number
    y: number

    get(): number {
        return 5
    }
}

function draw(p: Point) {}
draw(new TodayPoint())

// ---
interface Window { // L'interface de window
    googleAnalytics: string
}

window.googleAnalytics // Va marcher car j'ai modifier l'interface de window