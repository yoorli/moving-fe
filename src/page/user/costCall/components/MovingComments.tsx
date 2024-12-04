import React, { useState } from 'react';
import pageStyle from '../index.module.css';
import style from './MovingComments.module.css';
import Button from '../../../../components/btn/Button';
import 'react-calendar/dist/Calendar.css';

interface MovingCommentProps {
  value: string | null | undefined;
  onClick: (value: string) => void;
  disabled: boolean;
  isModalOpen: (value: boolean) => void;
}

export default function MovingComments({
  value,
  onClick,
  disabled,
  isModalOpen,
}: MovingCommentProps) {
  const [comment, setComment] = useState<string>(value || '');
  const [inputCount, setInputCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    setInputCount(e.target.value.length);
  };

  const handleSelectClick = (comment: string) => {
    onClick(comment);
    isModalOpen(true);
  };

  return (
    <div>
      <div className={pageStyle.optionGuideBubble}>
        요청 사항이 있으면 적어 주세요
      </div>
      <div className={pageStyle.optionBubble}>
        <div className={style.formLayout}>
          <div className={style.inputLabel}>요청사항</div>
          <textarea
            className={style.textareaField}
            name='comment'
            placeholder='요청사항을 입력해 주세요'
            value={comment}
            onChange={handleChange}
            maxLength={250}
          />
          <p className={style.inputLabelLength}>
            <span>{inputCount}</span>
            <span>/250</span>
          </p>
          <Button
            className={style.submitButton}
            text='견적 확정하기'
            btnStyle='solid640pxBlue300'
            disabled={!disabled}
            onClick={() => handleSelectClick(comment)}
          />
        </div>
      </div>
    </div>
  );
}
