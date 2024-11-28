import { useState } from 'react';
import { Calendar } from 'react-calendar';

import { format } from 'date-fns';

import 'react-calendar/dist/Calendar.css';
import './customCalendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// type CalendarTestProps = {
//   value: ValuePiece;
// };

export default function CalenderTest() {
  const [date, onChange] = useState<Value>(new Date());

  const today = new Date();

  // const addContent = ({ date }: { date: Date }) => {
  //   // 예를 들어, 15일에 "휴일"이라고 표시

  //   // console.log(Date(date));

  //   if (date.getDate() === 15) {
  //     return <div style={{ color: 'blue' }}>휴일</div>;
  //   }
  //   return null; // 나머지 날짜는 기본 상태로 표시
  // };

  return (
    <div>
      <Calendar
        locale='ko'
        onChange={onChange}
        value={date}
        calendarType='gregory'
        view='month'
        prev2Label={null}
        next2Label={null}
        minDate={today}
        formatDay={(locale, date) => format(date, 'd')}
        // tileContent={addContent}
      />
      {/* <div>{value ? `선택된 날짜: ${value}` : '날짜를 선택하세요'}</div> */}
      <button> 선택완료 </button>
    </div>
  );
}
