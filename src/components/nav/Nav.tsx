import style from './Nav.module.css';
import logo from '../../assets/images/img_logo_icon_text_medium.svg';
import menu from '../../assets/icons/ic_menu_medium.svg';
import useDirection from '../../lib/function/direction';
import LoginBtn from '../btn/LoginBtn';
import { useMedia } from '../../lib/function/useMediaQuery';
import { useLocation } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import alarm from '../../assets/icons/ic_alarm_large.svg';
import profile from '../../assets/icons/ic_profile_large.svg';
import alarmMobile from '../../assets/icons/ic_alarm_medium.svg';
import profileMobile from '../../assets/icons/ic_profile_medium.svg';
import { DriverProfileModal, UserProfileModal } from './ProfileModal';
import { AuthContext } from '../../context/authContext';
import { NotificationModal } from './NotificationModal';

type Props = {
  menuRef?: React.RefObject<HTMLDivElement>;
  profileRef?: React.RefObject<HTMLDivElement>;
  notificationRef?: React.RefObject<HTMLDivElement>;
  modalController: () => void;
  profileController?: () => void;
  notificationController?: () => void;
  toggleModal?: () => void;
  profileModal?: boolean;
  notificationModal?: boolean;
};

export function NonLoginNav({ modalController, menuRef }: Props) {
  const { direction_root, direction_searchDriver, direction_userLogin } =
    useDirection();
  const { pc, tablet, mobile } = useMedia();

  //pc size
  if (pc) {
    return (
      <div className={style.container}>
        <img
          onClick={direction_root}
          className={style.logoImg}
          src={logo}
          alt=''
        />
        <div className={style.navContainer}>
          <nav>
            <ul className={style.navWrapper}>
              <li onClick={direction_searchDriver} className={style.navItem}>
                기사님 찾기
              </li>
            </ul>
          </nav>
        </div>
        <LoginBtn onClick={direction_userLogin} context='로그인' />
      </div>
    );
  } else if (tablet) {
    return (
      <div className={style.container}>
        <img
          onClick={direction_root}
          className={style.logoImg}
          src={logo}
          alt=''
        />
        <div ref={menuRef}>
          <img
            onClick={modalController}
            className={style.menu}
            src={menu}
            alt=''
          />
        </div>
      </div>
    );
  } else if (mobile) {
    return (
      <div className={style.container}>
        <img
          onClick={direction_root}
          className={style.logoImg}
          src={logo}
          alt=''
        />
        <div ref={menuRef}>
          <img
            onClick={modalController}
            className={style.menu}
            src={menu}
            alt=''
          />
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export function UserNav({
  menuRef,
  profileRef,
  notificationRef,
  modalController,
  profileController,
  notificationController,
  profileModal,
  notificationModal,
}: Props) {
  const {
    direction_root,
    direction_searchDriver,
    direction_costCall,
    direction_pendingCost,
  } = useDirection();
  const { pc, tablet, mobile } = useMedia();
  const { pathname } = useLocation();
  const {
    userValue: { user, isPending },
  } = useContext(AuthContext);

  useEffect(() => {
    if (!isPending && !user) {
      window.location.href = '/user/login';
    }
  }, [user, isPending]);

  //pc size
  if (pc) {
    return (
      <div className={style.container}>
        <img
          onClick={direction_root}
          className={style.logoImg}
          src={logo}
          alt=''
        />
        <div className={style.navContainer}>
          <nav>
            <ul className={style.navWrapper}>
              <li
                onClick={direction_costCall}
                className={`${style.navItem} ${style[pathname === '/user/costCall' ? 'location' : '']}`}
              >
                견적 요청
              </li>
              <li
                onClick={direction_searchDriver}
                className={`${style.navItem} ${style[pathname === '/searchDriver' ? 'location' : '']}`}
              >
                기사님 찾기
              </li>
              <li
                onClick={direction_pendingCost}
                className={`${style.navItem} ${style[pathname === '/user/pendingCost' ? 'location' : '']}`}
              >
                내 견적 관리
              </li>
            </ul>
          </nav>
        </div>
        <div className={style.navIcons}>
          <div ref={notificationRef}>
            <img
              className={style.navIcon}
              src={alarm}
              alt=''
              onClick={notificationController}
            />
            {notificationModal ? (
              <NotificationModal
                modalController={notificationController}
                user={user}
              />
            ) : null}
          </div>

          <div className={style.navProfile} ref={profileRef}>
            <img
              onClick={profileController}
              className={style.navIconProfile}
              src={profile}
              alt=''
            />
            <span className={style.navIconText}>{user?.name}</span>
            {profileModal ? (
              <UserProfileModal modalController={profileController} />
            ) : null}
          </div>
        </div>
      </div>
    );
  } else if (tablet) {
    return (
      <div className={style.container}>
        <img
          onClick={direction_root}
          className={style.logoImg}
          src={logo}
          alt=''
        />
        <div className={style.navIcons}>
          <div ref={notificationRef}>
            <img
              className={style.navIcon}
              src={alarmMobile}
              alt=''
              onClick={notificationController}
            />
            {notificationModal ? (
              <NotificationModal
                modalController={notificationController}
                user={user}
              />
            ) : null}
          </div>

          <div className={style.navProfile} ref={profileRef}>
            <img
              onClick={profileController}
              className={style.navIcon}
              src={profileMobile}
              alt=''
            />
            {profileModal ? (
              <UserProfileModal modalController={() => profileController} />
            ) : null}
          </div>

          <div ref={menuRef}>
            <img
              onClick={modalController}
              className={style.navIcon}
              src={menu}
              alt=''
            />
          </div>
        </div>
      </div>
    );
  } else if (mobile) {
    return (
      <div className={style.container}>
        <img
          onClick={direction_root}
          className={style.logoImg}
          src={logo}
          alt=''
        />
        <div className={style.navIcons}>
          <div ref={notificationRef}>
            <img
              className={style.navIcon}
              src={alarmMobile}
              alt=''
              onClick={notificationController}
            />
            {notificationModal ? (
              <NotificationModal
                modalController={notificationController}
                user={user}
              />
            ) : null}
          </div>

          <div className={style.navProfile} ref={profileRef}>
            <img
              onClick={profileController}
              className={style.navIcon}
              src={profile}
              alt=''
            />
            {profileModal ? (
              <UserProfileModal modalController={profileController} />
            ) : null}
          </div>

          <div ref={menuRef}>
            <img
              onClick={modalController}
              className={style.menu}
              src={menu}
              alt=''
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export function DriverNav({
  menuRef,
  profileRef,
  notificationRef,
  modalController,
  profileController,
  notificationController,
  profileModal,
  notificationModal,
}: Props) {
  const { direction_root, direction_driverCostCall, direction_costHandler } =
    useDirection();

  const { pc, tablet, mobile } = useMedia();
  const { pathname } = useLocation();

  const {
    userValue: { user, isPending },
  } = useContext(AuthContext);

  useEffect(() => {
    if (!isPending && !user) {
      window.location.href = '/driver/login';
    }
  }, [user, isPending]);

  //pc size
  if (pc) {
    return (
      <div className={style.container}>
        <img
          onClick={direction_root}
          className={style.logoImg}
          src={logo}
          alt=''
        />
        <div className={style.navContainer}>
          <nav>
            <ul className={style.navWrapper}>
              <li
                onClick={direction_driverCostCall}
                className={`${style.navItem} ${style[pathname === '/driver/costCall' ? 'location' : '']}`}
              >
                받은 요청
              </li>
              <li
                onClick={direction_costHandler}
                className={`${style.navItem} ${style[pathname === '/driver/costHandler' ? 'location' : '']}`}
              >
                내 견적 관리
              </li>
            </ul>
          </nav>
        </div>
        <div className={style.navIcons}>
          <div ref={notificationRef}>
            <img
              className={style.navIcon}
              src={alarm}
              alt=''
              onClick={notificationController}
            />
            {notificationModal ? (
              <NotificationModal
                modalController={notificationController}
                user={user}
              />
            ) : null}
          </div>

          <div className={style.navProfile} ref={profileRef}>
            <img
              onClick={profileController}
              className={style.navIconProfile}
              src={profile}
              alt=''
            />
            <span className={style.navIconText}>{user?.name}</span>
            {profileModal ? (
              <DriverProfileModal modalController={profileController} />
            ) : null}
          </div>
        </div>
      </div>
    );
  } else if (tablet) {
    return (
      <div className={style.container}>
        <img
          onClick={direction_root}
          className={style.logoImg}
          src={logo}
          alt=''
        />
        <div className={style.navIcons}>
          <div ref={notificationRef}>
            <img
              className={style.navIcon}
              src={alarmMobile}
              alt=''
              onClick={notificationController}
            />
            {notificationModal ? (
              <NotificationModal
                modalController={notificationController}
                user={user}
              />
            ) : null}
          </div>

          <div className={style.navProfile} ref={profileRef}>
            <img
              onClick={profileController}
              className={style.navIcon}
              src={profileMobile}
              alt=''
            />
            {profileModal ? (
              <DriverProfileModal modalController={profileController} />
            ) : null}
          </div>

          <div ref={menuRef}>
            <img
              onClick={modalController}
              className={style.navIcon}
              src={menu}
              alt=''
            />
          </div>
        </div>
      </div>
    );
  } else if (mobile) {
    return (
      <div className={style.container}>
        <img
          onClick={direction_root}
          className={style.logoImg}
          src={logo}
          alt=''
        />
        <div className={style.navIcons}>
          <div ref={notificationRef}>
            <img
              className={style.navIcon}
              src={alarm}
              alt=''
              onClick={notificationController}
            />
            {notificationModal ? (
              <NotificationModal
                modalController={notificationController}
                user={user}
              />
            ) : null}
          </div>

          <div className={style.navProfile} ref={profileRef}>
            <img
              onClick={profileController}
              className={style.navIcon}
              src={profile}
              alt=''
            />
            {profileModal ? (
              <DriverProfileModal modalController={profileController} />
            ) : null}
          </div>

          <div ref={menuRef}>
            <img
              onClick={modalController}
              className={style.menu}
              src={menu}
              alt=''
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
