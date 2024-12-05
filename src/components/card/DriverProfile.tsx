import classNames from 'classnames';

import { useMedia } from '../../lib/function/useMediaQuery';
import { formatCurrency } from '../../lib/function/utils';
import { DriverProfileProps } from './type';

import style from './DriverProfile.module.css';

import fullHeartMedium from '../../assets/icons/ic_full_heart_medium.svg';
import emptyHeartMedium from '../../assets/icons/ic_empty_heart_medium.svg';
import yellowStarSmall from '../../assets/icons/ic_yellow_star_small.svg';

export default function DriverProfile({
  styles,
  type,
  user,
}: DriverProfileProps) {
  const isPc = useMedia().pc;
  return (
    <div
      className={classNames(style.profile, {
        [style.profilePType]: type === 'profile',
        [style.profileWType]: type === 'waiting' || type === 'confirm',
      })}
    >
      <div
        className={classNames(style.profileImage, {
          [style.profileImagePType]: type === 'profile' && !isPc,
        })}
      >
        <img
          src={user.profileImage}
          alt={`${user.nickname}'s profile`}
          className={style.avatar}
        />
      </div>
      <div className={style.info}>
        {type === 'profile' ? (
          <>
            <div className={style.details}>
              {user.reviewStats?.averageScore !== undefined &&
                user.reviewStats.totalReviews !== undefined && (
                  <span className={style.stars}>
                    <img src={yellowStarSmall} alt='yellowStar' />
                    {user.reviewStats.averageScore.toFixed(1)}
                    <span style={{ color: 'var(--gray-300)' }}>
                      ({user.reviewStats.totalReviews})
                    </span>
                  </span>
                )}
              <span className={style.separator}>|</span>
              <span className={style.text}>
                <span style={{ color: 'var(--gray-300)' }}>경력</span>
                {user.career}년
              </span>
              <span className={style.separator}>|</span>
              <span className={style.text}>
                {user.confirmationCount}건
                <span style={{ color: 'var(--gray-300)' }}>확정</span>
              </span>
            </div>
            <div className={style.detailsPType}>
              <span className={style.textPType}>
                <span className={style.movingLabel}>제공 서비스</span>
                {user.serviceType?.join(', ')}
              </span>
              <span
                className={classNames(style.separator, {
                  [style.separatorHidden]: !isPc,
                })}
              >
                |
              </span>
              <span className={style.textPType}>
                <span className={style.movingLabel}>지역</span>
                {user.serviceRegion?.join(', ')}
              </span>
            </div>
          </>
        ) : (
          // 기본 프로필
          <div className={style.name}>
            <span>{user.nickname} 기사님</span>
            {user.favoriteCount !== undefined && (
              <span className={style.favoriteCount}>
                <img
                  src={user.isLiked ? fullHeartMedium : emptyHeartMedium}
                  alt='fullHeart'
                />{' '}
                {user.favoriteCount}
              </span>
            )}
          </div>
        )}
        {/* 기본 프로필 */}
        {!(type === 'review' || type === 'profile') && (
          <div className={style.details}>
            {user.reviewStats?.averageScore !== undefined &&
              user.reviewStats.totalReviews !== undefined && (
                <>
                  <span className={style.stars}>
                    <img src={yellowStarSmall} alt='yellowStar' />
                    {user.reviewStats.averageScore.toFixed(1)}
                    <span style={{ color: 'var(--gray-300)' }}>
                      ({user.reviewStats.totalReviews})
                    </span>
                  </span>
                  <span className={style.separator}>|</span>
                </>
              )}
            {user.career !== undefined &&
              user.confirmationCount !== undefined && (
                <>
                  <span className={style.text}>
                    <span style={{ color: 'var(--gray-300)' }}>경력</span>
                    {user.career}년
                  </span>
                  <span className={style.separator}>|</span>
                  <span className={style.text}>
                    {user.confirmationCount}건
                    <span style={{ color: 'var(--gray-300)' }}>확정</span>
                  </span>
                </>
              )}
          </div>
        )}
        {/* review 타입, 이사일, 견적가 표시 */}
        {type === 'review' && (
          <div className={style.details}>
            {user.movingDate !== undefined && user.price !== undefined && (
              <>
                <span className={style.text}>
                  <span
                    className={classNames(
                      style.textLabel,
                      styles && style[styles],
                    )}
                  >
                    이사일
                  </span>
                  {user.movingDate}
                </span>
                <span className={style.separator}>|</span>
                <span className={style.text}>
                  <span
                    className={classNames(
                      style.textLabel,
                      styles && style[styles],
                    )}
                  >
                    견적가
                  </span>
                  {user.price && formatCurrency(user.price)}
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
