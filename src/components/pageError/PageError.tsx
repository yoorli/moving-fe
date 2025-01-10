import style from './PageError.module.css';
import emptyReviewLarge from '../../assets/images/img_empty_review_large.svg';
import Button from '../btn/Button';

interface pageErrorProps {
  image: string;
  contentTextFirst?: string;
  contentTextSecond?: string;
  buttonText?: string;
  buttonHandler?: () => void;
}

export default function PageError({
  image = emptyReviewLarge,
  contentTextFirst = '아직 받은 요청이 없어요!',
  contentTextSecond,
  buttonText,
  buttonHandler,
}: pageErrorProps) {
  return (
    <div className={style.overlay}>
      <div className={style.container}>
        <div className={style.contents}>
          <img
            src={image}
            alt={image}
            className={`${image === 'file' ? style.fileImage : style.carImage}`}
          />
          <div className={style.textFirst}>{contentTextFirst}</div>
          <div className={style.textSecond}>{contentTextSecond}</div>
          {buttonText && (
            <Button
              text={buttonText}
              btnStyle='solid196pxBlue300'
              onClick={buttonHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
}
