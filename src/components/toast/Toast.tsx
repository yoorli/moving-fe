import { useEffect, useState } from 'react';
import style from './Toast.module.css';
import icInfoLarge from '../../assets/icons/ic_info_large.svg';

interface ToastProps {
  text: string; // toast에 표시할 텍스트
  autoDismiss?: boolean; // true일 경우 dismissDuration 후 사라짐 => autoDismiss={true} 이렇게 사용
  dismissDuration?: number; // dismissDuration={3000} 이렇게 사용
}

/*
사용예시
  * 사라지지 않음: <Toast text="확정하지 않은 견적이에요!" />
  * 기본 3초 후 사라짐: <Toast text="확정하지 않은 견적이에요!" autoDismiss={true} />
  * 5초 후 사라짐: <Toast text="확정하지 않은 견적이에요!" autoDismiss={true} dismissDuration={5000} />
*/

function Toast({ text, autoDismiss, dismissDuration = 3000 }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timer: number | undefined;
    if (autoDismiss) {
      timer = window.setTimeout(() => setVisible(false), dismissDuration);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [autoDismiss, dismissDuration]);

  if (!visible) return null;

  return (
    <div className={style.toastContainer}>
      <img className={style.icon} src={icInfoLarge} alt='info' />
      <span className={style.toastText}>{text}</span>
    </div>
  );
}

export default Toast;
