import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the student list', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /student list/i })).toBeInTheDocument();
  expect(screen.getByText(/adhithan/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
});
