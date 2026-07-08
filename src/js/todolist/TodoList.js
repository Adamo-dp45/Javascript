// import { cloneTemplate } from "./dom"
// import { createElement } from "./dom"

function createElement(tagName, attributes = {}) {
    const element = document.createElement(tagName)
    // entries au niveau d'un objet me permet d'avoir la valeur et clé de l'objet
    for(const [attribute, value] of Object.entries(attributes)) {
        if(value !== null) {
            element.setAttribute(attribute, value)
        }
    }
    return element
}
/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
*/
export class TodoList { // L'objectif de cette class est qu'elle va être construite avec des éléments

    /** @typedef {Todo[]} */
    #todo = []
    /** @typedef {HTMLUListElement} */
    #listElement = []

    /** @param {Todo[]} todos */
    constructor (todos) {
        this.#todo = todos
    }

    /**
     * Prend en paramètre un élémnt et ca ferai la logique pour ajouter notre todolist a cet élément 
     * @param {HTMLElement} element 
    */
    appendTo (element) {
        element.append( // Grâce au fragment
            // cloneTemplate('todolist-layout')
            document.getElementById('todolist-layout').content.cloneNode(true)
        )
        /* element.innerHTML = `
            <form action="" class="d-flex pb-4">
                <input type="text" required="" name="title" class="form-control" placeholder="Acheter des patates...">
                <button class="btn btn-primary">Ajouter</button>
            </form>
            <main>
                <div class="btn-group mb-4 filter" role="group">
                    <button type="button" class="btn btn-outline-primary active" data-filter="all">Toutes</button>
                    <button type="button" class="btn btn-outline-primary" data-filter="todo">A faire</button>
                    <button type="button" class="btn btn-outline-primary" data-filter="done">Faites</button>
                </div>

                <ul class="list-group">
                </ul>
            </main>
        ` */
        this.#listElement = element.querySelector('.list-group')
        for(let todo of this.#todo) {
            const t = new TodoListItem(todo)
            t.appendTo(this.#listElement) // A cause du get
            // this.#listElement.append(t.element)
        }
        // Je passe une fonction fléché au addEven.. pour éviter que le this se fasse modifier
        element.querySelector('form').addEventListener('submit', e => this.#onSubmit(e))
        element.querySelectorAll('btn-group button').forEach(button => {
            button.addEventListener('click', e => this.#toggleFilter(e))
        })
    }

    /**
     *
     * @param {SubmitEvent} e 
    */
    #onSubmit(e) {
        e.preventDefault()
        const form = e.currentTarget
        // Ici le currentTarget est le formulaire la dessus je fais un get et recupère la valeur de title
        const title = new FormData(e.currentTarget).get('title').toString().trim()
        if(title === '') {
            return
        }
        const todo = {
            id: Date.now(),
            title,
            completed: false
        }
        const item = new TodoListItem(todo)
        // item.appendTo(this.#listElement) -- Ne vas plus marcher à cause du get
        this.#listElement.prepend(item.element)
        form.reset()
    }

    /**
     * @param {PointerEvent} e 
    */
    #toggleFilter(e) {
        e.preventDefault()
        const filter = e.currentTarget.getAttribute('data-filter')
        // Ici je remonte à l'élément parent
        e.currentTarget.parentElement.querySelector('.active').classList.remove('active')
        e.currentTarget.classList.add('active')
        if(filter === 'todo') {
            this.#listElement.classList.add('hide-completed')
            this.#listElement.classList.remove('hide-todo')
        } else if(filter === 'done') {
            this.#listElement.classList.remove('hide-todo')
            this.#listElement.classList.add('hide-completed')
        } else {
            this.#listElement.classList.remove('hide-todo')
            this.#listElement.classList.remove('hide-completed')
        }
    }
}

class TodoListItem {

    #element 

    /** @type {Todo} */
    constructor (todo) {
        const id = `todo-${todo.id}`
        const li = createElement('li', {
            class: 'todo list-group-item d-flex align-items-center'
        })
        this.#element = li
        const checkbox = createElement('input', {
            type: 'checkbox',
            class: 'form-check-input',
            id: id,
            checked: todo.completed ? '' : null
        })
        const label = createElement('label', {
            class: 'ms-2 form-check-label',
            for: id 
        })
        label.innerText = todo.title
        const button = createElement('button', {
            class: 'ms-auto btn btn-danger btn-sm'
        })
        button.innerHTML = 'I'
        li.append(checkbox) // On n'a rajouter notre checkbox à notre li
        li.append(label)
        li.append(button)
        this.toggle(checkbox)

        button.addEventListener('click', e => this.remove(e))
        checkbox.addEventListener('change', e => this.toggle(e.currentTarget))
    }

    /**
     * @return {HTMLElement}
    */
    get element() {
        this.#element
    }

    /** @param {HTMLElement} element  */
    appendTo(element) {
        element.append(this.#element)
    }

    /**
     * @param {PointerEvent} e
    */
    remove(e) {
        e.preventDefault()
        this.#element.remove()
    }

    /**
     * Change l'état (à faire / fait) de la tâche
     * @param {HTMLInputElement} checkbox 
    */
    toggle(checkbox) {
        if(checkbox.checked) {
            this.#element.classList.add('is-completed')
        } else {
            this.#element.classList.remove('is-completed')
        }
    }
}