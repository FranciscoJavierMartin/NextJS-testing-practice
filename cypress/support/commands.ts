/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import '@testing-library/cypress/add-commands';

Cypress.Commands.add('resetDbAndClearIsrCache' as any, () => {
  cy.task('db:reset');
  const secret = Cypress.env('REVALIDATION_SECRET');
  cy.request('GET', `/api/revalidate?secret=${secret}`);
});

Cypress.Commands.add('signIn' as any, (email: any, password: any) => {
  cy.visit('/auth/signin');

  (cy as any)
    .findByLabelText(/email address/i)
    .clear()
    .type(email);

  (cy as any)
    .findByLabelText(/password/i)
    .clear()
    .type(password);

  (cy as any)
    .findByRole('main')
    .within(() =>
      (cy as any).findByRole('button', { name: /sign in/i }).click()
    );

  (cy as any).findByRole('heading', { name: /welcome/i }).should('exist');
});
