/* eslint-disable no-undef */
/// <reference types="cypress" />

it('skips client-side bundle, confirming data from ISR cache', () => {
  cy.request('/shows')
    .its('body')
    .then((html) => {
      const staticHtml = html.replace(/<script.*?>.*?<\/script>/gm, '');
      cy.state('document').write(staticHtml);
    });

  cy.findAllByText(/2022 apr 1[567]/i).should('have.length', 3);
});
