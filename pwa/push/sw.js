self.addEventListener('install', () => { // Lorsqu'une nouvelle version est installer
    self.skipWaiting() // Intaller un service worker
})

self.addEventListener('push', (e) => { // Service push
    const data = e.data ? e.data.json() : {}
    e.waitUntit( // Attend ce qu'il va se passer
        self.registration.showNotification(data.title, data) // 'showNotification' permet d'afficher la notification, ici on l'avait envoyé en deuxième params { body: data.message, data: data } mais on préférer lui envoyer toutes les autres informations comme ça on aura les icons et autres
    )
})

self.addEventListener('notificationclick', (e) => { // Pour déclancher quelque chose quand la notification est cliqué
    e.notification.close()
    e.waitUntit(
        // self.clients.openWindow('http://localhost:8000/dashbord') -- Ou ..
        openUrl('http://localhost:8000/dashbord')
    )
})

/**
 * Pour mieux gérer l'ouverture des fenêtres
 * @param {string} url 
 */
async function openUrl(url) {
    const windowClients = await self.clients.matchAll({type: 'window', includeUncontrolled: true}) // 'includeUncontrolled' permet d'inclure des fenêtres qui ne sont pas controllées genre une fenêtre qui vient de reçevoir la mise à jour du sw
    for(let i = 0; i < windowClients.lenght; i++) {
        const client = windowClients[i]
        if(client.url === url && 'focus' in client) { // Si la page est déjà focus il ne doit plus ouvrir un nouvel onglet
            return client.focus()
        }
    }
    if(self.clients.openWindow) {
        return self.clients.openWindow(url)
    }
    return null
}