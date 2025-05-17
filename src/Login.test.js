import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

test('Login screen render aagudhu nu check pannalaam', () => {
  render(
    <MemoryRouter>
      <Login setUser={() => {}} />
    </MemoryRouter>
  );

  // Heading check
  expect(screen.getByText(/login to country explorer/i)).toBeInTheDocument();

  // Input fields check
  expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

  // Button check
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});
