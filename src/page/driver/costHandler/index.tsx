import { useState } from 'react';
import Tab from '../../../components/tab/Tab';

import style from './index.module.css';

import { mockData } from './mockData';
import UserCard from '../../../components/card/UserCard';
import Pagination from '../../../components/pagination/Pagination';

export default function DriverCostHandlerPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState<'first' | 'second'>('first');

  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = mockData.users.slice(startIndex, endIndex);

  const handleTabChange = (tab: 'first' | 'second') => {
    setCurrentTab(tab);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const page = {
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    data: 10,
    onPageChange: handlePageChange,
  };

  return (
    <div className={style.container}>
      <Tab
        selectable={true}
        firstText='보낸 견적 전체 조회'
        secondText='확정 견적 조회'
        // thirdText='반려 요청ㆍ취소 조회'
        selectedTab={currentTab}
        onTabChange={handleTabChange}
      />
      <div className={style.mainContainer}>
        {currentTab && (
          <div className={style.cardList}>
            {currentUsers.map((user, index) => (
              <div key={index} className={style.card}>
                <UserCard user={user} type='confirmedCost' />
              </div>
            ))}
          </div>
        )}
        {currentUsers.length > 0 && (
          <div className={style.pagination}>
            <Pagination {...page} />
          </div>
        )}
      </div>
    </div>
  );
}
