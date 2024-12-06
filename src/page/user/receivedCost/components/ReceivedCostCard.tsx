import style from './ReceivedCostCard.module.css';
import DriverCard from '../../../../components/card/DriverCard';
import { mockData, DriverDataDetail } from '../mock';
import Pagination from '../../../../components/pagination/Pagination';
import { useState } from 'react';
// import { useMedia } from '../../../../lib/function/useMediaQuery';

export default function ReceivedCostCard() {
  const [currentPage, setCurrentPage] = useState(1);
  // const { pc } = useMedia();
  return (
    <>
      <div className={style.pcContainer}>
        {mockData.list.length > 0 ? (
          mockData.list?.map((mover: DriverDataDetail) => (
            <div key={mover.id} className={style.pcItem}>
              <DriverCard
                user={mover}
                type={
                  mover.isConfirmed
                    ? 'confirm'
                    : mover.isCancelled
                      ? 'cancel'
                      : 'notConfirm'
                }
              />
            </div>
          ))
        ) : (
          <div>받은 견적이 없습니다</div>
        )}
      </div>
      <div className={style.pagination}>
        <Pagination
          currentPage={currentPage}
          data={Array.from({ length: mockData.list.length })}
          itemsPerPage={6}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
