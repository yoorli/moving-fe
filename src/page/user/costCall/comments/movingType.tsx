import { useState } from 'react';
import pageStyles from '../index.module.css';
import styles from './movingType.module.css';

type ValuePiece = string | null;

interface MovingTypeProps {
  onClick: (type: ValuePiece) => void;
  value: string | null;
}

export default function MovingType({ onClick, value }: MovingTypeProps) {
  const [type, setType] = useState('');

  const handleClick = (option: string) => {
    setType(option);
  };

  const handleSelectClick = (type: string | null) => {
    onClick(type);
  };

  return (
    <div>
      <div>
        <div className={pageStyles.white}>
          몇 가지 정보만 알려 주시면 최대 5개의 견적을 받을 수 있어요 :)
        </div>
        <div className={pageStyles.white}>이사 종류를 선택해 주세요</div>
      </div>
      <div className={pageStyles.selectOption}>
        <div className={styles.option} onClick={() => handleClick('option1')}>
          소형이사 (원룸, 투룸, 20평대 미만)
        </div>
        <div className={styles.option} onClick={() => handleClick('option2')}>
          가정이사 (쓰리룸, 20평대 이상)
        </div>
        <div className={styles.option} onClick={() => handleClick('option3')}>
          사무실이사 (사무실, 상업공간)
        </div>
        <div
          className={styles.optionBtn}
          onClick={() => handleSelectClick(type)}
        >
          선택완료
        </div>
      </div>
      {type && (
        <div>
          <div>{value}</div>
          <button onClick={() => onClick(null)}>수정하기</button>
        </div>
      )}
    </div>
  );
}
