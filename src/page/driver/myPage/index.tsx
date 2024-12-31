import DriverCard from '../../../components/card/DriverCard';
// import { ChipType } from '../../../types/cardTypes';
import Review from '../../../components/review/Review';
import Tab from '../../../components/tab/Tab';
import useDirection from '../../../lib/function/direction';
import style from './index.module.css';
import { useGetMoverProfile } from '../../../lib/useQueries/driver';
import { useGetMoverReviewList } from '../../../lib/useQueries/review';
import { useState } from 'react';
import Pagination from '../../../components/pagination/Pagination';

// export type ServiceRegionType =
//   | 'SEOUL'
//   | 'GYEONGGI'
//   | 'INCHEON'
//   | 'GANGWON'
//   | 'CHUNGBUK'
//   | 'CHUNGNAM'
//   | 'SEJONG'
//   | 'DAEJEON'
//   | 'JEONBUK'
//   | 'JEONNAM'
//   | 'GWANGJU'
//   | 'GYEONGBUK'
//   | 'GYEONGNAM'
//   | 'DAEGU'
//   | 'ULSAN'
//   | 'BUSAN'
//   | 'JEJU';

// interface DriverProfile {
//   id: number;
//   userId: number;
//   profileImg: string;
//   moverName: string;
//   career: number;
//   summary: string;
//   description: string;
//   confirmationCount: number;
//   serviceType: ChipType[];
//   serviceRegion: ServiceRegionType[];
//   reviewStats: {
//     averageScore: number;
//     totalReviews: number;
//   };
//   favoriteCount: number;
//   isAssigned?: boolean;
// }

export default function MyPage() {
  const { direction_driverEditProfile, direction_driverEditInfo } =
    useDirection();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { data } = useGetMoverProfile();
  console.log(data?.data);

  const {
    data: reviewData,
    isLoading: isReviewLoading,
    error: reviewError,
  } = useGetMoverReviewList(data?.data.id || 0, currentPage, itemsPerPage);

  console.log(reviewData);

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
            <div>리뷰 데이터를 로딩 중...</div>
          ) : reviewError ? (
            <div>리뷰 데이터를 가져오는 중 오류가 발생...</div>
          ) : reviewData ? (
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
            <div>리뷰 데이터를 불러오지 못했습니다.</div>
          )}
        </div>
      </div>
    </>
  );
}
