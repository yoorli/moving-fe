import React, { useState } from 'react';
import Tab from '../../../components/tab/Tab';
import FilterDropdown from './components/FilterDropdown';
import style from './index.module.css';

const SearchDriverForGuest = () => {
  const [openFilter, setOpenFilter] = useState<string | null>(null); // 어떤 필터가 열렸는지 관리

  const handleRegionSelect = (value: string) => {
    console.log('선택된 지역:', value);
  };

  const handleServiceSelect = (value: string) => {
    console.log('선택된 서비스:', value);
  };

  const handleToggleFilter = (filterName: string) => {
    setOpenFilter((prev) => (prev === filterName ? null : filterName));
  };

  return (
    <div className={style.outerContainer}>
      <div className={style.noPadding}>
        <Tab firstText='기사님 찾기' />
      </div>
      <div className={style.container}>
        <div className={style.fixedFilter}>
          <div style={{ marginTop: '32px' }}>
            <FilterDropdown
              title='지역을 선택해주세요'
              placeholder='지역'
              items={[
                { label: '전체' },
                { label: '서울' },
                { label: '경기' },
                { label: '인천' },
                { label: '강원' },
                { label: '충북' },
                { label: '충남' },
                { label: '세종' },
                { label: '대전' },
                { label: '전북' },
                { label: '전남' },
                { label: '광주' },
                { label: '경북' },
                { label: '경남' },
                { label: '대구' },
                { label: '울산' },
                { label: '부산' },
                { label: '제주' },
              ]}
              onSelect={handleRegionSelect}
              isRegion
              isOpen={openFilter === 'region'}
              onToggle={() => handleToggleFilter('region')}
            />
          </div>
          <div style={{ marginTop: '32px' }}>
            <FilterDropdown
              title='어떤 서비스가 필요하세요?'
              placeholder='서비스'
              items={[
                { label: '전체' },
                { label: '소형이사' },
                { label: '가정이사' },
                { label: '사무실이사' },
              ]}
              onSelect={handleServiceSelect}
              isOpen={openFilter === 'service'}
              onToggle={() => handleToggleFilter('service')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDriverForGuest;

