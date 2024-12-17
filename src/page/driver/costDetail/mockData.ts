import { ChipType } from '../../../types/cardTypes';

export interface UserData {
  users: {
    estimateId: number;
    movingType: ChipType;
    isAssigned: boolean;
    customerName: string;
    movingDate: string;
    movingRequest: string;
    departure: string;
    arrival: string;
    detailDeparture: string;
    detailArrival: string;
    price: number;
    moverComment?: string;
    customerComment?: string;
  }[];
}

export const mockData: UserData = {
  users: [
    {
      estimateId: 1,
      movingType: 'SMALL',
      isAssigned: false,
      customerName: '김민수',
      movingDate: '2024.07.01',
      movingRequest: '2024.07.01',
      departure: '서울시 강남구',
      arrival: '서울시 마포구',
      detailDeparture: '서울특별시 강남구 대치동',
      detailArrival: '서울특별시 마포구 합정동',
      price: 250000,
    },
    {
      estimateId: 2,
      movingType: 'HOUSE',
      isAssigned: true,
      customerName: '이지은',
      movingDate: '2024.07.15',
      movingRequest: '2024.07.15',
      departure: '서울시 은평구',
      arrival: '서울시 종로구',
      detailDeparture: '서울특별시 은평구 응암동',
      detailArrival: '서울특별시 종로구 평창동',
      price: 5200000,
      moverComment: '대형 가구로 인한 추가 비용 청구',
      customerComment: '대형 가구 있어 특별 주의 필요, 주말 오전 이동 희망',
    },
    {
      estimateId: 3,
      movingType: 'OFFICE',
      isAssigned: false,
      customerName: '박지훈',
      movingDate: '2024.08.01',
      movingRequest: '2024.08.01',
      departure: '경기도 성남시',
      arrival: '경기도 부천시',
      detailDeparture: '경기도 성남시 판교역',
      detailArrival: '경기도 부천시 중동',
      price: 8500000,
      moverComment: '고가 장비 및 포장 인건비로 인한 추가 비용 청구',
      customerComment: '사무용 고가 장비 운송, 전문 포장 필요',
    },
    {
      estimateId: 4,
      movingType: 'SMALL',
      isAssigned: true,
      customerName: '최영희',
      movingDate: '2024.09.01',
      movingRequest: '2024.09.01',
      departure: '인천시 연수구',
      arrival: '인천시 계양구',
      detailDeparture: '인천광역시 연수구 송도동',
      detailArrival: '인천광역시 계양구 작전동',
      price: 180000,
      customerComment: '반려견 동반, 애완용품 특별 취급 요망',
    },
    {
      estimateId: 5,
      movingType: 'HOUSE',
      isAssigned: false,
      customerName: '정동원',
      movingDate: '2024.07.25',
      movingRequest: '2024.07.25',
      departure: '경기도 광주시',
      arrival: '경기도 고양시',
      detailDeparture: '경기도 광주시 역동',
      detailArrival: '경기도 고양시 일산동',
      price: 4700000,
      moverComment: '장비 추가 대여여로 인한 추가 비용 청구',
      customerComment: '3층 주택, 좁은 계단 있음. 가구 분해 후 운송 필요',
    },
    {
      estimateId: 6,
      movingType: 'OFFICE',
      isAssigned: true,
      customerName: '한상윤',
      movingDate: '2024.08.10',
      movingRequest: '2024.08.10',
      departure: '서울시 동대문구',
      arrival: '서울시 강동구',
      detailDeparture: '서울특별시 동대문구 청량리',
      detailArrival: '서울특별시 강동구 천호동',
      price: 6300000,
      customerComment: '중요 서류 및 컴퓨터 장비 운송, 최대한 주의 요망',
    },
    {
      estimateId: 7,
      movingType: 'SMALL',
      isAssigned: false,
      customerName: '윤서진',
      movingDate: '2024.10.01',
      movingRequest: '2024.10.01',
      departure: '서울시 평택시',
      arrival: '서울시 안산시',
      detailDeparture: '경기도 평택시 평택역',
      detailArrival: '경기도 안산시 상록구',
      price: 150000,
      customerComment: '오후 이동 선호, 짐 적은 편임',
    },
    {
      estimateId: 8,
      movingType: 'HOUSE',
      isAssigned: false,
      customerName: '강민지',
      movingDate: '2024.08.20',
      movingRequest: '2024.08.20',
      departure: '인천시 남동구',
      arrival: '경기도 파주시',
      detailDeparture: '인천광역시 남동구 간석동',
      detailArrival: '경기도 파주시 운정동',
      price: 3900000,
      moverComment: '대형 가구 및 취급 주의 포장으로 인한 추가 비용 청구',
      customerComment: '피아노 운송 필요, 전문 취급 요청',
    },
    {
      estimateId: 9,
      movingType: 'OFFICE',
      isAssigned: true,
      customerName: '임재혁',
      movingDate: '2024.09.05',
      movingRequest: '2024.09.05',
      departure: '서울시 강서구',
      arrival: '서울시 영등포구',
      detailDeparture: '서울특별시 강서구 화곡동',
      detailArrival: '서울특별시 영등포구 여의도동',
      price: 7200000,
      customerComment: '사무실 이전, 야간 작업 가능',
    },
    {
      estimateId: 10,
      movingType: 'SMALL',
      isAssigned: false,
      customerName: '노현정',
      movingDate: '2024.10.10',
      movingRequest: '2024.10.10',
      departure: '경기도 용인시',
      arrival: '서울시 서대문구',
      detailDeparture: '경기도 용인시 수지구',
      detailArrival: '서울특별시 서대문구 충정로',
      price: 120000,
      customerComment: '1인 가구, 짐 적고 간단한 이동',
    },
  ],
};
