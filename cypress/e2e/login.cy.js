describe('Login formu', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('başarılı form doldurulduğunda success sayfası açılıyor', () => {
    cy.get('#email').type('erdem.guntay@wit.com.tr');
    cy.get('#password').type('Abcdef1!');
    cy.get('#terms').check();

    cy.get('button[type="submit"]').should('not.be.disabled').click();

    cy.url().should('include', '/success');
    cy.contains('Success').should('be.visible');
  });

  it('email yanlış girilince 1 hata mesajı görünüyor ve buton disabled kalıyor', () => {
    cy.get('#email').type('erdem@wit');

    cy.get('.invalid-feedback').should('have.length', 1);
    cy.contains('Please enter a valid email address').should('be.visible');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('email ve password yanlış girilince 2 hata mesajı görünüyor', () => {
    cy.get('#email').type('erdem@wit');
    cy.get('#password').type('123');

    cy.get('.invalid-feedback').should('have.length', 2);
    cy.contains('Password must be at least 8 characters').should('be.visible');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('email ve password doğru ama şartlar kabul edilmezse buton disabled kalıyor', () => {
    cy.get('#email').type('erdem.guntay@wit.com.tr');
    cy.get('#password').type('Abcdef1!');

    cy.get('.invalid-feedback').should('not.exist');
    cy.get('button[type="submit"]').should('be.disabled');
  });
});