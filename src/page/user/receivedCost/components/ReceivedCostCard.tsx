import style from './ReceivedCostCard.module.css';
import DriverCard from '../../../../components/card/DriverCard';
import { mockData, DriverDataDetail } from '../mock';
import { useMedia } from '../../../../lib/function/useMediaQuery';

export interface Props {
  redirect: (id: number) => void;
}

export default function ReceivedCostCard({ redirect }: Props) {
  const { receivedMobile, receivedMobileSecond } = useMedia();

  return (
    <>
      <div className={style.container}>
        {mockData.list?.map((mover: DriverDataDetail) => (
          <div key={mover.moverId} className={style.item}>
            <DriverCard
              list={mover}
              type={
                mover.isConfirmed
                  ? 'confirm'
                  : mover.isCancelled
                    ? 'cancel'
                    : 'notConfirm'
              }
              count={receivedMobile ? 4 : receivedMobileSecond ? 3 : 6}
              costListBtn={() => redirect(mover.moverId)}
            />
          </div>
        ))}
      </div>
    </>
  );
}
