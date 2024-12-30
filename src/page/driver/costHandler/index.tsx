import { useEffect, useState } from 'react';

import Tab from '../../../components/tab/Tab';
import UserCard from '../../../components/card/UserCard';
import Pagination from '../../../components/pagination/Pagination';
import Button from '../../../components/btn/Button';
import NoContents from '../../../components/noContents/NoContents';

import useDirection from '../../../lib/function/direction';
import { useMedia } from '../../../lib/function/useMediaQuery';
import {
  useGetEstimateConfirmed,
  useGetEstimateList,
} from '../../../lib/useQueries/estimate';
import { useGetEstimateReject } from '../../../lib/useQueries/assignedEstimateReq';

import style from './index.module.css';

import icCheckLarge from '../../../assets/icons/ic_check_large.svg';
import icCheckMedium from '../../../assets/icons/ic_check_medium.svg';

interface User {
  estimateId: number;
  comment?: string;
  isMoveDateOver: boolean;
  isCancelled: boolean;
  isRejected: boolean;
}

export default function DriverCostHandlerPage() {
  const [params, setParams] = useState({ page: 1, pageSize: 6 });
  const { data: aData, isLoading: aLoading } = useGetEstimateList(params);
  const { list: aList = [], total: aTotal = 0 } = aData || {
    list: [],
    total: 0,
  };

  const { data: cData, isLoading: cLoading } = useGetEstimateConfirmed({});
  const { list: cList = [], total: cTotal = 0 } = cData || {
    list: [],
    total: 0,
  };

  const { data: rData, isLoading: rLoading } = useGetEstimateReject({});
  const { list: rList = [], total: rTotal = 0 } = rData || {};

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentTab, setCurrentTab] = useState<'first' | 'second' | 'third'>(
    'first',
  );
  const [tablist, setTabList] = useState<User[]>(aList);
  const [total, setTotal] = useState(0);
  const [isCommentOpen, setIsCommentOpen] = useState<boolean[]>([false]); // 요구사항

  const { direction_costDetail } = useDirection();
  const isPc = useMedia().pc;
  const isTablet = useMedia().tablet;
  const isMobile = useMedia().mobile;

  const handleTabChange = (tab: 'first' | 'second' | 'third') => {
    setCurrentTab(tab);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const page = {
    currentPage,
    itemsPerPage,
    data: total || 3,
    onPageChange: handlePageChange,
  };

  const handleMouseEnter = (index: number) => {
    setIsCommentOpen((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const handleMouseLeave = (index: number) => {
    setIsCommentOpen((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  const disabledCard = (index: number) => {
    const idx = index + (currentPage - 1) * itemsPerPage;
    const item = tablist[idx];
    if (!item) return false;

    if (item.isMoveDateOver) return '이사 완료된 견적이에요';
    if (item.isCancelled) return '취소된 요청이에요';
    if (item.isRejected) return '반려된 요청이에요';
    return false;
  };

  useEffect(() => {
    if (isTablet || isMobile) {
      setItemsPerPage(3);
    } else setItemsPerPage(6);
  }, [isPc, isTablet, isMobile]);

  useEffect(() => {
    if (params.page !== currentPage || params.pageSize !== itemsPerPage) {
      setParams({ page: currentPage, pageSize: itemsPerPage });
    }
  }, [currentPage, itemsPerPage, params]);

  useEffect(() => {
    if (currentTab === 'first') {
      setTabList(aList);
      setTotal(aTotal);
    } else if (currentTab === 'second') {
      setTabList(cList);
      setTotal(cTotal);
    } else {
      setTabList(rList);
      setTotal(rTotal);
    }

    if (tablist.length > 0) {
      setIsCommentOpen(new Array(tablist.length).fill(false));
    }
  }, [aList, aTotal, cList, cTotal, currentTab]);

  const isLoading =
    currentTab === 'first'
      ? aLoading
      : currentTab === 'second'
        ? cLoading
        : rLoading;

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  const isData =
    currentTab === 'first' ? aData : currentTab === 'second' ? cData : rData;

  return (
    <div className={style.container}>
      <Tab
        selectable
        firstText='견적 전체 조회'
        secondText='확정 견적 조회'
        thirdText='반려ㆍ취소 요청'
        hasThirdTab
        selectedTab={currentTab}
        onTabChange={handleTabChange}
      />
      <div className={style.mainContainer}>
        {currentTab && (
          <div className={style.cardList}>
            {tablist.map((user: User, index: number) => (
              <div key={index} className={style.card}>
                <UserCard
                  list={user}
                  type={currentTab === 'third' ? undefined : 'confirmedCost'}
                />
                {user.comment && (
                  <div
                    className={style.commentChip}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                  >
                    <img
                      src={isPc ? icCheckLarge : icCheckMedium}
                      alt='icCheck'
                      className={style.commentImg}
                    />
                    요청사항
                    {isCommentOpen[index] && (
                      <div className={style.comment}>{user.comment}</div>
                    )}
                  </div>
                )}
                {disabledCard(index) && (
                  <div className={style.coveredCard}>
                    <div className={style.cardCover}></div>
                    <div className={style.cardButton}>
                      {disabledCard(index)}
                      {user.isMoveDateOver && (
                        <Button
                          text='견적 상세보기'
                          btnStyle='solid123pxBlue100'
                          onClick={() =>
                            user.estimateId &&
                            direction_costDetail(user.estimateId)
                          }
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {!isData && (
          <div className={style.noContent}>
            <NoContents image='file' />
          </div>
        )}
        {tablist.length > 0 && (
          <div className={style.pagination}>
            <Pagination {...page} />
          </div>
        )}
      </div>
    </div>
  );
}
