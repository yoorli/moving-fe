import { useState } from 'react';
import UserCard from '../../../../components/card/UserCard';
import Pagination from '../../../../components/pagination/Pagination';
import style from './MyReview.module.css';
import { useMedia } from '../../../../lib/function/useMediaQuery';
import { useGetMyReviewList } from '../../../../lib/useQueries/review';
import { ChipType } from '../../../../types/cardTypes';
import { getNotificationDate } from '../../../../lib/function/utils';
import LoadingSpinner from '../../../../components/loading/LoadingSpinner';

interface Review {
  reviewId: number; // 리뷰 아이디
  moverId: number; // 기사 아이디
  moverName: string; // 기사님 이름
  profileImg: string; // 이미지 url
  score: number; // 리뷰 점수
  content: string; // 리뷰 내용
  createAt: string; // 리뷰 작성일
  price: number; // 견적가
  isAssigned: boolean; // 지정 견적인지 여부
  serviceType: ChipType[]; // 이용한 서비스 타입 ['SMALL', 'HOUSE', ...]
  movingDate: string; // 이사 날짜
}

export default function MyReview() {
  const [currentPage, setCurrentPage] = useState(1);

  const { pc, tablet, mobile } = useMedia();

  const itemsPerPage = pc ? 6 : tablet || mobile ? 4 : 6; // 페이지당 아이템 수

  const { data, isLoading } = useGetMyReviewList({
    page: currentPage,
    pageSize: itemsPerPage,
  });

  // 로딩 중일 때 처리
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const totalPages =
    data && itemsPerPage ? Math.ceil(data.total / itemsPerPage) : 0;

  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }

  return (
    <div className={style.container}>
      <div className={style.cardContainer}>
        {data?.list.slice().map((review: Review, reviewId: number) => (
          <UserCard
            key={reviewId}
            list={{
              ...review,
              reviewStats: { averageScore: review.score },
              createAt: review.createAt,
              movingDate: getNotificationDate(review.movingDate, 'noSec'),
            }}
            type='review'
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        data={data.total}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
