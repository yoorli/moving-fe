type ChipType = 'SMALL' | 'HOUSE' | 'OFFICE' | 'ASSIGN' | 'CONFIRM' | 'WAITING';

// 데이터 연결을 위한 임시 mockData (지울 예정)
export interface Mover {
  moverId: number;
  serviceType: ChipType[];
  isAssigned: boolean;
  moverName: string;
  profileImg: string;
  comment: string;
  reviewStats: {
    averageScore: number;
    totalReviews: number;
  };
  career: number;
  confirmationCount: number;
  favoriteCount: number;
}

export interface ApiResponse {
  total: number;
  list: Mover[];
}

export const mockData: ApiResponse = {
  total: 8,
  list: [
    {
      moverId: 1,
      serviceType: ['SMALL', 'OFFICE'],
      isAssigned: true,
      moverName: '김기사',
      profileImg: 'https://via.placeholder.com/150',
      comment: '안전하고 빠른 이사 서비스!',
      reviewStats: {
        averageScore: 4.8,
        totalReviews: 120,
      },
      career: 10,
      confirmationCount: 85,
      favoriteCount: 200,
    },
    {
      moverId: 2,
      serviceType: ['HOUSE'],
      isAssigned: false,
      moverName: '이기사',
      profileImg: 'https://via.placeholder.com/150',
      comment: '저렴하고 효율적인 이사!',
      reviewStats: {
        averageScore: 4.6,
        totalReviews: 95,
      },
      career: 5,
      confirmationCount: 60,
      favoriteCount: 150,
    },
    {
      moverId: 3,
      serviceType: ['OFFICE', 'SMALL'],
      isAssigned: true,
      moverName: '박기사',
      profileImg: 'https://via.placeholder.com/150',
      comment: '친절과 신속한 서비스로 보답하겠습니다.',
      reviewStats: {
        averageScore: 4.9,
        totalReviews: 150,
      },
      career: 8,
      confirmationCount: 100,
      favoriteCount: 250,
    },
    {
      moverId: 4,
      serviceType: ['SMALL'],
      isAssigned: false,
      moverName: '최기사',
      profileImg: 'https://via.placeholder.com/150',
      comment: '최고의 이사 서비스 제공',
      reviewStats: {
        averageScore: 4.7,
        totalReviews: 80,
      },
      career: 6,
      confirmationCount: 70,
      favoriteCount: 180,
    },
    {
      moverId: 5,
      serviceType: ['HOUSE', 'OFFICE'],
      isAssigned: true,
      moverName: '송기사',
      profileImg: 'https://via.placeholder.com/150',
      comment: '신뢰받는 이사 전문가',
      reviewStats: {
        averageScore: 4.5,
        totalReviews: 90,
      },
      career: 7,
      confirmationCount: 75,
      favoriteCount: 160,
    },
    {
      moverId: 6,
      serviceType: ['SMALL'],
      isAssigned: false,
      moverName: '이기사',
      profileImg: 'https://via.placeholder.com/150',
      comment: '신속 정확한 이사!',
      reviewStats: {
        averageScore: 4.4,
        totalReviews: 70,
      },
      career: 4,
      confirmationCount: 50,
      favoriteCount: 100,
    },
    {
      moverId: 7,
      serviceType: ['OFFICE'],
      isAssigned: true,
      moverName: '박기사',
      profileImg: 'https://via.placeholder.com/150',
      comment: '이사 고민 해결사!',
      reviewStats: {
        averageScore: 4.9,
        totalReviews: 200,
      },
      career: 12,
      confirmationCount: 150,
      favoriteCount: 300,
    },
    {
      moverId: 8,
      serviceType: ['HOUSE'],
      isAssigned: false,
      moverName: '정기사',
      profileImg: 'https://via.placeholder.com/150',
      comment: '늘 정성을 다하는 이사 서비스',
      reviewStats: {
        averageScore: 4.3,
        totalReviews: 60,
      },
      career: 3,
      confirmationCount: 40,
      favoriteCount: 80,
    },
  ],
};
