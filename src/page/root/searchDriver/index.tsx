import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMoverList } from '../../../lib/useQueries/driver';
import { useGetFavoriteMover } from '../../../lib/useQueries/favorite';
import Tab from '../../../components/tab/Tab';
import FilterDropdown from './components/FilterDropdown';
import FilterDropdownMedium from './components/FilterDropdownMedium';
import SortDropdown from './components/SortDropdown';
import DriverSearch from './components/DriverSearch';
import DriverCard from '../../../components/card/DriverCard';
import style from './index.module.css';
import {
  translations,
  REGION_ITEMS,
  SERVICE_ITEMS,
} from '../searchDriver/utils/Constants';
import { ChipProps } from '../../../components/chip/Chip';
import { Mover } from '../../../types/apiTypes';

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
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [sortOption, setSortOption] = useState<'reviewCount' | 'averageScore' | 'career' | 'confirmationCount'>('reviewCount');
  const [isMediumScreen, setIsMediumScreen] = useState<boolean>(window.innerWidth <= 1199);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(window.innerWidth <= 744);
  const navigate = useNavigate();

  const queryParams = {
    sortBy: sortOption,
    keyword: searchKeyword || undefined, // 검색어가 없으면 제외
    selectedServiceRegion: selectedRegionLabel !== '지역' ? translations[selectedRegionLabel] : undefined, // 선택 안 하면 제외
    selectedServiceType: selectedServiceLabel !== '서비스' ? translations[selectedServiceLabel] : undefined, // 선택 안 하면 제외
  };

  // 기사님 전체 리스트 API 연동
  const { data: moverList, isLoading } = useGetMoverList(queryParams);

  useEffect(() => {
    if (moverList) {
      console.log('기사님 전체리스트:', moverList); // 기사님 전체 리스트 출력
      console.log('기사님 리스트:', moverList.list || []); // 리스트만 출력
    }
  }, [moverList]); // moverList 변경 시 실행

  // 찜한 기사님 API 연동
  const { data: favoriteMoverData, isLoading: isFavoriteLoading } = useGetFavoriteMover();

  useEffect(() => {
    if (favoriteMoverData) {
      console.log('찜한 기사님 호출 엔드포인트: /favorite/me');
      console.log('찜한 기사님 호출 API:', favoriteMoverData);
      console.log('찜한 기사님 리스트:', favoriteMoverData.data?.list || []);
    }
  }, [favoriteMoverData]); // favoriteMoverData 변경 시 실행

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth <= 1199);
      setIsSmallScreen(window.innerWidth <= 744);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    console.log(
      `https://moving-be-render.onrender.com/mover/list?sortBy=${queryParams.sortBy}&keyword=${queryParams.keyword || ''}&selectedServiceRegion=${queryParams.selectedServiceRegion || ''}&selectedServiceType=${queryParams.selectedServiceType || ''}`
    );
  }, [queryParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSelect = (type: string, label: string) => {
    if (type === FILTER_TYPES.REGION) {
      setSelectedRegionLabel(label);
    } else if (type === FILTER_TYPES.SERVICE) {
      setSelectedServiceLabel(label);
    }
  };

  const handleSortSelect = (value: string) => {
    setSortOption(value as 'reviewCount' | 'averageScore' | 'career' | 'confirmationCount');
  };

  const handleToggleFilter = (filterName: string) => {
    setOpenFilter((prev) => (prev === filterName ? null : filterName));
  };

  const handleCardClick = (id: number) => {
    navigate(`/driver/${id}`);
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
        placeholder={SORT_OPTIONS.find((option) => option.value === sortOption)?.label || '리뷰 많은순'}
        options={SORT_OPTIONS}
        isOpen={openFilter === FILTER_TYPES.SORT}
        onToggle={() => handleToggleFilter(FILTER_TYPES.SORT)}
        onSelect={handleSortSelect}
        className={style.sortDropdown}
      />
    </>
  );

  const renderDriverCards = () => (
    <div
      className={`${style.cardContainer} ${
        isMediumScreen
          ? isSmallScreen
            ? style.smallScreen
            : style.compact
          : style.rightFilters
      }`}
    >
      {isLoading ? (
        <div>로딩 중...</div>
      ) : (
        moverList?.list.map((user: Mover) => (
          <DriverCard
            key={user.id}
            list={{
              ...user,
              profileImg: user.profileImg || undefined,
              serviceType: user.serviceType.map((type: string) => type as ChipProps['type']),
            }}
            onClick={() => handleCardClick(user.id)}
          />
        ))
      )}
    </div>
  );

  const renderFavoriteDrivers = () => {
    if (isFavoriteLoading) {
      return <div>로딩 중...</div>;
    }

    const favoriteMoverList: Mover[] = favoriteMoverData?.data?.list || [];
    if (favoriteMoverList.length === 0) {
      return <div>찜한 기사님이 없습니다.</div>;
    }

    return (
      <div className={style.favoriteDriversContainer}>
        {favoriteMoverList.slice(0, 3).map((user: Mover) => (
          <DriverCard
            key={user.id}
            list={{
              ...user,
              profileImg: user.profileImg || undefined,
              serviceType: user.serviceType.map((type: string) => type as ChipProps['type']),
            }}
            type="dibs"
            styles="small"
            onClick={() => handleCardClick(user.id)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={style.outerContainer}>
      <div className={style.noPadding}>
        <Tab firstText="기사님 찾기" />
      </div>
      <div
        className={`${style.container} ${isMediumScreen ? style.compactLayout : ''}`}
      >
        <div
          className={`${style.filterRow} ${isMediumScreen ? style.compactFilterRow : ''}`}
        >
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
                {renderFavoriteDrivers()}
              </div>
              <div className={style.rightFilters}>
                <SortDropdown
                  placeholder={SORT_OPTIONS.find((option) => option.value === sortOption)?.label || '리뷰 많은순'}
                  options={SORT_OPTIONS}
                  isOpen={openFilter === FILTER_TYPES.SORT}
                  onToggle={() => handleToggleFilter(FILTER_TYPES.SORT)}
                  onSelect={handleSortSelect}
                />
                {!isMediumScreen && (
                  <DriverSearch
                    placeholder="검색어를 입력하세요"
                    onChange={handleSearchChange}
                  />
                )}
                {!isMediumScreen && renderDriverCards()}
              </div>
            </>
          )}
        </div>
        {isMediumScreen && (
          <div className={style.searchBarCompact}>
            <DriverSearch
              placeholder="검색어를 입력하세요"
              onChange={handleSearchChange}
            />
          </div>
        )}
        {isMediumScreen && renderDriverCards()}
      </div>
    </div>
  );
};

export default SearchDriverForGuest;

