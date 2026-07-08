import fastify from 'fastify'
import fastifyView from '@fastify/view'
import fastifyMysql from '@fastify/mysql'
import fastifyStatic from '@fastify/static'
import fastifyFormbody from '@fastify/formbody'
import fastifySession from '@fastify/session'
import fastifySecureSession from '@fastify/secure-session'
import fastifyCookie from '@fastify/cookie'
import ejs from 'ejs'

import {fileURLToPath} from 'node:url'
import {dirname, join} from 'node:path'
import { readFileSync } from 'node:fs'
import { createPost, showPost } from './actions/posts.js'
import { RecordNotFoundError } from './errors/RecordNotFoundError.js'
import { db } from './database.js'
import { login, logout } from './actions/auth.js'
import { NotAuthenticatedError } from './errors/NotAuthenticatedError.js'

const app = fastify()
const rootDir = dirname(dirname(fileURLToPath(import.meta.url))) /*
    - Pour avoir le dossier courant et on remonte de 2 cran
*/
const rootDir2 = dirname(dirname(dirname(fileURLToPath(import.meta.url))))

app.register(fastifyView, {
    engine: { /*
        - Le moteur de template
    */
        ejs: ejs
    }
})

app.register(fastifyFormbody)

app.register(fastifySecureSession, {
    cookieName: 'session',
    key: readFileSync(join(rootDir2, 'secret-key')), /*
        - On peut tomber sur cette erreur 'Error: key must be 32 bytes' au niveau de clé signifie que la clé de chiffrement qu'on fournis à fastifySecureSession n'a pas exactement 32 octets or c'est une exigence du module interne de chiffrement 'NaCl/libsodium' utilisé par fastify donc pour y remédier on tape dans le terminal 'openssl rand -out secret-key 32'
    */
    cookie: { /*
        - On peut rajouter des informations sur le cookie
    */
        path: '/'
    }
    // sessionName: 'session' -- Le nom de la session
    // expiry: 24 * 60 * 60, -- La date d'expiration par defaut 1j
})

app.register(fastifyStatic, {
    root: join(rootDir, 'public'), // Le dossier utiliser pour servir les assets
    // prefix: '/public/' -- On ne le précise pas car on veut que tous ce qui est dans 'public' soit accessible directement, default '/'
})
/*
    app.register(fastifyMysql, {
    connectionString: 'mysql://root@localhost/mysql'
    })

    app.get('/user/:id', (req, reply) => {
        app.mysql.query('SELECT id, username, hash, salt FROM users WHERE id=?', [req.params.id],
            function onResult (err, result) {
                reply.send(err || result)
            }
        )
    })
*/
app.get('/', (req, res) => {
    const postsdb = db.prepare('SELECT * FROM posts').all() // ORDER BY created_at DESC
    const posts = [{
            id: 1,
            title: 'Mon article',
            content: 'Lire est important'
        },
        {
            id: 2,
            title: 'Mon second article',
            content: 'Lire est important'
    }]
    res.view('fastify/templates/index.ejs', {
        title: 'Mon <br /> titre', // Va échapper le html par défaut
        posts: posts,
        postsdb: postsdb,
        user: req.session.get('user') // La session utilisateur
    })
})

app.get('/article/:id', showPost)
app.get('/login', login)
app.post('/login', login)
app.post('/logout', logout)
app.post('/', createPost)

app.setErrorHandler((error, req, res) => { /*
    - Permet de gérer les erreurs    
*/
    if(error instanceof RecordNotFoundError) {
        res.statusCode = 404
        return res.view('fastify/templates/404.ejs', {error: error.message})
    } else if(error instanceof NotAuthenticatedError) {
        return req.redirect('/login')
    }
    res.statusCode = 500
    return {
        error: error.message
    }
})

const start = async () => {
    try {
        await app.listen({port: '3000'})
    } catch(e) {
        console.log(e)
        process.exit(1) // On exit le processus avec un code d'erreur 1
    }
}

start()