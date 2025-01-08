import { useState } from 'react';
import Tab from '../../../components/tab/Tab';
import style from './index.module.css';
import useDirection from '../../../lib/function/direction';
import ReceivedCostCard from './components/ReceivedCostCard';
import { useGetEstimateReqList } from '../../../lib/useQueries/estimateReq';
import Pagination from '../../../components/pagination/Pagination';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';
import NoContents from '../../../components/noContents/NoContents';
import ModalContainer from '../../../components/modal/ModalContainer';

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
  } = useDirection();

  const modalBtnClick = () => {
    window.location.reload();
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
        {!isLoading && data ? (
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
        {error && (
          <ModalContainer
            title='에러 메시지'
            isText={true}
            text={error.message}
            buttonText='확인'
            closeBtnClick={() => modalBtnClick()}
            buttonClick={modalBtnClick}
            btnColorRed={true}
          />
        )}
      </div>
    </>
  );
}
