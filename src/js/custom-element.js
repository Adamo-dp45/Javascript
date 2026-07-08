import SecondTimer from "../components/SecondTimer.js"
import Datepicker from "../components/Datepicker.js"
import Button from "../components/Button.js"

document.querySelector('#add').addEventListener('click', e => {
    // document.querySelector('second-timer').remove()
    document.querySelector('second-timer').setAttribute('prefix', 'Demo')
    document.body.appendChild(new Datepicker())

    // Pour utiliser les constoms avec le template
    const template = document.getElementById('tmp')
    const templateContent = template.content
    document.body.appendChild(templateContent.cloneNode(true))
})

customElements.define('second-timer', SecondTimer) // Le nom doit contenir au moins un -
customElements.define('date-picker', Datepicker, {extends: 'input'}) // Etend des input
customElements.define('my-button', Button)
