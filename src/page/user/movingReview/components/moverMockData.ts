import { ChipType } from '../../../../types/cardTypes';

// 타입 정의
export interface Estimate {
  estimateId: number; // 견적 ID
  moverId: number; // 기사님 ID
  isReviewWritten: boolean; // 리뷰 작성 여부
  serviceType: ChipType[]; // 기사님의 서비스 종류 (배열)
  isAssigned: boolean; // 지정 여부
  profileImg: string; // 프로필 이미지 URL
  moverName: string; // 기사님 별명
  movingDate: string; // 이사 날짜
  price: number; // 견적 가격
}

export interface ApiResponse {
  total: number; // 리스트 총 갯수
  list: Estimate[]; // 견적 리스트
}

// Mock 데이터
export const mockData: ApiResponse = {
  total: 10,
  list: [
    {
      estimateId: 1,
      moverId: 1,
      isReviewWritten: false,
      serviceType: ['SMALL', 'HOUSE'],
      isAssigned: true,
      profileImg: 'https://via.placeholder.com/150',
      moverName: '김철수',
      movingDate: '2024. 11. 28',
      price: 250000,
    },
    {
      estimateId: 2,
      moverId: 2,
      isReviewWritten: true,
      serviceType: ['OFFICE'],
      isAssigned: false,
      profileImg: 'https://via.placeholder.com/150',
      moverName: '이영희',
      movingDate: '2024. 12. 05',
      price: 400000,
    },
    {
      estimateId: 3,
      moverId: 3,
      isReviewWritten: true,
      serviceType: ['SMALL'],
      isAssigned: true,
      profileImg: 'https://via.placeholder.com/150',
      moverName: '박민준',
      movingDate: '2024. 12. 10',
      price: 150000,
    },
    {
      estimateId: 4,
      moverId: 4,
      isReviewWritten: false,
      serviceType: ['HOUSE'],
      isAssigned: true,
      profileImg: 'https://via.placeholder.com/150',
      moverName: '최지훈',
      movingDate: '2024. 11. 30',
      price: 320000,
    },
    {
      estimateId: 5,
      moverId: 5,
      isReviewWritten: false,
      serviceType: ['OFFICE', 'HOUSE'],
      isAssigned: false,
      profileImg: 'https://via.placeholder.com/150',
      moverName: '장서윤',
      movingDate: '2024. 12. 15',
      price: 450000,
    },
    {
      estimateId: 6,
      moverId: 6,
      isReviewWritten: true,
      serviceType: ['SMALL'],
      isAssigned: true,
      profileImg: 'https://via.placeholder.com/150',
      moverName: '한유진',
      movingDate: '2024. 12. 01',
      price: 180000,
    },
    {
      estimateId: 7,
      moverId: 7,
      isReviewWritten: false,
      serviceType: ['HOUSE', 'SMALL'],
      isAssigned: true,
      profileImg: 'https://via.placeholder.com/150',
      moverName: '정하늘',
      movingDate: '2024. 11. 27',
      price: 280000,
    },
    {
      estimateId: 8,
      moverId: 8,
      isReviewWritten: true,
      serviceType: ['OFFICE'],
      isAssigned: false,
      profileImg: 'https://via.placeholder.com/150',
      moverName: '오준서',
      movingDate: '2024. 12. 03',
      price: 380000,
    },
    {
      estimateId: 9,
      moverId: 9,
      isReviewWritten: true,
      serviceType: ['HOUSE'],
      isAssigned: true,
      profileImg: 'https://via.placeholder.com/150',
      moverName: '서윤아',
      movingDate: '2024. 11. 26',
      price: 300000,
    },
    {
      estimateId: 10,
      moverId: 10,
      isReviewWritten: false,
      serviceType: ['SMALL', 'OFFICE'],
      isAssigned: true,
      profileImg: 'https://via.placeholder.com/150',
      moverName: '노태훈',
      movingDate: '2024. 12. 08',
      price: 200000,
    },
  ],
};
