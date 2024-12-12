import { ChipType } from '../../../components/card/type';

export interface UserData {
  users: {
    estimateReqId?: number; // 견적 요청 ID
    estimateId?: number; // 견적 ID
    movingType?: ChipType; // 서비스 유형
    isConfirmed?: boolean; // 확정된 요청인지 확인(true)
    isCancelled?: boolean; // 취소 여부 (false)
    isAssigned?: boolean; // 지정경적 여부
    customerName: string; // 고객 이름
    movingDate?: string; // 이사 날짜
    departure?: string; // 출발지
    arrival?: string; // 도착지
    price?: number; //견적가
    isMoveDateOver?: boolean; // 이사일의 지남 여부
    isReqConfirmed?: boolean; // 해당 견적이 속한 요청의 확정 여부
    isRejected?: boolean; //반려 여부
  }[];
}

export const mockData: UserData = {
  users: [
    {
      estimateId: 1,
      movingType: 'SMALL',
      isConfirmed: true,
      isAssigned: true,
      customerName: '김민수',
      movingDate: '2024.12.10',
      departure: '서울특별시 강남구 대치동',
      arrival: '서울특별시 마포구 합정동',
      price: 450000,
      isMoveDateOver: true,
      isReqConfirmed: true,
    },
    {
      estimateId: 2,
      movingType: 'HOUSE',
      isConfirmed: false,
      isAssigned: true,
      customerName: '이지은',
      movingDate: '2024.07.15',
      departure: '서울특별시 은평구 응암동',
      arrival: '서울특별시 종로구 평창동',
      price: 5200000,
      isMoveDateOver: true,
      isReqConfirmed: true,
    },
    {
      estimateId: 3,
      movingType: 'OFFICE',
      isConfirmed: true,
      isAssigned: false,
      customerName: '박지훈',
      movingDate: '2024.08.01',
      departure: '경기도 성남시 판교역',
      arrival: '경기도 부천시 중동',
      price: 8500000,
      isMoveDateOver: true,
      isReqConfirmed: false,
    },
    {
      estimateId: 4,
      movingType: 'SMALL',
      isConfirmed: false,
      isCancelled: true,
      isAssigned: false,
      customerName: '최영희',
      movingDate: '2024.09.01',
      departure: '인천광역시 연수구 송도동',
      arrival: '인천광역시 계양구 작전동',
      price: 180000,
      isMoveDateOver: false,
      isReqConfirmed: false,
      isRejected: false,
    },
    {
      estimateId: 5,
      movingType: 'HOUSE',
      isConfirmed: true,
      isAssigned: true,
      customerName: '정동원',
      movingDate: '2024.10.20',
      departure: '경기도 안양시 동안구',
      arrival: '서울특별시 서대문구 남가좌동',
      price: 4700000,
      isMoveDateOver: false,
      isReqConfirmed: true,
    },
    {
      estimateId: 6,
      movingType: 'OFFICE',
      isConfirmed: false,
      isAssigned: true,
      customerName: '한상윤',
      movingDate: '2024.11.01',
      departure: '서울특별시 동대문구 청량리동',
      arrival: '서울특별시 강북구 수유동',
      price: 6300000,
      isMoveDateOver: false,
      isReqConfirmed: true,
    },
    {
      estimateId: 7,
      movingType: 'SMALL',
      isConfirmed: true,
      isAssigned: false,
      customerName: '윤서진',
      movingDate: '2024.12.05',
      departure: '서울특별시 성동구 성수동',
      arrival: '경기도 광주시 탄벌동',
      price: 150000,
      isMoveDateOver: true,
      isReqConfirmed: true,
    },
    {
      estimateId: 8,
      movingType: 'OFFICE',
      isConfirmed: false,
      isAssigned: false,
      customerName: '강민지',
      movingDate: '2024.06.25',
      departure: '인천광역시 남동구 간석동',
      arrival: '경기도 수원시 팔달구',
      price: 7200000,
      isMoveDateOver: false,
      isReqConfirmed: false,
      isRejected: true,
    },
    {
      estimateId: 9,
      movingType: 'HOUSE',
      isConfirmed: true,
      isAssigned: true,
      customerName: '임재혁',
      movingDate: '2024.08.15',
      departure: '경기도 성남시 분당구',
      arrival: '서울특별시 관악구 신림동',
      price: 3900000,
      isMoveDateOver: true,
      isReqConfirmed: true,
    },
    {
      estimateId: 10,
      movingType: 'OFFICE',
      isConfirmed: false,
      isAssigned: true,
      customerName: '노현정',
      movingDate: '2024.09.10',
      departure: '경기도 용인시 수지구',
      arrival: '서울특별시 중랑구 면목동',
      price: 7600000,
      isMoveDateOver: true,
      isReqConfirmed: true,
    },
  ],
};