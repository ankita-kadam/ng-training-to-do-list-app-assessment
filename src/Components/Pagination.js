import React from 'react';
import './Pagination.css';

const Pagination = ({ tasksPerPage, totalTasks, paginate, currentPage }) => {
  const pageNumbers = [];

  // Calculate total pages
  for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === pageNumbers.length}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
