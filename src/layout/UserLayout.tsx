import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import style from './UserLayout.module.css';
import '../style/globals.css';
import { useState, useRef, useEffect, useContext } from 'react';

import { UserMenuModal } from '../components/nav/NavMenuModal';
import { UserNav } from '../components/nav/Nav';
import { useMedia } from '../lib/function/useMediaQuery';
import { AuthContext } from '../context/authContext';
import { HelmetProvider } from 'react-helmet-async';

export default function UserLayout() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const {
    userValue: { user, isPending },
  } = useContext(AuthContext);

  useEffect(() => {
    if (!isPending && user) {
      if (user.userType === 'MOVER') {
        window.location.href = '/';
      } // 회원 유형에 따른 접근 제한
    }
  }, [user, isPending]);

  useEffect(() => {
    if (
      !isPending &&
      user?.Customer &&
      user?.Customer?.region === 'NULL' &&
      user?.Customer?.serviceType.length <= 0
    ) {
      nav('/user/register');
    }
  }, [pathname]);

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
      <HelmetProvider>
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
      </HelmetProvider>
    </>
  );
}
