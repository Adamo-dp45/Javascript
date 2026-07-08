import { createTodo, findTodos, removeTodo, updateTodo } from "../todo_storage.js"
import { json } from "node:stream/consumers"

export async function index(req, res) {
    return findTodos()
}

export async function create(req, res) {
    const newTodo = await json(req)
    return createTodo(newTodo)
}

export async function remove(req, res, url) {
    const id = parseInt(url.searchParams.get('id'), 10)
    await removeTodo(id)
    res.writeHead(204) // Status no content
}

export async function update(req, res, url) {
    const id = parseInt(url.searchParams.get('id'), 10)
    return updateTodo(id, await json(req))
    // Quand on fais un return d'un await, ça entoure d'une promesse qui sert à rien donc mieux vaut retourner directement la promesse
}