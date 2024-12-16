// import useDirection from '../../lib/function/direction';
import style from './NotificationModal.module.css';
import IcXLarge from '../../assets/icons/ic_x_large.svg';
import { getNotificationDate } from '../../lib/function/utils';

import { mockData, Notification } from './mockData';

type Props = {
  modalController?: (e: any) => void;
};

export function NotificationModal({ modalController }: Props) {
  // const { direction_userEditProfile, direction_userEditInfo } = useDirection();
  const directionAndPopModal = (e: any) => {
    if (modalController) {
      modalController(e);
    }
  };

  const dateFormat = (createAt: string) => {
    return getNotificationDate(createAt);
  };

  const contentFormat = (notification: Notification) => {
    if (notification.estimateId) {
      return (
        <span>
          {notification.moverNickname} 기사님의
          <span className={style.blueText}>{notification.content} 견적</span>이
          도착했어요
        </span>
      );
    }
    if (notification.userConfirmId) {
      if (notification.moverNickname) {
        return (
          <span>
            {notification.moverNickname}의 견적이
            <span className={style.blueText}> 확정</span>되었어요
          </span>
        );
      } else {
        return (
          <span>
            내일은
            <span className={style.blueText}> {notification.content}</span>
            이에요.
          </span>
        );
      }
    }
    if (notification.assignedEstimateRequestId) {
      return (
        <span>
          {notification.userName} 고객님의
          <span className={style.blueText}> {notification.content}</span> 지정
          견적이 도착했습니다
        </span>
      );
    } else if (notification.moverConfirmId) {
      if (notification.userName) {
        return (
          <span>
            {notification.userName} 고객님의{' '}
            <span className={style.blueText}>{notification.content}</span>{' '}
            견적이 확정되었어요
          </span>
        );
      } else {
        return (
          <span>
            내일은{' '}
            <span className={style.blueText}>{notification.content}</span>
            이에요.
          </span>
        );
      }
    }
    return '기타 알림';
  };

  return (
    <div className={style.container}>
      <div className={style.title}>
        <div>알림</div>
        <img
          src={IcXLarge}
          alt=''
          className={style.titleCancel}
          onClick={directionAndPopModal}
        />
      </div>
      <div className={style.listContainer}>
        {mockData.list.length > 0 ? (
          <>
            {mockData.list?.map((notification: Notification) => (
              <div
                key={notification.id}
                className={style.item}
                onClick={directionAndPopModal}
              >
                <div className={style.itemContent}>
                  {contentFormat(notification)}
                </div>
                <div className={style.itemContentCreatedAt}>
                  {dateFormat(notification.createAt)}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div>알림이 없습니다</div>
        )}
      </div>
    </div>
  );
}
