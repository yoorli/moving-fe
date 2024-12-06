import DriverCard from '../../../components/card/DriverCard';

import { DriverProfileType } from '../../../components/card/type';

import style from './index.module.css';

import { mockData } from './mockData';

export default function DriverCostHandlerPage() {
  const getType = (isConfirmed: boolean, isCancelled: boolean):DriverProfileType => {
    if (isConfirmed && !isCancelled) return 'confirm'; // 확정된 경우
    if (!isConfirmed && !isCancelled) return 'notConfirm'; // 확정X된된 경우
    if (!isConfirmed && isCancelled) return 'cancel'; // 취소된 경우
    return 'waiting'; // 기본 상태
  };

  return (
    <div className={style.container}>
      {mockData.users.map((user) => (
        <div key={user.id} className={style.cardWrapper}>
          <DriverCard
            user={user}
            type={getType(Boolean(user.isConfirmed), Boolean(user.isCancelled))}
          />
        </div>
      ))}
    </div>
  );
}
