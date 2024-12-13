import { useNavigate } from 'react-router-dom';
import DriverCard from '../../../../components/card/DriverCard';
import { mockData } from './mockData';
import style from './PendingList.module.css';

interface PendingListProps {
  setIsConfirmModalOpen: (value: boolean) => void; // Modal 열기
}

export default function PendingList({
  setIsConfirmModalOpen,
}: PendingListProps) {
  const navigate = useNavigate();

  const confirmCostBtn = () => {
    console.log('견적 확정하기 모달 띄우기');
    setIsConfirmModalOpen(true);
  };

  const detailbtn = (cardData: any) => {
    console.log('받았던 견적_견적 상세 페이지로 리다이렉트');
    navigate(`/user/costDetail/${cardData.id}`, { state: cardData }); // 카드 데이터 전달
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
            detailBtn={() => detailbtn(cost)} // 카드 데이터 전달
          />
        ))}
      </div>
    </div>
  );
}

