import { useParams } from 'react-router-dom';

import UserCard from '../../../components/card/UserCard';
import SnsShare from '../../../components/snsShare/SnsShare';
import CostInfo from '../../../components/costInfo/CostInfo';

import { useMedia } from '../../../lib/function/useMediaQuery';
import { formatCurrency } from '../../../lib/function/utils';

import { useGetEstimateDetail } from '../../../lib/useQueries/estimate';
import { EstimateConsumer, EstimateMover } from '../../../types/apiTypes';

import style from './index.module.css';

// 타입 가드 함수
function isEstimateMover(
  user: EstimateConsumer | EstimateMover,
): user is EstimateMover {
  return (
    'detailDeparture' in user &&
    'customerName' in user &&
    'customerComment' in user
  ); // `detailDeparture`를 가진 객체인지 확인
}

export default function DriverCostDetailPage() {
  const isPc = useMedia().pc;
  const id = useParams().id;

  const numericId = id ? Number(id) : null;

  const {
    data: user,
    isLoading,
    error,
  } = useGetEstimateDetail(numericId ?? -1, 'mover');

  if (numericId === null || isNaN(numericId)) {
    return <div>잘못된 요청입니다. ID를 확인해주세요.</div>;
  }

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>데이터를 불러오는 중 에러가 발생했습니다: {error.message}</div>;
  }

  if (!user) {
    return <div>데이터가 없습니다.</div>;
  }

  const info = isEstimateMover(user)
    ? {
        movingRequest: user?.movingRequest || '요청일 정보 없음',
        movingType: user?.movingType || '이사 유형 정보 없음',
        movingDate: user?.movingDate || '날짜 정보 없음',
        departure: user?.detailDeparture || '출발지 정보 없음',
        arrival: user?.detailArrival || '도착지 정보 없음',
        comment: user?.customerComment || '요청사항 없음',
      }
    : {
        movingRequest: user?.movingRequest || '요청일 정보 없음',
        movingType: user?.movingType || '이사 유형 정보 없음',
        movingDate: user?.movingDate || '날짜 정보 없음',
        departure: '출발지 정보 없음',
        arrival: '도착지 정보 없음',
        comment: '요청사항 없음',
      };

  return (
    <div className={style.container}>
      <nav className={style.navigation}>견적 상세</nav>
      <div className={style.mainContainer}>
        <div className={style.contents}>
          <UserCard list={user} />
          {!isPc && isEstimateMover(user) && (
            <div className={style.share}>
              <SnsShare nickname={user.customerName} type='shareEstimate' />
            </div>
          )}
          <>
            <div className={style.estimate}>
              <div className={style.label}>코멘트</div>
              {isEstimateMover(user) && user?.customerComment && user?.customerComment}
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
          </>
        </div>
        {!isPc && isEstimateMover(user) && (
          <div className={style.share}>
            <SnsShare nickname={user?.customerName} type='shareEstimate' />
          </div>
        )}
      </div>
    </div>
  );
}
