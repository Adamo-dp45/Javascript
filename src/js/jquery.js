import $ from 'jquery'
import 'jquery-ui/ui/widgets/datepicker' // Importer un widget précis
import 'jquery-ui/themes/base/all.css'

$('#id') // Sélectionner par ID
$('.class') // Sélectionner par classe
$('div > p') // Sélectionner les paragraphes enfants d'un div
$('[id="btn"]') // Sélectionne par attribut

$('p:first') // Sélectionner le premier élément
$('#element + p') // Sélectionner tous les éléments après un certain élément
$('#parent div:nth-child(2)') // Sélectionner un élément dans un élément parent spécifique

// $('#element').text('Nouveau texte') -- Modifier le texte
$('#element').html('<b>Nouveau contenu HTML</b>') // Modifier le HTML
$('input').val('Nouvelle valeur'); // Modifier la valeur d'un champ

$('#list').append('<li>Élément ajouté à la fin</li>') // Ajouter après
$('#list').prepend('<li>Élément ajouté au début</li>') // Ajouter avant
$('#element').remove() // Supprimer un élément
$('#element').after('<p>Après l\'élément</p>') // Après l'élément
$('#element').before('<p>Avant l\'élément</p>') // Avant l'élément
$('#element').empty() // Supprime uniquement le contenu de l'élément

const clone = $('#element').clone() // Cloner un élément
$('#container').append(clone) // Ajouter le clone

$('#element').addClass('active') // Ajouter une classe
$('#element').removeClass('active') // Supprimer une classe
$('#element').toggleClass('active') // Basculer une classe

// -- Événements : hover(), dblclick(), keydown(), keyup(), scroll(), blur()
$('.btn').click(function() {
    alert('Bouton cliqué !')
})

$('#input').focus(function() {
    console.log('Champ en focus')
})

$(document).on('click', '.button', function() { // Délégation d'événements
    alert('Bouton dynamique cliqué !')
})

$(document).resize(function() {
    console.log('Fenêtre redimensionnée')
})

$('#button').off('click') // Supprimer un événement

// -- Événements personnalisés :
$('#element').on('customEvent', function() {
    console.log('Événement personnalisé déclenché')
})
$('#element').trigger('customEvent')

// -- Effets et animations
$('#element').hide() // Masquer un élément
$('#element').show() // Afficher un élément
$('#element').toggle() // Basculer entre afficher et masquer

$('#element').fadeIn() // Apparaître en fondu
$('#element').fadeOut() // Disparaître en fondu
$('#element').fadeToggle() // Basculer entre fondu entrant et sortant

$('#element').slideUp() // Glisser pour masquer
$('#element').slideDown() // Glisser pour afficher
$('#element').slideToggle() // Basculer entre glissement

$('#element').animate({opacity: 0.5, width: '200px' }, 1000)

// -- Ajax
$.get('data.json', function(data) {
    console.log(data)
}) // .getJSON pour récupérer du json

$.post('serveur.php', { name: 'John' }, function(response) {
    console.log(response)
})

$.ajax({
    url: 'api/data',
    method: 'GET',
    // data: {}, -- Pour Post
    success: function(data) {
        console.log('Succès : ', data)
    },
    error: function(error) {
        console.log('Erreur : ', error)
    }
})

// -- Gestion des formulaires
$('#input').val() // Récupérer la valeur d'un champ

$('form').submit(function(event) {
    event.preventDefault()
    if ($('#input').val() === '') {
        alert('Le champ est vide !')
    }
})

// -- Manipulation des attributs
$('#element').attr('src', 'nouvelle-image.jpg') // Modifier l'attribut src
$('#element').removeAttr('disabled') // Supprimer un attribut
$('#checkbox').prop('checked', true) // Modifier une propriété
let lien = $('a').attr('href') // Lire un attribut
console.log(lien)

// -- Traversée du DOM
$('#child').parent() // Récupérer le parent
$('#element').parents() // Tous les parents
$('#parent').children() // Récupérer tous les enfants
$('#element').siblings() // Récupérer les frères et sœurs
$('#container').find('.child') // Trouver les enfants spécifiques
$('#element').height(300) // Définir une hauteur
const position = $('#element').offset() // Position absolue
$(window).scrollTop(0) // Remonter en haut de la page
$('#element').data('key', 'value') // Ajouter des données
const value = $('#element').data('key') // Récupérer des données

