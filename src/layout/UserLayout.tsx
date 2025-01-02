import { Outlet } from 'react-router-dom';
import style from './UserLayout.module.css';
import '../style/globals.css';
import { useState, useRef, useEffect, useContext } from 'react';

import { UserMenuModal } from '../components/nav/NavMenuModal';
import { UserNav } from '../components/nav/Nav';
import { useMedia } from '../lib/function/useMediaQuery';
import { AuthContext } from '../context/authContext';

export default function UserLayout() {
  const {
    userValue: { user, isPending },
  } = useContext(AuthContext);
  useEffect(() => {
    if (!isPending && user) {
      if (user.userType !== 'CUSTOMER') {
        window.location.href = '/';
      }
    }
  }, [user, isPending]);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const [activeModal, setActiveModal] = useState<
    null | 'menu' | 'profile' | 'notification'
  >(null);
  const { pc } = useMedia();

  const toggleModal = (
    modalType: 'menu' | 'profile' | 'notification' | null,
  ) => {
    setActiveModal((prev) => (prev === modalType ? null : modalType));
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
      setActiveModal(null);
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
          <UserNav
            menuRef={menuRef}
            profileRef={profileRef}
            notificationRef={notificationRef}
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
