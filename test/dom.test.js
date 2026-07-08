const assert = require('assert')
const { expect } = require('chai')

describe('Test de Text', function() { // Groupe de tests
    before(function() {
        // Exécute avant le lancement des tests
        // Si on fais un beforeEach il est important de faire un afterEach pour défaire ce qu'on a fais dans le beforeEach
        // beforeEach : Avant chaque test
        // afterEach : Après chaque test
        // after : Après tous les tests
    })

    it.only('should to something', function() { // only permet d'exécuter ce test, skip veut dire qu'on le met en atente
        let a = 3
        assert.equal(a * 1, 4, 'La multiplication n\'a pas fonctionnée')
        // expect(add(2, 3)).to.equal(5)
        // expect(result).to.equal(10)
    })

    it('should to other', function() { // Test individuel
        let a = 3
        assert.equal(a * 1, 3, 'La multiplication a fonctionnée')
        assert.notEqual(a * 1, 6, 'La multiplication a fonctionnée')
    })

    describe('#autre', function() {})
})