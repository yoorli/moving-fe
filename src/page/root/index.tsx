import style from './index.module.css';
import landing1 from '../../assets/images/img_landing_01_large.svg';
import landing2 from '../../assets/images/img_landing_02_large.svg';
import landing3 from '../../assets/images/img_landing_03_large.svg';
import useDirection from '../../lib/function/direction';

export default function ServiceRandingPage() {
  const { direction_userLogin, direction_userSignup } = useDirection();
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.top}>
          <span>원하는 이사 서비스를 요청하기</span>
          <span>견적을 받아보세요</span>
        </div>
        <div className={style.mid}>
          <img src={landing1} alt='' />
          <div className={style.right}>
            <img src={landing2} alt='' />
            <img src={landing3} alt='' />
          </div>
        </div>
        <div className={style.bottom}>
          <div onClick={direction_userLogin} className={style.btn}>
            로그인
          </div>
          <div onClick={direction_userSignup} className={style.btnWhite}>
            회원가입
          </div>
        </div>
      </div>
    </div>
  );
}
