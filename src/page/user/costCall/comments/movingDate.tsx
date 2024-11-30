import { useState } from 'react';
import { Calendar } from 'react-calendar';
import { format } from 'date-fns';

import 'react-calendar/dist/Calendar.css';
import './customCalendar.css';

type ValuePiece = Date | null;

interface CalendarTestProps {
  onClick: (newDate: string | null) => void;

  value: string | null;
}

export default function CalenderTest({ onClick, value }: CalendarTestProps) {
  const [date, setDate] = useState<ValuePiece>(null);

  const today = new Date();

  const handleDateChange = (newDate: ValuePiece) => {
    setDate(newDate);
  };

  const handleSelectClick = (date: Date | null) => {
    if (date) {
      const formatDate = new Date(date)
        .toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/\//g, '.');

      onClick(formatDate);
    }
  };

  const handleCalendarChange = (
    newValue: ValuePiece | [ValuePiece, ValuePiece],
  ) => {
    if (newValue instanceof Date) {
      handleDateChange(newValue);
    }
  };

  return (
    <div>
      <div>이사 예정일을 선택해 주세요</div>
      <div>
        <Calendar
          locale='ko'
          onChange={handleCalendarChange}
          value={date}
          calendarType='gregory'
          view='month'
          prev2Label={null}
          next2Label={null}
          minDate={today}
          formatDay={(locale, date) => format(date, 'd')}
        />
        <div>{date ? `선택된 날짜: ${value}` : '날짜를 선택하세요'}</div>
        <button onClick={() => handleSelectClick(date)}>선택완료</button>
      </div>
      {value && (
        <div>
          <div>{value}</div>
          <button onClick={() => onClick(null)}>수정하기</button>
        </div>
      )}
    </div>
  );
}
