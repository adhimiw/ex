import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the JSX greeting content', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /hello react/i })).toBeInTheDocument();
  expect(screen.getByText(/welcome to jsx basic display/i)).toBeInTheDocument();
  expect(screen.getByText(/hello adhithan/i)).toBeInTheDocument();
});
