import { UserReservations } from '@/components/user/UserReservations';
import { render, screen } from '@testing-library/react';

test("Displays reservations and 'purchase more' button when reservations exist", async () => {
  render(<UserReservations userId={1} />);

  const puchaseButton = await screen.findByRole('button', {
    name: /purchase more tickets/i,
  });

  expect(puchaseButton).toBeInTheDocument();
});

test("Displays no reservations and 'purchase' button when no reservations exist", async () => {
  render(<UserReservations userId={0} />);

  const puchaseButton = await screen.findByRole('button', {
    name: /purchase tickets/i,
  });

  expect(puchaseButton).toBeInTheDocument();

  const ticketsHeading = screen.queryByRole('heading', {
    name: /your tickets/i,
  });
  expect(ticketsHeading).not.toBeInTheDocument();
});
