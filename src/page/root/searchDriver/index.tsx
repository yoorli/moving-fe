import React, { useState, useEffect, useContext, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const { userValue } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    mobileWithChipSearDriver,
    mobileWithChipSearDriverSecond,
    mobileWithChipSearDriveLast,
  } = useMedia();

  const [page, setPage] = useState<number>(1);
  const [movers, setMovers] = useState<Mover[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [pendingKeyword, setPendingKeyword] = useState<string>('');
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
    page,
    limit: 10,
  };

  const regionFilterRef = useRef<HTMLDivElement>(null);
  const serviceFilterRef = useRef<HTMLDivElement>(null);
  const sortFilterRef = useRef<HTMLDivElement>(null);

  const { data: moverList, isLoading: isMoverLoading } =
    useGetMoverList(queryParams);
  const { data: favoriteMoverData, isLoading: isFavoriteLoading } =
    useGetFavoriteMover();
  const { data: pendingMoverList } = useGetPendingEstimate();

  useEffect(() => {
    if (
      !userValue?.isPending &&
      userValue?.user?.Customer &&
      userValue?.user?.Customer?.region === 'NULL' &&
      userValue?.user?.Customer?.serviceType.length <= 0
    ) {
      navigate('/user/register');
    }
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth <= 1199);
      setIsSmallScreen(window.innerWidth <= 744);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (moverList) {
      setMovers((prevMovers) => {
        if (page === 1) {
          return moverList.list;
        }
        return [...prevMovers, ...moverList.list]; // 페이지가 증가하면 데이터를 누적
      });
      setHasNextPage(moverList.currentPage < moverList.totalPages);
    }
  }, [moverList, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        if (hasNextPage) {
          handleLoadMore(); // 스크롤이 맨 아래에 도달하면 다음 페이지 로드
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage]);

  useEffect(() => {
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
  }, [pendingMoverList, moverList]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPendingKeyword(e.target.value);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchKeyword(pendingKeyword); // 검색 실행
      setPage(1);
      setMovers([]);
    }
  };

  const handleLoadMore = () => {
    if (hasNextPage) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        return nextPage;
      });
    }
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const filterRefs = {
        [FILTER_TYPES.REGION]: regionFilterRef,
        [FILTER_TYPES.SERVICE]: serviceFilterRef,
        [FILTER_TYPES.SORT]: sortFilterRef,
      };

      if (
        openFilter &&
        filterRefs[openFilter]?.current &&
        !filterRefs[openFilter]?.current?.contains(target)
      ) {
        setOpenFilter(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openFilter]);

  const handleDriverCardClick = (id: number) => {
    navigate(`/driver/${id}`);
  };

  const handleMoverCardClick = (id: number | undefined) => {
    if (id === undefined) return;
    navigate(`/driver/${id}`);
  };

  const renderFilters = () => (
    <>
      <div className={style.compactFilters}>
        <div ref={regionFilterRef}>
          <FilterDropdownMedium
            placeholder={selectedRegionLabel}
            items={REGION_ITEMS}
            onSelect={(label) => handleSelect(FILTER_TYPES.REGION, label)}
            isRegion
            isOpen={openFilter === FILTER_TYPES.REGION}
            onToggle={() => handleToggleFilter(FILTER_TYPES.REGION)}
          />
        </div>

        <div ref={serviceFilterRef}>
          <FilterDropdownMedium
            placeholder={selectedServiceLabel}
            items={SERVICE_ITEMS}
            onSelect={(label) => handleSelect(FILTER_TYPES.SERVICE, label)}
            isOpen={openFilter === FILTER_TYPES.SERVICE}
            onToggle={() => handleToggleFilter(FILTER_TYPES.SERVICE)}
          />
        </div>
      </div>

      <div ref={sortFilterRef}>
        <SortDropdown
          placeholder={
            SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
            '리뷰 많은순'
          }
          options={SORT_OPTIONS}
          isOpen={openFilter === FILTER_TYPES.SORT}
          onToggle={() => handleToggleFilter(FILTER_TYPES.SORT)}
          onSelect={handleSortSelect}
          className={`${style.sortDropdown} ${
            openFilter === FILTER_TYPES.SORT ? style.dropdownOpen : ''
          }`}
          hasWrapper={window.innerWidth > 1199}
        />
      </div>
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
        {favoriteMoverList.slice(0, 3).map((user: Mover, index: number) => (
          <DriverCard
            key={`${user.moverId ?? 'no-moverId'}-${index}`}
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

  const renderDriverCards = () => {
    return (
      <div
        className={`${style.cardContainer} ${
          isMediumScreen
            ? isSmallScreen
              ? style.smallScreen
              : style.compact
            : style.rightFilters
        }`}
      >
        {movers.map((user: Mover, index: number) => (
          <DriverCard
            key={`${user.id ?? 'no-id'}-${index}`}
            list={{
              ...user,
              moverId: user.userId,
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
  };

  return (
    <div className={style.outerContainer}>
      <div className={style.noPadding}>
        <Tab firstText='기사님 찾기' />
      </div>
      {isMoverLoading || isFavoriteLoading ? (
        <LoadingSpinner />
      ) : (
        <div
          className={`${style.container} ${
            isMediumScreen ? style.compactLayout : ''
          }`}
        >
          <div
            className={`${style.filterRow} ${
              isMediumScreen ? style.compactFilterRow : ''
            }`}
          >
            {isMediumScreen ? (
              renderFilters()
            ) : (
              <>
                <div className={style.leftFilters}>
                  <div ref={regionFilterRef} style={{ marginTop: '20px' }}>
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
                  </div>
                  <div ref={serviceFilterRef} style={{ marginTop: '30px' }}>
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
                  </div>
                  <div className={style.favoriteDrivers}>찜한 기사님</div>
                  {renderFavoriteDrivers()}
                </div>
                <div className={style.rightFilters}>
                  <div ref={sortFilterRef} className={style.sortSection}>
                    <SortDropdown
                      placeholder={
                        SORT_OPTIONS.find(
                          (option) => option.value === sortOption,
                        )?.label || '리뷰 많은순'
                      }
                      options={SORT_OPTIONS}
                      isOpen={openFilter === FILTER_TYPES.SORT}
                      onToggle={() => handleToggleFilter(FILTER_TYPES.SORT)}
                      onSelect={handleSortSelect}
                    />
                  </div>

                  {!isMediumScreen && (
                    <div className={style.searchSection}>
                      <DriverSearch
                        placeholder='기사님을 검색하세요'
                        value={pendingKeyword}
                        onChange={handleSearchChange}
                        onKeyPress={handleSearchKeyPress}
                      />
                    </div>
                  )}

                  {!isMediumScreen && (
                    <div className={style.cardSection}>
                      {renderDriverCards()}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          {isMediumScreen && (
            <div className={style.searchBarCompact}>
              <DriverSearch
                placeholder='기사님을 검색하세요'
                value={pendingKeyword}
                onChange={handleSearchChange}
                onKeyPress={handleSearchKeyPress}
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
