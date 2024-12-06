import { ChipType } from '../../../components/card/type';

export interface DriverDataDetail {
  id: number; // 기사 아이디
  serviceType?: ChipType[]; // 서비스 유형
  isConfirmed?: boolean; // 확정된 요청인지 확인(true)
  isCancelled?: boolean; // 취소 여부 (false)
  isAssigned?: boolean; // 지정경적 여부
  profileImage: string; // 프로필 이미지
  nickname: string; // 기사 닉네임
  career?: number; // 경력
  reviewStats?: {
    averageScore?: number; // 평점
    totalReviews?: number; // 리뷰 갯수
  };
  favoriteCount?: number; // 찜 갯수
  confirmationCount?: number; // 확정 건 수
  movingDate?: string; // 이사 날짜
  departure?: string; // 출발지
  arrival?: string; // 도착지
  isLiked?: boolean; // 찜 여부
  price?: number; //견적가
}

export interface DriverListData {
  list: DriverData[];
}

export interface DriverData {
  total: number;
  list: {
    id: number; // 기사 아이디
    serviceType?: ChipType[]; // 서비스 유형
    isConfirmed?: boolean; // 확정된 요청인지 확인(true)
    isCancelled?: boolean; // 취소 여부 (false)
    isAssigned?: boolean; // 지정경적 여부
    profileImage: string; // 프로필 이미지
    nickname: string; // 기사 닉네임
    career?: number; // 경력
    reviewStats?: {
      averageScore?: number; // 평점
      totalReviews?: number; // 리뷰 갯수
    };
    favoriteCount?: number; // 찜 갯수
    confirmationCount?: number; // 확정 건 수
    movingDate?: string; // 이사 날짜
    departure?: string; // 출발지
    arrival?: string; // 도착지
    isLiked?: boolean; // 찜 여부
    price?: number; //견적가
  }[];
}

