export interface Mover {
  serviceType: string[];
  isAssigned: boolean;
  nickname: string;
  profileImg: string;
  comment: string;
  score: number;
  reviewCount: number;
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
      serviceType: ['소형이사', '사무실이사'],
      isAssigned: true,
      nickname: '김기사',
      profileImg: 'https://via.placeholder.com/150',
      comment: '안전하고 빠른 이사 서비스!',
      score: 4.8,
      reviewCount: 120,
      career: 10,
      confirmationCount: 85,
      favoriteCount: 200,
    },
    {
      serviceType: ['가정이사'],
      isAssigned: false,
      nickname: '이기사',
      profileImg: 'https://via.placeholder.com/150',
      comment: '저렴하고 효율적인 이사!',
      score: 4.6,
      reviewCount: 95,
      career: 5,
      confirmationCount: 60,
      favoriteCount: 150,
    },
    {
      serviceType: ['사무실이사', '소형이사'],
      isAssigned: true,
      nickname: '박기사',
      profileImg: 'https://via.placeholder.com/150',
      comment: '친절과 신속한 서비스로 보답하겠습니다.',
      score: 4.9,
      reviewCount: 150,
      career: 8,
      confirmationCount: 100,
      favoriteCount: 250,
    },
    {
      serviceType: ['소형이사'],
      isAssigned: false,
      nickname: '최기사',
      profileImg: 'https://via.placeholder.com/150',
      comment: '최고의 이사 서비스 제공',
      score: 4.7,
      reviewCount: 80,
      career: 6,
      confirmationCount: 70,
      favoriteCount: 180,
    },
    {
      serviceType: ['가정이사', '사무실이사'],
      isAssigned: true,
      nickname: '송기사',
      profileImg: 'https://via.placeholder.com/150',
      comment: '신뢰받는 이사 전문가',
      score: 4.5,
      reviewCount: 90,
      career: 7,
      confirmationCount: 75,
      favoriteCount: 160,
    },
    {
      serviceType: ['소형이사'],
      isAssigned: false,
      nickname: '이기사',
      profileImg: 'https://via.placeholder.com/150',
      comment: '신속 정확한 이사!',
      score: 4.4,
      reviewCount: 70,
      career: 4,
      confirmationCount: 50,
      favoriteCount: 100,
    },
    {
      serviceType: ['사무실이사'],
      isAssigned: true,
      nickname: '박기사',
      profileImg: 'https://via.placeholder.com/150',
      comment: '이사 고민 해결사!',
      score: 4.9,
      reviewCount: 200,
      career: 12,
      confirmationCount: 150,
      favoriteCount: 300,
    },
    {
      serviceType: ['가정이사'],
      isAssigned: false,
      nickname: '정기사',
      profileImg: 'https://via.placeholder.com/150',
      comment: '늘 정성을 다하는 이사 서비스',
      score: 4.3,
      reviewCount: 60,
      career: 3,
      confirmationCount: 40,
      favoriteCount: 80,
    },
  ],
};
