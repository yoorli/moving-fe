import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DriverCard from '../../../components/card/DriverCard';
import CostDetailBottomTab from '../costDetail/components/CostDetailBottomTab';
import CostInfo from '../../../components/costInfo/CostInfo';
import Button from '../../../components/btn/Button';
import Tab from '../../../components/tab/Tab';
import Toast from '../../../components/toast/Toast';
import style from './index.module.css';

const CostDetail = () => {
  const location = useLocation();
  const driver = location.state; // 전달받은 데이터

  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1199);

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

  // price 필드를 undefined로 설정 => DriverCard에서 숨김
  const driverWithoutPrice = { ...driver, price: undefined };

  const costInfoData = {
    id: driver.id || 1,
    name: driver.name || '홍길동',
    isConfirmed: driver.isConfirmed || false,
    movingRequest: driver.movingRequest || '2023-10-01',
    movingType: driver.movingType || 'HOUSE',
    movingDate: driver.movingDate || '2023-10-15',
    departure: driver.departure || '서울특별시 강남구',
    arrival: driver.arrival || '경기도 성남시',
    comment: driver.comment || '엘리베이터가 없는 빌라 3층입니다.',
  };

  const shouldShowToast = driver.isReqConfirmed && !driver.isConfirmed; // Toast 메세지 나올 조건

  return (
    <div className={style.outerContainer}>
      <div className={style.noPadding}>
        <Tab firstText='견적 상세' />
      </div>

      <div className={style.container}>
        <div className={style.leftFilters}>
          <DriverCard list={driverWithoutPrice} type='cost' />
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

        <div className={style.rightFilters}>
          {driver.isReqConfirmed ? (
            <p className={style.shareText}>견적서 공유하기</p>
          ) : (
            <Button
              text='견적 확정하기'
              btnStyle={
                driver.isConfirmed
                  ? 'outlined314pxBlue300'
                  : 'solid314pxBlue300'
              }
              className={style.confirmButton}
            />
          )}
        </div>
      </div>

      {!driver.isReqConfirmed && isMobileView && (
        <CostDetailBottomTab isConfirmed={driver.isConfirmed} />
      )}
    </div>
  );
};

export default CostDetail;

