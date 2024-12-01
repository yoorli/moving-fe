import { useState } from 'react';
import cn from 'classnames';
import pageStyles from '../index.module.css';
import styles from './MovingType.module.css';
import icCheckCircleLarge from '../../../../assets/icons/ic_check_circle_large.svg';
import icCheckCircleEmptyLarge from '../../../../assets/icons/ic_check_circle_empty_medium.svg';
// import icCheckCircleMedium from '../../../../assets/icons/ic_check_circle_medium.svg';
// import icCheckCircleEmptyMedium from '../../../../assets/icons/ic_check_circle_empty_large.svg';
import Button from '../../../../components/btn/Button';

type TypeValue = string | null;

interface MovingTypeProps {
  onClick: (type: TypeValue) => void;
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
      case 'SMALL':
        return '소형이사 (원룸, 투룸, 20평대 미만)';
      case 'HOUSE':
        return '가정이사 (쓰리룸, 20평대 이상)';
      case 'OFFICE':
        return '사무실이사 (사무실, 상업공간)';
      default:
        return '수정 버튼을 눌러 이사 종류를 다시 선택해 주세요.';
    }
  };

  return (
    <div>
      <div>
        <div className={pageStyles.optionGuideBubble}>
          몇 가지 정보만 알려 주시면 최대 5개의 견적을 받을 수 있어요 :)
        </div>
        <div className={pageStyles.optionGuideBubble}>
          이사 종류를 선택해 주세요
        </div>
      </div>
      {!value && (
        <div className={pageStyles.optionBubble}>
          {['SMALL', 'HOUSE', 'OFFICE'].map((option) => (
            <div
              key={option}
              className={cn(styles.option, {
                [styles.selectOption]: type === option,
              })}
              onClick={() => handleClick(option)}
            >
              <img
                className={styles.checkBox}
                src={
                  type === option ? icCheckCircleLarge : icCheckCircleEmptyLarge
                }
                width={36}
                height={36}
                alt=''
              />
              <div className={styles.optionText}>{showText(option)}</div>
            </div>
          ))}

          <Button
            text='선택완료'
            style='solid640pxBlue300'
            disabled={!type}
            onClick={() => handleSelectClick(type)}
          />
        </div>
      )}
      {value && (
        <div>
          <div className={pageStyles.selectOptionBubble}>
            <div>{showText(value)}</div>
          </div>
          <button
            className={pageStyles.editButton}
            onClick={() => onClick(null)}
          >
            수정하기
          </button>
        </div>
      )}
    </div>
  );
}
