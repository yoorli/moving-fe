import { useEffect, useState } from 'react';

import Filter from './components/Filter';
import Dropdown from './components/Dropdown';
import CallList from './components/CallList';
import Pagination from '../../../components/pagination/Pagination';
import Search from '../../../components/search/Search';
import NoContents from '../../../components/noContents/NoContents';
import ModalContainer from '../../../components/modal/ModalContainer';

import { useMedia } from '../../../lib/function/useMediaQuery';
import { useGeMoverEstimateReq } from '../../../lib/useQueries/estimateReq';

import style from './index.module.css';

import filter from '../../../assets/icons/ic_filter_medium.svg';

export default function DriverCostCallPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [sortItem, setSortItem] = useState('');
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'modalFirstTab' | 'modalSecondTab'>(
    'modalFirstTab',
  );
  const [params, setParams] = useState({});
  const isPc = useMedia().pc;

  const { data } = useGeMoverEstimateReq(params);

  const list = data?.list;
  const currentUsers = list?.users ?? [];

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentUsers = users.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const page = {
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    data: list?.total,
    onPageChange: handlePageChange,
  };

  const count = {
    total: data?.total || 0,
    small: data?.small || 0,
    house: data?.house || 0,
    office: data?.office || 0,
    assign: data?.assign || 0,
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
    const isAssigned = checkedItems?.includes('ASSIGN');
    const types = checkedItems.filter((item) => item !== 'ASSIGN');

    const option = {
      page: currentPage,
      pageSize: itemsPerPage,
      type: types,
      isAssigned: isAssigned,
      order: sortItem,
      keyWord: searchTerm,
    };

    setParams(option);
  }, [currentPage, searchTerm, sortItem, checkedItems]);

  return (
    <div className={style.container}>
      <nav className={style.navigation}>받은 요청</nav>
      <div className={style.mainContainer}>
        {isPc && (
          <div className={style.filterBox}>
            <Filter count={count} setCheckedItems={setCheckedItems} />
          </div>
        )}
        <div className={style.content}>
          <div className={style.filter}>
            <div className={style.searchBar}>
              <Search
                placeholder='어떤 고객님을 찾고 계세요?'
                setSearchTerm={setSearchTerm}
              />
            </div>
            <div className={style.sortBar}>
              전체 {data?.total}건
              <div className={style.filterBar}>
                <Dropdown setSortItem={setSortItem} />
                {!isPc && <img src={filter} alt='filter' onClick={getFilter} />}
              </div>
            </div>
          </div>
          {currentUsers.length > 0 ? (
            <div className={style.mainContent}>
              <CallList list={currentUsers} />
            </div>
          ) : (
            <div className={style.noContent}>
              <NoContents image='file' />
            </div>
          )}
          {currentUsers.length > 0 && (
            <div className={style.pagination}>
              <Pagination {...page} />
            </div>
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
              count={count}
              type='moving'
              setCheckedItems={setCheckedItems}
            />
          ) : (
            <Filter
              count={count}
              type='filter'
              setCheckedItems={setCheckedItems}
            />
          )}
        </ModalContainer>
      )}
    </div>
  );
}
