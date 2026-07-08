export default class Datepicker extends HTMLInputElement {
    connectedCallback() {
        this.calendar = '' // En temps normal on fait le flatpickr(this), Ici applique flatpikr sur l'élément courant
    }

    disconnectedCallback() {
        this.calendar.destroy() // Si l'élément est déconnecter de mon html on le détruit
    }
}