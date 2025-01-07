import style from '../Nav.module.css';
import { useMedia } from '../../../lib/function/useMediaQuery';

import React from 'react';
import alarm from '../../../assets/icons/ic_alarm_large.svg';

import alarmMobile from '../../../assets/icons/ic_alarm_medium.svg';

import { NotificationModal } from './NotificationModal';
import { useGetNotification } from '../../../lib/useQueries/notification';

type Props = {
  notificationRef?: React.RefObject<HTMLDivElement>;
  notificationController?: () => void;
  notificationModal?: boolean;
  user?: any;
};

export function Notification({
  notificationRef,
  notificationController,
  notificationModal,
  user,
}: Props) {
  const { pc } = useMedia();
  const { data } = useGetNotification();

  const ringAlarm = () => {
    return (
      <>
        <img
          className={style.navIcon}
          src={pc ? alarm : alarmMobile}
          alt=''
          onClick={notificationController}
          style={{ verticalAlign: 'middle' }}
        />
        <div className={style.navIconAlarm} />
      </>
    );
  };

  return (
    <div ref={notificationRef}>
      {data?.list.length > 0 ? (
        ringAlarm()
      ) : (
        <img
          className={style.navIcon}
          src={pc ? alarm : alarmMobile}
          alt=''
          onClick={notificationController}
        />
      )}
      {notificationModal ? (
        <NotificationModal
          modalController={notificationController}
          user={user}
        />
      ) : null}
    </div>
  );
}
