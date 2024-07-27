import { render, screen, fireEvent } from "@testing-library/react";
import StringCalculator from "../components/StringCalculator";
import { act } from "react";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
  
test("adds an empty string to equal 0", () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Add");
  act(() => {
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);
  });
  expect(screen.getByText(/Result: 0/i)).toBeInTheDocument();
});

test('adds "1" to equal 1', () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Add");
  act(() => {
    fireEvent.change(input, { target: { value: "1" } });
    fireEvent.click(button);
  });
  expect(screen.getByText(/Result: 1/i)).toBeInTheDocument();
});

test('adds "1,2" to equal 3', () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Add");
  act(() => {
    fireEvent.change(input, { target: { value: "1,2" } });
    fireEvent.click(button);
  });
  expect(screen.getByText(/Result: 3/i)).toBeInTheDocument();
});

// Handle an Unknown Amount of Numbers
test('adds "1,2,3,4,5" to equal 15', () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Add");
  fireEvent.change(input, { target: { value: "1,2,3,4,5" } });
  fireEvent.click(button);
  expect(screen.getByText(/Result: 15/i)).toBeInTheDocument();
});

//   Handle New Lines Between Numbers
test('adds "1\n2,3" to equal 6', () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Add");
  fireEvent.change(input, { target: { value: `1\n2,3` } });
//   console.log("Input value:", (input as HTMLInputElement).value);
  fireEvent.click(button);
  expect(screen.getByText(/Result: 6/i)).toBeInTheDocument();
});

// Support Different Delimiters
test('adds "1;2;3" with custom delimiter ";" to equal 6', () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText(
    "Enter numbers"
  ) as HTMLTextAreaElement;
  const button = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "//;\n1;2;3" } });
  fireEvent.click(button);

  expect(screen.getByText(/Result:\s*6/i)).toBeInTheDocument();
});


// “negatives not allowed
test('throws an exception for negative numbers', () => {
    render(<StringCalculator />);
    const input = screen.getByPlaceholderText("Enter numbers");
    const button = screen.getByText("Add");
  
    // Mocking window.alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
  
    // Simulate user input and button click
    fireEvent.change(input, { target: { value: "1,-2,3" } });
    fireEvent.click(button);
  
    // Check if alert was called with the correct message
    expect(alertMock).toHaveBeenCalledWith('negatives not allowed: -2');
    
    // Check that the result is not displayed
    const resultElement = screen.queryByText(/Result:/i);
    expect(resultElement).not.toBeInTheDocument();
    
    // Cleanup
    alertMock.mockRestore();
  });
  
  
