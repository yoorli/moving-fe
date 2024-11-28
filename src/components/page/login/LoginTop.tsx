import { Link } from 'react-router-dom';
import style from './LoginTop.module.css';
import logo from '../../../assets/logo.svg';

export const UserLoginTop = () => {
  return (
    <div className={style.top}>
      <img src={logo} alt='' />
      <p>
        기사님이신가요?<Link to='/driver/login'>기사님 전용 페이지</Link>
      </p>
    </div>
  );
};

export const DriverLoginTop = () => {
  return (
    <div className={style.top}>
      <img src={logo} alt='' />
      <p>
        일반 유저라면?<Link to='/user/login'>일반 유저 전용 페이지</Link>
      </p>
    </div>
  );
};
