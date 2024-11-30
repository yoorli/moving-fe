import React from 'react';

import 'react-calendar/dist/Calendar.css';
import './customCalendar.css';

interface MovingCommentProps {
  value: string | null | undefined;
  onClick: (value: string) => void;
}

export default function Comments({ value, onClick }: MovingCommentProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onClick(e.target.value);
  };

  return (
    <div>
      <div>
        <div>요청 사항이 있으면 적어 주세요</div>
        <textarea value={value || ''} onChange={handleChange} />
      </div>
      <div>
        <button>견적 확정하기</button>
      </div>
    </div>
  );
}
