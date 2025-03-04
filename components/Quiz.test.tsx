import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Quiz } from './Quiz';

describe('Quiz Component', () => {
  const mockProps = {
    question: 'What is React?',
    options: [
      { id: '1', text: 'A JavaScript library for building user interfaces', isCorrect: true },
      { id: '2', text: 'A programming language', isCorrect: false },
      { id: '3', text: 'A database management system', isCorrect: false },
    ],
    explanation: 'React is a JavaScript library developed by Facebook for building user interfaces.',
  };

  test('renders the quiz question', () => {
    render(<Quiz {...mockProps} />);
    expect(screen.getByText(mockProps.question)).toBeInTheDocument();
  });

  test('renders all options', () => {
    render(<Quiz {...mockProps} />);
    mockProps.options.forEach(option => {
      expect(screen.getByText(option.text)).toBeInTheDocument();
    });
  });

  test('selects an option when clicked', () => {
    render(<Quiz {...mockProps} />);
    const option = screen.getByText(mockProps.options[0].text);
    fireEvent.click(option);
    expect(option.parentElement).toHaveClass('bg-blue-50');
  });

  test('submit button is disabled when no option is selected', () => {
    render(<Quiz {...mockProps} />);
    const submitButton = screen.getByText('Submit Answer');
    expect(submitButton).toBeDisabled();
  });

  test('submit button is enabled when an option is selected', () => {
    render(<Quiz {...mockProps} />);
    const option = screen.getByText(mockProps.options[0].text);
    fireEvent.click(option);
    const submitButton = screen.getByText('Submit Answer');
    expect(submitButton).not.toBeDisabled();
  });

  test('shows explanation after submitting', () => {
    render(<Quiz {...mockProps} />);
    const option = screen.getByText(mockProps.options[0].text);
    fireEvent.click(option);
    const submitButton = screen.getByText('Submit Answer');
    fireEvent.click(submitButton);
    expect(screen.getByText('Explanation:')).toBeInTheDocument();
    expect(screen.getByText(mockProps.explanation)).toBeInTheDocument();
  });

  test('shows "Try Again" button after submitting', () => {
    render(<Quiz {...mockProps} />);
    const option = screen.getByText(mockProps.options[0].text);
    fireEvent.click(option);
    const submitButton = screen.getByText('Submit Answer');
    fireEvent.click(submitButton);
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });
}); 