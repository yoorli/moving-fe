import DriverCard from '../../../components/card/DriverCard';
import Tab from '../../../components/tab/Tab';
import style from './index.module.css';
import { mockData } from './mockData'; // 데이터 연결을 위한 임시 mockData (연동 시 지울 예정)

export default function UserFavoriteMover() {
  return (
    <div className={style.overlay}>
      <Tab firstText='찜한 기사님' />
      <div className={style.container}>
        <div className={style.cardContainer}>
          {mockData.list.map((mover, index) => (
            <DriverCard key={index} user={{ ...mover, isLiked: true }} type='dibs' />
          ))}
        </div>
      </div>
    </div>
  );
}
