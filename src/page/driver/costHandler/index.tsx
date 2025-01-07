import { useEffect, useState } from 'react';

import Tab from '../../../components/tab/Tab';
import UserCard from '../../../components/card/UserCard';
import Pagination from '../../../components/pagination/Pagination';
import Button from '../../../components/btn/Button';
import NoContents from '../../../components/noContents/NoContents';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';

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
  const [pageState, setPageState] = useState({
    first: { currentPage: 1, itemsPerPage: 6 },
    second: { currentPage: 1, itemsPerPage: 6 },
    third: { currentPage: 1, itemsPerPage: 6 },
  });
  const [currentTab, setCurrentTab] = useState<'first' | 'second' | 'third'>(
    'first',
  );
  const [isCommentOpen, setIsCommentOpen] = useState<boolean[]>([false]); // 요구사항

  const { direction_costDetail } = useDirection();
  const isPc = useMedia().pc;
  const isTablet = useMedia().tablet;
  const isMobile = useMedia().mobile;

  const currentPage = pageState[currentTab].currentPage;
  const itemsPerPage = pageState[currentTab].itemsPerPage;

  const {
    data: aData,
    isLoading: aLoading,
    refetch: refetchA,
  } = useGetEstimateList({
    page: pageState.first.currentPage,
    pageSize: pageState.first.itemsPerPage,
  });
  const {
    data: cData,
    isLoading: cLoading,
    refetch: refetchC,
  } = useGetEstimateConfirmed({
    page: pageState.second.currentPage,
    pageSize: pageState.second.itemsPerPage,
  });
  const {
    data: rData,
    isLoading: rLoading,
    refetch: refetchR,
  } = useGetEstimateReject({
    page: pageState.third.currentPage,
    pageSize: pageState.third.itemsPerPage,
  });
  const tabData = {
    first: {
      list: aData?.list || [],
      total: aData?.total || 0,
      isLoading: aLoading,
    },
    second: {
      list: cData?.list || [],
      total: cData?.total || 0,
      isLoading: cLoading,
    },
    third: {
      list: rData?.list || [],
      total: rData?.total || 0,
      isLoading: rLoading,
    },
  };

  const currentTabData = tabData[currentTab];

  const handleTabChange = (tab: 'first' | 'second' | 'third') => {
    setCurrentTab(tab);
    setPageState((prevState) => ({
      ...prevState,
      [tab]: { ...prevState[tab], currentPage: 1 }, // 탭 변경 시 페이지 초기화
    }));
  };

  const handlePageChange = (page: number) => {
    setPageState((prevState) => ({
      ...prevState,
      [currentTab]: { ...prevState[currentTab], currentPage: page },
    }));
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

  const disabledCard = (user: User) => {
    if (user.isMoveDateOver) return '이사 완료된 견적이에요';
    if (user.isCancelled) return '취소된 요청이에요';
    if (user.isRejected) return '반려된 요청이에요';
    return false;
  };

  useEffect(() => {
    const itemsPerPage = isPc ? 6 : isTablet ? 4 : 3;
    if (itemsPerPage !== pageState.first.itemsPerPage) {
      setPageState((prevState) => {
        const updatedState = { ...prevState };
        Object.keys(updatedState).forEach((key) => {
          if (
            updatedState[key as keyof typeof prevState].itemsPerPage !==
            itemsPerPage
          ) {
            updatedState[key as keyof typeof prevState].itemsPerPage =
              itemsPerPage;
          }
        });
        return updatedState;
      });
    }
  }, [isPc, isTablet, isMobile]);

  useEffect(() => {
    if (isCommentOpen.length !== currentTabData.list.length) {
      setIsCommentOpen(new Array(currentTabData.list.length).fill(false));
    }
  }, [currentTab, currentTabData.list]);

  useEffect(() => {
    if (currentTab === 'first') {
      refetchA();
    } else if (currentTab === 'second') {
      refetchC();
    } else if (currentTab === 'third') {
      refetchR();
    }
  }, [currentTab, pageState]);

  const isLoading = currentTabData.isLoading;

  if (isLoading) {
    return (
      <div className={style.loadingSpinner}>
        <LoadingSpinner thin={true} />
      </div>
    );
  }

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
        {currentTabData.list.length > 0 ? (
          <>
            <div className={style.cardList}>
              {currentTabData.list.map((user: User, index: number) => (
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
                  {disabledCard(user) && (
                    <div className={style.coveredCard}>
                      <div className={style.cardCover}></div>
                      <div className={style.cardButton}>
                        {disabledCard(user)}
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
            <div className={style.pagination}>
              <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                data={currentTabData.total}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <div className={style.noContent}>
            <NoContents image='file' />
          </div>
        )}
      </div>
    </div>
  );
}
