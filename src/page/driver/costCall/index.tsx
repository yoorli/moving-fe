import { useState } from 'react';
import { useMedia } from '../../../lib/function/useMediaQuery';

import Filter from './components/Filter';
import Dropdown from './components/Dropdown';
import CallList from './components/CallList';
import Pagination from '../../../components/pagination/Pagination';

import style from './index.module.css';

import { mockData } from './components/mockData';

export default function DriverCostCallPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const isPc = useMedia().pc;
  const itemsPerPage = 3;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = mockData.users.slice(startIndex, endIndex);

  const page = {
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    itemsTotalCount: mockData.total,
    onPageChange: handlePageChange,
  };

  return (
    <div className={style.container}>
      <nav className={style.navigation}>받은 요청</nav>
      <div className={style.mainContainer}>
        {isPc && (
          <div className={style.filterBox}>
            <Filter />
          </div>
        )}
        <div className={style.content}>
          <div className={style.filterBar}>
            <div className={style.searchBar}>searchBar</div>
            <div className={style.sortBar}>
              전체 {mockData.total}건 <Dropdown />
            </div>
          </div>
          <div className={style.mainContent}>
            <CallList list={currentUsers}/>
          </div>
          <div className={style.pagination}>
            <Pagination {...page} />
          </div>
        </div>
      </div>
    </div>
  );
}
