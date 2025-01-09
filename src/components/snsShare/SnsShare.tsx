import React from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import ShareKakao from './ShareKakao';
import icShareKakaoLarge from '../../assets/icons/ic_share_kakao_large.svg';
import icShareKakaoMedium from '../../assets/icons/ic_share_kakao_medium.svg';
import icShareFacebookLarge from '../../assets/icons/ic_share_facebook_large.svg';
import icShareFacebookMedium from '../../assets/icons/ic_share_facebook_medium.svg';
import icShareLarge from '../../assets/icons/ic_share_large.svg';
import icShareMedium from '../../assets/icons/ic_share_medium.svg';

import { useMedia } from '../../lib/function/useMediaQuery';
import style from './SnsShare.module.css';
import { ENV } from '../../lib/api/STORAGE_KEY';

interface SnsShareProps {
  nickname: string;
  type?: string;
  onClick?: () => void;
}

const SnsShare = ({ nickname, type, onClick }: SnsShareProps) => {
  const { pc } = useMedia();
  const location = useLocation();

  const url = `${ENV.API_REACT_APP}${location.pathname}`;
  const path = `${location.pathname}`;

  const handleCopyClipBoard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      if (onClick) onClick();
    } catch (error) {
      await navigator.clipboard.writeText('');
    }
  };

  return (
    <>
      <div>
        <div className={classNames(style.text, { [style.otherText]: type })}>
          {type ? '견적서 공유하기' : '나만 알기 아쉬운 기사님인가요?'}
        </div>
        <div className={style.imgs}>
          <img
            src={pc ? icShareLarge : icShareMedium}
            alt='링크 복사'
            className={style.img}
            onClick={() => handleCopyClipBoard(url)}
          />
          <img
            src={pc ? icShareKakaoLarge : icShareKakaoMedium}
            onClick={() => {
              ShareKakao(path, nickname, type);
            }}
            alt='카카오톡 공유'
            className={style.img}
          />
          <img
            src={pc ? icShareFacebookLarge : icShareFacebookMedium}
            onClick={() => {
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                '페이스북 공유하기',
                'width=600,height=800,location=no,status=no,scrollbars=yes',
              );
            }}
            alt='페이스북 공유'
            className={style.img}
          />
        </div>
      </div>
    </>
  );
};

export default SnsShare;
