import React from "react";

interface PaginationProps {
  jobsPerPage: number;
  totalJobs: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ jobsPerPage, totalJobs, paginate, currentPage }) => {
  const pageNumbers: number[] = [];
  const maxPagesToShow = 5; // 表示する最大のページ数
  const totalPages = Math.ceil(totalJobs / jobsPerPage); // 総ページ数

  // ページ番号のリストを作成
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // 表示するページ番号の範囲を決定
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  const visiblePageNumbers = pageNumbers.slice(startPage - 1, endPage);

  return (
    <nav>
      <ul className="flex justify-center list-none p-0">
        {/* 「前へ」ボタン */}
        <li className={`"mx-1" ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            onClick={() => paginate(currentPage - 1)}
            className="py-2 px-3 border border-navy text-navy bg-white rounded transition-colors duration-300 ease-in-out hover:bg-navy hover:text-white"
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
        </li>

        {/* ページ番号を表示 */}
        {visiblePageNumbers.map((number) => (
          <li
            key={number}
            className={`"mx-1" ${currentPage === number ? "active" : ""}`}
          >
            <button onClick={() => paginate(number)} 
              // className="mx-1 py-2 px-3 border border-navy text-navy bg-white rounded transition-colors duration-300 ease-in-out hover:bg-navy hover:text-white">
              className={`mx-1 py-2 px-3 border border-navy rounded transition-colors duration-300 ease-in-out 
              ${currentPage === number ? "bg-navy text-white" : "text-navy bg-white hover:bg-navy hover:text-white"}`}
              >
              {number}
            </button>
          </li>
        ))}

        {/* 「次へ」ボタン */}
        <li className={`"mx-1" ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            onClick={() => paginate(currentPage + 1)}
            className="py-2 px-3 border border-navy text-navy bg-white rounded transition-colors duration-300 ease-in-out hover:bg-navy hover:text-white"
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
