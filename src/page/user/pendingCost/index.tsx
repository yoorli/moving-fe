import { useState } from 'react';
import Tab from '../../../components/tab/Tab';
import style from './index.module.css';
import useDirection from '../../../lib/function/direction';
import CostInfo from '../../../components/costInfo/CostInfo';
import PendingList from './components/PendingList';
import ModalContainer from '../../../components/modal/ModalContainer';
import {
  useDeleteEstimateReq,
  useGetUserEstimateReq,
} from '../../../lib/useQueries/estimateReq';
import { useUpdateEstimateConfirmed } from '../../../lib/useQueries/estimate';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';
import NoContents from '../../../components/noContents/NoContents';

export default function PendingCost() {
  const [currentTab, setCurrentTab] = useState<'first' | 'second'>('first');
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedEstimateId, setSelectedEstimateId] = useState<number | null>(
    null,
  ); // 추가: 선택된 estimateId 상태
  const {
    direction_pendingCost,
    direction_receivedCost,
    direction_costCall,
    direction_receivedCostDetail,
  } = useDirection();
  const { data, isLoading, error } = useGetUserEstimateReq();
  const { mutate } = useDeleteEstimateReq();
  const { mutate: confirmEstimate } = useUpdateEstimateConfirmed();

  const renderTabs = () => (
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
  );

  const handleTabChange = (selectedTab: 'first' | 'second') => {
    setCurrentTab(selectedTab);
  };

  // 모달 닫기 버튼
  const handleModalClose = () => {
    setIsCancelModalOpen(false);
    setIsConfirmModalOpen(false);
  };

  // 견적 요청 취소
  const cancelCostCall = () => {
    mutate(data.estimateReqId, {
      onSuccess: () => {
        direction_costCall(); // 삭제 후 동작
        handleModalClose(); // 모달 닫기
      },
      onError: (error) => {
        console.error('견적 요청 삭제 실패:', error.message);
      },
    });
  };

  // 견적 확정 버튼
  const confirmCost = () => {
    if (selectedEstimateId) {
      confirmEstimate(selectedEstimateId);
      direction_receivedCostDetail(data?.estimateReqId); // estimateReqid를 넘겨줘서 받았던 견적 상세로
    }
  };

  if (isLoading) {
    return (
      <>
        {renderTabs()}
        <LoadingSpinner />;
      </>
    );
  } else if (!data?.estimateReqId) {
    return (
      <>
        {renderTabs()}
        <div className={style.noContents}>
          <NoContents
            image='file'
            contentText={error?.message}
            hasButton={true}
            buttonText='견적 요청하러 가기'
            buttonHandler={direction_costCall}
          />
        </div>
      </>
    );
  }

  return (
    <>
      {renderTabs()}
      {!data.isConfirmed ? (
        <div className={style.overlay}>
          <div className={style.container}>
            <CostInfo
              movingRequest={data.createAt}
              movingType={data.movingType}
              movingDate={data.movingDate}
              departure={data.departure}
              arrival={data.arrival}
              comment={data.comment}
              hasButton={true}
              setIsModalOpen={setIsCancelModalOpen}
            />
            <PendingList
              setIsConfirmModalOpen={setIsConfirmModalOpen}
              setSelectedEstimateId={setSelectedEstimateId}
            />
          </div>
          {isCancelModalOpen && (
            <ModalContainer
              title='견적 요청 취소하기'
              isText={true}
              text='견적 요청을 취소하시겠습니까?'
              btnColorRed={true}
              buttonText='취소하기'
              closeBtnClick={handleModalClose}
              buttonClick={cancelCostCall}
            />
          )}
          {isConfirmModalOpen && (
            <ModalContainer
              title='견적 확정하기'
              isText={true}
              text='이 기사님으로 확정하시겠습니까?'
              buttonText='확인'
              closeBtnClick={handleModalClose}
              buttonClick={confirmCost}
            />
          )}
        </div>
      ) : (
        <div className={style.noContents}>
          <NoContents
            image='file'
            contentText='확정된 견적입니다.'
            hasButton={true}
            buttonText='받았던 요청 보기'
            buttonHandler={direction_receivedCost}
          />
        </div>
      )}
    </>
  );
}
