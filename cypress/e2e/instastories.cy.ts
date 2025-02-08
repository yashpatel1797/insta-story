describe('Instagram Stories', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173')
    })
  
    it('displays the stories list with user avatars and usernames', () => {
      cy.get('.stories-list').should('exist')
      cy.get('.story-item').should('have.length', 6)
      cy.get('.story-username').first().should('have.text', 'Yash')
    })
  
    it('opens story viewer when clicking on a story', () => {
      cy.get('.story-item').first().click()
      cy.get('.story-viewer').should('exist')
      cy.get('.story-image').should('be.visible')
      cy.get('.story-user-name').should('have.text', 'Yash')
    })
  
    it('shows progress bars for multiple images in a story', () => {
      cy.get('.story-item').first().click()
      cy.get('.progress-bar-container').should('have.length', 2)
    })
  
    it('closes story viewer when clicking close button', () => {
      cy.get('.story-item').first().click()
      cy.get('.close-button').click()
      cy.get('.story-viewer').should('not.exist')
    })
  
    it('navigates through images in a story automatically', () => {
      cy.get('.story-item').first().click()
      
      // Wait for first image
      cy.get('.story-image').should('have.attr', 'src').and('include', 'https://fastly.picsum.')
      
      // Wait for progress bar animation and next image
      cy.wait(5500)
      cy.get('.story-image').should('have.attr', 'src').and('include', 'https://fastly.picsum.')
    })
  
    it('navigates to next user story after completing current user stories', () => {
      cy.get('.story-item').first().click()
      
      // Wait for first user's stories to complete
      cy.wait(11000)
      
      // Should show second user's story
      cy.get('.story-user-name').should('have.text', 'Dhiman')
    })
  
    it('handles touch interactions for navigation', () => {
      cy.get('.story-item').first().click()
      
      // Test right side touch for next image
      cy.get('.story-content').trigger('touchstart', { touches: [{ clientX: window.innerWidth * 0.8 }] })
      cy.get('.story-content').trigger('touchend')
      cy.get('.story-image').should('have.attr', 'src').and('include', 'https://fastly.picsum.')
      
      // Test left side touch for previous image
      cy.get('.story-content').trigger('touchstart', { touches: [{ clientX: window.innerWidth * 0.2 }] })
      cy.get('.story-content').trigger('touchend')
      cy.get('.story-image').should('have.attr', 'src').and('include', 'https://fastly.picsum.')
    })
  })