import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Pagination from './Pagination';

// Sample props for testing
const tasksPerPage = 5;
const totalTasks = 50;
const paginateMock = jest.fn();
const currentPage = 3;

describe('Pagination Component', () => {
  test('renders correctly with given props', () => {
    render(
      <Pagination
        tasksPerPage={tasksPerPage}
        totalTasks={totalTasks}
        paginate={paginateMock}
        currentPage={currentPage}
      />
    );

    // Check if the Previous and Next buttons are rendered
    expect(screen.getByText(/Previous/i)).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();

    // Check if the correct number of page buttons are rendered
    const totalPages = Math.ceil(totalTasks / tasksPerPage);
    for (let i = 1; i <= totalPages; i++) {
      expect(screen.getByText(i)).toBeInTheDocument();
    }
  });

  test('calls paginate function with correct page number when buttons are clicked', () => {
    render(
      <Pagination
        tasksPerPage={tasksPerPage}
        totalTasks={totalTasks}
        paginate={paginateMock}
        currentPage={currentPage}
      />
    );

    // Click on a specific page number button
    fireEvent.click(screen.getByText('2'));
    expect(paginateMock).toHaveBeenCalledWith(2);

    // Click on the "Next" button
    fireEvent.click(screen.getByText(/Next/i));
    expect(paginateMock).toHaveBeenCalledWith(currentPage + 1);

    // Click on the "Previous" button
    fireEvent.click(screen.getByText(/Previous/i));
    expect(paginateMock).toHaveBeenCalledWith(currentPage - 1);
  });

  test('disables "Previous" button on the first page', () => {
    render(
      <Pagination
        tasksPerPage={tasksPerPage}
        totalTasks={totalTasks}
        paginate={paginateMock}
        currentPage={1}
      />
    );

    // The Previous button should be disabled
    expect(screen.getByText(/Previous/i)).toBeDisabled();
  });

  test('disables "Next" button on the last page', () => {
    const lastPage = Math.ceil(totalTasks / tasksPerPage);

    render(
      <Pagination
        tasksPerPage={tasksPerPage}
        totalTasks={totalTasks}
        paginate={paginateMock}
        currentPage={lastPage}
      />
    );

    // The Next button should be disabled
    expect(screen.getByText(/Next/i)).toBeDisabled();
  });

  test('highlights the active page number', () => {
    render(
      <Pagination
        tasksPerPage={tasksPerPage}
        totalTasks={totalTasks}
        paginate={paginateMock}
        currentPage={currentPage}
      />
    );

    // The current page number should have the active class
    const activeButton = screen.getByText(currentPage);
    expect(activeButton).toHaveClass('active');
  });
});