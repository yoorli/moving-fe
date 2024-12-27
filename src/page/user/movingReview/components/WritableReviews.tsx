import { useState } from 'react';
import DriverCard from '../../../../components/card/DriverCard';
import NoContents from '../../../../components/noContents/NoContents';
import Pagination from '../../../../components/pagination/Pagination';
import style from './WritableReviews.module.css';
import { useMedia } from '../../../../lib/function/useMediaQuery';
import { useGetMovedEstimates } from '../../../../lib/useQueries/estimate';
import { ChipType } from '../../../../types/cardTypes';

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

  const { pc, tablet, mobile } = useMedia();

  const itemsPerPage = pc ? 6 : tablet ? 4 : mobile ? 4 : 6; // 페이지당 아이템 수

  const { data, isLoading } = useGetMovedEstimates({
    page: currentPage,
    pageSize: itemsPerPage,
  });

  const handleModalOpen = (mover: any) => {
    setSelectedMover(mover);
    setIsModalOpen(true);
  };

  // 페이지에 해당하는 데이터 필터링 - mockData 대신 연동할 데이터
  const paginatedData = data?.list.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // 로딩 중일 때 처리
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // data가 없을 때 처리
  if (!data) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <>
      {data.total !== 0 ? (
        <div className={style.container}>
          <div className={style.cardContainer}>
            {paginatedData.map((mover: Estimate, index: number) => (
              <DriverCard
                key={index}
                list={mover}
                type='review'
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
