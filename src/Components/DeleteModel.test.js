import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteModal from './DeleteModal';

// Mock props for testing
const task = { id: 1, user: 'Sample Task' };
const onDeleteMock = jest.fn();
const onCancelMock = jest.fn();

describe('DeleteModal Component', () => {
  test('renders correctly with given task data', () => {
    render(<DeleteModal task={task} onDelete={onDeleteMock} onCancel={onCancelMock} />);

    // Check if the modal renders with the correct title and text
    expect(screen.getByText(/Delete/i)).toBeInTheDocument();
    expect(screen.getByText(`Do you want to delete task: ${task.user}?`)).toBeInTheDocument();

    // Check if both "Yes" and "No" buttons are present
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
  });

  test('calls onDelete function when "Yes" button is clicked', () => {
    render(<DeleteModal task={task} onDelete={onDeleteMock} onCancel={onCancelMock} />);

    // Click the "Yes" button
    fireEvent.click(screen.getByText('Yes'));

    // Verify that onDelete was called
    expect(onDeleteMock).toHaveBeenCalledTimes(1);
  });

  test('calls onCancel function when "No" button is clicked', () => {
    render(<DeleteModal task={task} onDelete={onDeleteMock} onCancel={onCancelMock} />);

    // Click the "No" button
    fireEvent.click(screen.getByText('No'));

    // Verify that onCancel was called
    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });

  test('displays the correct task name in the modal', () => {
    render(<DeleteModal task={task} onDelete={onDeleteMock} onCancel={onCancelMock} />);

    // Check that the task's user name is displayed correctly
    expect(screen.getByText(`Do you want to delete task: ${task.user}?`)).toBeInTheDocument();
  });
});