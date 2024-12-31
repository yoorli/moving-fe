import { useNavigate } from 'react-router-dom';
import DriverCard from '../../../../components/card/DriverCard';
// import { mockData } from './mockData';
import style from './PendingList.module.css';
import { useGetPendingEstimate } from '../../../../lib/useQueries/estimate';
import { ChipType } from '../../../../types/cardTypes';
import LoadingSpinner from '../../../../components/loading/LoadingSpinner';
import NoContents from '../../../../components/noContents/NoContents';

interface PendingListProps {
  setIsConfirmModalOpen: (value: boolean) => void; // Modal 열기
  setSelectedEstimateId: (id: number) => void;
}

interface PendingListType {
  estimateId: number; // 견적 ID
  moverId: number; // 기사님 ID
  serviceType: ChipType[]; // 기사의 이사 서비스 종류
  isAssigned: boolean; // 지정 견적 요청 여부(true)
  profileImg: string; // 프로필 이미지 URL
  moverName: string; // 기사 별명
  reviewStats: {
    // 리뷰 내용
    averageScore: number; // 총 별점
    totalReviews: number; // 리뷰 개수
  };
  career: number; // 경력
  confirmationCount: number; // 총 확정 개수 totalContirmed
  favoriteCount: number; // 기사님이 찜된 횟수
  isReqConfirmed: boolean; // 해당 견적이 속한 요청의 확정 여부
  isConfirmed: boolean; // 견적 확정 여부
  isFavorite: boolean; // 찜 여부
  movingDate: string; // 이사 날짜 (예시, 2024. 11. 28)
  departure: string; // 출발지
  arrival: string; // 도착지
  price: number; // 견적가
}

export default function PendingList({
  setIsConfirmModalOpen,
  setSelectedEstimateId,
}: PendingListProps) {
  const navigate = useNavigate();
  const { data, isLoading } = useGetPendingEstimate();

  console.log(data);

  const confirmCostBtn = (estimateId: number) => {
    console.log('견적 확정하기 모달 띄우기');
    setSelectedEstimateId(estimateId);
    setIsConfirmModalOpen(true);
  };

  const detailbtn = (cardData: any) => {
    console.log('받았던 견적_견적 상세 페이지로 리다이렉트');
    navigate(`/user/costDetail/${cardData.id}`, { state: cardData }); // 카드 데이터 전달
  };

  // 로딩 중일 때 처리
  if (isLoading) {
    return <LoadingSpinner thin={true} />;
  }

  return (
    <div className={style.container}>
      {data?.list.length !== 0 ? <div className={style.cardContainer}>
        {data?.list.map((cost: PendingListType) => (
          <DriverCard
            key={cost.estimateId}
            list={cost}
            type='waiting'
            confirmCostBtn={() => confirmCostBtn(cost.estimateId)}
            detailBtn={() => detailbtn(cost)} // 카드 데이터 전달
          />
        ))}
      </div> : <NoContents image='car' contentText='대기 중인 견적이 없어요!'/>}
    </div>
  );
}
