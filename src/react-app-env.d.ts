/// <reference types="react-scripts" />

declare module 'holiday-kr' {
  interface HolidayKR {
    isHoliday(date: string): boolean;
    getLunar(date: Date): Date;
  }

  const holidayKR: HolidayKR;
  export = holidayKR;
}
