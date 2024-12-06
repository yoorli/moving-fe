declare module 'holiday-kr' {
  interface LunarDate {
    year: number;
    month: number;
    day: number;
    leapMonth: boolean;
    dayOfWeek: string;
  }

  interface HolidayKR {
    isHoliday(date: string): boolean;
    getLunar(date: Date): LunarDate;
  }

  const holidayKR: HolidayKR;
  export default holidayKR;
}
