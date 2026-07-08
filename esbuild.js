/*
    - npm install --save-exact --save-dev esbuild
    - node esbuild.js
*/
import { build } from "esbuild"
// import { nodeExternalsPlugin } from "esbuld-node-externals"

build({
    entryPoints: ['server/App.jsx', 'server/server.jsx'], // Les fichiers qu'on veut convertir
    target: 'node14', // Pour préciser le format et savoir s'il doit convertir certaines variables
    format: 'esm', // !! avoir un type 'module'
    platform: 'node', // On cible 'node' ici pas un navigateur
    outdir: 'server', // Le dossier de destination
    logLevel: 'debug',
    bundle: true // On veut bundler tous, mettre le code de react et tous directement dans le fichier
    // plugins: [nodeExternalsPlugin()]
}) /*
    - 'Plugin' permet de ne pas essayer de bundler tous ce qui est extérieur 'koa koa-static' ou comme 'react'
*/

build({
    entryPoints: ['server/main.jsx'],
    target: 'chrome96',
    format: 'esm',
    platform: 'browser', // !! un navigateur
    outdir: 'server',
    bundle: true,
    logLevel: 'debug'
})