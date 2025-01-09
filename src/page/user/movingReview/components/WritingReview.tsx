import { ChangeEvent } from 'react';
import DriverProfile from '../../../../components/card/DriverProfile';
import style from './WritingReview.module.css';
import icEmptyStarLarge from '../../../../assets/icons/ic_empty_star_large.svg';
import icFullStarLarge from '../../../../assets/icons/ic_full_star_large.svg';
import Chip from '../../../../components/chip/Chip';
import { ChipType } from '../../../../types/cardTypes';

interface WritingReviewProps {
  mover: any;
  rating: number;
  setRating: (value: number) => void;
  setReview: (value: string) => void;
}

export default function WritingReview({
  mover,
  rating,
  setRating,
  setReview,
}: WritingReviewProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  return (
    <div className={style.container}>
      <div className={style.mover}>
        <div className={style.chipContainer}>
          <div className={style.serviceChip}>
            {mover.serviceType?.map((type: string, index: number) => (
              <Chip key={index} type={type as ChipType} />
            ))}
          </div>
          <div className={style.assignedChip}>
            {mover.isAssigned && <Chip type='ASSIGN' />}
          </div>
        </div>
        <DriverProfile list={mover} type='review' />
      </div>
      <div className={`${style.smallContainer} ${style.rating}`}>
        <div>평점을 선택해 주세요</div>
        <div className={style.starContainer}>
          {[0, 1, 2, 3, 4].map((index) => (
            <img
              key={index}
              className={style.star}
              src={index < rating ? icFullStarLarge : icEmptyStarLarge}
              alt={index < rating ? icFullStarLarge : icEmptyStarLarge}
              onClick={() => handleStarClick(index)}
            />
          ))}
        </div>
      </div>
      <div className={style.smallContainer}>
        <div>상세 후기를 작성해주세요</div>
        <textarea
          className={style.textArea}
          placeholder='최소 10자 이상 입력해주세요.'
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
