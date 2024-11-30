import style from './EditBtn.module.css';

export const CancelBtn = () => {
  return <div className={style.cancel}>취소</div>;
};

type Props = {
  validation: boolean;
};
export const EditBtn = ({ validation }: Props) => {
  return (
    <div className={`${style.edit} ${style[validation ? 'complete' : '']}`}>
      수정하기
    </div>
  );
};
