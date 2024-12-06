import React, { useState, useEffect } from 'react';
import Tab from '../../../components/tab/Tab';
import FilterDropdown from './components/FilterDropdown';
import FilterDropdownMedium from './components/FilterDropdownMedium';
import SortDropdown from './components/SortDropdown';
import DriverSearch from './components/DriverSearch';
import style from './index.module.css';
import { translations, REGION_ITEMS, SERVICE_ITEMS } from '../searchDriver/utils/Constants';

const FILTER_TYPES = {
  REGION: 'region',
  SERVICE: 'service',
  SORT: 'sort',
};

const SORT_OPTIONS = [
  { label: '리뷰 많은순', value: 'reviewCount' },
  { label: '평점 높은순', value: 'averageScore' },
  { label: '경력 높은순', value: 'career' },
  { label: '확정 많은순', value: 'confirmationCount' },
];

const SearchDriverForGuest = () => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [selectedRegionLabel, setSelectedRegionLabel] = useState<string>('지역');
  const [selectedServiceLabel, setSelectedServiceLabel] = useState<string>('서비스');
  const [selectedServiceRegion, setSelectedServiceRegion] = useState<string>('');
  const [selectedServiceType, setSelectedServiceType] = useState<string>('');
  const [isMediumScreen, setIsMediumScreen] = useState<boolean>(window.innerWidth <= 1199);

  useEffect(() => {
    const handleResize = () => setIsMediumScreen(window.innerWidth <= 1199);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sendToServer = (region: string, service: string, sort: string) => {
    const payload = { selectedServiceRegion: region, selectedServiceType: service, sortBy: sort };
    console.log('서버로 전송할 데이터:', payload);
  };

  const handleSelect = (type: string, label: string) => {
    const value = translations[label] || '';
    if (type === FILTER_TYPES.REGION) {
      setSelectedRegionLabel(label);
      setSelectedServiceRegion(value);
      sendToServer(value, selectedServiceType, 'reviewCount');
    } else if (type === FILTER_TYPES.SERVICE) {
      setSelectedServiceLabel(label);
      setSelectedServiceType(value);
      sendToServer(selectedServiceRegion, value, 'reviewCount');
    }
  };

  const handleSortSelect = (value: string) => {
    sendToServer(selectedServiceRegion, selectedServiceType, value);
  };

  const handleToggleFilter = (filterName: string) => {
    setOpenFilter((prev) => (prev === filterName ? null : filterName));
  };

  const renderFilters = () => (
    <>
      <div className={style.compactFilters}>
        <FilterDropdownMedium
          placeholder={selectedRegionLabel}
          items={REGION_ITEMS}
          onSelect={(label) => handleSelect(FILTER_TYPES.REGION, label)}
          isRegion
          isOpen={openFilter === FILTER_TYPES.REGION}
          onToggle={() => handleToggleFilter(FILTER_TYPES.REGION)}
        />
        <FilterDropdownMedium
          placeholder={selectedServiceLabel}
          items={SERVICE_ITEMS}
          onSelect={(label) => handleSelect(FILTER_TYPES.SERVICE, label)}
          isOpen={openFilter === FILTER_TYPES.SERVICE}
          onToggle={() => handleToggleFilter(FILTER_TYPES.SERVICE)}
        />
      </div>
      <SortDropdown
        placeholder="리뷰 많은순"
        options={SORT_OPTIONS}
        isOpen={openFilter === FILTER_TYPES.SORT}
        onToggle={() => handleToggleFilter(FILTER_TYPES.SORT)}
        onSelect={handleSortSelect}
        className={style.sortDropdown}
      />
    </>
  );

  return (
    <div className={style.outerContainer}>
      <div className={style.noPadding}>
        <Tab firstText="기사님 찾기" />
      </div>
      <div className={`${style.container} ${isMediumScreen ? style.compactLayout : ''}`}>
        <div className={`${style.filterRow} ${isMediumScreen ? style.compactFilterRow : ''}`}>
          {isMediumScreen ? (
            renderFilters()
          ) : (
            <>
              <div className={style.leftFilters}>
                <FilterDropdown
                  title="지역을 선택해주세요"
                  placeholder={selectedRegionLabel}
                  items={REGION_ITEMS}
                  onSelect={(label) => handleSelect(FILTER_TYPES.REGION, label)}
                  isRegion
                  isOpen={openFilter === FILTER_TYPES.REGION}
                  onToggle={() => handleToggleFilter(FILTER_TYPES.REGION)}
                />
                <FilterDropdown
                  title="어떤 서비스가 필요하세요?"
                  placeholder={selectedServiceLabel}
                  items={SERVICE_ITEMS}
                  onSelect={(label) => handleSelect(FILTER_TYPES.SERVICE, label)}
                  isOpen={openFilter === FILTER_TYPES.SERVICE}
                  onToggle={() => handleToggleFilter(FILTER_TYPES.SERVICE)}
                />
                <div className={style.favoriteDrivers}>찜한 기사님</div>
              </div>
              <div className={style.rightFilters}>
                <SortDropdown
                  placeholder="리뷰 많은순"
                  options={SORT_OPTIONS}
                  isOpen={openFilter === FILTER_TYPES.SORT}
                  onToggle={() => handleToggleFilter(FILTER_TYPES.SORT)}
                  onSelect={handleSortSelect}
                />
                {!isMediumScreen && <DriverSearch placeholder="검색어를 입력하세요" />}
              </div>
            </>
          )}
        </div>
        {isMediumScreen && (
          <div className={style.searchBarCompact}>
            <DriverSearch placeholder="검색어를 입력하세요" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDriverForGuest;

