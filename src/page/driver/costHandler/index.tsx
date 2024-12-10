import { useState } from 'react';

import Tab from '../../../components/tab/Tab';
import UserCard from '../../../components/card/UserCard';
import Pagination from '../../../components/pagination/Pagination';

import style from './index.module.css';

import { mockData } from './mockData';

export default function DriverCostHandlerPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState<'first' | 'second' | 'third'>(
    'first',
  );
  const [list, setList] = useState(mockData.users);

  const handleTabChange = (tab: 'first' | 'second' | 'third') => {
    setCurrentTab(tab);
    if (tab === 'first') {
      setList(mockData.users);
    } else if (tab === 'second') {
      setList(mockData.users.filter((list) => list.isConfirmed));
    } else {
      setList(mockData.users.filter((list) => list.isCancelled));
    }
    setCurrentPage(1);
  };

  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const selectedPage = list.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const page = {
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    data: list.length,
    onPageChange: handlePageChange,
  };

  return (
    <div className={style.container}>
      <Tab
        selectable={true}
        firstText='견적 전체 조회'
        secondText='확정 견적 조회'
        thirdText='반려ㆍ취소 요청'
        hasThirdTab={true}
        selectedTab={currentTab}
        onTabChange={handleTabChange}
      />
      <div className={style.mainContainer}>
        {currentTab && (
          <div className={style.cardList}>
            {selectedPage.map((user, index) => (
              <div key={index} className={style.card}>
                <UserCard list={user} type='confirmedCost' />
              </div>
            ))}
          </div>
        )}
        {selectedPage.length > 0 && (
          <div className={style.pagination}>
            <Pagination {...page} />
          </div>
        )}
      </div>
    </div>
  );
}
