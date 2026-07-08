import { db } from "../database.js"
import { RecordNotFoundError } from "../errors/RecordNotFoundError.js"
import { verifyUser } from "../functions/auth.js"

export const showPost = (req, res) => {
    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id)
    if(post === undefined) {
        throw new RecordNotFoundError(`Impossible de trouver l'article avec l'id ${req.params.id}`)
    }
    return res.view('fastify/templates/single.ejs', {
        post: post
    })
}

export const createPost = (req, res) => {
    verifyUser(req) /*
        - Permet de vérifier si l'utilisateur est connecté
    */
    db.prepare('INSERT INTO posts (title, content) VALUES (?,?)')
        .run(
            req.body.title,
            req.body.content,
            // Math.round(Date.now() / 1000) -- Pour avoir un timestamp en second
        )
    return res.redirect('/')
}