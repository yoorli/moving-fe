import DriverCard from '../../../../components/card/DriverCard';
// import useDirection from '../../../../lib/function/direction';
import { mockData } from './mockData';
import style from './PendingList.module.css';

interface PendinfListProps {
  setIsConfirmModalOpen: (value: boolean) => void; // Modal 열기
}

export default function PendingList({
  setIsConfirmModalOpen,
}: PendinfListProps) {
  // const { direction_땡땡 } = useDirection();
  const confirmCostBtn = () => {
    console.log('견적 확정하기 모달 띄우기');
    setIsConfirmModalOpen(true);
  };

  const detailbtn = () => {
    console.log('받았던 견적_견적 상세 페이지로 리다이렉트');
  };

  return (
    <div className={style.container}>
      <div className={style.cardContainer}>
        {mockData.list.map((cost, index) => (
          // confirmCostBtn(견적 확정하기 버튼, detailBtn(상세보기 버튼) props
          <DriverCard
            key={index}
            list={cost}
            type='waiting'
            confirmCostBtn={confirmCostBtn}
            detailBtn={detailbtn}
          />
        ))}
      </div>
    </div>
  );
  3;
}
