import DriverCard from '../../../components/card/DriverCard';

// import { DriverProfileType } from '../../../components/card/type';

import style from './index.module.css';

import { mockData } from './mockData';

export default function DriverCostHandlerPage() {
  // const getType = (isConfirmed: boolean, isCancelled: boolean):DriverProfileType => {
  //   if (isConfirmed && !isCancelled) return 'confirm'; // 확정된 경우
  //   if (!isConfirmed && !isCancelled) return 'notConfirm'; // 확정X된된 경우
  //   if (!isConfirmed && isCancelled) return 'cancel'; // 취소된 경우
  //   return 'waiting'; // 기본 상태
  // };

  return (
    <div className={style.container}>
      {mockData.users.map((user) => (
        <div key={user.id} className={style.cardWrapper}>
          {/* <DriverCard
            user={user}
            type={getType(Boolean(user.isConfirmed), Boolean(user.isCancelled))}
          /> */}
          기사님 찾기
          <DriverCard user={user} />
          견적내역
          <DriverCard user={user} type='cost' />
          대기중인 내역
          <DriverCard user={user} type='waiting' />
          찜한 기사님
          <DriverCard user={user} type='dibs' />
          작성 가능한 리뷰
          <DriverCard user={user} type='review' />
        </div>
      ))}
      profile
      <DriverCard user={mockData.users[0]} type='profile' />
    </div>
  );
}