export const mockData: DriverData = {
  total: 3,
  list: [
    // 확정된 견적 요청일 때
    {
      id: 1,
      serviceType: ['SMALL', 'COMPANY'],
      isConfirmed: true, // 확정
      isCancelled: false, //취소
      isAssigned: true, //지정
      profileImage: 'image1',
      nickname: 'driver1',
      career: 7,
      reviewStats: {
        averageScore: 4.2,
        totalReviews: 20,
      },
      favoriteCount: 10,
      confirmationCount: 30,
      movingDate: '2024.12.10',
      departure: '서울특별시 강남구',
      arrival: '서울특별시 마포구',
      isLiked: true,
      price: 500000,
    },
    // 확정되지 않은 견적 요청일 때
    {
      id: 2,
      serviceType: ['HOME'],
      isConfirmed: false,
      isCancelled: false,
      isAssigned: true,
      profileImage: 'image2',
      nickname: 'driver2',
      career: 20,
      reviewStats: {
        averageScore: 4.5,
        totalReviews: 100,
      },
      favoriteCount: 200,
      confirmationCount: 500,
      movingDate: '2024.07.15',
      departure: '서울특별시 은평구',
      arrival: '서울특별시 종로구',
      isLiked: false,
      price: 500000,
    },
    // 확정된 견적 요청일 때
    {
      id: 3,
      serviceType: ['COMPANY'],
      isConfirmed: true,
      isCancelled: false,
      isAssigned: false,
      profileImage: 'image3',
      nickname: 'driver3',
      career: 10,
      reviewStats: {
        averageScore: 3.8,
        totalReviews: 40,
      },
      favoriteCount: 15,
      confirmationCount: 25,
      movingDate: '2024.08.01',
      departure: '경기도 성남시',
      arrival: '경기도 부천시',
      isLiked: true,
      price: 650000,
    },
    // 취소된 견적 요청일 때
    {
      id: 4,
      serviceType: ['SMALL'],
      isConfirmed: false,
      isCancelled: true,
      profileImage: 'image4',
      nickname: 'driver4',
      career: 12,
      reviewStats: {
        averageScore: 4.7,
        totalReviews: 50,
      },
      favoriteCount: 35,
      confirmationCount: 45,
      movingDate: '2024.09.01',
      departure: '인천광역시 연수구',
      arrival: '인천광역시 계양구',
      isLiked: false,
      price: 720000,
    },
    {
      id: 5,
      serviceType: ['SMALL'],
      isConfirmed: false,
      isCancelled: true,
      profileImage: 'image4',
      nickname: 'driver4',
      career: 12,
      reviewStats: {
        averageScore: 4.7,
        totalReviews: 50,
      },
      favoriteCount: 35,
      confirmationCount: 45,
      movingDate: '2024.09.01',
      departure: '인천광역시 연수구',
      arrival: '인천광역시 계양구',
      isLiked: false,
      price: 720000,
    },
    {
      id: 6,
      serviceType: ['SMALL'],
      isConfirmed: false,
      isCancelled: true,
      profileImage: 'image4',
      nickname: 'driver4',
      career: 12,
      reviewStats: {
        averageScore: 4.7,
        totalReviews: 50,
      },
      favoriteCount: 35,
      confirmationCount: 45,
      movingDate: '2024.09.01',
      departure: '인천광역시 연수구',
      arrival: '인천광역시 계양구',
      isLiked: false,
      price: 720000,
    },
    // {
    //   id: 7,
    //   serviceType: ['SMALL'],
    //   isConfirmed: false,
    //   isCancelled: true,
    //   profileImage: 'image4',
    //   nickname: 'driver4',
    //   career: 12,
    //   reviewStats: {
    //     averageScore: 4.7,
    //     totalReviews: 50,
    //   },
    //   favoriteCount: 35,
    //   confirmationCount: 45,
    //   movingDate: '2024.09.01',
    //   departure: '인천광역시 연수구',
    //   arrival: '인천광역시 계양구',
    //   isLiked: false,
    //   price: 720000,
    // },
    // {
    //   id: 8,
    //   serviceType: ['SMALL'],
    //   isConfirmed: false,
    //   isCancelled: true,
    //   profileImage: 'image4',
    //   nickname: 'driver4',
    //   career: 12,
    //   reviewStats: {
    //     averageScore: 4.7,
    //     totalReviews: 50,
    //   },
    //   favoriteCount: 35,
    //   confirmationCount: 45,
    //   movingDate: '2024.09.01',
    //   departure: '인천광역시 연수구',
    //   arrival: '인천광역시 계양구',
    //   isLiked: false,
    //   price: 720000,
    // },
    // {
    //   id: 9,
    //   serviceType: ['SMALL'],
    //   isConfirmed: false,
    //   isCancelled: true,
    //   profileImage: 'image4',
    //   nickname: 'driver4',
    //   career: 12,
    //   reviewStats: {
    //     averageScore: 4.7,
    //     totalReviews: 50,
    //   },
    //   favoriteCount: 35,
    //   confirmationCount: 45,
    //   movingDate: '2024.09.01',
    //   departure: '인천광역시 연수구',
    //   arrival: '인천광역시 계양구',
    //   isLiked: false,
    //   price: 720000,
    // },
    // {
    //   id: 10,
    //   serviceType: ['SMALL'],
    //   isConfirmed: false,
    //   isCancelled: true,
    //   profileImage: 'image4',
    //   nickname: 'driver4',
    //   career: 12,
    //   reviewStats: {
    //     averageScore: 4.7,
    //     totalReviews: 50,
    //   },
    //   favoriteCount: 35,
    //   confirmationCount: 45,
    //   movingDate: '2024.09.01',
    //   departure: '인천광역시 연수구',
    //   arrival: '인천광역시 계양구',
    //   isLiked: false,
    //   price: 720000,
    // },
    // {
    //   id: 11,
    //   serviceType: ['SMALL'],
    //   isConfirmed: false,
    //   isCancelled: true,
    //   profileImage: 'image4',
    //   nickname: 'driver4',
    //   career: 12,
    //   reviewStats: {
    //     averageScore: 4.7,
    //     totalReviews: 50,
    //   },
    //   favoriteCount: 35,
    //   confirmationCount: 45,
    //   movingDate: '2024.09.01',
    //   departure: '인천광역시 연수구',
    //   arrival: '인천광역시 계양구',
    //   isLiked: false,
    //   price: 720000,
    // },
  ],
};
