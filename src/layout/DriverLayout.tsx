import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import style from './DriverLayout.module.css';
import { DriverNav } from '../components/nav/Nav';
import { DriverMenuModal } from '../components/nav/NavMenuModal';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { useMedia } from '../lib/function/useMediaQuery';
import { HelmetProvider } from 'react-helmet-async';
import { AuthContext } from '../context/authContext';

export default function DriverLayout() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const {
    userValue: { user, isPending },
  } = useContext(AuthContext);
  useEffect(() => {
    if (!isPending && user) {
      if (user.userType === 'CUSTOMER') {
        window.location.href = '/';
      }
    }
  }, [user, isPending]);

  useEffect(() => {
    if (
      !isPending &&
      user?.Mover &&
      user?.Mover?.serviceRegion.length <= 0 &&
      user?.Mover?.serviceType.length <= 0
    ) {
      nav('/driver/register');
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
            <DriverNav
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
          <DriverMenuModal modalController={() => toggleModal('menu')} />
        )}
      </HelmetProvider>
    </>
  );
}
