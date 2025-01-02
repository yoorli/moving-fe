import style from './index.module.css';
import pcLanding1 from '../../assets/images/img_landing_01_large.svg';
import pcLanding2 from '../../assets/images/img_landing_02_large.svg';
import pcLanding3 from '../../assets/images/img_landing_03_large.svg';
import mobileLanding1 from '../../assets/images/img_landing_01_medium.svg';
import mobileLanding2 from '../../assets/images/img_landing_02_medium.svg';
import mobileLanding3 from '../../assets/images/img_landing_03_medium.svg';
import useDirection from '../../lib/function/direction';
import { useMedia } from '../../lib/function/useMediaQuery';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';

export default function ServiceRandingPage() {
  const { direction_userLogin, direction_userSignup } = useDirection();
  const { pc, tablet, mobile } = useMedia();
  const {
    userValue: { user, isPending },
  } = useContext(AuthContext);

  if (pc) {
    return (
      <div className={style.container}>
        <div className={style.wrapper}>
          <div className={style.top}>
            <span>원하는 이사 서비스를 요청하기</span>
            <span>견적을 받아보세요</span>
          </div>
          <div className={style.mid}>
            <img src={pcLanding1} alt='' />
            <div className={style.right}>
              <img src={pcLanding2} alt='' />
              <img src={pcLanding3} alt='' />
            </div>
          </div>
          {!isPending && !user ? (
            <div className={style.bottom}>
              <div onClick={direction_userLogin} className={style.btn}>
                로그인
              </div>
              <div onClick={direction_userSignup} className={style.btnWhite}>
                회원가입
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  } else if (tablet) {
    return (
      <div className={style.container}>
        <div className={style.wrapper}>
          <div className={style.top}>
            <span>원하는 이사 서비스를 요청하기</span>
            <span>견적을 받아보세요</span>
          </div>
          <div className={style.mid}>
            <img src={mobileLanding1} alt='' />
            <img src={mobileLanding2} alt='' />
            <img src={mobileLanding3} alt='' />
          </div>
          {!isPending && !user ? (
            <div className={style.bottom}>
              <div onClick={direction_userLogin} className={style.btn}>
                로그인
              </div>
              <div onClick={direction_userSignup} className={style.btnWhite}>
                회원가입
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  } else if (mobile) {
    return (
      <div className={style.container}>
        <div className={style.wrapper}>
          <div className={style.top}>
            <span>원하는 이사 서비스를 요청하기</span>
            <span>견적을 받아보세요</span>
          </div>
          <div className={style.mid}>
            <img src={mobileLanding1} alt='' />
            <img src={mobileLanding2} alt='' />
            <img src={mobileLanding3} alt='' />
          </div>
          {!isPending && !user ? (
            <div className={style.bottom}>
              <div onClick={direction_userLogin} className={style.btn}>
                로그인
              </div>
              <div onClick={direction_userSignup} className={style.btnWhite}>
                회원가입
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  } else {
    return <span>...</span>;
  }
}
