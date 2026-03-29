import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the React documentation link', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /learn react/i })).toBeInTheDocument();
  expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
});
