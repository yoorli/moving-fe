import React from 'react';
import { useParams } from 'react-router-dom';
import style from './DriverDetail.module.css';
import DriverCard from '../../components/card/DriverCard';
import { MOCK_DATA } from '../root/searchDriver/mockData';

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

  return (
    <div className={style.outerContainer}>
      <div className={style.noPadding}>
      </div>
      <div className={style.container}>
        <div className={style.leftFilters}>
          <DriverCard user={driver} />
        </div>
        <div className={style.rightFilters}>
          <h2>{driver.nickname} 기사님에게 지정 견적을 요청해보세요!</h2>
        </div>
      </div>
    </div>
  );
};

export default DriverDetailPage;

