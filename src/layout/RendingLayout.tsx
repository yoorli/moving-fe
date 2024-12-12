import { Outlet } from 'react-router-dom';
import style from './RendingLayout.module.css';
import { useState, useRef, useEffect } from 'react';

import { UserMenuModal } from '../components/nav/NavMenuModal';
import { NonLoginNav, UserNav } from '../components/nav/Nav';
import { useMedia } from '../lib/function/useMediaQuery';

export default function RendingLayout() {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);
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

  const handleOutsideClick = (e: any) => {
    if (
      (activeModal === 'menu' &&
        menuRef.current &&
        !menuRef.current.contains(e.target)) ||
      (activeModal === 'profile' &&
        profileRef.current &&
        !profileRef.current.contains(e.target)) ||
      (activeModal === 'notification' &&
        notificationRef.current &&
        !notificationRef.current.contains(e.target))
    ) {
      setActiveModal('none');
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => document.removeEventListener('click', handleOutsideClick);
  }, [activeModal]);

  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          {user ? (
            <UserNav
              menuRef={menuRef}
              profileRef={profileRef}
              notificationRef={notificationRef}
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
