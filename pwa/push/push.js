function main () {
    const permission = document.getElementById('push-permission')
    if(
        (!permission && // Soit on a notre navigateur qui ne supporte pas le système de push
        !('Notification' in window) &&
        !('serviceWorker' in navigator))
        // || (Notification.permission !== 'default') // Ou on a la permission qui est différent de 'default'
    ) {
        return
    }
    const button = document.createElement('button')
    button.innerHTML = 'Recevoir les notifications'
    button.classList.add('btn')
    permission.appendChild(button)
    button.addEventListener('click', asPermission)
}

/**
 * Permet de déclancher la demande de permission
 */
async function asPermission() {
    const permission = await Notification.requestPermission() // -- Dès là on a géré la demande de permission

    if(permission === 'granted') {
        registerServiceWorker()

        // new Notification("Voici votre notification!", { -- On peut en créer côté client, mais nous on le fais côté serveur
        //    body: "Le contenu de la notification ici.",
        //    icon: "icon.png"
        // })
    }
}

/**
 * Permet d'enregistrer le service worker pour abonner l'utilisateur
 */
async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('./sw.js')
    let subscription = await registration.pushManager.getSubscription() // Nous dit si l'utilisateur est déjà abonné au service push

    // -- Si on a pas d'abonnement on crée un nouveau sinon on contacte le serveur en lui envoyant les informations
    if(!subscription) {
        // Si on n'a pas d'abonnement
        subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true, // Doit être toujours à true, pour les gens sachent que lorsque vont s'abonner à un système d'abonnement ça sera quelque chose de visible
            applicationServerKey: await getPublishKey()
        })
    }

    await saveSubscrition(subscription) // Enregistre l'abonnement au niveau de notre serveur, 'subscription' nous renvoi une promesse
}

/**
 * Permet de récupérer les cléf générer par mon 'backend'
 */
async function getPublishKey() {
    const {key} = await fetch('/push/key', {
        headers: {
            Accept: 'application/json'
        }
    }).then(r => r.json())
    return key
}

/**
 * Permet d'envoyer les informations au 'backend'
 * @param {PushSubscription} subscription 
 * @returns {Promise<void>}
 */
async function saveSubscrition(subscription) {
    await fetch('/push/subscrition', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(subscription)
    })
}

main()

// --- Avant de gérer la partie serveur on a modifier notre service worker dans 'sw.js' en lui demandant de gérer les évènements push