import useDirection from '../../lib/function/direction';
import style from './NavMenuModal.module.css';
import modalClose from '../../assets/icons/ic_x_large.svg';

export function NonLoginMenuModal({
  modalController,
}: {
  modalController: () => void;
}) {
  const { direction_userLogin, direction_searchDriver } = useDirection();
  return (
    <div className={style.modalContainer}>
      <div className={style.modalWrapper}>
        <div className={style.modalHeader}>
          <div className={style.pill}>
            <img onClick={modalController} src={modalClose} alt='' />
          </div>
        </div>
        <div
          onClick={() => {
            modalController();
            direction_searchDriver();
          }}
          className={style.modalItem}
        >
          기사님 찾기
        </div>
        <div
          onClick={() => {
            modalController();
            direction_userLogin();
          }}
          className={style.modalItem}
        >
          로그인
        </div>
      </div>
    </div>
  );
}
