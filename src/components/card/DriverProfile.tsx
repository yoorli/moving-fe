import classNames from 'classnames';

import { useIsPc } from '../../lib/function/useMediaQuery';

import styles from './DriverProfile.module.css';

import fullHeartMedium from '../../assets/icons/ic_full_heart_medium.svg';
import yellowStarSmall from '../../assets/icons/ic_yellow_star_small.svg';

type ProfileProps = {
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
    movingDate?: string;
    start?: string;
    end?: string;
    cost?: number;
    service?: string[];
    serviceRegion?: string[];
  };
};

export default function DriverProfile({ type, user }: ProfileProps) {
  const isPc = useIsPc();
  return (
    <div
      className={classNames(styles.profile, {
        [styles.profilePType]: type === 'profile',
      })}
    >
      <div
        className={classNames(styles.profileImage, {
          [styles.profileImagePType]: type === 'profile' && !isPc,
        })}
      >
        <img
          src={user.profileImage}
          alt={`${user.nickname}'s profile`}
          className={styles.avatar}
        />
      </div>
      <div className={styles.info}>
        {type === 'profile' ? (
          <>
            <div className={styles.details}>
              {user.rating !== undefined && user.reviews !== undefined && (
                <span className={styles.stars}>
                  <img src={yellowStarSmall} alt='yellowStar' />
                  {user.rating.toFixed(1)}
                  <span style={{ color: 'var(--gray-300)' }}>
                    ({user.reviews})
                  </span>
                </span>
              )}
              <span className={styles.separator}>|</span>
              <span className={styles.text}>
                <span style={{ color: 'var(--gray-300)' }}>경력</span>
                {user.experience}년
              </span>
              <span className={styles.separator}>|</span>
              <span className={styles.text}>
                {user.confirmedCases}건
                <span style={{ color: 'var(--gray-300)' }}>확정</span>
              </span>
            </div>
            <div className={styles.detailsPType}>
              <span className={styles.textPType}>
                <span className={styles.movingLabel}>제공 서비스</span>
                {user.service?.join(', ')}
              </span>
              <span
                className={classNames(styles.separator, {
                  [styles.separatorHidden]: !isPc,
                })}
              >
                |
              </span>
              <span className={styles.textPType}>
                <span className={styles.movingLabel}>지역</span>
                {user.serviceRegion?.join(', ')}
              </span>
            </div>
          </>
        ) : (
          // 기본 프로필
          <div className={styles.name}>
            <span>{user.nickname} 기사님</span>
            {user.likes !== undefined && (
              <span className={styles.likes}>
                <img src={fullHeartMedium} alt='fullHeart' /> {user.likes}
              </span>
            )}
          </div>
        )}
        {/* 기본 프로필 */}
        {!(type === 'review' || type === 'profile') && (
          <div className={styles.details}>
            {user.rating !== undefined && user.reviews !== undefined && (
              <>
                <span className={styles.stars}>
                  <img src={yellowStarSmall} alt='yellowStar' />
                  {user.rating.toFixed(1)}
                  <span style={{ color: 'var(--gray-300)' }}>
                    ({user.reviews})
                  </span>
                </span>
                <span className={styles.separator}>|</span>
              </>
            )}
            {user.experience !== undefined &&
              user.confirmedCases !== undefined && (
                <>
                  <span className={styles.text}>
                    <span style={{ color: 'var(--gray-300)' }}>경력</span>
                    {user.experience}년
                  </span>
                  <span className={styles.separator}>|</span>
                  <span className={styles.text}>
                    {user.confirmedCases}건
                    <span style={{ color: 'var(--gray-300)' }}>확정</span>
                  </span>
                </>
              )}
          </div>
        )}
        {/* review 타입, 이사일, 견적가 표시 */}
        {type === 'review' && (
          <div className={styles.details}>
            {user.movingDate !== undefined && user.cost !== undefined && (
              <>
                <span className={styles.text}>
                  <span style={{ color: 'var(--gray-300)' }}>이사일</span>
                  {user.movingDate}
                </span>
                <span className={styles.separator}>|</span>
                <span className={styles.text}>
                  <span style={{ color: 'var(--gray-300)' }}>견적가</span>
                  {user.cost}원
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
