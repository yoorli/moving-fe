import classNames from 'classnames';
import style from './UserProfile.module.css';

interface ProfileProps {
  type?: string;
  user: {
    label?: string[];
    called?: boolean;
    name: string;
    movingDate?: string;
    start?: string;
    end?: string;
    createAt?: string;
    description?: string;
    profileImage?: string;
    rating?: number;
    reviews?: number;
    experience?: number;
    confirmedCases?: number;
    likes?: number;
    cost?: number;
    service?: string[];
    serviceRegion?: string[];
  };
}

export default function UserProfile({ type, user }: ProfileProps) {
  return (
    <>
      {type !== 'review' ? (
        <div
          className={classNames(style.profile, {
            [style.profileNoPadding]: type === 'confirmedCost',
          })}
        >
          <div className={style.userInfo}>{user.name} 고객님</div>
          <div className={style.separator}></div>
          <div className={style.movingInfo}>
            <span className={style.movingLabel}>이사일</span>
            {user.movingDate}
            <span className={style.separatorHorizon}></span>
            <span className={style.movingLabel}>출발</span>
            {user.start}
            <span className={style.separatorHorizon}></span>
            <span className={style.movingLabel}>도착</span>
            {user.end}
          </div>
        </div>
      ) : (
        <div className={style.reviewProfile}>
          <div className={style.profileImage}>
            <img
              src={user.profileImage}
              alt={`${user.name}'s profile`}
              className={style.avatar}
            />
          </div>
          <div className={style.driverInfo}>
            <div className={style.driverName}>{user.name} 기사님</div>
            <div className={style.movingInfoRType}>
              <span className={style.movingLabelRType}>이사일</span>
              {user.movingDate}
              <span className={style.separatorHorizon}></span>
              <span className={style.movingLabelRType}>견적가</span>
            </div>
            <div className={style.stars}>{user.rating}</div>
          </div>
        </div>
      )}
    </>
  );
}
