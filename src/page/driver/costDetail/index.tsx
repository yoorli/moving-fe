import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import UserCard from '../../../components/card/UserCard';
import SnsShare from '../../../components/snsShare/SnsShare';
import CostInfo from '../../../components/costInfo/CostInfo';
import NoContents from '../../../components/noContents/NoContents';
import Toast from '../../../components/toast/Toast';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';
import NotFound from '../../../components/404/NotFound';
import PageError from '../../../components/pageError/PageError';

import { useMedia } from '../../../lib/function/useMediaQuery';
import { formatCurrency } from '../../../lib/function/utils';
import { useGetEstimateDetail } from '../../../lib/useQueries/estimate';
import { EstimateConsumer, EstimateMover } from '../../../types/apiTypes';

import style from './index.module.css';
import { ENV } from '../../../lib/api/STORAGE_KEY';

import noItems from '../../../assets/icons/ic_noItems.svg';
import useDirection from '../../../lib/function/direction';

// 타입 가드 함수
function isEstimateMover(
  user: EstimateConsumer | EstimateMover,
): user is EstimateMover {
  return 'detailDeparture' in user && 'detailArrival' in user; // `detailDeparture`를 가진 객체인지 확인
}

export default function DriverCostDetailPage() {
  const isPc = useMedia().pc;
  const id = useParams().id;

  const location = useLocation();

  const url = `${ENV.API_FRONT}${location.pathname}`;

  const { direction_root } = useDirection();

  const [showToast, setShowToast] = useState(false);

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

  const handleErrorClick = () => {
    direction_root();
  };

  if (numericId === null || isNaN(numericId)) {
    return (
      <div className={style.noContent}>
        <NotFound />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={style.loadingSpinner}>
        <LoadingSpinner thin={true} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={style.noContent}>
        <PageError
          image={noItems}
          contentTextFirst={'데이터를 불러오는 중 에러가 발생했습니다:'}
          contentTextSecond={`${error.message}`}
          buttonText='홈으로 돌아가기'
          buttonHandler={handleErrorClick}
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className={style.noContent}>
        <NoContents image='file' contentText='보낸 견적이 없어요!' />
      </div>
    );
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
        <meta property='og:url' content={url} />
        <meta property='og:title' content='견적서 공유하기' />
        <meta property='og:type' content='website' />
        <meta
          property='og:image'
          content='%PUBLIC_URL%/img_logo_icon_text_xlarge.svg'
        />
        <meta
          property='og:description'
          content={`이 견적서는 ${user.customerName || '고객'}님 요청입니다.`}
        />
        <title>견적 상세</title>
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
                type='copy'
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