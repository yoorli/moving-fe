import { Link } from 'react-router-dom';
import style from './SignupTop.module.css';
import logo from '../../../assets/logo.svg';

export const UserSignupTop = () => {
  return (
    <div className={style.top}>
      <img src={logo} alt='' />
      <p>
        기사님이신가요?<Link to='/driver/signup'>기사님 전용 페이지</Link>
      </p>
    </div>
  );
};

export const DriverSignupTop = () => {
  return (
    <div className={style.top}>
      <img src={logo} alt='' />
      <p>
        일반 유저라면?<Link to='/user/signup'>일반 유저 전용 페이지</Link>
      </p>
    </div>
  );
};
