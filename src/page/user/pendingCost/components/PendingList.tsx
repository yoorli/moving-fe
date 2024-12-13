import { useNavigate } from 'react-router-dom';
import DriverCard from '../../../../components/card/DriverCard';
// import useDirection from '../../../../lib/function/direction';
import { mockData } from './mockData';
import style from './PendingList.module.css';

interface PendingListProps {
  setIsConfirmModalOpen: (value: boolean) => void; // Modal 열기
}

export default function PendingList({
  setIsConfirmModalOpen,
}: PendingListProps) {
  const navigate = useNavigate();

  // const { direction_땡땡 } = useDirection(); 받았던 견적_견적 상세 페이지
  const confirmCostBtn = () => {
    console.log('견적 확정하기 모달 띄우기');
    setIsConfirmModalOpen(true);
  };

  const handleCardClick = (cardData: any) => {
    navigate(`/user/costDetail/${cardData.estimateId}`, { state: cardData }); // 카드 데이터 전달
  };

  const detailbtn = (cardData: any) => {
    console.log('받았던 견적_견적 상세 페이지로 리다이렉트');
    handleCardClick(cardData); // handleCardClick 호출
  };

  return (
    <div className={style.container}>
      <div className={style.cardContainer}>
        {mockData.list.map((cost) => (
          <DriverCard
            key={cost.estimateId}
            list={cost}
            type="waiting"
            confirmCostBtn={confirmCostBtn}
            detailBtn={() => detailbtn(cost)} // detailbtn에 카드 데이터 전달
          />
        ))}
      </div>
    </div>
  );
}
