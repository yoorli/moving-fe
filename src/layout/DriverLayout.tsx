import { Outlet } from 'react-router-dom';
import style from './DriverLayout.module.css';
import { DriverNav } from '../components/nav/Nav';
import { DriverMenuModal } from '../components/nav/NavMenuModal';
import { useState } from 'react';

export default function DriverLayout() {
  const [modal, setModal] = useState<boolean>(false);

  const modalController = () => {
    setModal((prev) => !prev);
  };
  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          <DriverNav modalController={modalController} />
          <Outlet />
        </div>
      </div>
      {modal ? <DriverMenuModal modalController={modalController} /> : null}
    </>
  );
}
