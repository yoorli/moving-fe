import { useNavigate } from 'react-router-dom';
import style from './ReceivedList.module.css';
import DriverCard from '../../../../components/card/DriverCard';
import { MoverList, Mover } from '../mockData';

export default function ReceivedList({ list, count }: MoverList) {
  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/user/costDetail/${id}`); // 카드 클릭 시 견적 상세 페이지로 이동
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
                onClick={() => handleCardClick(mover.id)}
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
