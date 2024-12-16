import { Outlet } from 'react-router-dom';
import style from './RendingLayout.module.css';
import { useContext, useState } from 'react';

import { UserMenuModal } from '../components/nav/NavMenuModal';
import { DriverNav, NonLoginNav, UserNav } from '../components/nav/Nav';
import { useMedia } from '../lib/function/useMediaQuery';
import { AuthContext } from '../context/authContext';

export default function RendingLayout() {
  const { user } = useContext(AuthContext);
  const [modal, setModal] = useState<boolean>(false);
  const { pc } = useMedia();

  const modalController = () => {
    setModal((prev) => !prev);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          {user ? (
            user.userType === 'MOVER' ? (
              <DriverNav modalController={modalController} />
            ) : (
              <UserNav modalController={modalController} />
            )
          ) : (
            <NonLoginNav modalController={modalController} />
          )}
          <Outlet />
        </div>
      </div>
      {!pc && modal && user ? (
        <UserMenuModal modalController={modalController} />
      ) : null}
    </>
  );
}
