import { ChipType } from '../../components/card/type';

// 24시간 이하 - @시간/분 전, 이상 - yyyy. mm. dd 형식 출력
export function getDate(inputDate: string | Date) {
  const now = new Date();
  const date = new Date(inputDate);
  const difference = now.getTime() - date.getTime();
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (difference < 24 * 60 * 60 * 1000) {
    if (hours > 0) return `${hours}시간 전`;
    if (minutes > 0) return `${minutes}분 전`;
    // return `${seconds}초 전`;
  } else {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `작성일 ${year}. ${month}. ${day}`;
  }
}

export function getNotificationDate(inputDate: string | Date) {
  const now = new Date();
  const date = new Date(inputDate);
  const difference = now.getTime() - date.getTime();
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (difference < 24 * 60 * 60 * 1000) {
    if (hours > 0) return `${hours}시간 전`;
    if (minutes > 0) return `${minutes}분 전`;
    return `${seconds}초 전`;
  } else {
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}. ${month}. ${day}`;
  }
}

// 한국기준 금액 형식 출력
export function formatCurrency(cost: number, onlyNum?: boolean) {
  const price = cost.toLocaleString('ko-KR');

  return onlyNum ? price : price + '원';
}

// 칩 이중 배열 출력
export const getChips = (chipList: ChipType[], count: number) => {
  const chips: ChipType[][] = [];
  let k = 0;

  for (let i = 0; i < chipList.length / count; i++) {
    chips[i] = [];
    for (let j = k; j < k + count && j < chipList.length; j++) {
      chips[i].push(chipList[j]);
    }
    k += count;
  }
  return chips;
};

export const serviceTypeMapper: Record<string, string> = {
  SMALL: '소형이사',
  HOUSE: '가정이사',
  OFFICE: '사무실이사',
};

export const serviceRegionMapper: Record<string, string> = {
  SEOUL: '서울',
  GYEONGGI: '경기',
  INCHEON: '인천',
  GANGWON: '강원',
  CHUNGBUK: '충북',
  CHUNGNAM: '충남',
  SEJONG: '세종',
  DAEJEON: '대전',
  JEONBUK: '전북',
  JEONNAM: '전남',
  GWANGJU: '광주',
  GYEONGBUK: '경북',
  GYEONGNAM: '경남',
  DAEGU: '대구',
  ULSAN: '울산',
  BUSAN: '부산',
  JEJU: '제주',
};

// 제공 서비스 타입 번역(영 -> 한)
export const translateServiceType = (serviceType: string[]): string[] => {
  return serviceType.map(
    (type) => serviceTypeMapper[type] || '알 수 없는 유형',
  );
};

// 가능한 서비스 지역 번역(영 -> 한)
export const translateServiceRegion = (serviceRegion: string[]): string[] => {
  return (
    serviceRegion.map((region) => serviceRegionMapper[region]) ||
    '알 수 없는 지역'
  );
};
