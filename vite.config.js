import { defineConfig } from "vite"

export default defineConfig({
    server: {
        origin: "http://localhost:5173" // L'url de préfix, pour pouvoir charger les ressources depuis le serveur de dev comme les images dans le css
        // port: 5173,
        // strictPort: true
    },
    base : 'assets', // Le chemin de base à cause du 'assetDir' sinon il ne vas pas trouver l'url des images à lors du build
    build: {
        copypublicDir: false, // Ne pas copier le dossier public sinon il copie le index.php
        outDir: 'vite/assets', // Le dossier de sortie des ressources
        // emptyOutDir: true,
        assetDir: '', // Ne pas rajouter de sous dossier supplémentaire
        manifest: true, // Le fichier qui contenir les chemins vers les ressources
        rollupOptions: { // 'rollup' est utilisé par vite et permet de gérer la partie bundler
            input: 'src/vite/app.js' // Le point d'entrée des ressources
        }
    }
})