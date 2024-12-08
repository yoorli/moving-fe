import React from 'react';
import { useParams } from 'react-router-dom';
import style from './DriverDetail.module.css';
import DriverCard from '../../components/card/DriverCard';
import { MOCK_DATA } from '../root/searchDriver/mockData';
import { translateServiceRegion, translateServiceType } from '../root/searchDriver/EnumMapper';

const DriverDetailPage = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 기사님 ID 가져오기
  const driver = MOCK_DATA.find((driver) => driver.id === parseInt(id || '', 10)); // ID로 기사 찾기

  if (!driver) {
    return (
      <div className={style.container}>
        <p>해당 기사님을 찾을 수 없습니다.</p>
      </div>
    );
  }

  // EnumMapper를 이용해 데이터를 한글로 변환
  const transformedDriver = {
    ...driver,
    serviceRegion: driver.serviceRegion.map(translateServiceRegion),
    serviceType: driver.serviceType.map(translateServiceType),
  };

  return (
    <div className={style.outerContainer}>
      <div className={style.noPadding}></div>
      <div className={style.container}>
        <div className={style.leftFilters}>
          <DriverCard user={transformedDriver} />
          <div className={style.section}>
            <div className={style.border}></div>
            <h2 className={style.sectionTitle}>상세설명</h2>
            <p className={style.description}>{transformedDriver.description}</p>
            <div className={style.border}></div>
            <h2 className={style.sectionTitle}>제공 서비스</h2>
            <div className={style.chips}>
              {transformedDriver.serviceType.map((type, index) => (
                <span key={index} className={style.serviceChip}>
                  {type}
                </span>
              ))}
            </div>
            <div className={style.border}></div>
            <h2 className={style.sectionTitle}>서비스 가능 지역</h2>
            <div className={style.chips}>
              {transformedDriver.serviceRegion.map((region, index) => (
                <span key={index} className={style.regionChip}>
                  {region}
                </span>
              ))}
            </div>
            <div className={style.border}></div>
          </div>
        </div>
        <div className={style.rightFilters}>
          <h2>{transformedDriver.nickname} 기사님에게 지정 견적을 요청해보세요!</h2>
        </div>
      </div>
    </div>
  );
};

export default DriverDetailPage;

