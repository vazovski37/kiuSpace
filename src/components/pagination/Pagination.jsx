import React from 'react';
import './pagination.css'

function Pagination({ currentPage, totalPages, goToPage, visiblePageNumbers }) {
  return (
    <div className="pagination">
      {visiblePageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={page === currentPage ? 'active' : ''}
        >
          {page === '...' ? '...' : page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
