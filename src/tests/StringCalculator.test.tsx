import { render, screen, fireEvent } from '@testing-library/react';
import StringCalculator from '../components/StringCalculator';
import { act } from 'react';
import userEvent  from '@testing-library/user-event'

test('adds an empty string to equal 0', () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText('Enter numbers');
  const button = screen.getByText('Add');
  act(() => {
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);
  });
  expect(screen.getByText(/Result: 0/i)).toBeInTheDocument();
});

test('adds "1" to equal 1', () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText('Enter numbers');
  const button = screen.getByText('Add');
  act(() => {
    fireEvent.change(input, { target: { value: '1' } });
    fireEvent.click(button);
  });
  expect(screen.getByText(/Result: 1/i)).toBeInTheDocument();
});

test('adds "1,2" to equal 3', () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText('Enter numbers');
  const button = screen.getByText('Add');
  act(() => {
    fireEvent.change(input, { target: { value: '1,2' } });
    fireEvent.click(button);
  });
  expect(screen.getByText(/Result: 3/i)).toBeInTheDocument();
});

// Handle an Unknown Amount of Numbers
test('adds "1,2,3,4,5" to equal 15', () => {
    render(<StringCalculator />);
    const input = screen.getByPlaceholderText('Enter numbers');
    const button = screen.getByText('Add');
    fireEvent.change(input, { target: { value: '1,2,3,4,5' } });
    fireEvent.click(button);
    expect(screen.getByText(/Result: 15/i)).toBeInTheDocument();
  });