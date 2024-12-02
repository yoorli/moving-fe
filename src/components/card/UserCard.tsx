import UserProfile from './UserProfile';

import style from './DriverProfile.module.css';
import Button from '../btn/Button';

type ProfileType = 'receive' | 'review' | 'confirmedCost';

interface ProfileProps {
  type?: ProfileType;
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
    review?: string;
  };
}

export default function UserCard({ type, user }: ProfileProps) {
  return (
    <div className={style.card}>
      <div>{user.label}</div>
      <div>{user.createAt}</div>
      <UserProfile type={type} user={user} />
      {type === 'receive' && (
        <div>
          <Button text='기본 정보 수정' style='solid280pxBackground200' />
          <Button text='기본 정보 수정' style='solid280pxBackground200' />
        </div>
      )}
      {type === 'confirmedCost' && (
        <div>
          <span>견적 금액 </span> {user.cost}원
        </div>
      )}
      {type === 'review' && <div className={style.review}>{user.review}</div>}
    </div>
  );
}
