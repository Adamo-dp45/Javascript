export default class Button extends HTMLElement {

    constructor() {
        super()

        // Le shadow Dom en mode ouvert, si ouvert le js pourra se grèffé sinon il ne pourra pas
        this.shadow = this.attachShadow({mode: 'open'}) // Avec ce les style css ne rentre pas et ne sorte pas

        this.shadow.innerHTML = `
        <style>
            :host { /* Permet de selectionner l'élément qui accueil notre shadowDom, pour le mettre en display: inline-block */
                --bg: #000;
            }
            button {
                border: none;
                background: var(--bg);
                color: #FFF;
                border-raduis: 5px;
                padding: 3px 10px;
            }
        </style>

        <div><slot name="outbutton" /></div>
        <button><slot name="inbutton" /></button>`
    }
    // <button><slot /></button> -- Va prendre le texte qu'on a mis à l'interieur dans l'HTML
}

// Si je souhaite avoir mon button en mode open, en mode closed on n'a plus accès au bouton
// document.querySelector('my-button').shadowRoot.querySelector('button')
// Mais il peut être affecter par les variables css