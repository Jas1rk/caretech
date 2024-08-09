import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => handlePage(currentPage - 1)}>prev</button>
      )}
      {totalPages > 1 && (
        <>
          {currentPage > 1 && <span onClick={() => handlePage(1)}>1</span>}

          <span className="active">{currentPage}</span>
        </>
      )}
      {currentPage < totalPages && (
        <button onClick={() => handlePage(currentPage + 1)}>next</button>
      )}
    </div>
  );
};

export default Pagination;
