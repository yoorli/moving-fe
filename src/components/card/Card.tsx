import styles from './Card.module.css';
import Profile from './Profile';

type ProfileProps = {
  cType?: string;
  type?: string;
  size?: string;
  user: {
    label: string;
    called?: boolean;
    description: string;
    profileImage: string;
    nickname: string;
    rating?: number;
    reviews?: number;
    experience?: number;
    confirmedCases?: number;
    likes?: number;
    movingDate?: string;
    cost?: number;
    serviceRegion?: string[];
  };
};

export default function Card({ cType, type, size, user }: ProfileProps) {
  const imgWidth = size === 'medium' || size === 'large';
  return (
    <div className={styles.card}>
      <div className={styles.label}>
        {user.label}
        {user.called ? ' 지정견적요청' : ''}
      </div>
      <span
        className={styles.content}
        style={{
          fontSize: !imgWidth ? '14px' : '24px',
        }}
      >
        {user.description}
      </span>
      <Profile user={user} type={type} size={size} />
      {cType === 'cost' && (
        <div className={styles.cost}>
          <span className={styles.text}>견적 금액</span>
          {user.cost}원
        </div>
      )}
    </div>
  );
}
