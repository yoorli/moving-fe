import { useNavigate } from 'react-router-dom';
import DriverCard from '../../../../components/card/DriverCard';
import { mockData } from './mockData';
import style from './PendingList.module.css';

export default function PendingList() {
  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/user/costDetail/${id}`); // 카드 클릭 시 견적 상세 페이지로 이동
  };

  return (
    <div className={style.container}>
      <div className={style.cardContainer}>
        {mockData.list.map((cost, index) => (
          <DriverCard
            key={index}
            list={cost}
            type="waiting"
            onClick={() => handleCardClick(cost.id)}
          />
        ))}
      </div>
    </div>
  );
}
