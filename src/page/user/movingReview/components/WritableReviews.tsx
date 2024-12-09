import { useState } from 'react';
import DriverCard from '../../../../components/card/DriverCard';
import NoContents from '../../../../components/noContents/NoContents';
import Pagination from '../../../../components/pagination/Pagination';
import style from './WritableReviews.module.css';
import { mockData } from './mockData';
import { useMedia } from '../../../../lib/function/useMediaQuery';

interface WritableReviewsProps {
  setIsModalOpen: (value: boolean) => void;
  setSelectedMover: (mover: any) => void;
}

export default function WritableReviews({
  setIsModalOpen,
  setSelectedMover,
}: WritableReviewsProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const { pc, tablet, mobile } = useMedia();

  const itemsPerPage = pc ? 6 : tablet ? 4 : mobile ? 4 : 6; // 페이지당 아이템 수

  const handleModalOpen = (mover: any) => {
    setSelectedMover(mover);
    setIsModalOpen(true);
  };

  // 페이지에 해당하는 데이터 필터링 - mockData 대신 연동할 데이터
  const paginatedData = mockData.list.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <>
      {mockData.total !== 0 ? (
        <div className={style.container}>
          <div className={style.cardContainer}>
            {paginatedData.map((mover, index) => (
              <DriverCard
                key={index}
                user={mover}
                type='review'
                reviewBtn={() => handleModalOpen(mover)}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            data={mockData.total} // data type이 바뀌면 mockData.list.length || mockData.total
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      ) : (
        <div className={style.noContents}>
          <NoContents image='file' emptyWritableReviews={true} />
        </div>
      )}
    </>
  );
}
