/* eslint-disable no-undef */
/// <reference types="cypress" />
import { generateRandomId } from '../../../../lib/features/reservations/utils';
import { generateNewBand } from '../../../../__tests__/__mocks__/fakeData/newBand';
import { generateNewShow } from '../../../../__tests__/__mocks__/fakeData/newShow';

it('should load refreshed page from cache after new band is added', () => {
  cy.task('db:reset').visit('/bands');
  cy.findByRole('heading', { name: /avalanche of cheese/i }).should(
    'not.exist'
  );

  const bandId = generateRandomId();
  const band = generateNewBand(bandId);
  const secret = Cypress.env('REVALIDATION_SECRET');

  cy.request('POST', `/api/bands?secret=${secret}`, { newBand: band }).then(
    (res) => {
      expect(res.body.revalidated).to.equal(true);
    }
  );

  cy.reload();
  cy.findByRole('heading', { name: /avalanche of cheese/i }).should('exist');

  cy.resetDbAndClearIsrCache();
});

it('should load refreshed page from cache after new show is added', () => {
  cy.task('db:reset').visit('/shows');
  cy.findByRole('heading', { name: /avalanche of cheese/i }).should(
    'not.exist'
  );

  const showId = generateRandomId();
  const show = generateNewShow(showId);
  const secret = Cypress.env('REVALIDATION_SECRET');

  cy.request('POST', `/api/shows?secret=${secret}`, { newShow: show }).then(
    (response) => {
      expect(response.body.revalidated).to.equal(true);
    }
  );

  cy.reload();
  cy.findByRole('heading', { name: /avalanche of cheese/i }).should('exist');

  cy.resetDbAndClearIsrCache();
});
