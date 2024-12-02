import style from './NoContents.module.css';
import emptyFile from '../../assets/images/img_empty_review_large.svg';
import Button from '../btn/Button';

interface noContentsProps {
  hasButton?: boolean;
  hasWritableReviews?: boolean;
  buttonText?: string;
  buttonHandler?: () => void;
}

export default function NoContents({
  hasButton = false,
  hasWritableReviews = false,
  buttonText,
  buttonHandler,
}: noContentsProps) {
  const getNoContentsText = (
    hasButton: boolean,
    hasWritableReviews: boolean,
  ) => {
    if (hasButton) return '아직 등록된 리뷰가 없어요!';
    else if (hasWritableReviews) return '작성 가능한 리뷰가 없어요!';
    return '아직 받은 요청이 없어요!';
  };

  return (
    <div className={style.container}>
      <div className={style.contents}>
        <img src={emptyFile} alt={emptyFile} />
        <div className={style.text}>
          {getNoContentsText(hasButton, hasWritableReviews)}
        </div>
        {hasButton && buttonText && (
          <Button
            text={buttonText}
            btnStyle='solid196pxBlue300'
            onClick={buttonHandler}
          />
        )}
      </div>
    </div>
  );
}
