import classNames from 'classnames';

import { useIsPc } from '../../lib/function/useMediaQuery';

import DriverProfile from './DriverProfile';
import Button from '../btn/Button';

import style from './DriverCard.module.css';

import writing from '../../assets/icons/ic_writing_medium.svg';
import writingGray from '../../assets/icons/ic_writing_gray.svg';

type ProfileType = 'profile' | 'cost' | 'waiting' | 'dibs' | 'review';

type ProfileProps = {
  type?: ProfileType;
  user: {
    label?: string[];
    called?: boolean;
    profileImage: string;
    nickname: string;
    description?: string;
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

export default function DriverCard( { type, user }: ProfileProps) {
  const isPc = useIsPc();
  return (
    <div
      className={classNames(style.card, {
        [style.cardPType]: type === 'profile',
      })}
    >
      {type === 'profile' ? (
        <div className={style.topPType}>
          {!isPc && (
            <div className={style.profileImage}>
              <img
                src={user.profileImage}
                alt={`${user.nickname}'s profile`}
                className={style.avatar}
              />
            </div>
          )}
          <div className={style.namePType}>
            {user.nickname}
            <div className={style.contentPType}>{user.description}</div>
          </div>
          <div className={style.buttonBoxPType}>
            <Button
              text='기본 정보 수정'
              src={writingGray}
              style='solid280pxBackground200'
              onClick={() => {
                console.log('onClick 성공');
              }}
            />
            <Button
              text='내 프로필 수정'
              src={writing}
              style='solid280pxBlue300'
              onClick={() => {
                console.log('onClick 성공');
              }}
            />
          </div>
        </div>
      ) : (
        <div className={style.label}>
          {user.label}
          {user.called ? ' 지정견적요청' : ''}
        </div>
      )}
      {(type === 'cost' || type === undefined) && (
        <>
          <span className={style.content}>{user.description}</span>
        </>
      )}
      <DriverProfile user={user} type={type} />
      {type === 'cost' && (
        <div className={style.cost}>
          <span className={style.text}>견적 금액</span>
          {user.cost}원
        </div>
      )}
      {type === 'waiting' && (
        <div className={style.detailInfo}>
          <div className={style.schedule}>
            <span
              className={classNames(style.movingInfo, {
                [style.movingInfoNoPc]: !isPc,
              })}
            >
              <span className={style.movingLabel}>이사일</span>{' '}
              {user.movingDate}
            </span>
            <span
              className={classNames(style.separator, {
                [style.separatorHidden]: !isPc,
              })}
            >
              |
            </span>
            <span className={style.movingInfo}>
              <span className={style.movingLabel}>출발</span> {user.start}
            </span>
            <span className={style.separator}>|</span>
            <span className={style.movingInfo}>
              <span className={style.movingLabel}>도착</span> {user.end}
            </span>
          </div>
          <div className={style.cost}>
            <span className={style.text}>견적 금액</span>
            {user.cost}원
          </div>
          <div className={style.costBtn}>
            <Button
              text='견적 확정하기'
              style='solid448pxBlue300'
              onClick={() => {
                console.log('onClick 성공');
              }}
            />
            <Button
              text='상세보기'
              style='outlined448pxBlue300'
              onClick={() => {
                console.log('onClick 성공');
              }}
            />
          </div>
        </div>
      )}
      {type === 'review' && (
        <div className={style.reviewBtn}>
          <Button
            text='리뷰 작성하기'
            style='solid640pxBlue300'
            onClick={() => {
              console.log('onClick 성공');
            }}
          />
        </div>
      )}
    </div>
  );
}
