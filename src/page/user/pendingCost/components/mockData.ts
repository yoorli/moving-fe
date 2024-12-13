import { ChipType } from '../../../../components/card/type';

export interface PendingListType {
  estimateId: number; // 견적 ID
  moverId: number; // 기사님 ID
  serviceType: ChipType[]; // 기사의 이사 서비스 종류
  isAssigned: boolean; // 지정 견적 요청 여부(true)
  profileImg: string; // 프로필 이미지 URL
  moverName: string; // 기사 별명
  reviewStats: {
    // 리뷰 내용
    averageScore: number; // 총 별점
    totalReviews: number; // 리뷰 개수
  };
  career: number; // 경력
  confirmationCount: number; // 총 확정 개수 totalContirmed
  favoriteCount: number; // 기사님이 찜된 횟수
  isReqConfirmed: boolean; // 해당 견적이 속한 요청의 확정 여부
  isConfirmed: boolean; // 견적 확정 여부
  isFavorite: boolean; // 찜 여부
  movingDate: string; // 이사 날짜 (예시, 2024. 11. 28)
  departure: string; // 출발지
  arrival: string; // 도착지
  price: number; // 견적가
}

export interface ApiResponse {
  total: number;
  list: PendingListType[];
}

export const mockData: ApiResponse = {
  total: 8,
  list: [
    {
      estimateId: 1,
      moverId: 101,
      serviceType: ['SMALL', 'HOUSE'],
      isAssigned: true,
      profileImg: 'https://via.placeholder.com/150',
      moverName: '김철수',
      reviewStats: {
        averageScore: 4.8,
        totalReviews: 150,
      },
      career: 10,
      confirmationCount: 120,
      favoriteCount: 80,
      isConfirmed: true, // 확정 o
      isReqConfirmed: false,
      isFavorite: true,
      movingDate: '2024. 12. 20',
      departure: '서울시 강남구',
      arrival: '경기도 성남시',
      price: 250000,
    },
    {
      estimateId: 2,
      moverId: 102,
      serviceType: ['HOUSE', 'OFFICE'],
      isAssigned: true,
      profileImg: 'https://via.placeholder.com/150',
      moverName: '박영희',
      reviewStats: {
        averageScore: 4.6,
        totalReviews: 200,
      },
      career: 7,
      confirmationCount: 140,
      favoriteCount: 65,
      isConfirmed: false, // 확정 x
      isReqConfirmed: false,
      isFavorite: false,
      movingDate: '2024. 12. 22',
      departure: '서울시 송파구',
      arrival: '인천광역시',
      price: 300000,
    },
    {
      estimateId: 3,
      moverId: 103,
      serviceType: ['SMALL', 'OFFICE'],
      isAssigned: true,
      profileImg: 'https://via.placeholder.com/150',
      moverName: '최민수',
      reviewStats: {
        averageScore: 4.9,
        totalReviews: 120,
      },
      career: 15,
      confirmationCount: 200,
      favoriteCount: 90,
      isConfirmed: true, // 확정 여부
      isReqConfirmed: false,
      isFavorite: true,
      movingDate: '2024. 12. 25',
      departure: '서울시 서대문구',
      arrival: '경기도 용인시',
      price: 500000,
    },
    {
      estimateId: 4,
      moverId: 104,
      serviceType: ['SMALL'],
      isAssigned: true,
      profileImg: 'https://via.placeholder.com/150',
      moverName: '이정훈',
      reviewStats: {
        averageScore: 4.5,
        totalReviews: 95,
      },
      career: 5,
      confirmationCount: 80,
      favoriteCount: 50,
      isConfirmed: false, // 확정 여부
      isReqConfirmed: false,
      isFavorite: false,
      movingDate: '2024. 12. 28',
      departure: '서울시 관악구',
      arrival: '부산광역시',
      price: 180000,
    },
    {
      estimateId: 5,
      moverId: 105,
      serviceType: ['HOUSE'],
      isAssigned: true,
      profileImg: 'https://via.placeholder.com/150',
      moverName: '정다희',
      reviewStats: {
        averageScore: 4.7,
        totalReviews: 110,
      },
      career: 3,
      confirmationCount: 60,
      favoriteCount: 70,
      isConfirmed: true, // 확정 여부
      isReqConfirmed: false,
      isFavorite: true,
      movingDate: '2024. 12. 30',
      departure: '서울시 노원구',
      arrival: '경기도 화성시',
      price: 220000,
    },
    {
      estimateId: 6,
      moverId: 106,
      serviceType: ['OFFICE'],
      isAssigned: true,
      profileImg: 'https://via.placeholder.com/150',
      moverName: '김하늘',
      reviewStats: {
        averageScore: 4.8,
        totalReviews: 170,
      },
      career: 12,
      confirmationCount: 150,
      favoriteCount: 95,
      isConfirmed: false, // 확정 여부
      isReqConfirmed: false,
      isFavorite: true,
      movingDate: '2024. 12. 15',
      departure: '서울시 중구',
      arrival: '경기도 안양시',
      price: 400000,
    },
    {
      estimateId: 7,
      moverId: 107,
      serviceType: ['HOUSE', 'OFFICE'],
      isAssigned: true,
      profileImg: 'https://via.placeholder.com/150',
      moverName: '장동민',
      reviewStats: {
        averageScore: 4.3,
        totalReviews: 85,
      },
      career: 8,
      confirmationCount: 100,
      favoriteCount: 45,
      isConfirmed: true, // 확정 여부
      isReqConfirmed: false,
      isFavorite: false,
      movingDate: '2024. 12. 18',
      departure: '서울시 동대문구',
      arrival: '강원도 춘천시',
      price: 280000,
    },
    {
      estimateId: 8,
      moverId: 108,
      serviceType: ['SMALL', 'HOUSE', 'OFFICE'],
      isAssigned: true,
      profileImg: 'https://via.placeholder.com/150',
      moverName: '조윤석',
      reviewStats: {
        averageScore: 4.9,
        totalReviews: 300,
      },
      career: 20,
      confirmationCount: 250,
      favoriteCount: 120,
      isConfirmed: false, // 확정 여부
      isReqConfirmed: false,
      isFavorite: true,
      movingDate: '2024. 12. 26',
      departure: '서울시 강북구',
      arrival: '충청북도 청주시',
      price: 600000,
    },
    {
      estimateId: 9,
      moverId: 109,
      serviceType: ['SMALL'],
      isAssigned: true,
      profileImg: 'https://via.placeholder.com/150',
      moverName: '유민재',
      reviewStats: {
        averageScore: 4.2,
        totalReviews: 60,
      },
      career: 2,
      confirmationCount: 50,
      favoriteCount: 30,
      isConfirmed: true, // 확정 여부
      isReqConfirmed: false,
      isFavorite: true,
      movingDate: '2024. 12. 21',
      departure: '서울시 종로구',
      arrival: '경상남도 창원시',
      price: 200000,
    },
    {
      estimateId: 10,
      moverId: 110,
      serviceType: ['HOUSE'],
      isAssigned: true,
      profileImg: 'https://via.placeholder.com/150',
      moverName: '이서현',
      reviewStats: {
        averageScore: 4.6,
        totalReviews: 75,
      },
      career: 6,
      confirmationCount: 90,
      favoriteCount: 55,
      isConfirmed: false, // 확정 여부
      isReqConfirmed: false,
      isFavorite: true,
      movingDate: '2024. 12. 29',
      departure: '서울시 은평구',
      arrival: '제주특별자치도 제주시',
      price: 240000,
    },
  ],
};
