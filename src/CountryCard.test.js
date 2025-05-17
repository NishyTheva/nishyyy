import { render, screen } from '@testing-library/react';
import CountryCard from './CountryCard';

const mockCountry = {
  name: { common: 'Japan' },
  flags: { svg: 'https://flagcdn.com/jp.svg' },
  capital: ['Tokyo'],
  region: 'Asia',
};

test('Japan card render aaguthu nu paarpom', () => {
  render(<CountryCard country={mockCountry} />);
  expect(screen.getByText('Japan')).toBeInTheDocument();
  expect(screen.getByText('Tokyo')).toBeInTheDocument();
  expect(screen.getByText('Asia')).toBeInTheDocument();
});
