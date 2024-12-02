import { useState } from 'react';
import { Calendar } from 'react-calendar';
import { format } from 'date-fns';
import pageStyle from '../index.module.css';
import Button from '../../../../components/btn/Button';
import 'react-calendar/dist/Calendar.css';
import './MovingDate.css';

type DateValue = Date | null;
interface CalendarTestProps {
  onClick: (newDate: string | null) => void;
  value: string | null;
}

export default function CalenderTest({ onClick, value }: CalendarTestProps) {
  const [date, setDate] = useState<DateValue>(null);

  const today = new Date();

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
    newValue: DateValue | [DateValue, DateValue],
  ) => {
    if (newValue instanceof Date) {
      setDate(newValue);
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
      <div className={pageStyle.optionGuideBubble}>
        이사 예정일을 선택해 주세요
      </div>
      {!value && (
        <div className={pageStyle.optionBubble}>
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
            btnStyle='solid640pxBlue300'
            disabled={!date}
            onClick={() => handleSelectClick(date)}
          />
        </div>
      )}
      {value && (
        <div>
          <div className={pageStyle.selectOptionBubble}>
            {dateFormat(value)}
          </div>
          <button
            className={pageStyle.editButton}
            onClick={() => onClick(null)}
          >
            수정하기
          </button>
        </div>
      )}
    </div>
  );
}
