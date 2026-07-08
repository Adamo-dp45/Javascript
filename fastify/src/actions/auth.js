import { db } from "../database.js"
// import {hash, verify} from '@phc/argon2'

export const login = async (req, res) => {
    // await hash('password') -- Permet d'hasher
    // await verify('$argon2.ddSFJK' ,'password') -- Permet de vérifier
    const params = {}
    if(req.method === 'POST') {
        const {username, password} = req.body
        params.username = username
        const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username)
        if(
            user !== undefined
            // && await verify(user.password, req.body.password)
        ) {
            req.session.set('user', {
                id: user.id,
                username: user.username
            }) /*
                - Les données qu'on met à l'intérieur vont être dans le cookie et il sera renvoyer dans toutes les requêtes donc attention a ne pas le rendre lourd
            */
            return res.redirect('/')
        }
        params.error = 'Identifiants invalides'
    }
    return res.view('fastify/templates/login.ejs', params)
}

export const logout = (req, res) => {
    req.session.delete()
    return res.redirect('/login')
}