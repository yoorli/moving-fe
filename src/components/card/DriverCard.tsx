import classNames from 'classnames';

import DriverProfile from './DriverProfile';
import Button from '../btn/Button';
import Chip from '../chip/Chip';

import { useMedia } from '../../lib/function/useMediaQuery';
import { formatCurrency } from '../../lib/function/utils';
import { DriverProfileProps } from './type';

import style from './DriverCard.module.css';

import writing from '../../assets/icons/ic_writing_medium.svg';
import writingGray from '../../assets/icons/ic_writing_gray.svg';

type ChipType = 'SMALL' | 'HOME' | 'COMPANY' | 'ASSIGN' | 'CONFIRM' | 'WAITING';

const chipText = (type: string): ChipType => {
  switch (type) {
    case '소형이사':
      return 'SMALL';
    case '가정이사':
      return 'HOME';
    case '사무실이사':
      return 'COMPANY';
    case '확정 견적':
      return 'CONFIRM';
    default:
      return 'WAITING';
  }
};

export default function DriverCard({
  editInfoBtn, //기본 정보 수정 버튼
  editProfileBtn, //기본 정보 내 프로필 수정
  confirmCostBtn, //견적 확정하기 버튼
  detailBtn, //상세보기 버튼
  reviewBtn, //리뷰 작성하기 버튼
  type,
  user,
}: DriverProfileProps) {
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
              onClick={editInfoBtn}
            />
            <Button
              text='내 프로필 수정'
              src={writing}
              btnStyle='solid280pxBlue300'
              onClick={editProfileBtn}
            />
          </div>
        </div>
      ) : (
        <div className={style.label}>
          {user.serviceType?.map((type, index) => (
            <Chip key={index} type={chipText(type)} />
          ))}
          {user.isAssigned && <Chip type='ASSIGN' />}
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
              onClick={confirmCostBtn}
            />
            <Button
              text='상세보기'
              btnStyle='outlined448pxBlue300'
              onClick={detailBtn}
            />
          </div>
        </div>
      )}
      {type === 'review' && (
        <div className={style.reviewBtn}>
          <Button
            text='리뷰 작성하기'
            btnStyle='solid640pxBlue300'
            onClick={reviewBtn}
          />
        </div>
      )}
    </div>
  );
}
