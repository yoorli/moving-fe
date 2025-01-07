import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMoverList } from '../../../lib/useQueries/driver';
import { useGetFavoriteMover } from '../../../lib/useQueries/favorite';
import Tab from '../../../components/tab/Tab';
import FilterDropdown from './components/FilterDropdown';
import FilterDropdownMedium from './components/FilterDropdownMedium';
import SortDropdown from './components/SortDropdown';
import DriverSearch from './components/DriverSearch';
import DriverCard from '../../../components/card/DriverCard';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';
import { AuthContext } from '../../../context/authContext';
import style from './index.module.css';
import {
  translations,
  REGION_ITEMS,
  SERVICE_ITEMS,
} from '../searchDriver/utils/Constants';
import { ChipProps } from '../../../components/chip/Chip';
import { Mover } from '../../../types/apiTypes';
import { useGetPendingEstimate } from '../../../lib/useQueries/estimate';
import { useMedia } from '../../../lib/function/useMediaQuery';

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

const SearchDriver = () => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [selectedRegionLabel, setSelectedRegionLabel] =
    useState<string>('지역');
  const [selectedServiceLabel, setSelectedServiceLabel] =
    useState<string>('서비스');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [sortOption, setSortOption] = useState<
    'reviewCount' | 'averageScore' | 'career' | 'confirmationCount'
  >('reviewCount');
  const [isMediumScreen, setIsMediumScreen] = useState<boolean>(
    window.innerWidth <= 1199,
  );
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(
    window.innerWidth <= 744,
  );
  const { userValue } = useContext(AuthContext);
  const {
    mobileWithChipSearDriver,
    mobileWithChipSearDriverSecond,
    mobileWithChipSearDriveLast,
  } = useMedia();

  const navigate = useNavigate();

  const queryParams = {
    sortBy: sortOption,
    keyword: searchKeyword || undefined,
    selectedServiceRegion:
      selectedRegionLabel !== '지역'
        ? translations[selectedRegionLabel]
        : undefined,
    selectedServiceType:
      selectedServiceLabel !== '서비스'
        ? translations[selectedServiceLabel]
        : undefined,
  };

  const { data: moverList, isLoading: isMoverLoading } =
    useGetMoverList(queryParams);

  const { data: favoriteMoverData, isLoading: isFavoriteLoading } =
    useGetFavoriteMover();

  const { data: pendingMoverList } = useGetPendingEstimate();

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth <= 1199);
      setIsSmallScreen(window.innerWidth <= 744);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    setSortOption(
      value as 'reviewCount' | 'averageScore' | 'career' | 'confirmationCount',
    );
  };

  const handleToggleFilter = (filterName: string) => {
    setOpenFilter((prev) => (prev === filterName ? null : filterName));
  };

  const handleDriverCardClick = (id: number) => {
    navigate(`/driver/${id}`);
  };

  const handleMoverCardClick = (id: number | undefined) => {
    if (id === undefined) return; // id가 undefined인 경우 클릭 무시
    navigate(`/driver/${id}`);
  };

  //견적대기 항목 추가
  if (pendingMoverList && moverList) {
    for (let i = 0; i < pendingMoverList.list.length; i++) {
      const pendingMover = pendingMoverList.list[i];
      const matchedMover = moverList.list.find((mover) => {
        return mover.id === pendingMover.moverId;
      });

      if (matchedMover && !matchedMover.serviceType.includes('WAITING')) {
        matchedMover.serviceType.push('WAITING');
      }
    }
  }

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
        placeholder={
          SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
          '리뷰 많은순'
        }
        options={SORT_OPTIONS}
        isOpen={openFilter === FILTER_TYPES.SORT}
        onToggle={() => handleToggleFilter(FILTER_TYPES.SORT)}
        onSelect={handleSortSelect}
        className={style.sortDropdown}
      />
    </>
  );

  const renderFavoriteDrivers = () => {
    const favoriteMoverList: Mover[] = favoriteMoverData?.data?.list || [];

    if (!userValue.user || Object.keys(userValue.user).length === 0) {
      return (
        <div
          style={{
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '32px',
            marginTop: '20px',
          }}
        >
          로그인 후 이용 가능한 서비스입니다
        </div>
      );
    }

    if (favoriteMoverList.length === 0) {
      return (
        <div
          style={{
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '28px',
            marginTop: '20px',
            textAlign: 'center',
          }}
        >
          찜한 기사님이 없습니다.
        </div>
      );
    }

    return (
      <div className={style.favoriteDriversContainer}>
        {favoriteMoverList.slice(0, 3).map((user: Mover) => (
          <DriverCard
            key={user.id}
            list={{
              ...user,
              profileImg: user.profileImg || undefined,
              serviceType: user.serviceType.map(
                (type: string) => type as ChipProps['type'],
              ),
            }}
            type='dibs'
            styles='small'
            onClick={() => handleMoverCardClick(user.moverId)}
            count={2}
          />
        ))}
      </div>
    );
  };

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
      {moverList?.list.map((user: Mover) => (
        <DriverCard
          key={user.id}
          list={{
            ...user,
            profileImg: user.profileImg || undefined,
            serviceType: user.serviceType.map(
              (type: string) => type as ChipProps['type'],
            ),
          }}
          onClick={() => handleDriverCardClick(user.id)}
          count={
            mobileWithChipSearDriver
              ? 4
              : mobileWithChipSearDriverSecond
                ? 4
                : mobileWithChipSearDriveLast
                  ? 3
                  : 6
          }
        />
      ))}
    </div>
  );

  return (
    <div className={style.outerContainer}>
      <div className={style.noPadding}>
        <Tab firstText='기사님 찾기' />
      </div>
      {isMoverLoading || isFavoriteLoading ? (
        <LoadingSpinner />
      ) : (
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
                    title='지역을 선택해주세요'
                    placeholder={selectedRegionLabel}
                    items={REGION_ITEMS}
                    onSelect={(label) =>
                      handleSelect(FILTER_TYPES.REGION, label)
                    }
                    isRegion
                    isOpen={openFilter === FILTER_TYPES.REGION}
                    onToggle={() => handleToggleFilter(FILTER_TYPES.REGION)}
                  />
                  <FilterDropdown
                    title='어떤 서비스가 필요하세요?'
                    placeholder={selectedServiceLabel}
                    items={SERVICE_ITEMS}
                    onSelect={(label) =>
                      handleSelect(FILTER_TYPES.SERVICE, label)
                    }
                    isOpen={openFilter === FILTER_TYPES.SERVICE}
                    onToggle={() => handleToggleFilter(FILTER_TYPES.SERVICE)}
                  />
                  <div className={style.favoriteDrivers}>찜한 기사님</div>
                  {renderFavoriteDrivers()}
                </div>
                <div className={style.rightFilters}>
                  <SortDropdown
                    placeholder={
                      SORT_OPTIONS.find((option) => option.value === sortOption)
                        ?.label || '리뷰 많은순'
                    }
                    options={SORT_OPTIONS}
                    isOpen={openFilter === FILTER_TYPES.SORT}
                    onToggle={() => handleToggleFilter(FILTER_TYPES.SORT)}
                    onSelect={handleSortSelect}
                  />
                  {!isMediumScreen && (
                    <DriverSearch
                      placeholder='검색어를 입력하세요'
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
                placeholder='검색어를 입력하세요'
                onChange={handleSearchChange}
              />
            </div>
          )}
          {isMediumScreen && renderDriverCards()}
        </div>
      )}
    </div>
  );
};

export default SearchDriver;
