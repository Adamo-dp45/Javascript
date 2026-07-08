import { fetchJSON } from "./api.js";
import { createElement } from "./dom.js";
import { TodoList } from "./TodoList.js";

try {
    const todos = [{
        id: 1,
        title: 'Mon',
        completed: true
    }]
    // const todos = await fetchJSON('https://jsonplaceholder.typicode.com/todos?_limit=5', {method: 'GET'})
    const list = new TodoList(todos)
    list.appendTo(document.querySelector('#todolist')) // On lui dit de les rajouter
} catch(e) {
    console.log(e)
    /*
    const div = document.createElement('div')
    div.setAttribute('class', 'alert alert-danger')
    */
    const alertElement = createElement('div', {
        class: 'alert alert-danger m-2',
        role: 'alert'
    })
    alertElement.innerText = 'Impossible de charger les éléments'
    document.body.prepend(alertElement) // prepend ajoute le texte au debut
    console.error(e)
}