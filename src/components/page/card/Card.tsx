import styles from './Card.module.css';
import Profile from './Profile';

type ProfileProps = {
  type?: string;
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
    cost?: number
  };
};

export default function Card({ type, user }: ProfileProps) {
  return (
    <div className={styles.card}>
      {user.label}
      {user.called}
      {user.content}
      <Profile user={user} type={type}/>
    </div>
  );
}
