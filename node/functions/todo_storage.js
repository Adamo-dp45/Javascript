import {readFile, writeFile} from "node:fs/promises"
import {NotFoundError} from "./errors.js"

const path = 'node/storage/todo.json' // On pourrait aussi rejouter des erreurs au cas ce fichier n'existe pas, on pourrait la capturer pour automatiqument créer le fichier ou notre serveur pourrait envoyer une erreur

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */

/**
 * @returns {Promise<Todo[]>}
 */
export async function findTodos() {
    const data = await readFile(path, 'utf-8') // On ne vas pas utiliser les streams car j'ai besoin de parser la totalité du fichier
    return JSON.parse(data)
}

/**
 * @param {string} title 
 * @param {boolean} completed 
 * @returns {Promise<Todo>}
 */
export async function createTodo({title, completed = false}) {
    const todo = {title, completed, id: Date.now()}
    const todos = [todo, ...await findTodos()] // On rajoute la tâche en début de tableau
    await writeFile(path, JSON.stringify(todos, null, 2))
    return todo
}

/**
 * @param {number} id 
 * @returns {Promise}
 */
export async function removeTodo(id) {
    const todos = await findTodos()
    const todo = todos.findIndex(todo => todo.id === id)
    if(todo === -1) {
        throw new NotFoundError()
    }
    await writeFile(path, JSON.stringify(todos.filter(todo => todo.id !== id), null, 2))
}

/**
 * @param {number} id 
 * @param {{completed?: boolean, title?: string}} partialTodo 
 * @returns {Promise<Todo>}
 */
export async function updateTodo(id, partialTodo) { // {title, completed = false}
    const todos = await findTodos()
    const todo = todos.find(todo => todo.id === id) // find retourne undefined s'il ne trouve rien sinon il retourne l'élément
    if(todo === undefined) {
        throw new NotFoundError()
    }
    // todo.title = title
    // todo.completed = completed -- Ou..
    Object.assign(todo, partialTodo)
    await writeFile(path, JSON.stringify(todos, null, 2))
    return todo
}