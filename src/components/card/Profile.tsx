import styles from './Profile.module.css';
import fullHeartMedium from '../../assets/icons/ic_full_heart_medium.svg';
import yellowStarSmall from '../../assets/icons/ic_yellow_star_small.svg';

type ProfileProps = {
  type?: string;
  size?: string;
  user: {
    name: string;
    image: string;
    rating?: number;
    reviews?: number;
    experience?: number;
    confirmedCases?: number;
    likes?: number;
    movingDate?: string;
    cost?: number;
    district?: string[];
  };
};

export default function Profile({ type, size, user }: ProfileProps) {
  const imgWidth = size === 'medium' || size === 'large';
  return (
    <div className={styles.profile}>
      <div
        className={styles.profileImage}
        style={{
          width: !imgWidth ? '54px' : size === 'medium' ? '64px' : '120px',
          height: !imgWidth ? '50px' : size === 'medium' ? '60px' : '100px'
        }}
      >
        <img
          src={user.image}
          alt={`${user.name}'s profile`}
          className={styles.avatar}
          style={{
            width: size === 'large' ? '108px' : '70px',
            height: size === 'large' ? '100px' : '65px'
          }}
        />
      </div>
      <div
        className={styles.info}
        style={{
          height: !imgWidth ? '58px' : size === 'medium' ? '60px' : '80px',
        }}
      >
        <div
          className={styles.name}
          style={{
            fontSize: !imgWidth ? '14px' : size === 'medium' ? '18px' : '24px',
          }}
        >
          <span>{user.name} 기사님</span>
          {user.likes !== undefined && (
            <span className={styles.likes}>
              <img src={fullHeartMedium} alt='fullHeart' /> {user.likes}
            </span>
          )}
        </div>
        {/* 기본 프로필 */}
        {!type && (
          <div
            className={styles.details}
            style={{ fontSize: !imgWidth ? '13px' : '16px' }}
          >
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
                  {user.cost}건
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
