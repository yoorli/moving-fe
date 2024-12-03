import UserProfile from './UserProfile';

import style from './UserCard.module.css';
import Button from '../btn/Button';
import classNames from 'classnames';

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
          <div className={style.createAt}>작성일 {user.createAt}</div>
        ) : (
          <div className={style.createTime}>{user.createAt}</div>
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
