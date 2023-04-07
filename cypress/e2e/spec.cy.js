describe('run website spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8246/account')
  })
})

context('Connexion and action', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:8246/myaccount')
    cy.get('#email').type('remy.guyon2@gmail.com') // Type 'remy.guyon2@gmail.com' into the input '#email'
    cy.get('#password').type('testTEST1234') // Type 'testTEST1234' into the input '#password'
    cy.get('#btn_connexion').click() // Press enter into the button 'btn_connexion'
  })


  it('verification informations profil', () => {
    cy.get('#civilite').should('be.visible').should('have.value', 'HOMME').should('have.attr', 'readonly', 'readonly')
    cy.get('#prenom').should('be.visible').should('have.value', 'Rémy').should('have.attr', 'readonly', 'readonly')
    cy.get('#nom').should('be.visible').should('have.value', 'Guyon').should('have.attr', 'readonly', 'readonly')
    cy.get('#mail').should('be.visible').should('have.value', 'remy.guyon2@gmail.com').should('have.attr', 'readonly', 'readonly')
    cy.get('#portable').should('be.visible').should('have.value', '07 82 26 35 49').should('have.attr', 'readonly', 'readonly')
  })
  it('changer mot de passe', () => {
    cy.get('#btn_validerNewMdp').should('be.visible').click()
    cy.get('#oldpassword').should('be.visible').type('testTEST1234')
    cy.get('#newpassword').should('be.visible').type('TestTest1234')
    cy.get('#btn_validerNewMdp').should('be.visible').click()

  })

  it('deconnexion profil', () => {
    cy.get('#btn_deconnexion').should('be.visible').click()
  })

})