import lightGallery from 'lightgallery'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-zoom.css'

const gallery = document.getElementById('gallery')
lightGallery(gallery, {
    plugins: [lgZoom, lgThumbnail], // Liste des plugins à utiliser
    speed: 500, // Vitesse de transition en ms
    thumbnail: true, // Activer les miniatures
    zoom: true, // Activer le zoom
    autoplay: true, // Lecture automatique
    download: true, // Bouton de téléchargement
    fullScreen: true, // Bouton plein écran
    // selector: a -- Sélecteur css des éléments enfants par défaut `a`
    mode: 'lg-slide', // Type de transition
    // videojs: true -- Pour le support des vidéos en utilisant le plugin lgVideo
})

// On peut ajouter d’autres plugins lg-video - lg-autoplay - lg-fullscreen

// lightGalleryInstance.refresh() -- Pour recharger la galerie
// lightGalleryInstance.openGallery(index) -- Pour l’ouvrir manuellement
