import style from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  thin?: boolean;
}

export default function LoadingSpinner({ thin = false }: LoadingSpinnerProps) {
  return (
    <div className={thin ? style.thin : style.overlay}>
      <div className={style.spinner}></div>
      <div className={style.font}>로딩 중...</div>
    </div>
  );
}
