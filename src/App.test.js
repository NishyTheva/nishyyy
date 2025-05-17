import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

// 🔐 Force login screen by clearing storage
beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => null);
});

test('renders login page heading', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const loginHeading = screen.getByPlaceholderText(/enter your name/i);
  expect(loginHeading).toBeInTheDocument();
});
