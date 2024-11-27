import style from './NonLoginNav.module.css';
import logo from '../../assets/logo.svg';
import useDirection from '../../lib/function/direction';
import LoginBtn from '../btn/LoginBtn';

export default function NonLoginNav() {
  const { direction_root, direction_searchDriver, direction_userLogin } =
    useDirection();
  return (
    <div className={style.container}>
      <img
        onClick={direction_root}
        className={style.logoImg}
        src={logo}
        alt=''
      />
      <div className={style.navContainer}>
        <nav>
          <ul className={style.navWrapper}>
            <li onClick={direction_searchDriver} className={style.navItem}>
              기사님 찾기
            </li>
          </ul>
        </nav>
      </div>
      <LoginBtn onClick={direction_userLogin} context='로그인' />
    </div>
  );
}
