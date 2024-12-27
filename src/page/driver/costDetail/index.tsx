import { useParams } from 'react-router-dom';

import UserCard from '../../../components/card/UserCard';
import SnsShare from '../../../components/snsShare/SnsShare';
import CostInfo from '../../../components/costInfo/CostInfo';

import { useMedia } from '../../../lib/function/useMediaQuery';
import { formatCurrency } from '../../../lib/function/utils';

import { useGetEstimateDetail } from '../../../lib/useQueries/estimate';

import style from './index.module.css';

import { mockData } from './mockData';

export default function DriverCostDetailPage() {
  const isPc = useMedia().pc;
  const id = useParams().id;

  const numericId = id ? Number(id) : null;

  const { data, isLoading, error } = useGetEstimateDetail(
    numericId ?? -1,
    'mover',
  );

  if (numericId === null || isNaN(numericId)) {
    return <div>잘못된 요청입니다. ID를 확인해주세요.</div>;
  }

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>데이터를 불러오는 중 에러가 발생했습니다: {error.message}</div>;
  }

  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }

  const user = mockData.users[Number(id) - 1];

  const info = {
    movingRequest: user?.movingRequest,
    movingType: user?.movingType,
    movingDate: user?.movingDate,
    departure: user?.detailDeparture,
    arrival: user?.detailArrival,
    comment: user?.customerComment,
  };

  return (
    <div className={style.container}>
      <nav className={style.navigation}>견적 상세</nav>
      <div className={style.mainContainer}>
        <div className={style.contents}>
          <UserCard list={user} />
          {!isPc && (
            <div className={style.share}>
              <SnsShare nickname={user?.customerName} type='shareEstimate' />
            </div>
          )}
          <div className={style.estimate}>
            <div className={style.label}>코멘트</div>
            {user?.moverComment && user?.moverComment}
          </div>
          <div className={style.estimate}>
            <div className={style.label}>견적가</div>
            {formatCurrency(user?.price) || 0}
          </div>
          <div className={style.estimateInfo}>
            <div className={style.info}>
              <CostInfo {...info} />
            </div>
          </div>
        </div>
        {isPc && (
          <div className={style.share}>
            <SnsShare nickname={user?.customerName} type='shareEstimate' />
          </div>
        )}
      </div>
    </div>
  );
}
