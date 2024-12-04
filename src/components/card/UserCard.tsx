import classNames from 'classnames';

import UserProfile from './UserProfile';
import Button from '../btn/Button';

import { getDate, formatCurrency } from '../../lib/function/utils';

import style from './UserCard.module.css';
import { useMedia } from '../../lib/function/useMediaQuery';

import writing from '../../assets/icons/ic_writing_medium.svg';

type ProfileType = 'receive' | 'review' | 'confirmedCost';

interface ProfileProps {
  type?: ProfileType;
  user: {
    movingType?: string[]; // 이사 서비스 유형
    isAssigned?: boolean;// 지정견적 여부
    customer?: string;// 고객 이름
    moverName?: string; //기사 닉네임
    movingDate?: string;// 이사 날짜
    departure?: string;// 출발지
    arrival?: string;// 도착지
    price?: number;// 견적가
    createAt?: string;// 작성일
    profileImg?: string;// 기사 프로필 이미지
    reviewStats?: {
      averageScore: number;// 평점
    };
    content?: string;// 리뷰 내용
  };
}

export default function UserCard({ type, user }: ProfileProps) {
  const isPc = useMedia().pc;
  return (
    <div
      className={classNames(style.card, {
        [style.cardRType]: type === 'review',
      })}
    >
      <div className={style.top}>
        <div>
          <div>{user.movingType}</div>
          <div>{user.isAssigned}</div>
        </div>
        {type !== 'review' ? (
          <div className={style.createAt}>
            {user.createAt && getDate(user.createAt)}
          </div>
        ) : (
          <div className={style.createAtRType}>
            {user.createAt && getDate(user.createAt)}
          </div>
        )}
      </div>
      <UserProfile type={type} user={user} />
      {type === 'receive' && (
        <div className={style.btnBox}>
          <Button
            text='견적 보내기'
            btnStyle='solid448pxBlue300'
            src={writing}
          />
          <Button text='반려' btnStyle='outlined448pxBlue300' />
        </div>
      )}

      {type === 'confirmedCost' && (
        <div className={style.cost}>
          <span className={style.text}>견적 금액 </span>{' '}
          {user.price && formatCurrency(user.price)}
        </div>
      )}

      {type === 'review' && (
        <>
          <div className={style.review}>{user.content}</div>
          {!isPc && (
            <div className={style.createAtRTypeNoPc}>
              {user.createAt && getDate(user.createAt)}
            </div>
          )}
        </>
      )}
    </div>
  );
}