import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for better assertions
import TaskList from './TaskList';
import { FaEllipsisV } from 'react-icons/fa';

// Mocking the FaEllipsisV icon
jest.mock('react-icons/fa', () => ({
  FaEllipsisV: () => <span>...</span>,
}));

describe('TaskList Component', () => {
  const mockTasks = [
    {
      id: 1,
      user: 'John Doe',
      status: 'In Progress',
      dueDate: '2023-09-25',
      priority: 'High',
      comments: 'Needs to be done soon.',
    },
    {
      id: 2,
      user: 'Jane Smith',
      status: 'Completed',
      dueDate: '2023-09-30',
      priority: 'Medium',
      comments: 'Review required.',
    },
  ];

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    render(<TaskList tasks={mockTasks} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
  });

  it('renders table headers correctly', () => {
    expect(screen.getByText('Assigned To')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Due Date')).toBeInTheDocument();
    expect(screen.getByText('Priority')).toBeInTheDocument();
    expect(screen.getByText('Comments')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('renders tasks data correctly', () => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('2023-09-25')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('Needs to be done soon.')).toBeInTheDocument();

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('2023-09-30')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Review required.')).toBeInTheDocument();
  });

  it('opens and closes dropdown menu correctly', () => {
    const menuButtons = screen.getAllByRole('button', { name: '...' });

    // Open the first task's dropdown
    fireEvent.click(menuButtons[0]);
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();

    // Close the first task's dropdown
    fireEvent.click(menuButtons[0]);
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('calls the correct functions on Edit and Delete', () => {
    const menuButtons = screen.getAllByRole('button', { name: '...' });

    // Open the dropdown for the first task
    fireEvent.click(menuButtons[0]);

    // Click Edit
    fireEvent.click(screen.getByText('Edit'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockTasks[0]);

    // Open the dropdown for the first task again
    fireEvent.click(menuButtons[0]);

    // Click Delete
    fireEvent.click(screen.getByText('Delete'));
    expect(mockOnDelete).toHaveBeenCalledWith(mockTasks[0]);
  });

  it('closes the dropdown when clicked outside', () => {
    const menuButtons = screen.getAllByRole('button', { name: '...' });

    // Open the dropdown for the first task
    fireEvent.click(menuButtons[0]);
    expect(screen.getByText('Edit')).toBeInTheDocument();

    // Simulate click outside
    fireEvent.click(document.body);
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });
});
