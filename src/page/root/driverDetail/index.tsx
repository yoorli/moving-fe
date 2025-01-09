import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import style from './index.module.css';
import DriverCard from '../../../components/card/DriverCard';
import Review from '../../../components/review/Review';
import FixedBottomTab from '../searchDriver/components/FixedBottomTab';
import Button from '../../../components/btn/Button';
import Pagination from '../../../components/pagination/Pagination';
import { useGetMoverDetail } from '../../../lib/useQueries/driver';
import { useGetMoverReviewList } from '../../../lib/useQueries/review';
import { useRequestAssignedEstimate } from '../../../lib/useQueries/assignedEstimateReq';
import { useToggleFavoriteMover } from '../../../lib/useQueries/favorite';
import { ChipProps } from '../../../components/chip/Chip';
import {
  translateServiceRegion,
  translateServiceType,
} from '../searchDriver/EnumMapper';
import HeartIcon from '../../../assets/icons/ic_full_heart_small.svg';
import HeartEmptyIcon from '../../../assets/icons/ic_empty_heart_small.svg';
import ModalContainer from '../../../components/modal/ModalContainer';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';
import NoContents from '../../../components/noContents/NoContents';
import { AuthContext } from '../../../context/authContext';
import { useMedia } from '../../../lib/function/useMediaQuery';
import SnsShare from '../../../components/snsShare/SnsShare';

const DriverDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { userValue } = useContext(AuthContext);
  const isLoggedIn = !!userValue.user;

  const {
    data: driver,
    isLoading,
    error,
    refetch,
  } = useGetMoverDetail(Number(id));
  const { mutate: requestAssignedEstimate } = useRequestAssignedEstimate();
  const toggleFavoriteMutation = useToggleFavoriteMover();

  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1199);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAssigned, setIsAssigned] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { mobileWithChipDriverDetail } = useMedia();

  const {
    data: reviewData,
    isLoading: isReviewLoading,
    error: reviewError,
  } = useGetMoverReviewList(Number(id), currentPage, itemsPerPage);

  useEffect(() => {
    if (driver) {
      setIsFavorite(driver.isFavorite);
      setIsAssigned(driver.isAssigned);
    }
  }, [driver]);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 1199);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (driver) {
      console.log('기사 상세 데이터:', driver);
    }
  }, [driver]);

  const handleFavoriteToggle = () => {
    if (!driver) {
      console.error('기사님 데이터가 없습니다.');
      return;
    }

    toggleFavoriteMutation.mutate(driver.id, {
      onSuccess: (data) => {
        setIsFavorite(data.isFavorite);
        if (data.isFavorite !== driver.isFavorite) {
          refetch();
        }
      },
      onError: (error) => {
        console.error('찜 상태 변경 실패:', error);
      },
    });
  };

  const handleAssignRequest = () => {
    if (!driver) {
      console.error('기사님 데이터가 없습니다.');
      return;
    }

    if (!isAssigned && driver.isConfirmed) {
      requestAssignedEstimate(driver.id, {
        onSuccess: () => setIsAssigned(true),
        onError: (error) => console.error('지정 견적 요청 실패:', error),
      });
    } else if (!driver.isConfirmed) {
      setIsModalOpen(true);
    }
  };

  const handleModalButtonClick = () => {
    navigate('/user/costCall');
  };

  if (isLoading) {
    return (
      <div className={style.outerContainer}>
        <div className={style.noPadding}></div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !driver) {
    return (
      <div className={style.container}>
        <p>해당 기사님을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const transformedDriver = {
    ...driver,
    serviceType: driver.serviceType.map((type) => type as ChipProps['type']),
    profileImg: driver.profileImg || undefined,
  };

  return (
    <div className={style.outerContainer}>
      <div className={style.noPadding}></div>
      <div className={style.container}>
        <div className={style.leftFilters}>
          <DriverCard
            list={transformedDriver}
            count={mobileWithChipDriverDetail ? 3 : 6}
          />
          <div className={style.section}>
            <div className={style.border}></div>
            {isMobileView && (
              <>
                <div style={{ marginTop: '24px' }}>
                  <SnsShare nickname={driver.moverName} />
                </div>
                <div className={style.mobileBorder}></div>
              </>
            )}
            <h2 className={style.sectionTitle}>상세설명</h2>
            <p className={style.description}>{driver.description}</p>
            <div className={style.border}></div>
            <h2 className={style.sectionTitle}>제공 서비스</h2>
            <div className={style.chips}>
              {driver.serviceType.map((type, index) => (
                <span key={index} className={style.serviceChip}>
                  {translateServiceType(type)}
                </span>
              ))}
            </div>
            <div className={style.border}></div>
            <h2 className={style.sectionTitle}>서비스 가능 지역</h2>
            <div className={style.chips}>
              {driver.serviceRegion.map((region, index) => (
                <span key={index} className={style.regionChip}>
                  {translateServiceRegion(region)}
                </span>
              ))}
            </div>
            <div className={style.reviewSeparator}></div>
            {isReviewLoading ? (
              <div>리뷰 데이터를 로딩 중입니다...</div>
            ) : reviewError ? (
              <div className={style.noContents}>
                <NoContents
                  image='file'
                  contentText='일시적인 오류로 리뷰를 가져오지 못했습니다!'
                />
              </div>
            ) : reviewData && reviewData.reviewStats.totalReviews !== 0 ? (
              <>
                <Review
                  totalReviews={reviewData.reviewStats.totalReviews}
                  averageRating={
                    Object.entries(reviewData.reviewStats.reviewCount).reduce(
                      (acc, [score, count]) =>
                        acc + Number(score) * Number(count),
                      0,
                    ) / reviewData.reviewStats.totalReviews
                  }
                  reviewStats={reviewData.reviewStats.reviewCount}
                  reviews={reviewData.reviews.list}
                />
                <div
                  style={{
                    marginTop: '60px',
                    marginBottom: '60px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Pagination
                    currentPage={currentPage}
                    data={reviewData.reviewStats.totalReviews}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </>
            ) : (
              <div className={style.noContents}>
                <NoContents image='file' contentText='아직 리뷰가 없습니다!' />
              </div>
            )}
          </div>
        </div>
        {!isMobileView && (
          <div className={style.rightFilters}>
            <h2>{driver.moverName} 기사님에게 지정 견적을 요청해보세요!</h2>
            <div className={style.rightButtons}>
              <Button
                text='기사님 찜하기'
                btnStyle='outlined354pxLine200'
                src={isFavorite ? HeartIcon : HeartEmptyIcon}
                srcLocationFront
                alt='찜하기 아이콘'
                className={style.heartButton}
                onClick={handleFavoriteToggle}
              />
              <Button
                text={isAssigned ? '지정 견적 요청 완료' : '지정 견적 요청하기'}
                btnStyle='solid354pxBlue300'
                className={style.requestButton}
                disabled={isAssigned}
                onClick={handleAssignRequest}
              />
              <div className={style.border}></div>
            </div>
            <div style={{ marginTop: '10px' }}>
              <SnsShare nickname={driver.moverName} />
            </div>
          </div>
        )}
      </div>
      {isMobileView && (
        <FixedBottomTab
          moverId={driver.id}
          isFavorite={isFavorite}
          handleFavoriteToggle={handleFavoriteToggle}
          isAssigned={isAssigned}
          handleAssignRequest={handleAssignRequest}
          isConfirmed={driver.isConfirmed}
          setModalOpen={setIsModalOpen}
          isLoggedIn={isLoggedIn}
          setLoginModalOpen={setIsLoginModalOpen}
        />
      )}
      {isModalOpen && (
        <ModalContainer
          title='지정 견적 요청하기'
          isText={true}
          text='일반 견적 요청을 먼저 진행해주세요.'
          buttonText='일반 견적 요청하기'
          closeBtnClick={() => setIsModalOpen(false)}
          buttonClick={handleModalButtonClick}
        />
      )}
      {isLoginModalOpen && (
        <ModalContainer
          title='로그인 후 이용해주세요'
          isText={true}
          text='서비스를 이용하시려면 로그인이 필요합니다.'
          buttonText='로그인 하기'
          closeBtnClick={() => setIsLoginModalOpen(false)}
          buttonClick={() => navigate('/user/login')}
        />
      )}
    </div>
  );
};

export default DriverDetailPage;
