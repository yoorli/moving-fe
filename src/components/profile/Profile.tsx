import style from './Profile.module.css';
import assets from '../../lib/assets/images';

export default function Profile() {
  return (
    <div className={style.container}>
      <img src={assets.icons.alarmLarge} alt='a' />
    </div>
  );
}
