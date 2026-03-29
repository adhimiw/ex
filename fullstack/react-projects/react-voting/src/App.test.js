import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the voting page', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /voting page/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /vote alice/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /show winner/i })).toBeInTheDocument();
});
