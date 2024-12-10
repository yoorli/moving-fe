import { useState } from 'react';
import UserCard from '../../../../components/card/UserCard';
import Pagination from '../../../../components/pagination/Pagination';
import style from './MyReview.module.css';
import { reviewMockData } from './reviewMockData';
import { useMedia } from '../../../../lib/function/useMediaQuery';

export default function MyReview() {
  const [currentPage, setCurrentPage] = useState(1);

  const { pc, tablet, mobile } = useMedia();

  const itemsPerPage = pc ? 6 : tablet ? 4 : mobile ? 4 : 6; // 페이지당 아이템 수

  const paginatedData = reviewMockData.list.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  console.log(paginatedData);
  return (
    <div className={style.container}>
      <div className={style.cardContainer}>
        {paginatedData.map((review, index) => (
          <UserCard
            key={index}
            list={{ ...review, movingType: review.serviceType }}
            type='review'
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        data={reviewMockData.total}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
