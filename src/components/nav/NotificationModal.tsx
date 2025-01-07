// import useDirection from '../../lib/function/direction';
import style from './NotificationModal.module.css';
import IcXLarge from '../../assets/icons/ic_x_large.svg';
import { getNotificationDate } from '../../lib/function/utils';

import { Notification } from './mockData';
import { useGetNotification } from '../../lib/useQueries/notification';
// import { useLinkClickHandler } from 'react-router-dom';
import useDirection from '../../lib/function/direction';

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

  const clickHandler = (notification: any) => {
    if (!notification) {
      return;
    }

    if (notification.estimateRequestId) {
      if (user.Customer) direction_pendingCost();
      if (user.Mover) direction_costHandler();
    } else if (notification.estimateId) {
      if (user.Customer) direction_userCostDetail(notification.estimateId);
      if (user.Mover) direction_costHandler();
    } else if (notification.assignedEstimateRequestId) {
      if (user.Mover) direction_driverCostCall();
    }
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
                  <span className={style.blueText}>
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
