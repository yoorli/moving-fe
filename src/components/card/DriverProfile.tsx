import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { useMedia } from '../../lib/function/useMediaQuery';
import {
  checkImg,
  formatCurrency,
  translateServiceRegion,
  translateServiceType,
} from '../../lib/function/utils';
import { DriverProfileProps } from '../../types/cardTypes';
import useDirection from '../../lib/function/direction';

import style from './DriverProfile.module.css';

import fullHeartMedium from '../../assets/icons/ic_full_heart_medium.svg';
import emptyHeartMedium from '../../assets/icons/ic_empty_heart_medium.svg';
import yellowStarSmall from '../../assets/icons/ic_yellow_star_small.svg';
import profileLarge from '../../assets/icons/ic_profile_large.svg';

export default function DriverProfile({
  styles,
  type,
  list: user,
}: DriverProfileProps) {
  const [id, setId] = useState(Number);

  const isPc = useMedia().pc;
  const params = useParams().id;
  const { direction_driverDetail } = useDirection();

  useEffect(() => {
    const newId =
      !type && !user.moverId ? Number(params) : Number(user.moverId);
    newId && setId(newId);
  }, [type, user.moverId]);

  const [profileImg, setProfileImg] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = () => {
      const localStorageKey = `profileImage_${id}`;
      const storedImage = localStorage.getItem(localStorageKey);

      if (storedImage) {
        setProfileImg(storedImage);
      } else {
        const randomImage = checkImg(user.profileImg);
        localStorage.setItem(localStorageKey, randomImage);
        setProfileImg(randomImage);
      }
    };

    if (!user.profileImg) {
      loadImage();
    } else {
      setProfileImg(user.profileImg);
    }
  }, [user.profileImg, id]);

  const handleProfileClick = () => {
    if (
      type === 'waiting' ||
      type === 'confirm' ||
      type === 'review' ||
      type === 'dibs'
    )
      return direction_driverDetail(id);
  };

  return (
    <div
      className={classNames(style.profile, {
        [style.profilePType]: type === 'profile',
        [style.profileRType]: type === 'review',
        [style.profileWType]: type === 'waiting' || type === 'confirm',
        [style.pointerCursor]:
          type === 'dibs' ||
          type === 'waiting' ||
          type === 'confirm' ||
          type === 'review',
        [style.profileSmall]: styles === 'small',
      })}
      onClick={() => handleProfileClick()}
    >
      <div
        className={classNames(style.profileImage, {
          [style.hidden]: type === 'profile' && !isPc,
          [style.profileImgDType]: type === 'dibs',
          [style.profileImgPType]: type === 'profile',
          [style.profileImgRType]: type === 'review',
          [style.profileImageSmall]: styles === 'small',
        })}
      >
        <img
          src={
            type === 'profile'
              ? user.profileImg
                ? profileImg || ''
                : profileLarge
              : profileImg || ''
          }
          alt={`${user.moverName}'s profile`}
          className={classNames(style.avatar, {
            [style.avatarLarge]:
              (type === 'profile' ||
                (type === 'dibs' && styles !== 'small') ||
                type === 'review') &&
              isPc,
          })}
        />
      </div>
      <div className={style.info}>
        {type === 'profile' ? (
          <>
            <div className={style.details}>
              {user.reviewStats?.averageScore !== undefined &&
                user.reviewStats.totalReviews !== undefined && (
                  <span className={style.stars}>
                    <img src={yellowStarSmall} alt='yellowStar' />
                    {(user.reviewStats.averageScore ?? 0).toFixed(1)}
                    <span style={{ color: 'var(--gray-300)' }}>
                      ({user.reviewStats.totalReviews})
                    </span>
                  </span>
                )}
              <span className={style.separator}>|</span>
              <span className={style.text}>
                <span style={{ color: 'var(--gray-300)' }}>경력</span>
                {user.career}년
              </span>
              <span className={style.separator}>|</span>
              <span className={style.text}>
                <span style={{ color: 'var(--gray-300)' }}>확정</span>
                {user.confirmationCount}건
              </span>
            </div>
            <div className={style.detailsPType}>
              <span className={style.textPType}>
                <span className={style.movingLabel}>제공 서비스</span>
                {user.serviceType &&
                  translateServiceType(user.serviceType)?.join(', ')}
              </span>
              <span
                className={classNames(style.separator, {
                  [style.separatorHidden]: !isPc,
                })}
              >
                |
              </span>
              <span className={style.textPType}>
                <span className={style.movingLabel}>지역</span>
                <span className={style.region}>
                  {user.serviceRegion &&
                    translateServiceRegion(user.serviceRegion)?.join(', ')}
                </span>
              </span>
            </div>
          </>
        ) : (
          // 기본 프로필
          <div
            className={classNames(style.name, {
              [style.nameRType]: type === 'review',
              [style.nameSmall]: styles === 'small',
            })}
          >
            <span>{user.moverName} 기사님</span>
            {user.favoriteCount !== undefined && (
              <span
                className={classNames(style.favoriteCount, {
                  [style.favoriteCountSmall]: styles === 'small',
                })}
              >
                <img
                  src={user.isFavorite ? fullHeartMedium : emptyHeartMedium}
                  alt='fullHeart'
                />
                {user.favoriteCount}
              </span>
            )}
          </div>
        )}
        {!(type === 'review' || type === 'profile') && (
          <div
            className={classNames(style.details, {
              [style.detailsSmall]: styles === 'small',
            })}
          >
            {user.reviewStats?.averageScore !== undefined &&
              user.reviewStats.totalReviews !== undefined && (
                <div
                  className={classNames(style.starBox, {
                    [style.starBoxSmall]: styles === 'small',
                  })}
                >
                  <span
                    className={classNames(style.stars, {
                      [style.starsSmall]: styles === 'small',
                    })}
                  >
                    <img src={yellowStarSmall} alt='yellowStar' />
                    {(user.reviewStats.averageScore ?? 0).toFixed(1)}
                    <span style={{ color: 'var(--gray-300)' }}>
                      ({user.reviewStats.totalReviews})
                    </span>
                  </span>
                  <span className={style.separator}> | </span>
                </div>
              )}
            {user.career !== undefined &&
              user.confirmationCount !== undefined && (
                <>
                  <span
                    className={classNames(style.text, {
                      [style.textSmall]: styles === 'small',
                    })}
                  >
                    <span style={{ color: 'var(--gray-300)' }}>경력</span>
                    {user.career}년
                  </span>
                  <span className={style.separator}>|</span>
                  <span
                    className={classNames(style.text, {
                      [style.textSmall]: styles === 'small',
                    })}
                  >
                    <span style={{ color: 'var(--gray-300)' }}>확정</span>
                    {user.confirmationCount}건
                  </span>
                </>
              )}
          </div>
        )}
        {/* review 타입, 이사일, 견적가 표시 */}
        {type === 'review' && (
          <div className={style.details}>
            {user.movingDate !== undefined && user.price !== undefined && (
              <>
                <span className={style.text}>
                  <span
                    className={classNames(
                      style.textLabel,
                      styles && style[styles],
                    )}
                  >
                    이사일
                  </span>
                  {user.movingDate}
                </span>
                <span className={style.separator}>|</span>
                <span className={style.text}>
                  <span
                    className={classNames(
                      style.textLabel,
                      styles && style[styles],
                    )}
                  >
                    견적가
                  </span>
                  {user.price && formatCurrency(user.price)}
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
