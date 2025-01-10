import { useState } from 'react';
import DriverCard from '../../../../components/card/DriverCard';
import NoContents from '../../../../components/noContents/NoContents';
import Pagination from '../../../../components/pagination/Pagination';
import style from './WritableReviews.module.css';
import { useMedia } from '../../../../lib/function/useMediaQuery';
import { useGetMovedEstimates } from '../../../../lib/useQueries/estimate';
import { ChipType } from '../../../../types/cardTypes';
import LoadingSpinner from '../../../../components/loading/LoadingSpinner';

interface WritableReviewsProps {
  setIsModalOpen: (value: boolean) => void;
  setSelectedMover: (mover: any) => void;
}

interface Estimate {
  estimateId: number; // 견적 ID
  moverId: number; // 기사님 ID
  isReviewWritten: boolean; // 리뷰 작성 여부
  serviceType: ChipType[]; // 기사님의 서비스 종류 (배열)
  isAssigned: boolean; // 지정 여부
  profileImg: string; // 프로필 이미지 URL
  moverName: string; // 기사님 별명
  movingDate: string; // 이사 날짜
  price: number; // 견적 가격
}

export default function WritableReviews({
  setIsModalOpen,
  setSelectedMover,
}: WritableReviewsProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const { pc, tablet, mobile, mobileWithChipMaxFour } = useMedia();

  const itemsPerPage = pc ? 6 : tablet ? 4 : mobile ? 4 : 6; // 페이지당 아이템 수

  const { data, isLoading } = useGetMovedEstimates({
    page: currentPage,
    pageSize: itemsPerPage,
  });

  const handleModalOpen = (mover: any) => {
    setSelectedMover(mover);
    setIsModalOpen(true);
  };

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
    <>
      {data.total !== 0 ? (
        <div className={style.container}>
          <div className={style.cardContainer}>
            {data?.list.map((mover: Estimate, moverId: number) => (
              <DriverCard
                key={moverId}
                list={mover}
                type='review'
                count={mobileWithChipMaxFour ? 3 : 6}
                disabled={mover.isReviewWritten}
                reviewBtn={() => handleModalOpen(mover)}
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
      ) : (
        <div className={style.noContents}>
          <NoContents image='file' emptyWritableReviews={true} />
        </div>
      )}
    </>
  );
}
