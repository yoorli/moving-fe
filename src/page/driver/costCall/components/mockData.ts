import { ChipType } from "../../../../components/card/type";

export interface UserData {
  total: number; //리스트 총 갯수
  small: number; //SMALL 갯수
  medium: number; //중형이사 총 갯수
  large: number; //대형이사 총 갯수
  assign: number; //지정 견적 요청 총 갯수
  users: {
    id: number;
    movingType: ChipType[];
    isAssigned: boolean;
    customer: string;
    movingDate: string;
    departure: string;
    arrival: string;
    createAt: string;
  }[];
}

export const mockData: UserData = {
  total: 10,
  small: 4,
  medium: 3,
  large: 3,
  assign: 4,
  users: [
    {
      id: 1,
      movingType: ['SMALL'],
      isAssigned: false,
      customer: 'user1',
      movingDate: '2024.07.01',
      departure: '서울특별시 강남구',
      arrival: '서울특별시 마포구',
      createAt: '2024.12.02 18:00:00',
    },
    {
      id: 2,
      movingType: ['HOME'],
      isAssigned: true,
      customer: 'user2',
      movingDate: '2024.07.15',
      departure: '서울특별시 은평구',
      arrival: '서울특별시 종로구',
      createAt: '2024.12.01 14:00:00',
    },
    {
      id: 3,
      movingType: ['COMPANY'],
      isAssigned: false,
      customer: 'user3',
      movingDate: '2024.08.01',
      departure: '경기도 성남시',
      arrival: '경기도 부천시',
      createAt: '2024.12.03 12:30:00',
    },
    {
      id: 4,
      movingType: ['SMALL'],
      isAssigned: true,
      customer: 'user4',
      movingDate: '2024.09.01',
      departure: '인천광역시 연수구',
      arrival: '인천광역시 계양구',
      createAt: '2024.12.04 09:00:00',
    },
    {
      id: 5,
      movingType: ['HOME'],
      isAssigned: false,
      customer: 'user5',
      movingDate: '2024.07.25',
      departure: '경기도 광주시',
      arrival: '경기도 고양시',
      createAt: '2024.12.05 15:45:00',
    },
    {
      id: 6,
      movingType: ['COMPANY'],
      isAssigned: true,
      customer: 'user6',
      movingDate: '2024.08.10',
      departure: '서울특별시 동대문구',
      arrival: '서울특별시 강동구',
      createAt: '2024.12.06 10:15:00',
    },
    {
      id: 7,
      movingType: ['SMALL'],
      isAssigned: false,
      customer: 'user7',
      movingDate: '2024.10.01',
      departure: '경기도 평택시',
      arrival: '경기도 안산시',
      createAt: '2024.12.07 17:00:00',
    },
    {
      id: 8,
      movingType: ['HOME'],
      isAssigned: false,
      customer: 'user8',
      movingDate: '2024.08.20',
      departure: '인천광역시 남동구',
      arrival: '경기도 파주시',
      createAt: '2024.12.08 11:30:00',
    },
    {
      id: 9,
      movingType: ['COMPANY'],
      isAssigned: true,
      customer: 'user9',
      movingDate: '2024.09.05',
      departure: '서울특별시 강서구',
      arrival: '서울특별시 영등포구',
      createAt: '2024.12.09 13:20:00',
    },
    {
      id: 10,
      movingType: ['SMALL'],
      isAssigned: false,
      customer: 'user10',
      movingDate: '2024.10.10',
      departure: '경기도 용인시',
      arrival: '서울특별시 서대문구',
      createAt: '2024.12.10 16:45:00',
    },
  ],
};
