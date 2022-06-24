import { readFakeData } from '@/__tests__/__mocks__/fakeData';
import { filenames, writeJSONToFile } from '@/lib/db/db-utils';

export const resetDB = async () => {
  if (process.env.NODE_ENV === 'test' || process.env.CYPRESS) {
    const { fakeShows, fakeBands, fakeUsers, fakeReservations } =
      await readFakeData();
    await Promise.all([
      writeJSONToFile(filenames.bands, fakeBands),
      writeJSONToFile(filenames.shows, fakeShows),
      writeJSONToFile(filenames.users, fakeUsers),
      writeJSONToFile(filenames.reservations, fakeReservations),
    ]);
  } else {
    console.warn(
      'WARNING: database reset unavailable outside test environment'
    );
  }
};
