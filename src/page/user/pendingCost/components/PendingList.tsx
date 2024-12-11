import DriverCard from '../../../../components/card/DriverCard';
import { mockData } from './mockData';
import style from './PendingList.module.css';

export default function PendingList() {
  console.log(mockData.list[0].career);
  return (
    <div className={style.container}>
      <div className={style.cardContainer}>
        {mockData.list.map((cost, index) => (
          // confirmCostBtn(견적 확정하기 버튼, detailBtn(상세보기 버튼) props
          <DriverCard key={index} list={cost} type='waiting' />
        ))}
      </div>
    </div>
  );
}
