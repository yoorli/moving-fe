import { ChipType } from '../../../types/cardTypes';

export interface UserData {
  total: number; //리스트 총 갯수
  small: number; //SMALL 갯수
  medium: number; //중형이사 총 갯수
  large: number; //대형이사 총 갯수
  assign: number; //지정 견적 요청 총 갯수
  users: {
    id: number;
    movingType: ChipType;
    isAssigned: boolean;
    customerName: string;
    movingDate: string;
    departure: string;
    arrival: string;
    createAt: string;
    comment?: string;
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
      movingType: 'SMALL',
      isAssigned: false,
      customerName: '김민수',
      movingDate: '2024.07.01',
      departure: '서울특별시 강남구 대치동',
      arrival: '서울특별시 마포구 합정동',
      createAt: '2024.12.02 18:00:00',
    },
    {
      id: 2,
      movingType: 'HOUSE',
      isAssigned: true,
      customerName: '이지은',
      movingDate: '2024.07.15',
      departure: '서울특별시 은평구 응암동',
      arrival: '서울특별시 종로구 평창동',
      createAt: '2024.12.01 14:00:00',
      comment: '대형 가구 주의해서 운반 부탁드립니다.',
    },
    {
      id: 3,
      movingType: 'OFFICE',
      isAssigned: false,
      customerName: '박지훈',
      movingDate: '2024.08.01',
      departure: '경기도 성남시 판교역',
      arrival: '경기도 부천시 중동',
      createAt: '2024.12.03 12:30:00',
      comment: '사무용 장비 및 중요 서류 특별 취급 요망',
    },
    {
      id: 4,
      movingType: 'SMALL',
      isAssigned: true,
      customerName: '최영희',
      movingDate: '2024.09.01',
      departure: '인천광역시 연수구 송도동',
      arrival: '인천광역시 계양구 작전동',
      createAt: '2024.12.04 09:00:00',
      comment: '반려견 용품 조심스럽게 옮겨주세요.',
    },
    {
      id: 5,
      movingType: 'HOUSE',
      isAssigned: false,
      customerName: '정동원',
      movingDate: '2024.07.25',
      departure: '경기도 광주시 역동',
      arrival: '경기도 고양시 일산동',
      createAt: '2024.12.05 15:45:00',
      comment: '3층 주택 이사로 좁은 계단 주의해주세요.',
    },
    {
      id: 6,
      movingType: 'OFFICE',
      isAssigned: true,
      customerName: '한상윤',
      movingDate: '2024.08.10',
      departure: '서울특별시 동대문구 청량리',
      arrival: '서울특별시 강동구 천호동',
      createAt: '2024.12.06 10:15:00',
      comment: '고가 컴퓨터 장비 매우 조심스럽게 운반 필요',
    },
    {
      id: 7,
      movingType: 'SMALL',
      isAssigned: false,
      customerName: '윤서진',
      movingDate: '2024.10.01',
      departure: '경기도 평택시 평택역',
      arrival: '경기도 안산시 상록구',
      createAt: '2024.12.07 17:00:00',
      comment: '오후 이동 선호, 짐 적은 편입니다.',
    },
    {
      id: 8,
      movingType: 'HOUSE',
      isAssigned: false,
      customerName: '강민지',
      movingDate: '2024.08.20',
      departure: '인천광역시 남동구 간석동',
      arrival: '경기도 파주시 운정동',
      createAt: '2024.12.08 11:30:00',
      comment: '피아노 운송 시 특별 주의 요망',
    },
    {
      id: 9,
      movingType: 'OFFICE',
      isAssigned: true,
      customerName: '임재혁',
      movingDate: '2024.09.05',
      departure: '서울특별시 강서구 화곡동',
      arrival: '서울특별시 영등포구 여의도동',
      createAt: '2024.12.09 13:20:00',
      comment: '야간 작업 가능, 사무실 이전 신속하게 부탁드립니다.',
    },
    {
      id: 10,
      movingType: 'SMALL',
      isAssigned: false,
      customerName: '노현정',
      movingDate: '2024.10.10',
      departure: '경기도 용인시 수지구',
      arrival: '서울특별시 서대문구 충정로',
      createAt: '2024.12.10 16:45:00',
      comment: '1인 가구, 짐 적고 간단한 이동 원합니다.',
    },
  ],
};
