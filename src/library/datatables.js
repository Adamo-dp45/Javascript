import $ from "jquery"
import dt from 'datatables.net-bs5'

$('#example').DataTable({
    paging: true, // Pagination
    searching: true, // Recherche
    ordering: true, // Tri
    info: false, // Afficher les informations sur la table
    dom: 'Bfrtip', // Placer les boutons au-dessus de la table
    buttons: ['copy', 'csv', 'excel', 'pdf', 'print'], // Boutons disponibles
    language: {
        url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/French.json", // Fichier de traduction ou 'fr-FR.json' physique
        paginate: {
            first: '<<',
            last: '>>',
            previous: 'Précédent',
            next: 'Suivant'
        },
        processing: 'Traitement en cours...',
        search: 'Rechercher&nbsp;:',
        lengthMenu: 'Afficher _MENU_ d\'éléments',
        info: 'Affichage de _START_ à _END_ sur _TOTAL_ éléments',
        infoEmpty: 'Affichage de 0 à 0 sur 0 éléments',
        infoFiltered: '(filtré à partir de _MAX_ éléments au total)',
        loadingRecords: 'Chargement en cours...',
        zeroRecords: 'Aucun élément à afficher',
        emptyTable: 'Aucune donnée disponible dans le tableau',
        aria: {
            orderable: ': activer pour organiser'
        }
    },
    columnDefs: [
        {
            targets: 0,
            visible: false
        }, // On masque la colonne
        {
            targets: 2,
            orderable: false
        } // On désactive le tri sur la colonne
    ],
    columns: [
        { searchable: true }, // Colonne 0
        { searchable: true }, // Colonne 1
        { searchable: false } // Colonne 3 (non recherchée)
    ]
})

// -- table: data-toggle="table" data-search="true" data-show-columns="true" data-pagination="true" - th: data-sortable="true" data-field="Id" - Bootstrap Table js