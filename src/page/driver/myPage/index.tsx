import DriverCard from '../../../components/card/DriverCard';
import Review from '../../../components/review/Review';
import Tab from '../../../components/tab/Tab';
import useDirection from '../../../lib/function/direction';
import style from './index.module.css';
import { useGetMoverProfile } from '../../../lib/useQueries/driver';
import { useGetMoverReviewList } from '../../../lib/useQueries/review';
import { useState } from 'react';
import Pagination from '../../../components/pagination/Pagination';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';
import NoContents from '../../../components/noContents/NoContents';

export default function MyPage() {
  const { direction_driverEditProfile, direction_driverEditInfo } =
    useDirection();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { data, isLoading } = useGetMoverProfile();
  const {
    data: reviewData,
    isLoading: isReviewLoading,
    error: reviewError,
  } = useGetMoverReviewList(data?.data.id || 0, currentPage, itemsPerPage);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const totalReviewNum = reviewData?.reviewStats.totalReviews;

  return (
    <>
      <Tab firstText='마이페이지' />
      <div className={style.overlay}>
        <div className={style.container}>
          <DriverCard
            list={{ ...data?.data, moverId: data?.data.userId }}
            type='profile'
            editInfoBtn={direction_driverEditInfo}
            editProfileBtn={direction_driverEditProfile}
          />
          <div className={style.line} />
          {isReviewLoading ? (
            <LoadingSpinner thin={true} />
          ) : reviewError ? (
            <div className={style.noContents}>
              <NoContents image='file' contentText='일시적인 오류로 리뷰를 가져오지 못했습니다!' />
            </div>
          ) : reviewData && totalReviewNum !== 0 ? (
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
    </>
  );
}
