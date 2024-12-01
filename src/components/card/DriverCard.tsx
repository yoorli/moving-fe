// import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';

import DriverProfile from './DriverProfile';
import Button from '../btn/Button';

import styles from './DriverCard.module.css';

import writing from '../../assets/icons/ic_writing_medium.svg'
import writingGray from '../../assets/icons/ic_writing_gray.svg'

type ProfileProps = {
  type?: string;
  size?: string;
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

export default function Card({ type, user }: ProfileProps) {
  // const isPc = useMediaQuery({ query: '(min-width: 1200px)' });
  return (
    // 기본 - 기사님 찾기
    <div className={classNames(styles.card, { [styles.cardPType]: type === 'profile' })}>
      {type === 'profile' ? (
        <div className={styles.topPType}>
          <div className={styles.namePType}>
            {user.nickname}
            <div className={styles.contentPType}>{user.description}</div>
          </div>
          <div className={styles.buttonBoxPType}>
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
        <div className={styles.label}>
          {user.label}
          {user.called ? ' 지정견적요청' : ''}
        </div>
      )}
      {(type === 'cost' || type === undefined) && (
        <>
          <span className={styles.content}>{user.description}</span>
        </>
      )}
      <DriverProfile user={user} type={type} />
      {type === 'cost' && (
        <div className={styles.cost}>
          <span className={styles.text}>견적 금액</span>
          {user.cost}원
        </div>
      )}
      {type === 'waiting' && (
        <div className={styles.detailInfo}>
          <div className={styles.schedule}>
            <span className={styles.movingInfo}>
              <span className={styles.movingLabel}>이사일</span>{' '}
              {user.movingDate}
            </span>
            <span className={styles.separator}>|</span>
            <span className={styles.movingInfo}>
              <span className={styles.movingLabel}>출발</span> {user.start}
            </span>
            <span className={styles.separator}>|</span>
            <span className={styles.movingInfo}>
              <span className={styles.movingLabel}>도착</span> {user.end}
            </span>
          </div>
          <div className={styles.cost}>
            <span className={styles.text}>견적 금액</span>
            {user.cost}원
          </div>
          <div className={styles.costBtn}>
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
        <div className={styles.reviewBtn}>
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
