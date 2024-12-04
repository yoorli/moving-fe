// import DriverCard from '../../../components/card/DriverCard';
import Review from '../../../components/review/Review';
import Tab from '../../../components/tab/Tab';
import style from './index.module.css';

export default function MyPage() {
  return (
    <div className={style.overlay}>
      <Tab firstText='마이페이지' />
      <div className={style.container}>
        <div className={style.myPage}>
          {/* <DriverCard /> */}
          <div>카드 컴포넌트</div>
          <div className={style.line} />
          <Review />
        </div>
      </div>
    </div>
  );
}
