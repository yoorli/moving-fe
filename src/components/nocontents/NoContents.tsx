import style from './NoContents.module.css';
import emptyReviewLarge from '../../assets/images/img_empty_review_large.svg';
import carLarge from '../../assets/images/img_car_large.svg';
import Button from '../btn/Button';

interface noContentsProps {
  image: 'file' | 'car';
  hasButton?: boolean;
  emptyWritableReviews?: boolean;
  buttonText?: string;
  buttonHandler?: () => void;
}

export default function NoContents({
  image,
  hasButton = false,
  emptyWritableReviews = false,
  buttonText,
  buttonHandler,
}: noContentsProps) {
  const getNoContentsText = (
    hasButton: boolean,
    emptyWritableReviews: boolean,
    image: 'file' | 'car',
  ) => {
    if (hasButton && image === 'car')
      return (
        <>
          현재 진행 중인 이사 견적이 있어요! <br />
          진행 중인 이사 완료 후 새로운 견적을 받아 보세요.
        </>
      );
    else if (hasButton) return '아직 등록된 리뷰가 없어요!';
    else if (emptyWritableReviews) return '작성 가능한 리뷰가 없어요!';
    return '아직 받은 요청이 없어요!';
  };

  const selectedImage = () => {
    if (image === 'file') return emptyReviewLarge;
    else if (image === 'car') return carLarge;
  };

  return (
    <div className={style.overlay}>
      <div className={style.container}>
        <div className={style.contents}>
          <img
            src={selectedImage()}
            alt={image}
            className={`${image === 'file' ? style.fileImage : style.carImage}`}
          />
          <div className={style.text}>
            {getNoContentsText(hasButton, emptyWritableReviews, image)}
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
    </div>
  );
}
