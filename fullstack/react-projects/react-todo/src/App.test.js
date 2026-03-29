import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the todo input form', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /react todo application/i })).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/enter task/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
});
