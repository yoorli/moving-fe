import { useNavigate } from 'react-router-dom';
import DriverCard from '../../../../components/card/DriverCard';
import { MoverList, Mover } from '../mockData';
import style from './ReceivedList.module.css';

export default function ReceivedList({ list, count }: MoverList) {
  const navigate = useNavigate();

  const handleCardClick = (cardData: Mover) => {
    navigate(`/user/costDetail/${cardData.id}`, { state: cardData }); // 카드 데이터 전달
  };

  return (
    <div className={style.infoContainer}>
      <div className={style.infoTitle}>견적서 목록 ({count})</div>
      <div className={style.infoMain}>
        {list.length > 0 ? (
          list.map((mover) => (
            <div key={mover.id} className={style.card}>
              <DriverCard
                list={mover}
                type="cost"
                onClick={() => handleCardClick(mover)} // 카드 데이터 전달
              />
            </div>
          ))
        ) : (
          <div>받은 견적이 없습니다</div>
        )}
      </div>
    </div>
  );
}
