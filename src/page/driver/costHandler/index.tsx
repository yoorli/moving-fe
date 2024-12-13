import { useEffect, useState } from 'react';

import Tab from '../../../components/tab/Tab';
import UserCard from '../../../components/card/UserCard';
import Pagination from '../../../components/pagination/Pagination';
import Button from '../../../components/btn/Button';

import useDirection from '../../../lib/function/direction';
import { useMedia } from '../../../lib/function/useMediaQuery';

import style from './index.module.css';

import { mockData } from './mockData';

export default function DriverCostHandlerPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentTab, setCurrentTab] = useState<'first' | 'second' | 'third'>(
    'first',
  );
  const [list, setList] = useState(
    mockData.users.filter((list) => !list.isCancelled && !list.isRejected),
  );

  const { direction_costDetail } = useDirection();
  const isPc = useMedia().pc;
  const isTablet = useMedia().tablet;
  const isMobile = useMedia().mobile;

  let text: string;

  const handleTabChange = (tab: 'first' | 'second' | 'third') => {
    setCurrentTab(tab);
    if (tab === 'first') {
      setList(
        mockData.users.filter((list) => !list.isCancelled && !list.isRejected),
      );
    } else if (tab === 'second') {
      setList(mockData.users.filter((list) => list.isConfirmed));
    } else {
      setList(
        mockData.users.filter((list) => list.isCancelled || list.isRejected),
      );
    }
    setCurrentPage(1);
  };

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

  const disabledCard = (index: number) => {
    const idx = index + (currentPage - 1) * itemsPerPage;

    if (list[idx].isMoveDateOver) {
      text = '이사 완료된 견적이에요';
      return true;
    } else if (list[idx].isCancelled) {
      text = '취소된 요청이에요';
      return true;
    } else if (list[idx].isRejected) {
      text = '반려된 요청이에요';
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (isTablet || isMobile) {
      setItemsPerPage(3);
    } else setItemsPerPage(6);
  }, [isPc, isTablet, isMobile]);

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
                <UserCard
                  list={user}
                  type={currentTab === 'third' ? undefined : 'confirmedCost'}
                />
                {disabledCard(index) && (
                  <div className={style.coveredCard}>
                    <div className={style.cardCover}></div>
                    <div className={style.cardButton}>
                      {text}
                      {user.isMoveDateOver && (
                        <Button
                          text='견적 상세보기'
                          btnStyle='solid123pxBlue100'
                          onClick={() => {
                            user.estimateId &&
                              direction_costDetail(user.estimateId);
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}
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
