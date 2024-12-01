import { useState } from 'react';
import { Calendar } from 'react-calendar';
import { format } from 'date-fns';
import pageStyles from '../index.module.css';
import Button from '../../../../components/btn/Button';

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

  const dateFormat = (value: string | null): string => {
    if (value) {
      return new Date(value).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    return '수정 버튼을 눌러 날짜를 다시 선택해 주세요.';
  };

  return (
    <div>
      <div className={pageStyles.white}>이사 예정일을 선택해 주세요</div>
      {!value && (
        <div className={pageStyles.option}>
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
            formatMonthYear={(locale, date) => format(date, 'yyyy. MM')}
          />

          <Button
            text='선택완료'
            style='solid640pxBlue300'
            disabled={!date}
            onClick={() => handleSelectClick(date)}
          />
        </div>
      )}
      {value && (
        <div>
          <div className={pageStyles.selectOption}>{dateFormat(value)}</div>
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