$('li').each(function(index, element) { // Boucle
    console.log(index, element)
})
const array = $('li').toArray() // Convertir une liste en tableau

// -- Gestion des styles
$('#element').css('color', 'red') // Modifier une propriété CSS
$('#element').css({ color: 'blue', fontSize: '18px' }) // Modifier plusieurs propriétés

// -- Gestion des médias
$('img').on('load', function() {
    console.log('Image chargée')
})

// -- Enchaînement de méthodes
$('#monElement')
    .css('color', 'blue')
    .fadeOut(500)
    .slideDown()


// --- Jquery Ui --- //
$(function() {
    $('#datepicker').datepicker({
        dateFormat: 'dd/mm/yy',
        showAnim: 'fadeIn',
    })

    $('#dialog').dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            OK: function() {
                $(this).dialog('close')
            },
            Annuler: function() {
                $(this).dialog('close')
            }
        }
    })

    $('#open-dialog').click(function() {
        $('#dialog').dialog('open')
    })

    $('#slider').slider({
        min: 0,
        max: 100,
        value: 50,
        slide: function(event, ui) {
            $('#slider-value').text(ui.value)
        }
    })

    $('#draggable').draggable()

    $('#droppable').droppable({
        accept: '#draggable',
        drop: function(event, ui) {
            $(this).addClass('ui-state-highlight').text('Déposé avec succès !')
        }
    })

    $('#progressbar').progressbar({
        value: 0
    })

    $('#start-progress').click(function() {
        let progress = 0;
        const interval = setInterval(function() {
            progress += 5
            $('#progressbar').progressbar('value', progress)
            if (progress >= 100) {
                clearInterval(interval)
            }
        }, 500)
    })
})
// ---
const calendarEl = document.getElementById('calendar')
const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth', // Vue par défaut 'mois'
    locale: 'fr',
    headerToolbar: { // Personnalisation des contrôles
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    buttonText: { // Textes personnalisés pour les boutons
        today: 'Aujourd\'hui',
        month: 'Mois',
        week: 'Semaine',
        day: 'Jour'
    },
    events: [ // Événements du calendrier
        {
            title: 'Réunion de projet',
            start: '2025-01-28T10:00:00',
            end: '2025-01-28T12:00:00',
            description: 'Discussion sur l\'avancement du projet.'
        },
        {
            title: 'Formation',
            start: '2025-01-29',
            allDay: true
        },
        {
            title: 'Conférence',
            start: '2025-02-01T14:00:00',
            end: '2025-02-01T16:00:00'
        }
    ],
    eventClick: function (info) { // Gestion du clic sur un événement
        alert(`Titre: ${info.event.title}\nDate: ${info.event.start}\nDescription: ${info.event.extendedProps.description || 'Pas de description.'}`)
    },
    dateClick: function (info) { // Gestion du clic sur une date
        alert(`Date sélectionnée: ${info.dateStr}`)
    }
})

calendar.render()


$(document).ready(function () {
    $('#form').validate({
        rules: {
            username: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6
            },
            confirmPassword: {
                required: true,
                equalTo: '#password'
            },
            terms: {
                required: true
            }
        },
        messages: {
            username: {
                required: "Veuillez entrer un nom d'utilisateur.",
                minlength: "Le nom d'utilisateur doit contenir au moins 3 caractères."
            },
            email: {
                required: "Veuillez entrer une adresse e-mail.",
                email: "Veuillez entrer une adresse e-mail valide."
            },
            password: {
                required: "Veuillez entrer un mot de passe.",
                minlength: "Le mot de passe doit contenir au moins 6 caractères."
            },
            confirmPassword: {
                required: "Veuillez confirmer votre mot de passe.",
                equalTo: "Les mots de passe ne correspondent pas."
            },
            terms: {
                required: "Vous devez accepter les termes et conditions."
            }
        },
        errorElement: "label", // Définit le type d'élément pour afficher les erreurs
        errorPlacement: function (error, element) {
            if (element.attr("type") === "checkbox") { // Personnalisation de l'emplacement des messages d'erreur
                error.insertAfter(element.next("label"))
            } else {
                error.insertAfter(element)
            }
        },
        submitHandler: function (form) {
            alert("Formulaire validé avec succès !")
            form.submit()
        }
    })
})