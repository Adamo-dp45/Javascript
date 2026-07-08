import { createMachine, guard, interpret, invoke, reduce, state, transition } from 'robot3'

const wait = (duration) => { // On simule un appel a un serveur
    return new Promise((resolve, reject) => {
        window.setTimeout(function() {
            resolve()
        }, duration)
    })
}

const machine = createMachine('edit', // 'edit' si on veut tester notre machine, on peut lui passer l'état initial en premier paramètre
    { // -- Schema de notre machine 
    idle: state( // Etat
        transition('edit', 'edit') // Permet de passer d'un état à un autre, prend en paramètre un nom et vers quel état je veut partir
    ),
    edit: state(
        transition('cancel', 'idle'),
        transition('input', 'edit', reduce((ctx, event) => ({ // Prend en params le context et l'évènement, en fonction de ça on doit retourner le nouveau context
            ...ctx, editedTitle: event.value // title: event.value -- Plutôt que de changer la valeur directement on a sauvegarder une nouvelle valeur pour pouvoir des traitements
        }))), // 'reduce' Va être appeler lorsqu'il y'aura un changement d'état
        transition('submit', 'loading', guard(ctx => ctx.editedTitle && ctx.editedTitle !== ctx.title)) // 'guard' prend en params une fonction qui reçoit un context et qui va vérifier si oui ou non on doit faire les choses, donc si on soumet sans changer le titre rien ne vas se passer
    ),
    // Permet d'empêcher une transition sous certaines conditions
    loading: invoke(() => wait(3000), // On pourrait réupérer des informations depuis le serveur
        transition('done', 'success'),
        transition('error', 'edit') // En cas d'erreur
    ), // 'invoke' permet de lancer une promesse et lors de la résolution va permettre d'éffectuer une transition, prend en premier params une promesse
    success: state()
}, () => ({title: 'Hello'})) // Prend en deuxième params un context, qui va nous permettre de persisiter les informations et autres, ici une fonction qui renvoi le context car on pourrait l'utiliser dans 'interpret', chaque nouvelle machine aura un context différent

const service = interpret(machine, () => { // Créer une nouvelle instance, prend en deuxième params une fonction qui permet d'écouter les changements de la machine
    console.log('Etat : ', service.machine.current),
    console.log('Context : ', service.context)
}) // --- Mise en application, on peut directement dans la onChange de service rajouter des comportements particulier pour pouvoir modifier le DOM, affecté des choses ou utiliser ce système directement dans des framework comme react ou autre 

console.log(
    service,
    service.machine.current // Notre état actuel 'idle'
)
service.send('edit') // Permet de déclancher une transition, si on n'est dans edit et qu'on vas vers le même edit rien ne vas changer car on n'est dans le même état
console.log(service.machine.current) // On sera dans l'état 'edit'
// service.send('cancel') -- Car si je cancel on ne pourra pas passer à l'état 'loading' depuis 'idle'
// console.log(service.machine.current) -- Va revenir dans l'état 'idle'
service.send({type: 'input', value: 'Nouveau titre'}) // Permet de changer le titre
service.send('submit')
console.log(service.machine.current) // On sera dans l'état 'loading' si on change le titre car on a un mis un guard

window.send = service.send // Nous permettra de pouvoir envoyer des infos depuis le terminal comme un 'send('input')'
// send({type: 'input', value: 'Nouveau titre'}) -- Changera le titre dans le context de ma machine

// npx rollup -c rollup.config.js --watch