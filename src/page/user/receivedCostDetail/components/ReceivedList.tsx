import style from './ReceivedList.module.css';
import DriverCard from '../../../../components/card/DriverCard';
import { MoverList, Mover } from '../mockData';

export default function ReceivedList({ list, count }: MoverList) {
  return (
    <>
      <div className={style.infoContainer}>
        <div className={style.infoTitle}>견적서 목록 ({count})</div>
        <div className={style.infoMain}>
          {list.length > 0 ? (
            list?.map((mover: Mover) => (
              <div key={mover.id} className={style.card}>
                <DriverCard user={mover} type='cost' />
              </div>
            ))
          ) : (
            <div>받은 견적이 없습니다</div>
          )}
        </div>
      </div>
    </>
  );
}
