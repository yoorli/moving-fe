import { Outlet } from 'react-router-dom';
import style from './DriverLayout.module.css';
import { DriverNav } from '../components/nav/Nav';
import { DriverMenuModal } from '../components/nav/NavMenuModal';
import React, { useState } from 'react';
import { useMedia } from '../lib/function/useMediaQuery';

export default function DriverLayout() {
  const [activeModal, setActiveModal] = useState<
    'none' | 'menu' | 'profile' | 'notification'
  >('none');
  const { pc } = useMedia();

  const toggleModal = (
    modalType: 'menu' | 'profile' | 'notification' | 'none',
  ) => {
    setActiveModal((prev) => (prev === modalType ? 'none' : modalType));
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          <DriverNav
            // modalController={modalController}
            modalController={() => toggleModal('menu')}
            profileController={() => toggleModal('profile')}
            notificationController={() => toggleModal('notification')}
            profileModal={activeModal === 'profile'}
            notificationModal={activeModal === 'notification'}
          />
          <Outlet />
        </div>
      </div>
      {!pc && activeModal === 'menu' && (
        <DriverMenuModal modalController={() => toggleModal('menu')} />
      )}
    </>
  );
}
