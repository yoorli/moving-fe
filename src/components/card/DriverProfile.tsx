import classNames from 'classnames';

import { useMedia } from '../../lib/function/useMediaQuery';
import { formatCurrency } from '../../lib/function/utils';

import style from './DriverProfile.module.css';

import fullHeartMedium from '../../assets/icons/ic_full_heart_medium.svg';
import emptyHeartMedium from '../../assets/icons/ic_empty_heart_medium.svg';
import yellowStarSmall from '../../assets/icons/ic_yellow_star_small.svg';

interface ProfileProps {
  type?: string;
  user: {
    label?: string[];
    called?: boolean;
    description?: string;
    profileImage: string;
    nickname: string;
    rating?: number;
    reviews?: number;
    experience?: number;
    confirmedCases?: number;
    likes?: number;
    isLiked?: boolean;
    movingDate?: string;
    start?: string;
    end?: string;
    cost?: number;
    service?: string[];
    serviceRegion?: string[];
  };
};

export default function DriverProfile({ type, user }: ProfileProps) {
  const isPc = useMedia().pc;
  return (
    <div
      className={classNames(style.profile, {
        [style.profilePType]: type === 'profile',
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
              {user.rating !== undefined && user.reviews !== undefined && (
                <span className={style.stars}>
                  <img src={yellowStarSmall} alt='yellowStar' />
                  {user.rating.toFixed(1)}
                  <span style={{ color: 'var(--gray-300)' }}>
                    ({user.reviews})
                  </span>
                </span>
              )}
              <span className={style.separator}>|</span>
              <span className={style.text}>
                <span style={{ color: 'var(--gray-300)' }}>경력</span>
                {user.experience}년
              </span>
              <span className={style.separator}>|</span>
              <span className={style.text}>
                {user.confirmedCases}건
                <span style={{ color: 'var(--gray-300)' }}>확정</span>
              </span>
            </div>
            <div className={style.detailsPType}>
              <span className={style.textPType}>
                <span className={style.movingLabel}>제공 서비스</span>
                {user.service?.join(', ')}
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
            {user.likes !== undefined && (
              <span className={style.likes}>
                <img src={user.isLiked ? fullHeartMedium : emptyHeartMedium} alt='fullHeart' /> {user.likes}
              </span>
            )}
          </div>
        )}
        {/* 기본 프로필 */}
        {!(type === 'review' || type === 'profile') && (
          <div className={style.details}>
            {user.rating !== undefined && user.reviews !== undefined && (
              <>
                <span className={style.stars}>
                  <img src={yellowStarSmall} alt='yellowStar' />
                  {user.rating.toFixed(1)}
                  <span style={{ color: 'var(--gray-300)' }}>
                    ({user.reviews})
                  </span>
                </span>
                <span className={style.separator}>|</span>
              </>
            )}
            {user.experience !== undefined &&
              user.confirmedCases !== undefined && (
                <>
                  <span className={style.text}>
                    <span style={{ color: 'var(--gray-300)' }}>경력</span>
                    {user.experience}년
                  </span>
                  <span className={style.separator}>|</span>
                  <span className={style.text}>
                    {user.confirmedCases}건
                    <span style={{ color: 'var(--gray-300)' }}>확정</span>
                  </span>
                </>
              )}
          </div>
        )}
        {/* review 타입, 이사일, 견적가 표시 */}
        {type === 'review' && (
          <div className={style.details}>
            {user.movingDate !== undefined && user.cost !== undefined && (
              <>
                <span className={style.text}>
                  <span style={{ color: 'var(--gray-300)' }}>이사일</span>
                  {user.movingDate}
                </span>
                <span className={style.separator}>|</span>
                <span className={style.text}>
                  <span style={{ color: 'var(--gray-300)' }}>견적가</span>
                  {user.cost && formatCurrency(user.cost)}
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
