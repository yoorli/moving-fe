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
      customerName: 'user1',
      movingDate: '2024.12.10',
      departure: '서울특별시 강남구',
      arrival: '서울특별시 마포구',
      price: 500000,
      isMoveDateOver: true,
      isReqConfirmed: true,
    },
    {
      estimateId: 2,
      movingType: 'HOUSE',
      isConfirmed: false,
      isAssigned: true,
      customerName: 'user2',
      movingDate: '2024.07.15',
      departure: '서울특별시 은평구',
      arrival: '서울특별시 종로구',
      price: 500000,
      isMoveDateOver: true,
      isReqConfirmed: true,
    },
    {
      estimateId: 3,
      movingType: 'OFFICE',
      isConfirmed: true,
      isAssigned: false,
      customerName: 'user3',
      movingDate: '2024.08.01',
      departure: '경기도 성남시',
      arrival: '경기도 부천시',
      price: 650000,
      isMoveDateOver: true,
      isReqConfirmed: false,
    },
    {
      estimateId: 4,
      movingType: 'SMALL',
      isConfirmed: false,
      isCancelled: true,
      isAssigned: false,
      customerName: 'user4',
      movingDate: '2024.09.01',
      departure: '인천광역시 연수구',
      arrival: '인천광역시 계양구',
      price: 720000,
      isMoveDateOver: false,
      isReqConfirmed: false,
      isRejected: false,
    },
    {
      estimateId: 5,
      movingType: 'HOUSE',
      isConfirmed: true,
      isAssigned: true,
      customerName: 'user5',
      movingDate: '2024.10.20',
      departure: '경기도 안양시',
      arrival: '서울특별시 서대문구',
      price: 550000,
      isMoveDateOver: false,
      isReqConfirmed: true,
    },
    {
      estimateId: 6,
      movingType: 'OFFICE',
      isConfirmed: false,
      isAssigned: true,
      customerName: 'user6',
      movingDate: '2024.11.01',
      departure: '서울특별시 동대문구',
      arrival: '서울특별시 강북구',
      price: 480000,
      isMoveDateOver: false,
      isReqConfirmed: true,
    },
    {
      estimateId: 7,
      movingType: 'SMALL',
      isConfirmed: true,
      isAssigned: false,
      customerName: 'user7',
      movingDate: '2024.12.05',
      departure: '서울특별시 성동구',
      arrival: '경기도 광주시',
      price: 610000,
      isMoveDateOver: true,
      isReqConfirmed: true,
    },
    {
      estimateId: 8,
      movingType: 'OFFICE',
      isConfirmed: false,
      isAssigned: false,
      customerName: 'user8',
      movingDate: '2024.06.25',
      departure: '인천광역시 남동구',
      arrival: '경기도 수원시',
      price: 700000,
      isMoveDateOver: false,
      isReqConfirmed: false,
      isRejected: true,
    },
    {
      estimateId: 9,
      movingType: 'HOUSE',
      isConfirmed: true,
      isAssigned: true,
      customerName: 'user9',
      movingDate: '2024.08.15',
      departure: '경기도 성남시',
      arrival: '서울특별시 관악구',
      price: 640000,
      isMoveDateOver: true,
      isReqConfirmed: true,
    },
    {
      estimateId: 10,
      movingType: 'OFFICE',
      isConfirmed: false,
      isAssigned: true,
      customerName: 'user10',
      movingDate: '2024.09.10',
      departure: '경기도 용인시',
      arrival: '서울특별시 중랑구',
      price: 580000,
      isMoveDateOver: true,
      isReqConfirmed: true,
    },
  ],
};
