import Button from '../btn/Button';
import style from './NotFound.module.css';
import rightImg from '../../assets/icons/ic_vector_right_large.svg';
import useDirection from '../../lib/function/direction';

export default function NotFound() {
  const { direction_root } = useDirection();

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
          src={rightImg}
          onClick={direction_root}
        />
      </div>
    </div>
  );
}
