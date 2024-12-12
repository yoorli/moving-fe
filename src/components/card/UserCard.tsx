import classNames from 'classnames';

import UserProfile from './UserProfile';
import Button from '../btn/Button';
import Chip from '../chip/Chip';

import { useMedia } from '../../lib/function/useMediaQuery';
import { getNotificationDate, formatCurrency, getChips } from '../../lib/function/utils';
import { ChipType, UserProfileProps } from './type';

import style from './UserCard.module.css';

import writing from '../../assets/icons/ic_writing_medium.svg';

export default function UserCard({
  sendCostBtn: sendCost,
  rejectCostBtn: rejectCost,
  type,
  list,
  count = 6,
}: UserProfileProps) {
  const isPc = useMedia().pc;
  const chipList: ChipType[] = [];

  if (list.isConfirmed) chipList.push('CONFIRM');
  if (list.movingType) chipList.push(list.movingType);
  list.serviceType?.map((type) => chipList.push(type));
  if (list.isAssigned) chipList.push('ASSIGN');

  const chips = getChips(chipList, count);

  return (
    <div
      className={classNames(style.card, {
        [style.cardRType]: type === 'review',
      })}
    >
      <div className={style.top}>
        {/* 칩 */}
        <div className={style.labelBox}>
          {chips.map((row, rowIndex) => (
            <div key={rowIndex} className={style.label}>
              {row.map((chip, chipIndex) => (
                <Chip key={chipIndex} type={chip} />
              ))}
            </div>
          ))}
        </div>
        {type !== 'review' ? (
          <div className={style.createAt}>
            {list.createAt && getNotificationDate(list.createAt, 'noSec')}
          </div>
        ) : (
          <div className={style.createAtRType}>
            {list.createAt && getNotificationDate(list.createAt, 'noSec')}
          </div>
        )}
      </div>
      <UserProfile type={type} list={list} />
      {list.comment && <span>요청사항 : {list.comment}</span>}
      {type === 'receive' && (
        <div className={style.btnBox}>
          <Button
            text='견적 보내기'
            btnStyle='solid448pxBlue300'
            src={writing}
            onClick={sendCost}
          />
          {list.isAssigned && (
            <Button
              text='반려'
              btnStyle='outlined448pxBlue300'
              onClick={rejectCost}
            />
          )}
        </div>
      )}

      {type === 'confirmedCost' && (
        <div className={style.cost}>
          <span className={style.text}>견적 금액 </span>{' '}
          {list.price && formatCurrency(list.price)}
        </div>
      )}

      {type === 'review' && (
        <>
          <div className={style.review}>{list.content}</div>
          {!isPc && (
            <div className={style.createAtRTypeNoPc}>
              {list.createAt && getNotificationDate(list.createAt, 'noSec')}
            </div>
          )}
        </>
      )}
    </div>
  );
}
