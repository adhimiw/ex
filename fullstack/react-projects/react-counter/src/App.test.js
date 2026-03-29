import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the counter controls', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /react counter application/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /increase/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
});
