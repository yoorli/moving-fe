import style from './EditBtn.module.css';

export const CancelBtn = () => {
  return <div className={style.cancel}>취소</div>;
};

type Props = {
  validation: boolean;
  text: string;
};
export const TextBtn = ({ validation, text }: Props) => {
  return (
    <div className={`${style.edit} ${style[validation ? 'complete' : '']}`}>
      {text}
    </div>
  );
};
