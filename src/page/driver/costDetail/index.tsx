import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import UserCard from '../../../components/card/UserCard';
import SnsShare from '../../../components/snsShare/SnsShare';
import CostInfo from '../../../components/costInfo/CostInfo';
import NoContents from '../../../components/noContents/NoContents';
import Toast from '../../../components/toast/Toast';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';

import { useMedia } from '../../../lib/function/useMediaQuery';
import { formatCurrency } from '../../../lib/function/utils';
import { useGetEstimateDetail } from '../../../lib/useQueries/estimate';
import { EstimateConsumer, EstimateMover } from '../../../types/apiTypes';

import style from './index.module.css';

import logoTextLarge from '../../../assets/images/img_logo_text_large.svg';

// 타입 가드 함수
function isEstimateMover(
  user: EstimateConsumer | EstimateMover,
): user is EstimateMover {
  return 'detailDeparture' in user && 'detailArrival' in user; // `detailDeparture`를 가진 객체인지 확인
}

export default function DriverCostDetailPage() {
  const isPc = useMedia().pc;
  const id = useParams().id;

  const [showToast, setShowToast] = useState(false); // Toast 표시 여부 관리

  const numericId = id ? Number(id) : null;

  const {
    data: user,
    isLoading,
    error,
  } = useGetEstimateDetail(numericId ?? -1, 'mover');

  const handleSnsShareClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (numericId === null || isNaN(numericId)) {
    return <div>잘못된 요청입니다. ID를 확인해주세요.</div>;
  }

  if (isLoading) {
    return (
      <div className={style.loadingSpinner}>
        <LoadingSpinner thin={true} />
      </div>
    );
  }

  if (error) {
    return <div>데이터를 불러오는 중 에러가 발생했습니다: {error.message}</div>;
  }

  if (!user) {
    return (
    <div className={style.noContent}>
      <NoContents image='file' />
    </div>
    )
  }

  const info = isEstimateMover(user)
    ? {
        movingRequest: user.movingRequest || '요청일 정보 없음',
        movingType: user.movingType || '이사 유형 정보 없음',
        movingDate: user.movingDate || '날짜 정보 없음',
        departure: user.detailDeparture || '출발지 정보 없음',
        arrival: user.detailArrival || '도착지 정보 없음',
        comment: user.customerComment || '요청사항 없음',
      }
    : {
        movingRequest: user.movingRequest || '요청일 정보 없음',
        movingType: user.movingType || '이사 유형 정보 없음',
        movingDate: user.movingDate || '날짜 정보 없음',
        departure: user.departure || '출발지 정보 없음',
        arrival: user.arrival || '도착지 정보 없음',
        comment: user.customerComment || '요청사항 없음',
      };

  return (
    <>
      <Helmet>
        <title>{'견적 상세'}</title>
        <meta name='description' content={'견적서 공유하기'} />
        <meta property='og:title' content={'견적서 공유하기'} />
        <meta
          property='og:description'
          content={`이 견적서는 ${user.customerName}님 요청입니다.`}
        />
        <meta property='og:image' content={logoTextLarge} />
      </Helmet>
      <div className={style.container}>
        <nav className={style.navigation}>견적 상세</nav>
        <div className={style.mainContainer}>
          <div className={style.contents}>
            <UserCard list={user} />
            {!isPc && isEstimateMover(user) && user.customerName && (
              <div className={style.share}>
                <SnsShare
                  nickname={user.customerName}
                  type='shareEstimate'
                  onClick={handleSnsShareClick}
                />
              </div>
            )}
            <>
              <div className={style.estimate}>
                <div className={style.label}>코멘트</div>
                {isEstimateMover(user) &&
                  user?.moverComment &&
                  user?.moverComment}
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
            {showToast && (
              <Toast
                text='링크 복사가 완료됐습니다.'
                autoDismiss={true}
                dismissDuration={50000000}
              />
            )}
          </div>
          {isPc && isEstimateMover(user) && user.customerName && (
            <div className={style.share}>
              <SnsShare
                nickname={user.customerName}
                type='shareEstimate'
                onClick={handleSnsShareClick}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
