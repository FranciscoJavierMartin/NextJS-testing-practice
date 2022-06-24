import { defineConfig } from 'cypress';
import { addBand } from './lib/features/bands/queries';
import { Band } from './lib/features/bands/types';
import { addReservation } from './lib/features/reservations/queries';
import { resetDB } from './__tests__/__mocks__/db/utils/reset-db';

export default defineConfig({
  e2e: {
    env: {
      REVALIDATION_SECRET: process.env.REVALIDATION_SECRET,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        'db:reset': () => resetDB().then(() => null),
        addBand: (newBand: Band) => addBand(newBand).then(() => null),
        addReservation: (reservation: any) =>
          addReservation(reservation).then(() => null),
      });
    },
  },
  video: false,
});
