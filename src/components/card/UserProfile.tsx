import classNames from 'classnames';

import { formatCurrency } from '../../lib/function/utils';
import { useMedia } from '../../lib/function/useMediaQuery';
import { UserProfileProps } from '../../types/cardTypes';

import style from './UserProfile.module.css';

import fullStarsMedium from '../../assets/icons/ic_full_star_medium.svg';
import emptyStarMedium from '../../assets/icons/ic_empty_star_medium.svg';

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
  if (rating <= 4) {
    for (let i = 1; i <= 5 - rating; i++) {
      stars.push(<img src={emptyStarMedium} alt='empty star' />);
    }
  }
  return stars;
}

export default function UserProfile({ type, list: user }: UserProfileProps) {
  const isPc = useMedia().pc;
  const isMobile = useMedia().mobile;
  return (
    <>
      {type !== 'review' ? (
        <div
          className={classNames(style.profile, {
            [style.profilePadding]: type !== 'confirmedCost' && isPc,
          })}
        >
          <div className={style.userInfo}>{user.customerName} 고객님</div>
          <div
            className={
              type === 'modal' || isMobile ? style.hidden : style.separator
            }
          ></div>
          <div
            className={classNames(style.movingInfo, {
              [style.movingInfoMType]: type == 'modal',
            })}
          >
            <span className={style.text}>
              <span className={style.movingLabel}>이사일</span>
              {user.movingDate}
            </span>
            <span
              className={
                type === 'modal'
                  ? style.hidden
                  : !isMobile
                    ? style.separatorHorizon
                    : style.separator
              }
            ></span>
            <span className={style.text}>
              <span className={style.movingLabel}>출발</span>
              {user.departure}
            </span>
            <span className={style.separatorHorizon}></span>
            <span className={style.text}>
              <span className={style.movingLabel}>도착</span>
              {user.arrival}
            </span>
          </div>
        </div>
      ) : (
        <div className={style.reviewProfile}>
          <div className={style.profileImage}>
            <img
              src={user.profileImg}
              alt={`${user.moverName}'s profile`}
              className={style.avatar}
            />
          </div>
          <div className={style.driverInfo}>
            <div className={style.driverName}>{user.moverName} 기사님</div>
            <div className={style.movingInfoRType}>
              <span className={style.movingLabelRType}>이사일</span>
              {user.movingDate}
              <span className={style.separatorHorizon}></span>
              <span className={style.movingLabelRType}>견적가</span>
              {user.price && formatCurrency(user.price)}
            </div>
            <div className={style.stars}>
              {user.reviewStats?.averageScore &&
                getStars(user.reviewStats.averageScore)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
