import { useEffect, useState } from 'react';

import Filter from './components/Filter';
import Dropdown from './components/Dropdown';
import CallList from './components/CallList';
import Pagination from '../../../components/pagination/Pagination';
import Search from '../../../components/search/Search';
import NoContents from '../../../components/noContents/NoContents';
import ModalContainer from '../../../components/modal/ModalContainer';

import { useMedia } from '../../../lib/function/useMediaQuery';
import { useGetMoverEstimateReq } from '../../../lib/useQueries/estimateReq';

import style from './index.module.css';

import filter from '../../../assets/icons/ic_filter_medium.svg';

export default function DriverCostCallPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [sortItem, setSortItem] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'modalFirstTab' | 'modalSecondTab'>(
    'modalFirstTab',
  );
  const [params, setParams] = useState({
    page: 1,
    pageSize: 3,
    type: ['SMALL'],
    isAssigned: false,
  });
  const [selectedOptions, setSelectedOptions] = useState({
    SMALL: true,
    HOUSE: true,
    OFFICE: true,
    ASSIGN: false,
  });
  const [isNoContents, setIsNoContents] = useState(false);

  const isPc = useMedia().pc;

  const { data, isLoading } = useGetMoverEstimateReq(params);

  const list = data?.list;
  const totalItems = data?.total || 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const page = {
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    data: totalItems,
    onPageChange: handlePageChange,
  };

  const count = {
    total: totalItems,
    SMALL: data?.small || 0,
    HOUSE: data?.house || 0,
    OFFICE: data?.office || 0,
    ASSIGN: data?.assign || 0,
  };

  const handleSetCheckedItems = (newItems: string[]) => {
    const newState = {
      SMALL: false,
      HOUSE: false,
      OFFICE: false,
      ASSIGN: false,
    };

    newItems.forEach((item) => {
      if (item === 'SMALL') newState.SMALL = true;
      if (item === 'HOUSE') newState.HOUSE = true;
      if (item === 'OFFICE') newState.OFFICE = true;
      if (item === 'ASSIGN') newState.ASSIGN = true;
    });

    setSelectedOptions(newState);
    setSearchTerm('');

    if (!newState.SMALL && !newState.HOUSE && !newState.OFFICE) {
      setIsNoContents(true);
      setParams({
        page: 1,
        pageSize: itemsPerPage,
        type: [],
        isAssigned: newState.ASSIGN,
      });
      return;
    }

    setIsNoContents(false);

    const types = Object.keys(newState).filter(
      (key) => newState[key as keyof typeof newState],
    );
    setParams({
      page: currentPage,
      pageSize: itemsPerPage,
      type: types,
      isAssigned: newState.ASSIGN,
    });
  };

  const handleDropdownChange = (sortOption: string) => {
    setSortItem(sortOption);
    setSearchTerm('');
  };

  const getFilter = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalTabChange = (tab: 'modalFirstTab' | 'modalSecondTab') => {
    setModalTab(tab);
  };

  const modalBtnClick = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!isPc) {
      setItemsPerPage(3);
    }
  }, [isPc]);

  useEffect(() => {
    const newItems: string[] = [];
    if (selectedOptions.SMALL) newItems.push('SMALL');
    if (selectedOptions.HOUSE) newItems.push('HOUSE');
    if (selectedOptions.OFFICE) newItems.push('OFFICE');
    const isAssigned = selectedOptions.ASSIGN;
    if (isAssigned) newItems.push('ASSIGN');

    const types = newItems.filter((item) => item !== 'ASSIGN');

    const option = {
      page: currentPage,
      pageSize: itemsPerPage,
      type: types,
      isAssigned: isAssigned,
      order: sortItem,
      keyWord: searchTerm,
    };

    setParams(option);
  }, [currentPage, searchTerm, sortItem, selectedOptions, itemsPerPage]);

  return (
    <div className={style.container}>
      <nav className={style.navigation}>받은 요청</nav>
      <div className={style.mainContainer}>
        {isPc && (
          <div className={style.filterBox}>
            <Filter
              count={count}
              checkedItems={selectedOptions}
              setCheckedItems={handleSetCheckedItems}
            />
          </div>
        )}
        <div className={style.content}>
          <div className={style.filter}>
            <div className={style.searchBar}>
              <Search
                placeholder='어떤 고객님을 찾고 계세요?'
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>
            <div className={style.sortBar}>
              전체 {isNoContents ? 0 : data?.total}건
              <div className={style.filterBar}>
                <Dropdown setSortItem={handleDropdownChange} />
                {!isPc && <img src={filter} alt='filter' onClick={getFilter} />}
              </div>
            </div>
          </div>
          {isLoading ? (
            <div>로딩 중...</div>
          ) : isNoContents || list.length === 0 ? ( // NoContents 상태 확인
            <div className={style.noContent}>
              <NoContents image='file' />
            </div>
          ) : (
            <>
              <div className={style.mainContent}>
                <CallList list={list} />
              </div>
              <div className={style.pagination}>
                <Pagination {...page} />
              </div>
            </>
          )}
        </div>
      </div>
      {!isPc && isModalOpen && (
        <ModalContainer
          title='이사 유형'
          isFilter={true}
          secondTitle='필터'
          selectedTab={modalTab}
          onTabChange={handleModalTabChange}
          buttonText='조회하기'
          closeBtnClick={() => setIsModalOpen(!isModalOpen)}
          buttonClick={modalBtnClick}
        >
          {modalTab === 'modalFirstTab' ? (
            <Filter
              type='moving'
              count={count}
              checkedItems={selectedOptions}
              setCheckedItems={handleSetCheckedItems}
            />
          ) : (
            <Filter
              type='filter'
              count={count}
              checkedItems={selectedOptions}
              setCheckedItems={handleSetCheckedItems}
            />
          )}
        </ModalContainer>
      )}
    </div>
  );
}
