// import { createReadStream } from "node:fs"
import {createServer} from "node:http"
// import { createTodo, findTodos } from "./functions/todo_storage.js"
import { json } from "node:stream/consumers"
import { create, index, remove, update } from "./functions/api/todos.js"
import { NotFoundError } from "./functions/errors.js"
import { createReadStream } from "node:fs"
// import { json } from "node:stream/consumers"

/*
    const server = createServer((req, res) => {
        // console.log(req.url)
        // console.log(req.headers.accept) // Pour les entêtes acceptés

        const url = new URL(req.url, `http://${req.headers.host}`)
        // console.log(url)
        res.write(`Bonjour ${url.searchParams.get('name')}`)
        res.end()

        res.writeHead(200, {
            'Content-Type': 'text/html'
        }) // Permet d'écrire dans les entêtes
        res.setHeader('Content-Type', 'application/json') // Header qu'on renvoi

        const file = createReadStream('./index.html')
        file.pipe(res) // Quand on utilise pipe quand il fini il ferme le flux d'écriture, ou mettre {end: false} dans le pipe et enuite utiliser file.on('end', () => {res.end()})
        // res.write('Hello')
        // res.end() // Permet de dire je cloture la reponse que j'envoie au navigateur


        // Au cas du POST
        res.write(`Bonjour ${(json(req)).name}`)
        res.end()
    })
    server.listen('8000') // '0.0.0.0' Ecoute vers l'exterieur, par defaut c'est sur localhost
*/

// -- Api Todo -- //
createServer(async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json')
        const url = new URL(req.url, `http://${req.headers.host}`)
        const endpoint = `${req.method}:${url.pathname}`
        let results
        switch(endpoint) {
            case 'GET:/':
                res.setHeader('Content-Type', 'text/html')
                createReadStream('node/index.html').pipe(res)
                return
            case 'GET:/todos':
                results = await index(req, res)
                break
            case 'POST:/todos':
                results = await create(req, res)
                break
            case 'DELETE:/todos':
                results = await remove(req, res, url)
                break
            case 'PUT:/todos':
                results = await update(req, res, url)
                break
            default:
                res.writeHead(404)
        }
        if(results) {
            res.write(JSON.stringify(results, null, 2)) // null est une fonction qui sert à remplacer des choses, donc si on mais null il ne fera rien et ensuite le nombre d'espace
        }
    } catch(e) {
        if(e instanceof NotFoundError) {
            res.writeHead(404)
        } else {
            throw e // Je ne sais pas comment traité cette erreur, donc je la rethrow
        }
    }
    /*
        if(url.pathname === '/todos') {
            if(req.method === 'GET') {
                const todos = await findTodos()
                res.write(JSON.stringify(todos))
            } else if(req.method === 'POST') {
                const newTodo = await json(req)
                const todo = await createTodo(newTodo)
                res.write(JSON.stringify(todo))
            }
        } else {
            res.writeHead(404)
        }
    */
    res.end()
}).listen('3000')