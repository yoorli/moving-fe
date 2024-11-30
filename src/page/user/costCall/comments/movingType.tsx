import { useState } from 'react';
import pageStyles from '../index.module.css';
import styles from './movingType.module.css';
import icCheckCircleLarge from '../../../../assets/icons/ic_check_circle_large.svg';
import icCheckCircleEmptyLarge from '../../../../assets/icons/ic_check_circle_empty_medium.svg';
// import icCheckCircleMedium from '../../../../assets/icons/ic_check_circle_medium.svg';
// import icCheckCircleEmptyMedium from '../../../../assets/icons/ic_check_circle_empty_large.svg';
import Button from '../../../../components/btn/Button';

type ValuePiece = string | null;

interface MovingTypeProps {
  onClick: (type: ValuePiece) => void;
  value: string | null;
}

export default function MovingType({ onClick, value }: MovingTypeProps) {
  const [type, setType] = useState<string | null>(null);

  const handleClick = (option: string) => {
    setType((prev) => (prev === option ? null : option));
  };

  const handleSelectClick = (type: string | null) => {
    onClick(type);
  };

  const showText = (value: string): string => {
    switch (value) {
      case 'option1':
        return '소형이사 (원룸, 투룸, 20평대 미만)';
      case 'option2':
        return '가정이사 (쓰리룸, 20평대 이상)';
      case 'option3':
        return '사무실이사 (사무실, 상업공간)';
      default:
        return '선택된 종류가 없습니다. 수정해 주세요.';
    }
  };

  return (
    <div>
      <div>
        <div className={pageStyles.white}>
          몇 가지 정보만 알려 주시면 최대 5개의 견적을 받을 수 있어요 :)
        </div>
        <div className={pageStyles.white}>이사 종류를 선택해 주세요</div>
      </div>
      {!value && (
        <div className={pageStyles.option}>
          <div
            className={type === 'option1' ? styles.selectOption : styles.option}
            onClick={() => handleClick('option1')}
          >
            <img
              className={styles.checkBox}
              src={
                type === 'option1'
                  ? icCheckCircleLarge
                  : icCheckCircleEmptyLarge
              }
              width={36}
              height={36}
              alt=''
            />
            <div className={styles.optionText}>
              소형이사 (원룸, 투룸, 20평대 미만)
            </div>
          </div>
          <div
            className={type === 'option2' ? styles.selectOption : styles.option}
            onClick={() => handleClick('option2')}
          >
            <img
              className={styles.checkBox}
              src={
                type === 'option2'
                  ? icCheckCircleLarge
                  : icCheckCircleEmptyLarge
              }
              width={36}
              height={36}
              alt=''
            />
            <div className={styles.optionText}>
              가정이사 (쓰리룸, 20평대 이상)
            </div>
          </div>
          <div
            className={type === 'option3' ? styles.selectOption : styles.option}
            onClick={() => handleClick('option3')}
          >
            <img
              className={styles.checkBox}
              src={
                type === 'option3'
                  ? icCheckCircleLarge
                  : icCheckCircleEmptyLarge
              }
              width={36}
              height={36}
              alt=''
            />
            <div className={styles.optionText}>
              사무실이사 (사무실, 상업공간)
            </div>
          </div>
          {!type ? (
            <Button text='선택완료' style='solid640pxBlue300' />
          ) : (
            <Button
              text='선택완료'
              style='solid640pxBlue300'
              onClick={() => handleSelectClick(type)}
            />
          )}
        </div>
      )}
      {value && (
        <div>
          <div className={pageStyles.selectOption}>
            <div>{showText(value)}</div>
          </div>
          <button
            className={pageStyles.selectEditButton}
            onClick={() => onClick(null)}
          >
            수정하기
          </button>
        </div>
      )}
    </div>
  );
}
