export type EditFormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  image: File | null;
  region: ServiceRegion | undefined;
};
export type EditFormValidation = {
  name: boolean;
  email: boolean;
  phoneNumber: boolean;
  currentPassword: boolean;
  newPassword: boolean;
  confirmNewPassword: boolean;
  image: boolean;
  region: boolean;
};

export enum ServiceRegion {
  SEOUL = '서울',
  GYEONGGI = '경기',
  INCHEON = '인천',
  GANGWON = '강원',
  CHUNGBUK = '충북',
  CHUNGNAM = '충남',
  SEJONG = '세종',
  DAEJEON = '대전',
  JEONBUK = '전북',
  JEONNAM = '전남',
  GWANGJU = '광주',
  GYEONGBUK = '경북',
  GYEONGNAM = '경남',
  DAEGU = '대구',
  ULSAN = '울산',
  BUSAN = '부산',
  JEJU = '제주',
}
