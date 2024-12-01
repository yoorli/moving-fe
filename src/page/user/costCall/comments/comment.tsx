import React, { useState } from 'react';
import pageStyles from '../index.module.css';
import style from './comment.module.css';
import Button from '../../../../components/btn/Button';

import 'react-calendar/dist/Calendar.css';
import './customCalendar.css';

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
      <div className={pageStyles.white}>요청 사항이 있으면 적어 주세요</div>
      <div className={pageStyles.option}>
        <div className={style.layout}>
          <div className={style.text}>요청사항</div>
          <textarea
            className={style.textarea}
            name='comment'
            placeholder='요청사항을 입력해 주세요'
            value={comment}
            onChange={handleChange}
          />
          <Button
            className={style.btn}
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
