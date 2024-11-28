import styles from './Profile.module.css';
import fullHeartMedium from '../../../assets/icons/ic_full_heart_medium.svg';
import yellowStarSmall from '../../../assets/icons/ic_yellow_star_small.svg';

type ProfileProps = {
  type?: string;
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
  };
};

export default function Profile({ type, user }: ProfileProps) {
  return (
    <div className={styles.profile}>
      <div className={styles.profileImage}>
        <img
          src={user.image}
          alt={`${user.name}'s profile`}
          className={styles.avatar}
        />
      </div>
      <div className={styles.info}>
        <div className='flexRow'>
          <p className={styles.name}>{user.name} 기사님</p>
          {user.likes !== undefined && (
            <span className={styles.likes}>
              <img src={fullHeartMedium} alt='fullHeart' /> {user.likes}
            </span>
          )}
        </div>
        {!type ? (
          <div className={styles.details}>
            {user.rating !== undefined && user.reviews !== undefined && (
              <>
                <span className={styles.stars}>
                  <img src={yellowStarSmall} alt='yellowStar' />
                  {user.rating.toFixed(1)}{' '}
                  <span style={{ color: 'var(--gray-300)' }}>
                    ({user.reviews})
                  </span>
                </span>
                <span className={styles.separator}>|</span>
              </>
            )}
            {user.rating !== undefined && user.reviews !== undefined && (
              <>
                <span className={styles.career}>
                  <span style={{ color: 'var(--gray-300)' }}>경력</span>{' '}
                  {user.experience}년
                </span>
                <span className={styles.separator}>|</span>
                <span className={styles.career}>
                  {user.confirmedCases}건{' '}
                  <span style={{ color: 'var(--gray-300)' }}>확정</span>{' '}
                </span>
              </>
            )}
          </div>
        ) : (
          <div> </div>
        )}
      </div>
    </div>
  );
}
