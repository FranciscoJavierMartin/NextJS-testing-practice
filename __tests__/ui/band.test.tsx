import BandComponent from '@/pages/bands/[bandId]';
import { render, screen } from '@testing-library/react';
import { readFakeData } from '@/__tests__/__mocks__/fakeData';

test('band component displays correct band information', async () => {
  const { fakeBands } = await readFakeData();
  render(<BandComponent band={fakeBands[0]} error={null} />);

  const heading = screen.getByRole('heading', {
    name: /the wandering bunnies/i,
  });
  expect(heading).toBeInTheDocument();
});

test('band component displays error', async () => {
  render(<BandComponent band={null} error='My custom error' />);

  const error = screen.getByRole('heading', {
    name: /my custom error/i,
  });
  expect(error).toBeInTheDocument();
});
