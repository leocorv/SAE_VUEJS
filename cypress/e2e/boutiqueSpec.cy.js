describe('run website spec', () => {
    it('passes', () => {
      cy.visit('http://localhost:8246')
    })
  })
  
  context('Actions', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8246')
    })
  
    it('nav into 1ère categorie ', () => {
        cy.get('#button1').should('be.visible').click()
        cy.get('#title').should('have.text', 'Nos produits')
    })
    // it('add filter', () => {
    //     cy.get('#button1').click()
    //     cy.get('#title').should('have.text', 'Nos produits')
    // })
  
  })