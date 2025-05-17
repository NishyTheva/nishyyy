// App.test.jsx
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

// App ku login illa naa Login poganum
beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => null);
});

test('Login page load aaguthu nu check', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText(/username/i);
  expect(input).toBeInTheDocument();
});
