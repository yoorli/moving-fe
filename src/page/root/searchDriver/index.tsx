import React, { useState, useEffect } from 'react';
import Tab from '../../../components/tab/Tab';
import FilterDropdown from './components/FilterDropdown';
import FilterDropdownMedium from './components/FilterDropdownMedium';
import SortDropdown from './components/SortDropdown';
import DriverSearch from './components/DriverSearch';
import DriverCard from '../../../components/card/DriverCard';
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

const MOCK_DATA = [
    {
      id: 1,
      nickname: '유재석',
      profileImage: 'https://via.placeholder.com/150',
      summary: '유쾌함과 전문성을 갖춘 15년 경력의 이사 전문가입니다.',
      reviewStats: { averageScore: 4.9, totalReviews: 80 },
      price: 140000,
      serviceRegion: ['서울', '경기'],
      serviceType: ['가정이사'],
      isAssigned: false,
      career: 15,
      confirmationCount: 55,
      favoriteCount: 200,
      isLiked: true,
    },
    {
      id: 2,
      nickname: '강호동',
      profileImage: 'https://via.placeholder.com/150',
      summary: '강력한 체력과 노련함으로 20년간 사무실 이사를 책임졌습니다.',
      reviewStats: { averageScore: 4.7, totalReviews: 60 },
      price: 180000,
      serviceRegion: ['부산', '울산'],
      serviceType: ['사무실이사'],
      isAssigned: false,
      career: 20,
      confirmationCount: 90,
      favoriteCount: 150,
      isLiked: false,
    },
    {
      id: 3,
      nickname: '손예진',
      profileImage: 'https://via.placeholder.com/150',
      summary: '세심함이 강점인 12년 경력의 소형 이사 전문가입니다.',
      reviewStats: { averageScore: 4.8, totalReviews: 50 },
      price: 130000,
      serviceRegion: ['인천', '서울'],
      serviceType: ['소형이사'],
      isAssigned: true,
      career: 12,
      confirmationCount: 30,
      favoriteCount: 250,
      isLiked: true,
    },
    {
      id: 4,
      nickname: '현빈',
      profileImage: 'https://via.placeholder.com/150',
      summary: '8년 경력으로 전국 어디든 빠르고 안전하게 이사합니다.',
      reviewStats: { averageScore: 4.5, totalReviews: 40 },
      price: 100000,
      serviceRegion: ['전국'],
      serviceType: ['가정이사', '소형이사'],
      isAssigned: false,
      career: 8,
      confirmationCount: 15,
      favoriteCount: 120,
      isLiked: false,
    },
    {
      id: 5,
      nickname: '차은우',
      profileImage: 'https://via.placeholder.com/150',
      summary: '고객 만족을 최우선으로 하는 5년 경력의 이사 전문가입니다.',
      reviewStats: { averageScore: 4.6, totalReviews: 30 },
      price: 110000,
      serviceRegion: ['대구', '경북'],
      serviceType: ['가정이사'],
      isAssigned: true,
      career: 5,
      confirmationCount: 75,
      favoriteCount: 300,
      isLiked: true,
    },
  ];

const SearchDriverForGuest = () => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [selectedRegionLabel, setSelectedRegionLabel] = useState<string>('지역');
  const [selectedServiceLabel, setSelectedServiceLabel] = useState<string>('서비스');
  const [searchKeyword, setSearchKeyword] = useState<string>(''); // 검색 상태
  const [sortOption, setSortOption] = useState<string>('reviewCount'); // 정렬 상태
  const [filteredData, setFilteredData] = useState(MOCK_DATA); // 필터링된 데이터 상태
  const [isMediumScreen, setIsMediumScreen] = useState<boolean>(window.innerWidth <= 1199);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(window.innerWidth <= 744);

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth <= 1199);
      setIsSmallScreen(window.innerWidth <= 744);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let data = MOCK_DATA;

    if (selectedRegionLabel !== '지역') {
      data = data.filter((driver) =>
        driver.serviceRegion.includes(translations[selectedRegionLabel])
      );
    }

    if (selectedServiceLabel !== '서비스') {
      data = data.filter((driver) =>
        driver.serviceType.includes(translations[selectedServiceLabel])
      );
    }

    if (searchKeyword) {
      data = data.filter((driver) =>
        driver.nickname.includes(searchKeyword) || driver.summary.includes(searchKeyword)
      );
    }

    if (sortOption) {
      data = [...data].sort((a, b) => {
        if (sortOption === 'reviewCount') return b.reviewStats.totalReviews - a.reviewStats.totalReviews;
        if (sortOption === 'averageScore') return b.reviewStats.averageScore - a.reviewStats.averageScore;
        if (sortOption === 'career') return b.career - a.career;
        if (sortOption === 'confirmationCount') return b.confirmationCount - a.confirmationCount;
        return 0;
      });
    }

    setFilteredData(data);
  }, [selectedRegionLabel, selectedServiceLabel, searchKeyword, sortOption]);

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
    setSortOption(value);
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

  const renderDriverCards = () => (
    <div
      className={`${style.cardContainer} ${
        isMediumScreen ? (isSmallScreen ? style.smallScreen : style.compact) : style.rightFilters
      }`}
    >
      {filteredData.map((user) => (
        <DriverCard key={user.id} user={user} />
      ))}
    </div>
  );

  const renderFavoriteDrivers = () => (
    <div className={style.favoriteDriversContainer}>
      {MOCK_DATA.map((user) => (
        <DriverCard key={user.id} user={user} type="dibs" />
      ))}
    </div>
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
                {renderFavoriteDrivers()}
              </div>
              <div className={style.rightFilters}>
                <SortDropdown
                  placeholder="리뷰 많은순"
                  options={SORT_OPTIONS}
                  isOpen={openFilter === FILTER_TYPES.SORT}
                  onToggle={() => handleToggleFilter(FILTER_TYPES.SORT)}
                  onSelect={handleSortSelect}
                />
                {!isMediumScreen && <DriverSearch placeholder="검색어를 입력하세요" onChange={handleSearchChange} />}
                {!isMediumScreen && renderDriverCards()}
              </div>
            </>
          )}
        </div>
        {isMediumScreen && (
          <div className={style.searchBarCompact}>
            <DriverSearch placeholder="검색어를 입력하세요" onChange={handleSearchChange} />
          </div>
        )}
        {isMediumScreen && renderDriverCards()}
      </div>
    </div>
  );
};

export default SearchDriverForGuest;

