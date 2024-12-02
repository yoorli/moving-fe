import { Outlet } from 'react-router-dom';
import style from './RendingLayout.module.css';
import { useState } from 'react';
import NonLoginNav from '../components/nav/NonLoginNav';
import modalClose from '../assets/icons/ic_x_large.svg';
import useDirection from '../lib/function/direction';

export default function RendingLayout() {
  const [modal, setModal] = useState<boolean>(false);

  const modalController = () => {
    setModal((prev) => !prev);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          <NonLoginNav modalController={modalController} />
          <Outlet />
        </div>
      </div>
      {modal ? <NonLoginMenuModal modalController={modalController} /> : null}
    </>
  );
}

function NonLoginMenuModal({
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
