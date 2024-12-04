import classNames from 'classnames';

import DriverProfile from './DriverProfile';
import Button from '../btn/Button';

import { useMedia } from '../../lib/function/useMediaQuery';
import { formatCurrency } from '../../lib/function/utils';

import style from './DriverCard.module.css';

import writing from '../../assets/icons/ic_writing_medium.svg';
import writingGray from '../../assets/icons/ic_writing_gray.svg';

type ProfileType = 'profile' | 'cost' | 'waiting' | 'dibs' | 'review';

interface ProfileProps {
  type?: ProfileType;
  user: {
    id: number; // 기사 아이디
    serviceType?: string[]; // 서비스 유형
    isAssigned?: boolean; // 지정경적 여부
    profileImage: string; // 프로필 이미지
    nickname: string; // 기사 닉네임
    career?: number; // 경력
    summary?: string; // 한 줄 소개
    serviceRegion?: string[]; // 서비스 지역
    comment?: string; //요구사항
    reviewStats?: {
      averageScore?: number; // 평점
      totalReviews?: number; // 리뷰 갯수
    };
    favoriteCount?: number; // 찜 갯수
    confirmationCount?: number; // 확정 건 수
    movingDate?: string; // 이사 날짜
    departure?: string; // 출발지
    arrival?: string; // 도착지
    isLiked?: boolean; // 찜 여부
    price?: number; //견적가
  };
}

export default function DriverCard({ type, user }: ProfileProps) {
  const isPc = useMedia().pc;
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
            <div className={style.contentPType}>{user.summary}</div>
          </div>
          <div className={style.buttonBoxPType}>
            <Button
              text='기본 정보 수정'
              src={writingGray}
              btnStyle='solid280pxBackground200'
              onClick={() => {
                console.log('onClick 성공');
              }}
            />
            <Button
              text='내 프로필 수정'
              src={writing}
              btnStyle='solid280pxBlue300'
              onClick={() => {
                console.log('onClick 성공');
              }}
            />
          </div>
        </div>
      ) : (
        <div className={style.label}>
          {user.serviceType}
          {user.isAssigned ? ' 지정견적요청' : ''}
        </div>
      )}
      {(type === 'cost' || type === undefined) && (
        <>
          <span className={style.content}>{user.summary}</span>
        </>
      )}
      <DriverProfile user={user} type={type} />
      {type === 'cost' && (
        <div className={style.cost}>
          <span className={style.text}>견적 금액</span>
          {user.price && formatCurrency(user.price)}
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
              <span className={style.movingLabel}>출발</span> {user.departure}
            </span>
            <span className={style.separator}>|</span>
            <span className={style.movingInfo}>
              <span className={style.movingLabel}>도착</span> {user.arrival}
            </span>
          </div>
          <div className={style.cost}>
            <span className={style.text}>견적 금액</span>
            {user.price && formatCurrency(user.price)}
          </div>
          <div className={style.costBtn}>
            <Button
              text='견적 확정하기'
              btnStyle='solid448pxBlue300'
              onClick={() => {
                console.log('onClick 성공');
              }}
            />
            <Button
              text='상세보기'
              btnStyle='outlined448pxBlue300'
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
            btnStyle='solid640pxBlue300'
            onClick={() => {
              console.log('onClick 성공');
            }}
          />
        </div>
      )}
    </div>
  );
}
