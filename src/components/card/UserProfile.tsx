import classNames from 'classnames';

import { formatCurrency } from '../../lib/function/utils';

import style from './UserProfile.module.css';

import fullStarsMedium from '../../assets/icons/ic_full_star_medium.svg';
import emptyStarMedium from '../../assets/icons/ic_empty_star_medium.svg';
import { useMedia } from '../../lib/function/useMediaQuery';

interface ProfileProps {
  type?: string;
  user: {
    movingType?: string[]; // 서비스 유형
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

export function getStars(rating: number) {
  const stars = [];
  const remainder = Number((rating % 1).toFixed(1));

  for (let i = 1; i <= rating; i++) {
    stars.push(<img key={i} src={fullStarsMedium} alt='star' />);
  }
  if (remainder > 0) {
    stars.push(
      <div style={{ position: 'relative', width: '24px', height: '24px' }}>
        <img
          src={emptyStarMedium}
          alt='empty star'
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${remainder * 100}%`,
            height: '100%',
            backgroundImage: `url(${fullStarsMedium})`,
            backgroundSize: 'cover',
            WebkitMaskImage: `url(${fullStarsMedium})`,
            maskImage: `url(${fullStarsMedium})`,
          }}
        />
      </div>,
    );
  }
  if (rating < 4) {
    for (let i = 1; i <= 5 - rating; i++) {
      stars.push(<img src={emptyStarMedium} alt='empty star' />);
    }
  }
  return stars;
}

export default function UserProfile({ type, user }: ProfileProps) {
  const isPc = useMedia().pc;
  return (
    <>
      {type !== 'review' ? (
        <div
          className={classNames(style.profile, {
            [style.profilePadding]: type !== 'confirmedCost' && isPc,
          })}
        >
          <div className={style.userInfo}>{user.customer} 고객님</div>
          <div className={style.separator}></div>
          <div className={style.movingInfo}>
            <span className={style.text}>
              <span className={style.movingLabel}>이사일</span>
              {user.movingDate}
            </span>
            <span
              className={classNames(style.separatorHorizon, {
                [style.hidden]: !isPc,
              })}
            ></span>
            <span className={style.text}>
              <span className={style.movingLabel}>출발</span>
              {user.departure}
            </span>
            <span className={style.separatorHorizon}></span>
            <span className={style.text}>
              <span className={style.movingLabel}>도착</span>
              {user.arrival}
            </span>
          </div>
        </div>
      ) : (
        <div className={style.reviewProfile}>
          <div className={style.profileImage}>
            <img
              src={user.profileImg}
              alt={`${user.moverName}'s profile`}
              className={style.avatar}
            />
          </div>
          <div className={style.driverInfo}>
            <div className={style.driverName}>{user.moverName} 기사님</div>
            <div className={style.movingInfoRType}>
              <span className={style.movingLabelRType}>이사일</span>
              {user.movingDate}
              <span className={style.separatorHorizon}></span>
              <span className={style.movingLabelRType}>견적가</span>
              {user.price && formatCurrency(user.price)}
            </div>
            <div className={style.stars}>
              {user.reviewStats?.averageScore && getStars(user.reviewStats.averageScore)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}