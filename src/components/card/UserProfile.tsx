import classNames from 'classnames';

import { formatCurrency } from '../../lib/function/utils';

import style from './UserProfile.module.css';

import fullStarsMedium from '../../assets/icons/ic_full_star_medium.svg';
import emptyStarMedium from '../../assets/icons/ic_empty_star_medium.svg';

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

export function getStars(rating: number) {
  const stars = [];
  const remainder = Number((rating % 1).toFixed(1));

  for (let i = 1; i <= rating; i++) {
    stars.push(<img key={i} src={fullStarsMedium} alt='star' />);
  }
  if (remainder > 0) {
    stars.push(
      <div style={{ position: 'relative', width: '24px', height: '24px' }}>
        <img
          src={emptyStarMedium}
          alt='empty star'
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${remainder * 100}%`,
            height: '100%',
            backgroundImage: `url(${fullStarsMedium})`,
            backgroundSize: 'cover',
            WebkitMaskImage: `url(${fullStarsMedium})`,
            maskImage: `url(${fullStarsMedium})`,
          }}
        />
      </div>,
    );
  }
  if (rating < 4) {
    for (let i = 1; i <= 5 - rating; i++) {
      stars.push(<img src={emptyStarMedium} alt='empty star' />);
    }
  }
  return stars;
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
              {user.cost && formatCurrency(user.cost)}
            </div>
            <div className={style.stars}>
              {user.rating && getStars(user.rating)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
