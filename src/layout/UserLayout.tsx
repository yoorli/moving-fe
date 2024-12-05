import { Outlet } from 'react-router-dom';
import style from './UserLayout.module.css';
import '../style/globals.css';
import { useState } from 'react';

import { UserMenuModal } from '../components/nav/NavMenuModal';
import { UserNav } from '../components/nav/Nav';
import { useMedia } from '../lib/function/useMediaQuery';

export default function UserLayout() {
  const [modal, setModal] = useState<boolean>(false);
  const { pc } = useMedia();

  const modalController = () => {
    setModal((prev) => !prev);
  };
  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          <UserNav modalController={modalController} />
          <Outlet />
        </div>
      </div>
      {!pc && modal ? (
        <UserMenuModal modalController={modalController} />
      ) : null}
    </>
  );
}
