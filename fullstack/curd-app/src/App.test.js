import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the CRUD form', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /react crud/i })).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/enter item/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
});
