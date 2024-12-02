import style from './NonLoginNav.module.css';
import logo from '../../assets/logo.svg';
import menu from '../../assets/icons/ic_menu_medium.svg';
import useDirection from '../../lib/function/direction';
import LoginBtn from '../btn/LoginBtn';
import { useMedia } from '../../lib/function/useMediaQuery';

type Props = {
  modalController?: () => void;
};

export default function NonLoginNav({ modalController }: Props) {
  const { direction_root, direction_searchDriver, direction_userLogin } =
    useDirection();
  const { pc, tablet, mobile } = useMedia();

  //pc size
  if (pc) {
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
  } else if (tablet) {
    return (
      <div className={style.container}>
        <img
          onClick={direction_root}
          className={style.logoImg}
          src={logo}
          alt=''
        />
        <img
          onClick={modalController}
          className={style.logoImg}
          src={menu}
          alt=''
        />
      </div>
    );
  } else if (mobile) {
    return (
      <div className={style.container}>
        <img
          onClick={direction_root}
          className={style.logoImg}
          src={logo}
          alt=''
        />
        <img
          onClick={modalController}
          className={style.logoImg}
          src={menu}
          alt=''
        />
      </div>
    );
  } else {
    return <></>;
  }
}
