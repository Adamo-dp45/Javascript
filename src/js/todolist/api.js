/**
 * Intéragit avec une API JSON
 * @param {string} url 
 * @param {RequestInit & {json?: object}} options 
*/
export async function fetchJSON(url, options = {}) {
    // Dans le headers on lui de prendre les options que nous avons déjà envoyé et de rajouter aussi un header pour accepter le JSON 
    const headers = {Accept: 'application/json' ,...options.headers}
    if(options.json) {
        options.body = JSON.stringify(options.json)
        headers['Content-Type'] = 'application/json'
    }
    const r = await fetch(url, {...options, headers})
    if(r.ok) {
        return r.json()
    }
    throw new Error('Erreur serveur', {cause: r})
}