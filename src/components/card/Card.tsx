import styles from './Card.module.css';
import Profile from './Profile';

type ProfileProps = {
  type?: string;
  size? : string;
  user: {
    label : string;
    called? : boolean;
    content : string;
    image: string;
    name: string;
    rating?: number;
    reviews?: number;
    experience?: number;
    confirmedCases?: number;
    likes?: number;
    movingDate?: string,
    cost?: number,
    district?: string[],
  };
};

export default function Card({ type, size, user }: ProfileProps) {
  return (
    <div className={styles.card}>
      {user.label}
      {user.called}
      {user.content}
      <Profile user={user} type={type} size={size}/>
    </div>
  );
}
