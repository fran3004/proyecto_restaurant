import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Villa Adelaida hero heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Villa Adelaida: conecta con lo auténtico/i })).toBeInTheDocument();
});
 