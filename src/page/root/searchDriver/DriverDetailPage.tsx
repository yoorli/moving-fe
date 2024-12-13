import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './DriverDetail.module.css';
import DriverCard from '../../../components/card/DriverCard';
import Review from '../../../components/review/Review';
import FixedBottomTab from './components/FixedBottomTab';
import Button from '../../../components/btn/Button';
import { MOCK_DATA } from './mockData';
import { ChipProps } from '../../../components/chip/Chip';
import HeartIcon from '../../../assets/icons/ic_full_heart_small.svg';
import {
  translateServiceRegion,
  translateServiceType,
} from '../../../lib/function/utils';

const DriverDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const driver = MOCK_DATA.find(
    (driver) => driver.moverId === parseInt(id || '', 10),
  );

  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1199);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 1199);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!driver) {
    return (
      <div className={style.container}>
        <p>해당 기사님을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const transformedDriver = {
    ...driver,
    serviceType: driver.serviceType.map((type) => type as ChipProps['type']),
  };

  const translatedTypes = translateServiceType(driver.serviceType);
  const translatedRegions = translateServiceRegion(driver.serviceRegion);

  return (
    <div className={style.outerContainer}>
      <div className={style.noPadding}></div>
      <div className={style.container}>
        <div className={style.leftFilters}>
          <DriverCard list={transformedDriver} />
          <div className={style.section}>
            <div className={style.border}></div>
            <h2 className={style.sectionTitle}>상세설명</h2>
            <p className={style.description}>{driver.description}</p>
            <div className={style.border}></div>
            <h2 className={style.sectionTitle}>제공 서비스</h2>
            <div className={style.chips}>
              {translatedTypes.map((type, index) => (
                <span key={index} className={style.serviceChip}>
                  {type}
                </span>
              ))}
            </div>
            <div className={style.border}></div>
            <h2 className={style.sectionTitle}>서비스 가능 지역</h2>
            <div className={style.chips}>
              {translatedRegions.map((region, index) => (
                <span key={index} className={style.regionChip}>
                  {region}
                </span>
              ))}
            </div>
            <div className={style.reviewSeparator}></div>
            <div className={style.reviewSection}>
              <Review />
            </div>
          </div>
        </div>
        {!isMobileView && (
          <div className={style.rightFilters}>
            <h2>{driver.moverName} 기사님에게 지정 견적을 요청해보세요!</h2>
            <div className={style.rightButtons}>
              <Button
                text='기사님 찜하기'
                btnStyle='outlined354pxLine200'
                src={HeartIcon}
                srcLocationFront
                alt='찜하기 아이콘'
                className={style.heartButton}
              />
              <Button
                text='지정 견적 요청하기'
                btnStyle='solid354pxBlue300'
                className={style.requestButton}
              />
            </div>
          </div>
        )}
      </div>
      {isMobileView && <FixedBottomTab />}
    </div>
  );
};

export default DriverDetailPage;
