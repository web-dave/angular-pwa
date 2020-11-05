describe('Conf Buddy', () => {
  before(() => {
    cy.visit('/');
  });
  it('should show Title', () => {
    cy.contains('Conference Buddy!');
  });
  it('should have 4 entries', () => {
    cy.get('.mat-row').should('have.length', 4);
    cy.get('.mat-row').contains('myConf').click();
  });
  it('I want to add a user', () => {
    let number = 0;
    cy.get('mat-card').as('users');
    cy.get('@users').then((u) => {
      number = u.length;
      console.log(number);
      cy.get('mat-icon').click();
      cy.get('[formcontrolname="name"]').type('Hurbel Wonz');
      cy.get('button[type="submit"]').should('be.disabled');
      cy.get('[formcontrolname="link"]').type('link');
      cy.get('button[type="submit"]').should('not.be.disabled').click();
      cy.get('@users').should('have.length', number + 1);
    });
  });
});
