import Tab from '../../../components/tab/Tab';
import style from './index.module.css';

export default function UserFavoriteMover() {
  return (
    <div className={style.container}>
      <Tab firstText='찜한 기사님' />
      <div>찜한 기사님</div>
    </div>
  );
}
