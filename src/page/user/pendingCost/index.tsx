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

// interface infoProps {
//   estimateReqId: number; // 견적 요청 ID
//   customerName?: string; // 소비자 이름
//   createAt: string; // 견적 요청일
//   movingType: string; // 이사 종류
//   movingDate: string; // 이사 날짜
//   departure: string; // 출발지
//   arrival: string; // 도착지
//   comment: string; //요구 사항
//   isConfirmed: boolean; //확정된 요청인지 확인
// }

// 유저 견적 요청 조회 - /estimateReq
// const mockData: infoProps = {
//   estimateReqId: 1024,
//   movingType: 'SMALL',
//   createAt: '2024.07.01',
//   movingDate: '2024.07.10',
//   departure: '인천광역시 서구',
//   arrival: '서울특별시 마포구',
//   comment:
//     '이사 시 대형 가전제품(냉장고, 세탁기)과 가구(침대, 책상, 옷장 등) 운반이 필요하며, 모든 물품은 파손되지 않도록 꼼꼼히 포장부탁드립니다. 특히 유리 제품과 전자기기는 별도 포장을 원하며, 출발지는 5층 엘리베이터가 없고 도착지는 10층 엘리베이터 사용가능합니다. 가구 배치는 도착 후 현장에서 안내할 예정이며, 오전9시부터 작업 시작을 희망합니다. 혹시 예상보다 작업 시간이 길어질경우 미리 알려주세요. 감사합니다.',
//   isConfirmed: true,
// };

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
  const { data, isLoading } = useGetUserEstimateReq();
  const { mutate } = useDeleteEstimateReq();
  const { mutate: confirmEstimate } = useUpdateEstimateConfirmed();

  console.log(data);

  const handleTabChange = (selectedTab: 'first' | 'second') => {
    setCurrentTab(selectedTab);
  };

  const handleModalClose = () => {
    setIsCancelModalOpen(false);
    setIsConfirmModalOpen(false);
  };

  const cancelCostCall = () => {
    // 요청 지우는 API??
    mutate(data?.estimateReqId);
    direction_costCall();
    // mutate(data.estimateReqId, {
    //   onSuccess: () => {
    //     direction_costCall(); // 삭제 후 동작
    //     handleModalClose();   // 모달 닫기
    //   },
    //   onError: (error) => {
    //     console.error('견적 요청 삭제 실패:', error);
    //   },
    // });
  };

  const confirmCost = () => {
    // 견적 확정 API??
    if (selectedEstimateId) {
      confirmEstimate(selectedEstimateId);
      direction_receivedCostDetail(data?.estimateReqId); // estimateReqid를 넘겨줘서 받았던 견적 상세로
    }
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
      {!isLoading && data ? (
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
        <div>{isLoading ? '로딩 중...' : '데이터를 불러올 수 없습니다.'}</div>
      )}
    </>
  );
}
