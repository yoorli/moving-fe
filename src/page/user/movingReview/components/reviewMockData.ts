import { ChipType } from '../../../../types/cardTypes';

export interface Review {
  id: number; // 리뷰 아이디
  moverName: string; // 기사님 이름
  profileImage: string; // 이미지 url
  movingDate: string; // 이사 날짜
  price: number; // 견적가
  reviewStats: {
    averageScore: number; // 평점
  };
  content: string; // 리뷰 내용
  serviceType: ChipType[]; // 이용한 서비스 타입 ['SMALL', 'HOUSE', ...]
  isAssigned: boolean; // 지정 견적인지 여부
  createAt: string; // 리뷰 작성일
}

export interface ApiReviewResponse {
  total: number; // 리스트 총 개수
  hasNextPage: boolean; // 다음 페이지 존재 여부
  list: Review[];
}

export const reviewMockData: ApiReviewResponse = {
  total: 10,
  hasNextPage: false,
  list: [
    {
      isAssigned: true,
      createAt: '2024-12-01T10:00:00Z',
      id: 1,
      moverName: '김기사',
      profileImage: 'https://example.com/profile/1.jpg',
      movingDate: '2024-12-10',
      price: 150000,
      reviewStats: {
        averageScore: 4.0, // 평점
      },
      content:
        '정말 친절하시고 이사도 깔끔하게 해주셨어요! 그리고 어찌나 완벽하신지 제 할 일이라고는 자장면을 시켜먹는 일이였어요.',
      serviceType: ['SMALL', 'HOUSE'],
    },
    {
      isAssigned: false,
      createAt: '2024-11-29T14:20:00Z',
      id: 2,
      moverName: '이기사',
      profileImage: 'https://example.com/profile/2.jpg',
      movingDate: '2024-12-12',
      price: 200000,
      reviewStats: {
        averageScore: 3, // 평점
      },
      content: '전문적이고 빠른 이사 서비스였습니다.',
      serviceType: ['HOUSE'],
    },
    {
      isAssigned: true,
      createAt: '2024-12-03T09:45:00Z',
      id: 3,
      moverName: '박기사',
      profileImage: 'https://example.com/profile/3.jpg',
      movingDate: '2024-12-15',
      price: 180000,
      reviewStats: {
        averageScore: 5, // 평점
      },
      content: '시간 약속을 잘 지키셨어요. 만족합니다.',
      serviceType: ['SMALL'],
    },
    {
      isAssigned: false,
      createAt: '2024-11-30T11:30:00Z',
      id: 4,
      moverName: '최기사',
      profileImage: 'https://example.com/profile/4.jpg',
      movingDate: '2024-12-18',
      price: 220000,
      reviewStats: {
        averageScore: 1, // 평점
      },
      content: '친절하고 신속한 작업에 감사드립니다.',
      serviceType: ['OFFICE'],
    },
    {
      isAssigned: true,
      createAt: '2024-12-05T08:15:00Z',
      id: 5,
      moverName: '정기사',
      profileImage: 'https://example.com/profile/5.jpg',
      movingDate: '2024-12-20',
      price: 250000,
      reviewStats: {
        averageScore: 4, // 평점
      },
      content: '이사 후에도 문제가 없어서 좋았습니다!',
      serviceType: ['HOUSE'],
    },
    {
      isAssigned: false,
      createAt: '2024-12-06T15:50:00Z',
      id: 6,
      moverName: '송기사',
      profileImage: 'https://example.com/profile/6.jpg',
      movingDate: '2024-12-22',
      price: 170000,
      reviewStats: {
        averageScore: 2, // 평점
      },
      content: '가격 대비 서비스가 좋아요.',
      serviceType: ['SMALL'],
    },
    {
      isAssigned: true,
      createAt: '2024-11-28T17:05:00Z',
      id: 7,
      moverName: '한기사',
      profileImage: 'https://example.com/profile/7.jpg',
      movingDate: '2024-12-25',
      price: 190000,
      reviewStats: {
        averageScore: 4.3, // 평점
      },
      content: '기사님이 친절하시고 이사도 꼼꼼하게 해주셨어요.',
      serviceType: ['HOUSE'],
    },
    {
      isAssigned: false,
      createAt: '2024-12-07T13:25:00Z',
      id: 8,
      moverName: '윤기사',
      profileImage: 'https://example.com/profile/8.jpg',
      movingDate: '2024-12-27',
      price: 160000,
      reviewStats: {
        averageScore: 4.3, // 평점
      },
      content: '무난한 서비스였습니다. 다음에도 이용할 것 같아요.',
      serviceType: ['OFFICE'],
    },
    {
      isAssigned: true,
      createAt: '2024-12-02T12:40:00Z',
      id: 9,
      moverName: '오기사',
      profileImage: 'https://example.com/profile/9.jpg',
      movingDate: '2024-12-29',
      price: 140000,
      reviewStats: {
        averageScore: 4.3, // 평점
      },
      content: '약간의 소통 문제는 있었지만 결과적으로 만족했습니다.',
      serviceType: ['SMALL'],
    },
    {
      isAssigned: false,
      createAt: '2024-11-27T16:10:00Z',
      id: 10,
      moverName: '고기사',
      profileImage: 'https://example.com/profile/10.jpg',
      movingDate: '2024-12-30',
      price: 230000,
      reviewStats: {
        averageScore: 4.3, // 평점
      },
      content: '깔끔하고 세심한 작업이 인상적이었습니다.',
      serviceType: ['HOUSE'],
    },
  ],
};
