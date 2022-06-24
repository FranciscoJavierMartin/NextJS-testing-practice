/* eslint-disable no-undef */
/// <reference types="cypress" />

it('displays bands when skipping client-side javascript, confirming initial ISR', () => {
  cy.request('/bands')
    .its('body')
    .then((html) => {
      const staticHtml = html.replace(/<script.*?>.*?<\/script>/gm, '');
      cy.state('document').write(staticHtml);
    });

  cy.findByRole('heading', { name: /the wandering bunnies/i }).should('exist');
  cy.findByRole('heading', { name: /shamrock pete/i }).should('exist');
  cy.findByRole('heading', { name: /the joyous nun riot/i }).should('exist');
});
