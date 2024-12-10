import { ChipType } from "../../../components/card/type";

export interface UserData {
  users: {
    id: number; // 고객 아이디
    movingType?: ChipType[]; // 서비스 유형
    isConfirmed?: boolean; // 확정된 요청인지 확인(true)
    isCancelled?: boolean; // 취소 여부 (false)
    isAssigned?: boolean; // 지정경적 여부
    customer: string; // 고객 이름
    movingDate?: string; // 이사 날짜
    departure?: string; // 출발지
    arrival?: string; // 도착지
    price?: number; //견적가
  }[];
}

export const mockData: UserData = {
  users: [
    {
      id: 1,
      movingType: ['SMALL', 'OFFICE'],
      isConfirmed: true,
      isCancelled: false,
      isAssigned: true,
      customer: 'user1',
      movingDate: '2024.12.10',
      departure: '서울특별시 강남구',
      arrival: '서울특별시 마포구',
      price: 500000,
    },
    {
      id: 2,
      movingType: ['HOUSE'],
      isConfirmed: false,
      isCancelled: false,
      isAssigned: true,
      customer: 'user2',
      movingDate: '2024.07.15',
      departure: '서울특별시 은평구',
      arrival: '서울특별시 종로구',
      price: 500000,
    },
    {
      id: 3,
      movingType: ['OFFICE'],
      isConfirmed: true,
      isCancelled: false,
      isAssigned: false,
      customer: 'user3',
      movingDate: '2024.08.01',
      departure: '경기도 성남시',
      arrival: '경기도 부천시',
      price: 650000,
    },
    {
      id: 4,
      movingType: ['SMALL'],
      isConfirmed: false,
      isCancelled: true,
      isAssigned: false,
      customer: 'user4',
      movingDate: '2024.09.01',
      departure: '인천광역시 연수구',
      arrival: '인천광역시 계양구',
      price: 720000,
    },
    {
      id: 5,
      movingType: ['HOUSE'],
      isConfirmed: true,
      isCancelled: false,
      isAssigned: true,
      customer: 'user5',
      movingDate: '2024.10.20',
      departure: '경기도 안양시',
      arrival: '서울특별시 서대문구',
      price: 550000,
    },
    {
      id: 6,
      movingType: ['OFFICE'],
      isConfirmed: false,
      isCancelled: false,
      isAssigned: true,
      customer: 'user6',
      movingDate: '2024.11.01',
      departure: '서울특별시 동대문구',
      arrival: '서울특별시 강북구',
      price: 480000,
    },
    {
      id: 7,
      movingType: ['SMALL'],
      isConfirmed: true,
      isCancelled: false,
      isAssigned: false,
      customer: 'user7',
      movingDate: '2024.12.05',
      departure: '서울특별시 성동구',
      arrival: '경기도 광주시',
      price: 610000,
    },
    {
      id: 8,
      movingType: ['HOUSE', 'OFFICE'],
      isConfirmed: false,
      isCancelled: true,
      isAssigned: false,
      customer: 'user8',
      movingDate: '2024.06.25',
      departure: '인천광역시 남동구',
      arrival: '경기도 수원시',
      price: 700000,
    },
    {
      id: 9,
      movingType: ['HOUSE'],
      isConfirmed: true,
      isCancelled: false,
      isAssigned: true,
      customer: 'user9',
      movingDate: '2024.08.15',
      departure: '경기도 성남시',
      arrival: '서울특별시 관악구',
      price: 640000,
    },
    {
      id: 10,
      movingType: ['OFFICE'],
      isConfirmed: false,
      isCancelled: false,
      isAssigned: true,
      customer: 'user10',
      movingDate: '2024.09.10',
      departure: '경기도 용인시',
      arrival: '서울특별시 중랑구',
      price: 580000,
    },
  ],
};