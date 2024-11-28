import style from './LoginBottom.module.css';
import google from '../../../assets/images/img_login_google_large.svg';
import kakao from '../../../assets/images/img_login_kakao_large.svg';
import naver from '../../../assets/images/img_login_naver_large.svg';

export const UserLoginBottom = () => {
  return (
    <div className={style.bottom}>
      <span>SNS 계정으로 간편 가입하기</span>
      <div className={style.snsIcon}>
        <img src={google} alt='' />
        <img src={kakao} alt='' />
        <img src={naver} alt='' />
      </div>
    </div>
  );
};

export const DriverLoginBottom = () => {
  return (
    <div className={style.bottom}>
      <span>SNS 계정으로 간편 가입하기</span>
      <div className={style.snsIcon}>
        <img src={google} alt='' />
        <img src={kakao} alt='' />
        <img src={naver} alt='' />
      </div>
    </div>
  );
};
