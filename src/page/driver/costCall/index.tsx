import { useState } from 'react';

import Filter from './components/Filter';
import Dropdown from './components/Dropdown';
import CallList from './components/CallList';
import Pagination from '../../../components/pagination/Pagination';
import Search from '../../../components/search/Search';
import NoContents from '../../../components/nocontents/NoContents';
import ModalContainer from '../../../components/modal/ModalContainer';

import { useMedia } from '../../../lib/function/useMediaQuery';

import style from './index.module.css';

import filter from '../../../assets/icons/ic_filter_medium.svg';

import { mockData } from './components/mockData';

export default function DriverCostCallPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'modalFirstTab' | 'modalSecondTab'>(
    'modalFirstTab',
  );
  const isPc = useMedia().pc;
  const itemsPerPage = 3;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = mockData.users.slice(startIndex, endIndex);

  const page = {
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    itemsTotalCount: mockData.total,
    onPageChange: handlePageChange,
  };

  const count = {
    total: mockData.total,
    small: mockData.small,
    medium: mockData.medium,
    large: mockData.large,
    assign: mockData.assign,
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

  return (
    <div className={style.container}>
      <nav className={style.navigation}>받은 요청</nav>
      <div className={style.mainContainer}>
        {isPc && (
          <div className={style.filterBox}>
            <Filter count={count} />
          </div>
        )}
        <div className={style.content}>
          <div className={style.filter}>
            <div className={style.searchBar}>
              <Search placeholder='어떤 고객님을 찾고 계세요?' />
            </div>
            <div className={style.sortBar}>
              전체 {mockData.total}건
              <div className={style.filterBar}>
                <Dropdown />
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
          {modalTab === 'modalFirstTab' ? <Filter count={count} type='moving'/> : <Filter count={count} type='filter'/>}
        </ModalContainer>
      )}
    </div>
  );
}
