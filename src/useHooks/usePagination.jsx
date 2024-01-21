import { useState } from 'react';

function usePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const maxDisplayedPages = 3;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const visiblePageNumbers = pageNumbers.filter((page) => {
    return totalPages <= maxDisplayedPages || (page >= currentPage - 1 && page <= currentPage + 1);
  });

  const hasHiddenStart = !visiblePageNumbers.includes(1);
  const hasHiddenEnd = !visiblePageNumbers.includes(totalPages);

  return {
    currentPage,
    itemsToDisplay,
    totalPages,
    goToPage,
    visiblePageNumbers,
    hasHiddenStart,
    hasHiddenEnd,
  };
}

export default usePagination;
