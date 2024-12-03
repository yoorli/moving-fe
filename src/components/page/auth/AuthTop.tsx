import { Link } from 'react-router-dom';
import style from './AuthTop.module.css';
import logoLarge from '../../../assets/images/img_logo_icon_text_medium.svg';
import logoSmall from '../../../assets/images/img_logo_icon_text_small.svg';
import { useMedia } from '../../../lib/function/useMediaQuery';

export const UserLoginTop = () => {
  const { pc } = useMedia();
  return (
    <div className={style.top}>
      {pc ? <img src={logoLarge} alt='' /> : <img src={logoSmall} alt='' />}
      <p>
        기사님이신가요?<Link to='/driver/login'>기사님 전용 페이지</Link>
      </p>
    </div>
  );
};

export const DriverLoginTop = () => {
  const { pc } = useMedia();
  return (
    <div className={style.top}>
      {pc ? <img src={logoLarge} alt='' /> : <img src={logoSmall} alt='' />}
      <p>
        일반 유저라면?<Link to='/user/login'>일반 유저 전용 페이지</Link>
      </p>
    </div>
  );
};

export const UserSignupTop = () => {
  const { pc } = useMedia();
  return (
    <div className={style.top}>
      {pc ? <img src={logoLarge} alt='' /> : <img src={logoSmall} alt='' />}
      <p>
        기사님이신가요?<Link to='/driver/signup'>기사님 전용 페이지</Link>
      </p>
    </div>
  );
};

export const DriverSignupTop = () => {
  const { pc } = useMedia();
  return (
    <div className={style.top}>
      {pc ? <img src={logoLarge} alt='' /> : <img src={logoSmall} alt='' />}
      <p>
        일반 유저라면?<Link to='/user/signup'>일반 유저 전용 페이지</Link>
      </p>
    </div>
  );
};
