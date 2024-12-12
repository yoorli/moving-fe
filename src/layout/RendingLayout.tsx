import { Outlet } from 'react-router-dom';
import style from './RendingLayout.module.css';
import { useState } from 'react';

import { UserMenuModal } from '../components/nav/NavMenuModal';
import { NonLoginNav, UserNav } from '../components/nav/Nav';
import { useMedia } from '../lib/function/useMediaQuery';

export default function RendingLayout() {
  const [activeModal, setActiveModal] = useState<
    'none' | 'menu' | 'profile' | 'notification'
  >('none');

  const { pc } = useMedia();

  const user = {
    name: '김대건',
  };

  const toggleModal = (
    modalType: 'menu' | 'profile' | 'notification' | 'none',
  ) => {
    setActiveModal((prev) => (prev === modalType ? 'none' : modalType));
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          {user ? (
            <UserNav
              modalController={() => toggleModal('menu')}
              profileController={() => toggleModal('profile')}
              notificationController={() => toggleModal('notification')}
              profileModal={activeModal === 'profile'}
              notificationModal={activeModal === 'notification'}
              toggleModal={() => toggleModal('none')}
            />
          ) : (
            <NonLoginNav modalController={() => toggleModal('menu')} />
          )}
          <Outlet />
        </div>
      </div>

      {!pc && activeModal === 'menu' && user ? (
        <UserMenuModal modalController={() => toggleModal('menu')} />
      ) : null}
    </>
  );
}
