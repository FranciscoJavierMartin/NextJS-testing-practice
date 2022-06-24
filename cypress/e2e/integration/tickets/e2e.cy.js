/* eslint-disable no-undef */
/// <reference types="cypress" />

it('completes the ticket purchase flow, starting not signed in', () => {
  cy.task('db:reset').visit('/');
  cy.findByRole('button', { name: /shows/i }).click();

  cy.findAllByRole('button', { name: /tickets/i })
    .last()
    .click();

  cy.findByLabelText(/email address/i)
    .clear()
    .type(Cypress.env('TEST_USER_EMAIL'));

  cy.findByLabelText(/password/i)
    .clear()
    .type(Cypress.env('TEST_USER_PASSWORD'));

  cy.findByRole('main').within(() => {
    cy.findByRole('button', { name: /sign in/i }).click();
  });

  cy.findByRole('heading', { name: /the joyous nun riot/i }).should('exist');
  cy.findByText(/100 seats left/i).should('exist');

  cy.findByRole('spinbutton').clear().type('5');
  cy.findByRole('button', { name: /purchase/i }).click();

  cy.findByText(/5 seats confirmed/i).should('exist');

  cy.findByRole('button', { name: /see all purchases/i }).click();
  cy.findByText(/the joyous nun riot/i).should('exist');

  cy.findByRole('button', { name: /shows/i }).click();

  cy.findAllByRole('button', { name: /tickets/i })
    .last()
    .click();

  cy.wait(2000);

  cy.findByText(/95 seats left/i).should('exist');

  cy.findByRole('button', { name: /sign out/i }).click();
  cy.findByText(Cypress.env('TEST_USER_EMAIL')).should('not.exist');
});
