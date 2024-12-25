import style from './ReceivedCostCard.module.css';
import DriverCard from '../../../../components/card/DriverCard';
import { DriverDataDetail, DriverData } from '../mock';
import { useMedia } from '../../../../lib/function/useMediaQuery';

export interface Props {
  redirect: (id: number) => void;
  data: DriverData;
}

export default function ReceivedCostCard({ redirect, data }: Props) {
  const { mobileWithChip, mobileWithChipSecond } = useMedia();

  return (
    <>
      <div className={style.container}>
        {data.list?.map((mover: DriverDataDetail) => (
          <div key={mover.estimateReqId} className={style.item}>
            <DriverCard
              list={mover}
              type={
                mover.isConfirmed
                  ? 'confirm'
                  : mover.isCancelled
                    ? 'cancel'
                    : 'notConfirm'
              }
              count={mobileWithChip ? 4 : mobileWithChipSecond ? 3 : 6}
              costListBtn={() => redirect(mover.estimateReqId)}
            />
          </div>
        ))}
      </div>
    </>
  );
}
