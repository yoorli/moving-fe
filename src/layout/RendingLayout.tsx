import { Outlet } from 'react-router-dom';
import style from './RendingLayout.module.css';
import { useState } from 'react';

import { UserMenuModal } from '../components/nav/NavMenuModal';
import { NonLoginNav, UserNav } from '../components/nav/Nav';

export default function RendingLayout() {
  const [modal, setModal] = useState<boolean>(false);

  const user = {
    name: '김대건',
  };

  const modalController = () => {
    setModal((prev) => !prev);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          {user ? (
            <UserNav modalController={modalController} />
          ) : (
            <NonLoginNav modalController={modalController} />
          )}
          <Outlet />
        </div>
      </div>
      {modal && user ? (
        <UserMenuModal modalController={modalController} />
      ) : null}
    </>
  );
}
