import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the student management home route', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /student management system/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /add student/i })).toBeInTheDocument();
});
