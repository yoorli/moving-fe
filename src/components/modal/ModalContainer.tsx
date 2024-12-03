import Button from '../btn/Button';
import style from './ModalContainer.module.css';
import closeButton from '../../assets/icons/ic_x_large.svg';
import { ReactNode } from 'react';

interface modalProps {
  title: string;
  isText: boolean; // 모달 안에 넣을 것이 컴포넌트인지 단순 텍스트인지 확인
  text?: string;
  children?: ReactNode;
  buttonText: string;
  closeBtnClick: () => void;
  buttonClick: () => void;
}

export default function ModalContainer({
  title,
  isText,
  text,
  children,
  buttonText,
  closeBtnClick,
  buttonClick,
}: modalProps) {
  return (
    <div className={style.overlay}>
      <div className={style.container}>
        <div className={style.header}>
          <div className={style.title}>{title}</div>
          <img
            className={style.close}
            src={closeButton}
            alt='close'
            onClick={closeBtnClick}
          ></img>
        </div>
        {isText ? <div className={style.content}>{text}</div> : children}
        <Button
          text={buttonText}
          btnStyle='solid560pxBlue300'
          onClick={buttonClick}
        />
      </div>
    </div>
  );
}
