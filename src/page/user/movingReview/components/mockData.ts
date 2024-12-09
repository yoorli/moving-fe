import { ChipType } from '../../../../components/card/type';

// 타입 정의
export interface Estimate {
  id: number; // 견적 ID
  moverId: string; // 기사님 ID
  isReviewWritten: boolean; // 리뷰 작성 여부
  serviceType: ChipType[]; // 기사님의 서비스 종류 (배열)
  isAssigned: boolean; // 지정 여부
  profileImage: string; // 프로필 이미지 URL
  nickname: string; // 기사님 별명
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
      id: 1,
      moverId: 'MOV001',
      isReviewWritten: false,
      serviceType: ['SMALL', 'HOUSE'],
      isAssigned: true,
      profileImage: 'https://via.placeholder.com/150',
      nickname: '김철수',
      movingDate: '2024. 11. 28',
      price: 250000,
    },
    {
      id: 2,
      moverId: 'MOV002',
      isReviewWritten: true,
      serviceType: ['OFFICE'],
      isAssigned: false,
      profileImage: 'https://via.placeholder.com/150',
      nickname: '이영희',
      movingDate: '2024. 12. 05',
      price: 400000,
    },
    {
      id: 3,
      moverId: 'MOV003',
      isReviewWritten: true,
      serviceType: ['SMALL'],
      isAssigned: true,
      profileImage: 'https://via.placeholder.com/150',
      nickname: '박민준',
      movingDate: '2024. 12. 10',
      price: 150000,
    },
    {
      id: 4,
      moverId: 'MOV004',
      isReviewWritten: false,
      serviceType: ['HOUSE'],
      isAssigned: true,
      profileImage: 'https://via.placeholder.com/150',
      nickname: '최지훈',
      movingDate: '2024. 11. 30',
      price: 320000,
    },
    {
      id: 5,
      moverId: 'MOV005',
      isReviewWritten: false,
      serviceType: ['OFFICE', 'HOUSE'],
      isAssigned: false,
      profileImage: 'https://via.placeholder.com/150',
      nickname: '장서윤',
      movingDate: '2024. 12. 15',
      price: 450000,
    },
    {
      id: 6,
      moverId: 'MOV006',
      isReviewWritten: true,
      serviceType: ['SMALL'],
      isAssigned: true,
      profileImage: 'https://via.placeholder.com/150',
      nickname: '한유진',
      movingDate: '2024. 12. 01',
      price: 180000,
    },
    {
      id: 7,
      moverId: 'MOV007',
      isReviewWritten: false,
      serviceType: ['HOUSE', 'SMALL'],
      isAssigned: true,
      profileImage: 'https://via.placeholder.com/150',
      nickname: '정하늘',
      movingDate: '2024. 11. 27',
      price: 280000,
    },
    {
      id: 8,
      moverId: 'MOV008',
      isReviewWritten: true,
      serviceType: ['OFFICE'],
      isAssigned: false,
      profileImage: 'https://via.placeholder.com/150',
      nickname: '오준서',
      movingDate: '2024. 12. 03',
      price: 380000,
    },
    {
      id: 9,
      moverId: 'MOV009',
      isReviewWritten: true,
      serviceType: ['HOUSE'],
      isAssigned: true,
      profileImage: 'https://via.placeholder.com/150',
      nickname: '서윤아',
      movingDate: '2024. 11. 26',
      price: 300000,
    },
    {
      id: 10,
      moverId: 'MOV010',
      isReviewWritten: false,
      serviceType: ['SMALL', 'OFFICE'],
      isAssigned: true,
      profileImage: 'https://via.placeholder.com/150',
      nickname: '노태훈',
      movingDate: '2024. 12. 08',
      price: 200000,
    },
  ],
};
