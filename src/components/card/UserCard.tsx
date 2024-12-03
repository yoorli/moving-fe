import classNames from 'classnames';

import UserProfile from './UserProfile';
import Button from '../btn/Button';

import style from './UserCard.module.css';

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

export function getDate(inputDate: string | Date) {
  const now = new Date();
  const date = new Date(inputDate);
  const difference = now.getTime() - date.getTime();
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (difference < 24 * 60 * 60 * 1000) {
    if (hours > 0) return `${hours}시간 전`;
    if (minutes > 0) return `${minutes}분 전`;
    return `${seconds}초 전`;
  } else {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `작성일 ${year}. ${month}. ${day}`;
  }
}

export default function UserCard({ type, user }: ProfileProps) {
  return (
    <div
      className={classNames(style.card, {
        [style.cardRType]: type === 'review',
      })}
    >
      <div className={style.top}>
        <div>
          <div>{user.label}</div>
          <div>{user.called}</div>
        </div>
        {type === 'review' ? (
          <div className={style.createAt}>
            {user.createAt && getDate(user.createAt)}
          </div>
        ) : (
          <div className={style.createTime}>
            {user.createAt && getDate(user.createAt)}
          </div>
        )}
      </div>
      <UserProfile type={type} user={user} />
      {type === 'receive' && (
        <div className={style.btnBox}>
          <Button text='견적 보내기' style='solid448pxBlue300' />
          <Button text='반려' style='outlined448pxBlue300' />
        </div>
      )}
      {type === 'confirmedCost' && (
        <div className={style.cost}>
          <span className={style.text}>견적 금액 </span> {user.cost}원
        </div>
      )}
      {type === 'review' && <div className={style.review}>{user.review}</div>}
    </div>
  );
}
