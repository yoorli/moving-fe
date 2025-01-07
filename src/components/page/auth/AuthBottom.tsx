import style from './AuthBottom.module.css';
import google from '../../../assets/images/img_login_google_large.svg';
import kakao from '../../../assets/images/img_login_kakao_large.svg';
import naver from '../../../assets/images/img_login_naver_large.svg';
import googleMedium from '../../../assets/images/img_login_google_medium.svg';
import kakaoMedium from '../../../assets/images/img_login_kakao_medium.svg';
import naverMedium from '../../../assets/images/img_login_naver_medium.svg';
import { useMedia } from '../../../lib/function/useMediaQuery';

export const UserLoginBottom = () => {
  const { pc } = useMedia();
  // const loginKakao = async () => {
  //   try {
  //     await auth.get('user/kakao?userType=CUSTOMER');
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  return (
    <div className={style.bottom}>
      <span>SNS 계정으로 간편 가입하기</span>
      <div className={style.snsIcon}>
        {pc ? (
          <>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/google?userType=CUSTOMER`}
            >
              <img src={google} alt='' />
            </a>

            <a
              href={`${process.env.REACT_APP_API_URL}/user/kakao?userType=CUSTOMER`}
            >
              <img src={kakao} alt='' />
            </a>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/naver?userType=CUSTOMER`}
            >
              <img src={naver} alt='' />
            </a>
          </>
        ) : (
          <>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/google?userType=CUSTOMER`}
            >
              <img src={googleMedium} alt='' />
            </a>

            <a
              href={`${process.env.REACT_APP_API_URL}/user/kakao?userType=CUSTOMER`}
            >
              <img src={kakaoMedium} alt='' />
            </a>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/naver?userType=CUSTOMER`}
            >
              <img src={naverMedium} alt='' />
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export const DriverLoginBottom = () => {
  const { pc } = useMedia();
  return (
    <div className={style.bottom}>
      <span>SNS 계정으로 간편 가입하기</span>
      <div className={style.snsIcon}>
        {pc ? (
          <>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/google?userType=MOVER`}
            >
              <img src={google} alt='' />
            </a>

            <a
              href={`${process.env.REACT_APP_API_URL}/user/kakao?userType=MOVER`}
            >
              <img src={kakao} alt='' />
            </a>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/naver?userType=MOVER`}
            >
              <img src={naver} alt='' />
            </a>
          </>
        ) : (
          <>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/google?userType=MOVER`}
            >
              <img src={googleMedium} alt='' />
            </a>

            <a
              href={`${process.env.REACT_APP_API_URL}/user/kakao?userType=MOVER`}
            >
              <img src={kakaoMedium} alt='' />
            </a>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/naver?userType=MOVER`}
            >
              <img src={naverMedium} alt='' />
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export const UserSignupBottom = () => {
  const { pc } = useMedia();
  return (
    <div className={style.bottom}>
      <span>SNS 계정으로 간편 가입하기</span>
      <div className={style.snsIcon}>
        {pc ? (
          <>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/google?userType=CUSTOMER`}
            >
              <img src={google} alt='' />
            </a>

            <a
              href={`${process.env.REACT_APP_API_URL}/user/kakao?userType=CUSTOMER`}
            >
              <img src={kakao} alt='' />
            </a>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/kakao?userType=CUSTOMER`}
            >
              <img src={naver} alt='' />
            </a>
          </>
        ) : (
          <>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/google?userType=CUSTOMER`}
            >
              <img src={googleMedium} alt='' />
            </a>

            <a
              href={`${process.env.REACT_APP_API_URL}/user/kakao?userType=CUSTOMER`}
            >
              <img src={kakaoMedium} alt='' />
            </a>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/kakao?userType=CUSTOMER`}
            >
              <img src={naverMedium} alt='' />
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export const DriverSignupBottom = () => {
  const { pc } = useMedia();
  return (
    <div className={style.bottom}>
      <span>SNS 계정으로 간편 가입하기</span>
      <div className={style.snsIcon}>
        {pc ? (
          <>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/google?userType=MOVER`}
            >
              <img src={google} alt='' />
            </a>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/kakao?userType=MOVER`}
            >
              <img src={kakao} alt='' />
            </a>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/kakao?userType=MOVER`}
            >
              <img src={naver} alt='' />
            </a>
          </>
        ) : (
          <>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/google?userType=MOVER`}
            >
              <img src={kakaoMedium} alt='' />
            </a>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/kakao?userType=MOVER`}
            >
              <img src={kakaoMedium} alt='' />
            </a>
            <a
              href={`${process.env.REACT_APP_API_URL}/user/naver?userType=MOVER`}
            >
              <img src={naverMedium} alt='' />
            </a>
          </>
        )}
      </div>
    </div>
  );
};
