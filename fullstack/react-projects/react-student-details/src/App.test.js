import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the student details', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /student details/i })).toBeInTheDocument();
  expect(screen.getByText(/name: adhithan/i)).toBeInTheDocument();
  expect(screen.getByText(/roll number: 23cs101/i)).toBeInTheDocument();
});
