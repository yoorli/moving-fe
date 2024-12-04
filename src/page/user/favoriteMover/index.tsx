// import DriverCard from '../../../components/card/DriverCard';
import Tab from '../../../components/tab/Tab';
import style from './index.module.css';
import { mockData } from './mockData';

export default function UserFavoriteMover() {
  console.log(mockData);
  console.log(mockData.list[0]);
  return (
    <div className={style.overlay}>
      <Tab firstText='찜한 기사님' />
      {/* <DriverCard user={mover} type='dibs' /> */}
      <div className={style.container}>
        <div className={style.cardContainer}>
          {mockData.list.map((mover, index) => (
            <div key={index}>
              <img src={mover.profileImg} />
              <p>{mover.nickname}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
