import React from 'react';
import classNames from 'classnames';

import DriverProfile from './DriverProfile';
import Button from '../btn/Button';
import Chip from '../chip/Chip';

import { useMedia } from '../../lib/function/useMediaQuery';
import { formatCurrency, getChips } from '../../lib/function/utils';
import { ChipType, DriverProfileProps } from '../../types/cardTypes';

import style from './DriverCard.module.css';

import writing from '../../assets/icons/ic_writing_medium.svg';
import writingGray from '../../assets/icons/ic_writing_gray.svg';

export default function DriverCard({
  editInfoBtn, // 기본 정보 수정 버튼
  editProfileBtn, // 기본 정보 내 프로필 수정
  confirmCostBtn, // 견적 확정하기 버튼
  detailBtn, // 상세보기 버튼
  reviewBtn, // 리뷰 작성하기 버튼
  costListBtn, // 견적 목록하기 버튼
  onClick, // onClick prop 추가
  type,
  styles,
  list,
  count = 6,
  showPrice = true, // 가격이 표시되지 않는 카드 조건을 위해 (견적 상세페이지)
}: DriverProfileProps & {
  onClick?: () => void;
  showPrice?: boolean;
}) {
  const isPc = useMedia().pc;
  const chipList: ChipType[] = [];

  if (list.isConfirmed) chipList.push('CONFIRM');
  list.serviceType?.map((type) => chipList.push(type));
  if (list.isAssigned) chipList.push('ASSIGN');

  const chips = getChips(chipList, count);

  return (
    <div
      className={classNames(style.card, {
        [style.cardPType]: type === 'profile',
        [style.cardCDType]: type === 'cost' || type === 'dibs',
        [style.cardPRType]: type === 'review',
        [style.cardPSmall]: styles === 'small',
      })}
      onClick={onClick} // 최상단 div에 onClick 이벤트 추가
    >
      {type === 'profile' ? (
        <div className={style.topPType}>
          {!isPc && (
            <div className={style.profileImage}>
              <img
                src={list.profileImg}
                alt={`${list.moverName}'s profile`}
                className={style.avatar}
              />
            </div>
          )}
          <div className={style.namePType}>
            {list.moverName}
            <div className={style.contentPType}>{list.summary}</div>
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
        // 칩
        <div className={style.chipBox}>
          {chips.map((row, rowIndex) => (
            <div key={rowIndex} className={style.chip}>
              {row.map((chip, chipIndex) => (
                <Chip
                  key={chipIndex}
                  type={chip}
                  size={type === 'dibs' ? 'favorite' : 'noFavorite'}
                />
              ))}
            </div>
          ))}
        </div>
      )}
      {(type === 'cost' || type === undefined || type === 'dibs') && (
        <>
          <span
            className={classNames(style.content, {
              [style.contentSmall]: styles === 'small',
              [style.contentCType]: type === 'cost',
            })}
          >
            {list.summary}
          </span>
        </>
      )}
      {type === 'notConfirm' ? (
        <span className={style.noProfile}>미확정 견적</span>
      ) : type === 'cancel' ? (
        <span className={style.noProfile}>취소된 견적</span>
      ) : (
        <DriverProfile list={list} type={type} styles={styles} />
      )}
      {type === 'cost' && showPrice && list.price && (
        <div className={style.cost}>
          <span className={style.text}>견적 금액</span>
          {formatCurrency(list.price)}
        </div>
      )}

      {(type === 'waiting' ||
        type === 'confirm' ||
        type === 'notConfirm' ||
        type === 'cancel') && (
        <div className={style.detailInfo}>
          <div className={style.schedule}>
            <span
              className={classNames(style.movingInfo, {
                [style.movingInfoNoPc]: !isPc,
              })}
            >
              <span className={style.movingLabel}>이사일</span>{' '}
              {list.movingDate}
            </span>
            <span
              className={classNames(style.separator, {
                [style.separatorHidden]: !isPc,
              })}
            >
              |
            </span>
            <span className={style.movingInfo}>
              <span className={style.movingLabel}>출발</span> {list.departure}
            </span>
            <span className={style.separator}>|</span>
            <span className={style.movingInfo}>
              <span className={style.movingLabel}>도착</span> {list.arrival}
            </span>
          </div>
          <div className={style.cost}>
            <span className={style.text}>견적 금액</span>
            {type === 'notConfirm'
              ? '미확정'
              : type === 'cancel'
                ? '취소'
                : list.price && formatCurrency(list.price)}
          </div>
          <div className={style.costBtn}>
            {type === 'waiting' && (
              <>
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
              </>
            )}
            {type !== 'waiting' && (
              <Button
                text='견적 목록보기'
                btnStyle='solid448pxBlue300'
                onClick={costListBtn}
              />
            )}
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
