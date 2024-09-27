import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaskForm from './TaskForm';

describe('TaskForm Component', () => {
  const mockTask = {
    user: 'User 1',
    status: 'In Progress',
    dueDate: '2024-09-30',
    priority: 'High',
    comments: 'This is a test task',
  };

  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  test('renders correctly with initial task data', () => {
    render(<TaskForm task={mockTask} onSave={mockOnSave} onCancel={mockOnCancel} />);

    // Verify form fields contain correct default values
    expect(screen.getByLabelText(/Assigned To :/)).toHaveValue(mockTask.user);
    expect(screen.getByLabelText(/Status :/)).toHaveValue(mockTask.status);
    expect(screen.getByLabelText(/Due Date :/)).toHaveValue(mockTask.dueDate);
    expect(screen.getByLabelText(/Priority :/)).toHaveValue(mockTask.priority);
    expect(screen.getByLabelText(/Description :/)).toHaveValue(mockTask.comments);
  });

  test('calls onSave with updated data when form is submitted', () => {
    render(<TaskForm task={mockTask} onSave={mockOnSave} onCancel={mockOnCancel} />);

    // Change some values
    fireEvent.change(screen.getByLabelText(/Assigned To :/), { target: { value: 'User 2' } });
    fireEvent.change(screen.getByLabelText(/Status :/), { target: { value: 'Completed' } });
    fireEvent.change(screen.getByLabelText(/Due Date :/), { target: { value: '2024-10-15' } });
    fireEvent.change(screen.getByLabelText(/Priority :/), { target: { value: 'Low' } });
    fireEvent.change(screen.getByLabelText(/Description :/), { target: { value: 'Updated comments' } });

    // Submit the form
    fireEvent.submit(screen.getByText('Save'));

    // Check if onSave was called with the correct updated data
    expect(mockOnSave).toHaveBeenCalledWith({
      user: 'User 2',
      status: 'Completed',
      dueDate: '2024-10-15',
      priority: 'Low',
      comments: 'Updated comments',
      id: mockTask.id || null,
    });
  });

  test('calls onCancel when the cancel button is clicked', () => {
    render(<TaskForm task={mockTask} onSave={mockOnSave} onCancel={mockOnCancel} />);

    // Click the cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Check if onCancel was called
    expect(mockOnCancel).toHaveBeenCalled();
  });

  test('renders correctly for a new task with default values', () => {
    render(<TaskForm onSave={mockOnSave} onCancel={mockOnCancel} />);

    // Check default form values
    expect(screen.getByLabelText(/Assigned To :/)).toHaveValue('User 1');
    expect(screen.getByLabelText(/Status :/)).toHaveValue('Not Started');
    expect(screen.getByLabelText(/Priority :/)).toHaveValue('Normal');
    expect(screen.getByLabelText(/Description :/)).toHaveValue('');
  });
});
