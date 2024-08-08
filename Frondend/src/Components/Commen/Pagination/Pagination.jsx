import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <div className="pagination">
      <button>prev</button>
      <span>1</span>
      <span>2</span>
      <span>...</span>
      <button>next</button>
    </div>
  );
};

export default Pagination;
