import { useNavigate } from 'react-router-dom';
import DriverCard from '../../../../components/card/DriverCard';
import { mockData } from './mockData';
import style from './PendingList.module.css';

export default function PendingList() {
  const navigate = useNavigate();

  const handleCardClick = (cardData: any) => {
    navigate(`/user/costDetail/${cardData.id}`, { state: cardData }); // 카드 데이터 전달
  };

  return (
    <div className={style.container}>
      <div className={style.cardContainer}>
        {mockData.list.map((cost, index) => (
          <DriverCard
            key={index}
            list={cost}
            type="waiting"
            onClick={() => handleCardClick(cost)} // 카드 데이터 전달
          />
        ))}
      </div>
    </div>
  );
}
