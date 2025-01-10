import Button from '../btn/Button';
import style from './NotFound.module.css';
import rightLargeImg from '../../assets/icons/ic_vector_right_large.svg';
import rightMediumImg from '../../assets/icons/ic_vector_right_medium.svg';
import useDirection from '../../lib/function/direction';
import { useMedia } from '../../lib/function/useMediaQuery';

export default function NotFound() {
  const { direction_root } = useDirection();

  const { pc } = useMedia();

  return (
    <div className={style.overlay}>
      <div className={style.container}>
        <div className={style.notFound}>
          <div>4</div>
          <div className={style.spinner}></div>
          <div>4</div>
        </div>
        <div className={style.warning}>어... 여긴 어디지?</div>
        <div className={style.solution}>
          입력하신 주소가 맞는지 다시 확인해 주세요.
        </div>
        <Button
          btnStyle='solid180pxBlue300'
          text='무빙 홈으로'
          className={style.homeBtn}
          src={pc ? rightLargeImg : rightMediumImg}
          onClick={direction_root}
        />
      </div>
    </div>
  );
}
