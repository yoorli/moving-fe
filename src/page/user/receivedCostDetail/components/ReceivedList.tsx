import { useNavigate } from 'react-router-dom';
import { useMedia } from '../../../../lib/function/useMediaQuery';
import DriverCard from '../../../../components/card/DriverCard';
import { MoverList, Mover } from '../mockData';
import style from './ReceivedList.module.css';

export default function ReceivedList({ list, count }: MoverList) {
  const navigate = useNavigate();
  const { mobileWithChip, mobileWithChipSecond } = useMedia();

  const handleCardClick = (cardData: Mover) => {
    navigate(`/user/costDetail/${cardData.id}`, { state: cardData }); // 카드 데이터 전달
  };

  return (
    <div className={style.infoContainer}>
      <div className={style.infoTitle}>견적서 목록 ({count})</div>
      <div className={style.infoMain}>
        {list.length > 0 ? (
          list.map((mover: Mover) => (
            <div key={mover.id} className={style.card}>
              <DriverCard
                list={mover}
                type="cost"
                onClick={() => handleCardClick(mover)} // 카드 클릭 시 데이터 전달
                count={mobileWithChip ? 4 : mobileWithChipSecond ? 3 : 6} // 반응형 카드 표시 개수
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
