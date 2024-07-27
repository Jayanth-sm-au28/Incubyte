// src/tests/App.test.tsx
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders String Calculator title', () => {
  render(<App />);
  const titleElement = screen.getByText(/String Calculator/i);
  expect(titleElement).toBeInTheDocument();
});
