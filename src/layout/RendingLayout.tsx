import { Outlet } from 'react-router-dom';
import style from './RendingLayout.module.css';
import NonLoginNav from '../components/nav/NonLoginNav';

export default function RendingLayout() {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <NonLoginNav />
        <Outlet />
      </div>
    </div>
  );
}
