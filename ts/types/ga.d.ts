// -- Le fichier de déclaration -- //
declare var ga: (eventName: string, options: { // On peut définir la variable de google analytics, on aurra de l'auto-complétion au niveau de notre code ts
    hitType: string,
    eventCategory?: string
}) => void

// interface Window {ga} -- On peut le mettre dans l'interface aussi