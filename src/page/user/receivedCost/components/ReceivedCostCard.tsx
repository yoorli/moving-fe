import style from './ReceivedCostCard.module.css';
import DriverCard from '../../../../components/card/DriverCard';
import { mockData, DriverDataDetail } from '../mock';
// import { useMedia } from '../../../../lib/function/useMediaQuery';

export default function ReceivedCostCard() {
  // const { pc } = useMedia();

  return (
    <>
      <div className={style.container}>
        {mockData.list?.map((mover: DriverDataDetail) => (
          <div key={mover.id} className={style.item}>
            <DriverCard
              user={mover}
              type={
                mover.isConfirmed
                  ? 'confirm'
                  : mover.isCancelled
                    ? 'cancel'
                    : 'notConfirm'
              }
            />
          </div>
        ))}
      </div>
    </>
  );
}
