import { Outlet } from 'react-router-dom';
import style from './UserLayout.module.css';
import '../style/globals.css';
import { useState, useRef } from 'react';

import { UserMenuModal } from '../components/nav/NavMenuModal';
import { UserNav } from '../components/nav/Nav';
import { useMedia } from '../lib/function/useMediaQuery';

export default function UserLayout() {
  const outside = useRef<HTMLDivElement | null>(null);
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
        <div
          className={style.wrapper}
          ref={outside}
          onClick={(e) => {
            if (outside.current === e.target) {
              toggleModal('none');
            }
          }}
        >
          <UserNav
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
        <UserMenuModal modalController={() => toggleModal('menu')} />
      )}
    </>
  );
}
