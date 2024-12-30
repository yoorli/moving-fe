import { useNavigate } from 'react-router-dom';
import { useMedia } from '../../../../lib/function/useMediaQuery';
import DriverCard from '../../../../components/card/DriverCard';
import { MoverList, Mover } from '../mockData';
import style from './ReceivedList.module.css';

export default function ReceivedList({ list }: MoverList) {
  const navigate = useNavigate();
  const { mobileWithChip, mobileWithChipSecond } = useMedia();

  const handleCardClick = (estimateId?: number) => {
    if (estimateId) {
      navigate(`/costDetail/${estimateId}`);
    } else {
      console.warn('견적 id가 없는 상태');
    }
  };

  return (
    <div className={style.infoContainer}>
      <div className={style.infoTitle}>견적서 목록 ({list.length})</div>
      <div className={style.infoMain}>
        {list.length > 0 ? (
          list.map((mover: Mover) => (
            <div key={mover.moverId} className={style.card}>
              <DriverCard
                list={mover}
                type="cost"
                onClick={() => handleCardClick(mover.estimateId)} // estimateId만 전달
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
