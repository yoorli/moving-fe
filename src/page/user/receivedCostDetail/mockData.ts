type ChipType = 'SMALL' | 'HOUSE' | 'OFFICE' | 'ASSIGN' | 'CONFIRM' | 'WAITING';

export interface infoProps {
  info: {
    id: number;
    movingType: string;
    movingRequest: string;
    movingDate: string;
    departure: string;
    arrival: string;
    comment: string;
    isConfirmed: boolean;
  };
}

export interface Mover {
  id: number;
  moverId: number;
  isConfirmed: boolean;
  serviceType: ChipType[];
  summary: string;
  isReqConfirmed: boolean;
  isAssigned: boolean;
  profileImage: string;
  nickname: string;
  reviewStats: {
    averageScore: number;
    totalReviews: number;
  };
  career: number;
  totalConfirmed: number;
  favoriteCount: number;
  price: number;
  isLiked: boolean;
  estimateId?: number; // 견적 ID 추가
}

export interface MoverList {
  list: Mover[];
}

export interface mockDataProps {
  info: {
    id: number;
    movingType: string;
    movingRequest: string;
    movingDate: string;
    departure: string;
    arrival: string;
    comment: string;
    isConfirmed: boolean;
  };
  total: number;
  list: Mover[];
}

export const mockData: mockDataProps = {
  info: {
    id: 1,
    movingType: 'SMALL',
    movingRequest: '2024.07.01',
    movingDate: '2024.07.01',
    departure: '서울특별시 강남구',
    arrival: '서울특별시 마포구',
    comment: '빠른 이사 선호',
    isConfirmed: true,
  },
  total: 8,
  list: [
    {
      id: 1,
      moverId: 2,
      isConfirmed: true,
      isReqConfirmed: true,
      serviceType: ['SMALL', 'OFFICE', 'HOUSE'],
      summary: '맡겨만 주세요!',
      isAssigned: true,
      profileImage: 'https://via.placeholder.com/150',
      nickname: '기사 별명',
      reviewStats: {
        averageScore: 4.8,
        totalReviews: 120,
      },
      career: 5,
      totalConfirmed: 200,
      favoriteCount: 160,
      price: 190000,
      isLiked: true,
    },
    {
      id: 1,
      moverId: 1,
      isConfirmed: false,
      isReqConfirmed: true,
      serviceType: ['HOUSE'],
      summary: '20년 경력입니다!',
      isAssigned: true,
      profileImage: 'https://via.placeholder.com/150',
      nickname: '이기사',
      reviewStats: {
        averageScore: 4.9,
        totalReviews: 150,
      },
      career: 8,
      totalConfirmed: 100,
      favoriteCount: 160,
      price: 190000,
      isLiked: false,
    },
  ],
};
