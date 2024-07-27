import { render, screen, fireEvent } from "@testing-library/react";
import StringCalculator from "../components/StringCalculator";
import { act } from "react";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  jest.spyOn(window, "alert").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});
// Testcase 1
test("tracks the number of times Add method is called", () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "1,2" } });
  fireEvent.click(button);
  fireEvent.change(input, { target: { value: "3,4" } });
  fireEvent.click(button);

  expect(screen.getByText(/Add method called 2 times/i)).toBeInTheDocument();
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

// Testcase 2 : Handle an Unknown Amount of Numbers

test('adds "1,2,3,4,5" to equal 15', () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Add");
  fireEvent.change(input, { target: { value: "1,2,3,4,5" } });
  fireEvent.click(button);
  expect(screen.getByText(/Result: 15/i)).toBeInTheDocument();
});

//  Testcase 3 :  Handle New Lines Between Numbers

test('adds "1\n2,3" to equal 6', () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Add");
  fireEvent.change(input, { target: { value: `1\n2,3` } });
  //   console.log("Input value:", (input as HTMLInputElement).value);
  fireEvent.click(button);
  expect(screen.getByText(/Result: 6/i)).toBeInTheDocument();
});

// Testcase 4 : Support Different Delimiters

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

// Testcase 5 : Negatives not allowed

test("throws an exception for negative numbers", () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Add");

  // Mocking window.alert
  const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

  // Simulate user input and button click
  fireEvent.change(input, { target: { value: "1,-2,3" } });
  fireEvent.click(button);

  // Check if alert was called with the correct message
  expect(alertMock).toHaveBeenCalledWith("negatives not allowed: -2");

  // Check that the result is not displayed
  const resultElement = screen.queryByText(/Result:/i);
  expect(resultElement).not.toBeInTheDocument();

  // Cleanup
  alertMock.mockRestore();
});

//  Testcase 6 : Multiple negatives not allowed

test("throws an exception for multiple negative numbers", () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Add");

  // Mocking window.alert
  const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

  // Simulate user input and button click
  fireEvent.change(input, { target: { value: "1,-2,3,-4" } });
  fireEvent.click(button);

  // Check if alert was called with the correct message
  expect(alertMock).toHaveBeenCalledWith("negatives not allowed: -2, -4");

  // Check that the result is not displayed
  const resultElement = screen.queryByText(/Result:/i);
  expect(resultElement).not.toBeInTheDocument();

  // Cleanup
  alertMock.mockRestore();
});

//  Test case 7: Track Add Method Calls

test("tracks the number of times Add method is called", () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "1,2" } });
  fireEvent.click(button);
  fireEvent.change(input, { target: { value: "3,4" } });
  fireEvent.click(button);

  expect(screen.getByText(/Add method called 2 times/i)).toBeInTheDocument();
});

//  Test case 9: Numbers bigger than 1000 should be ignored

test("numbers bigger than 1000 should be ignored", () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "2,1001" } });
  fireEvent.click(button);

  expect(screen.getByText(/Result: 2/i)).toBeInTheDocument();
});

//  Test case 10: Delimiters can be of any length with the following format

test("custom delimiters of any length", () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "//[***]\n1***2***3" } });
  fireEvent.click(button);

  expect(screen.getByText(/Result: 6/i)).toBeInTheDocument();
});

// Testcase 11 : Handle multiple delimiters

test('adds "1*2%3" with custom delimiters "*" and "%" to equal 6', () => {
  render(<StringCalculator />);
  const input = screen.getByPlaceholderText(
    "Enter numbers"
  ) as HTMLTextAreaElement;
  const button = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "//[*][%]\n1*2%3" } });
  fireEvent.click(button);

  expect(screen.getByText(/Result:\s*6/i)).toBeInTheDocument();
});

// Testcase 12 :  handle multiple delimiters with length longer than one char

test('adds "1**2%%3" with custom delimiters "**" and "%%" to equal 6', () => {
    render(<StringCalculator />);
    const input = screen.getByPlaceholderText("Enter numbers") as HTMLTextAreaElement;
    const button = screen.getByText("Add");
  
    fireEvent.change(input, { target: { value: "//[**][%%]\n1**2%%3" } });
    fireEvent.click(button);
  
    expect(screen.getByText(/Result:\s*6/i)).toBeInTheDocument();
  });