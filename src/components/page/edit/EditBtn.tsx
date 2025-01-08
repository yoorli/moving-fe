import style from './EditBtn.module.css';

export const CancelBtn = () => {
  return <div className={style.cancel}>취소</div>;
};

type Props = {
  validation: boolean;
  text: string;
  onClick?: ()=>void
};
export const TextBtn = ({ validation, text ,onClick}: Props) => {
  return (
    <div onClick={onClick }className={`${style.edit} ${style[validation ? 'complete' : '']}`}>
      {text}
    </div>
  );
};
