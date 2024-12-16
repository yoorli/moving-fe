import { useState } from 'react';
import { Calendar } from 'react-calendar';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import pageStyle from '../index.module.css';
import Button from '../../../../components/btn/Button';
import 'react-calendar/dist/Calendar.css';
import './MovingDate.css';
import holidayKR from 'holiday-kr';

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
      onClick(date.toString());
    }
  };

  const handleCalendarChange = (
    newValue: DateValue | [DateValue, DateValue],
  ) => {
    if (newValue instanceof Date) {
      setDate(newValue);
    }
  };

  const dateFormat = (value: Date | null): string => {
    if (value) {
      return format(value, 'yyyy. MM. dd EEEE', { locale: ko });
    }
    return '수정 버튼을 눌러 날짜를 다시 선택해 주세요.';
  };

  const addContent = ({ date }: any) => {
    const contents = [];
    const daysToCheck = [9, 10, 19, 20, 29, 30];

    const lunarDate: any = holidayKR.getLunar(new Date(date));
    const { day } = lunarDate;

    if (daysToCheck.includes(day)) {
      contents.push(
        <div
          key={date.toString()}
          style={{
            position: 'relative',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: 'var(--red-200)',
            marginTop: '5px',
          }}
        />,
      );
    }

    return <>{contents}</>;
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
            tileContent={addContent}
            formatDay={(locale, date) => format(date, 'd')}
            formatMonthYear={(locale, date) => format(date, 'yyyy. MM')}
          />
          <div className='noticeText'>
            ※손없는 날(표시된 날)과 금요일을 피하시면 비교적 저렴하게 이사가
            가능합니다.
          </div>
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
            {dateFormat(new Date(value))}
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
