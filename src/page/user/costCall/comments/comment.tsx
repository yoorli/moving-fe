import React, { useState } from 'react';
import pageStyles from '../index.module.css';
import styles from './Comment.module.css';
import Button from '../../../../components/btn/Button';
import 'react-calendar/dist/Calendar.css';
import './MovingDate.css';

interface MovingCommentProps {
  value: string | null | undefined;
  onClick: (value: string) => void;
  disabled: boolean;
}

export default function Comments({
  value,
  onClick,
  disabled,
}: MovingCommentProps) {
  const [comment, setComment] = useState<string>(value || '');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSelectClick = (comment: string) => {
    onClick(comment);
  };

  return (
    <div>
      <div className={pageStyles.optionGuideBubble}>
        요청 사항이 있으면 적어 주세요
      </div>
      <div className={pageStyles.optionBubble}>
        <div className={styles.formLayout}>
          <div className={styles.inputLabel}>요청사항</div>
          <textarea
            className={styles.textareaField}
            name='comment'
            placeholder='요청사항을 입력해 주세요'
            value={comment}
            onChange={handleChange}
          />
          <Button
            className={styles.submitButton}
            text='견적 확정하기'
            style='solid640pxBlue300'
            disabled={!disabled}
            onClick={() => handleSelectClick(comment)}
          />
        </div>
      </div>
    </div>
  );
}
