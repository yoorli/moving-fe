import React from 'react';
import styles from './Pagination.module.css';

type PaginationProps = {
  currentPage: number;
  data?: number; // 데이터 배열
  itemsPerPage?: number; // 페이지당 아이템 수
  maxPagesToShow?: number; // 최대 페이지 수
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  data,
  itemsPerPage,
  onPageChange,
  maxPagesToShow = 5,
}: PaginationProps) => {
  const totalPages = data && itemsPerPage ? Math.ceil(data / itemsPerPage) : 0;

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPages = (maxPagesToShow: number) => {
    const pages = [];

    const startPage =
      Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.pageButton} ${
            i === currentPage ? styles.active : ''
          }`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>,
      );
    }

    return pages;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrowButton}
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        style={{ color: currentPage === 1 ? '#A3A3A3' : '#262626' }}
      >
        <svg
          width='40'
          height='40'
          viewBox='0 0 40 40'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={
            currentPage === 1 ? styles.disabledArrow : styles.enabledArrow
          }
        >
          <path
            d='M23 14L17 20L23 26'
            stroke='currentColor'
            strokeWidth='1.8'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>

      {renderPages(maxPagesToShow)}

      <button
        className={styles.arrowButton}
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        style={{ color: currentPage === totalPages ? '#A3A3A3' : '#262626' }}
      >
        <svg
          width='40'
          height='40'
          viewBox='0 0 40 40'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={
            currentPage === totalPages
              ? styles.disabledArrow
              : styles.enabledArrow
          }
        >
          <path
            d='M17 14L23 20L17 26'
            stroke='currentColor'
            strokeWidth='1.8'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
