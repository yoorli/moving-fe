// import useDirection from '../../lib/function/direction';
import style from './NotificationModal.module.css';
import IcXLarge from '../../../assets/icons/ic_x_large.svg';
import { getNotificationDate } from '../../../lib/function/utils';

import { Notification } from './type';
import {
  useGetNotification,
  useCreateNotificationRead,
} from '../../../lib/useQueries/notification';
import useDirection from '../../../lib/function/direction';

type Props = {
  user: any;
  modalController?: (e: any) => void;
};

export function NotificationModal({ modalController, user }: Props) {
  const {
    direction_pendingCost,
    direction_userCostDetail,
    direction_driverCostCall,
    direction_costHandler,
  } = useDirection();
  const directionAndPopModal = (e: any) => {
    if (modalController) {
      modalController(e);
    }
  };

  const dateFormat = (createAt: string) => {
    return getNotificationDate(createAt);
  };

  const { data } = useGetNotification();
  const { mutate } = useCreateNotificationRead();

  const clickHandler = (notification: any) => {
    if (!notification) {
      return;
    }

    const notificationId = notification.id;

    if (notification.assignedEstimateRequestId) {
      mutate(notificationId);
      if (user.userType === 'MOVER') direction_driverCostCall();
    } else if (notification.estimateRequestId) {
      mutate(notificationId);
      if (user.userType === 'CUSTOMER') direction_pendingCost();
      else direction_costHandler();
    } else if (notification.estimateId) {
      mutate(notificationId);
      if (user.userType === 'CUSTOMER')
        direction_userCostDetail(notification.estimateId);
      else direction_costHandler();
    }
  };

  return (
    <div className={style.container}>
      <div className={style.title}>
        <div>알림</div>
        <img
          src={IcXLarge}
          alt='닫기 버튼'
          className={style.titleCancel}
          onClick={directionAndPopModal}
        />
      </div>
      <div className={style.listContainer}>
        {data?.list.length > 0 ? (
          <>
            {data.list?.map((notification: Notification) => (
              <div
                key={notification.id}
                className={style.item}
                onClick={directionAndPopModal}
              >
                <div
                  className={style.itemContent}
                  onClick={() => clickHandler(notification)}
                >
                  <span className={style.contents}>
                    {notification.contents}
                  </span>
                </div>
                <div className={style.itemContentCreatedAt}>
                  {dateFormat(notification.createdAt)}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className={style.noContent}>알림이 없습니다</div>
        )}
      </div>
    </div>
  );
}
