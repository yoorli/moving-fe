import DriverProfile from './DriverProfile';

import styles from './DriverCard.module.css';

type ProfileProps = {
  cType?: string;
  type?: string;
  size?: string;
  user: {
    label?: string;
    called?: boolean;
    profileImage: string;
    nickname: string;
    description?: string;
    rating?: number;
    reviews?: number;
    experience?: number;
    confirmedCases?: number;
    likes?: number;
    movingDate?: string;
    start?: string;
    end?: string;
    cost?: number;
    service?: string[];
    serviceRegion?: string[];
  };
};

export default function Card({ cType, type, user }: ProfileProps) {
  // const isPc = useMediaQuery({ query: '(min-width: 1200px)' });
  return (
    // 기본 - 기사님 찾기
    <div className={styles.card}>
      {cType === 'profile' ? (
        <>
          {user.nickname}
          <span className={styles.content}>{user.description}</span>
        </>
      ) : (
        <div className={styles.label}>
          {user.label}
          {user.called ? ' 지정견적요청' : ''}
        </div>
      )}
      {(cType === 'cost' || cType === undefined) && (
        <>
          <span className={styles.content}>{user.description}</span>
        </>
      )}
      <DriverProfile user={user} type={type} />
      {cType === 'cost' && (
        <div className={styles.cost}>
          <span className={styles.text}>견적 금액</span>
          {user.cost}원
        </div>
      )}
      {cType === 'waiting' && (
        <div className={styles.detailInfo}>
          <div className={styles.schedule}>
            <span className={styles.movingInfo}>
              <span className={styles.movingLabel}>이사일</span>{' '}
              {user.movingDate}
            </span>
            <span className={styles.separator}>|</span>
            <span className={styles.movingInfo}>
              <span className={styles.movingLabel}>출발</span> {user.start}
            </span>
            <span className={styles.separator}>|</span>
            <span className={styles.movingInfo}>
              <span className={styles.movingLabel}>도착</span> {user.end}
            </span>
          </div>
          <div className={styles.cost}>
            <span className={styles.text}>견적 금액</span>
            {user.cost}원
          </div>
        </div>
      )}
    </div>
  );
}
