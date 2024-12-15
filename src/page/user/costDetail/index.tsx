import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DriverCard from '../../../components/card/DriverCard';
import CostDetailBottomTab from '../costDetail/components/CostDetailBottomTab';
import CostInfo from '../../../components/costInfo/CostInfo';
import Button from '../../../components/btn/Button';
import Tab from '../../../components/tab/Tab';
import Toast from '../../../components/toast/Toast';
import HeartEmptyIcon from '../../../assets/icons/ic_empty_heart_small.svg';
import HeartIcon from '../../../assets/icons/ic_full_heart_small.svg';
import style from './index.module.css';

const CostDetail = () => {
  const location = useLocation();
  const driver = location.state; // 전달받은 데이터

  const [isMobileView, setIsMobileView] = useState<boolean>(
    window.innerWidth <= 1199,
  );
  const [isConfirmed, setIsConfirmed] = useState<boolean>(
    driver?.isConfirmed || false,
  );
  const [isFavorite, setIsFavorite] = useState<boolean>(
    driver?.isFavorite || false,
  );

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 1199);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!driver) {
    return (
      <div className={style.container}>
        <p>해당 견적 데이터를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const costInfoData = {
    id: driver.id || 1,
    name: driver.name || '홍길동',
    isConfirmed,
    movingRequest: driver.movingRequest || '2023-10-01',
    movingType: driver.movingType || 'HOUSE',
    movingDate: driver.movingDate || '2023-10-15',
    departure: driver.departure || '서울특별시 강남구',
    arrival: driver.arrival || '경기도 성남시',
    comment: driver.comment || '엘리베이터가 없는 빌라 3층입니다.',
  };

  const shouldShowToast = driver.isReqConfirmed && !isConfirmed;

  const handleConfirmClick = () => {
    setIsConfirmed(true);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={style.outerContainer}>
      <div className={style.noPadding}>
        <Tab firstText='견적 상세' />
      </div>

      <div className={style.container}>
        <div className={style.leftFilters}>
          <DriverCard list={driver} type='cost' showPrice={false} />
          <div className={style.section}>
            <div className={style.border}></div>
            <h2 className={style.sectionTitle}>견적가</h2>
            <p className={style.costValue}>
              {driver.price
                ? `${driver.price.toLocaleString()} 원`
                : '가격 정보 없음'}
            </p>
            <div className={style.border}></div>
            <h2 className={style.sectionTitle}>코멘트</h2>
            <p className={style.comment}>
              {driver.comment || '기사님의 코멘트입니다.'}
            </p>

            <div className={style.costInfoWrapper}>
              <CostInfo {...costInfoData} />
            </div>

            {shouldShowToast && (
              <div className={style.toastWrapper}>
                <Toast text='확정하지 않은 견적이에요!' />
              </div>
            )}
          </div>
        </div>

        {!isMobileView && (
          <div className={style.rightFilters}>
            {driver.isReqConfirmed ? (
              <p className={style.shareText}>견적서 공유하기</p>
            ) : (
              <>
                <Button
                  text='견적 찜하기'
                  btnStyle='outlined354pxLine200'
                  src={isFavorite ? HeartIcon : HeartEmptyIcon}
                  srcLocationFront
                  className={style.heartButton}
                  onClick={handleFavoriteToggle}
                />
                <div style={{ height: '32px' }}></div>
                <Button
                  text='견적 확정하기'
                  btnStyle={
                    isConfirmed ? 'outlined314pxBlue300' : 'solid314pxBlue300'
                  }
                  className={style.confirmButton}
                  disabled={isConfirmed}
                  onClick={handleConfirmClick}
                />
              </>
            )}
          </div>
        )}
      </div>

      {isMobileView && (
        <CostDetailBottomTab
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
          isConfirmed={isConfirmed}
          setIsConfirmed={setIsConfirmed}
          isReqConfirmed={driver.isReqConfirmed}
        />
      )}
    </div>
  );
};

export default CostDetail;

