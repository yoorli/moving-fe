import { useState } from 'react';
import Tab from '../../../components/tab/Tab';
import style from './index.module.css';
import useDirection from '../../../lib/function/direction';
import ReceivedCostCard from './components/ReceivedCostCard';
import { useGetEstimateReqList } from '../../../lib/useQueries/estimateReq';
import Pagination from '../../../components/pagination/Pagination';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';
import NoContents from '../../../components/noContents/NoContents';
import PageError from '../../../components/pageError/PageError';

import noItems from '../../../assets/icons/ic_noItems.svg';

export default function ReceivedCost() {
  const [currentTab, setCurrentTab] = useState<'first' | 'second'>('second');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useGetEstimateReqList({
    page: currentPage,
    pageSize: 8,
  });

  const handleTabChange = (selectedTab: 'first' | 'second') => {
    setCurrentTab(selectedTab);
  };

  const {
    direction_pendingCost,
    direction_receivedCost,
    direction_receivedCostDetail,
    direction_costCall,
    direction_root,
  } = useDirection();

  const handleErrorClick = () => {
    direction_root();
  };

  return (
    <>
      <Tab
        selectable={true}
        firstText='대기 중인 견적'
        secondText='받았던 견적'
        selectedTab={currentTab}
        onTabChange={handleTabChange}
        tabChangeType='route'
        firstTabRoute={direction_pendingCost}
        secondTabRoute={direction_receivedCost}
      />
      <div className={style.container}>
        {!isLoading && data.total > 0 ? (
          <div>
            <ReceivedCostCard
              redirect={direction_receivedCostDetail}
              data={data}
            />
            <div className={style.pagination}>
              <Pagination
                currentPage={currentPage}
                data={data?.total}
                itemsPerPage={8}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        ) : (
          <div className={style.noContents}>
            {isLoading ? (
              <LoadingSpinner />
            ) : error ? (
              <PageError
                image={noItems}
                contentTextFirst='데이터를 불러오는 중 에러가 발생했습니다:'
                contentTextSecond={error.message}
                buttonText='홈으로 돌아가기'
                buttonHandler={handleErrorClick}
              />
            ) : (
              <NoContents
                image='file'
                contentText='견적 요청 내역이 없습니다.'
                hasButton={true}
                buttonText='견적 요청하러 가기'
                buttonHandler={direction_costCall}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
