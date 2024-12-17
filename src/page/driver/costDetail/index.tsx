import { useParams } from 'react-router-dom';

import UserCard from '../../../components/card/UserCard';
import SnsShare from '../../../components/snsShare/SnsShare';
import CostInfo from '../../../components/costInfo/CostInfo';

import { useMedia } from '../../../lib/function/useMediaQuery';
import { formatCurrency } from '../../../lib/function/utils';

import style from './index.module.css';

import { mockData } from './mockData';

export default function DriverCostDetailPage() {
  const isPc = useMedia().pc;
  const id = useParams().id;
  const user = mockData.users[Number(id) - 1];

  const info = {
    movingRequest: user.movingRequest,
    movingType: user.movingType,
    movingDate: user.movingDate,
    departure: user.detailDeparture,
    arrival: user.detailArrival,
    comment: user.customerComment,
  };

  return (
    <div className={style.container}>
      <nav className={style.navigation}>견적 상세</nav>
      <div className={style.mainContainer}>
        <div className={style.contents}>
          <UserCard list={user} />
          {!isPc && (
            <div className={style.share}>
              <SnsShare nickname={user.customerName} type='shareEstimate' />
            </div>
          )}
          <div className={style.estimate}>
            <div className={style.label}>코멘트</div>
            {user.moverComment && user.moverComment}
          </div>
          <div className={style.estimate}>
            <div className={style.label}>견적가</div>
            {formatCurrency(user.price)}
          </div>
          <div className={style.estimateInfo}>
            <div className={style.info}>
              <CostInfo {...info} />
            </div>
          </div>
        </div>
        {isPc && (
          <div className={style.share}>
            <SnsShare nickname={user.customerName} type='shareEstimate' />
          </div>
        )}
      </div>
    </div>
  );
}
