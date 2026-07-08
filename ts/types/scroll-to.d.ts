// -- Le fichier de déclaration -- //
declare module "scroll-to" { // 'module' si elle se trouve dans un module
    const scrollTo: (x: number, y: number, options: {
        ease?: string,
        duration?: number
    }) => void

    export {scrollTo} // Veut dire que c'est exporté sous forme de cléf et pour importer il faut {scrollTo} ou ..
    export default scrollTo // Par défaut on peut l'importer avec import scrollTo
}