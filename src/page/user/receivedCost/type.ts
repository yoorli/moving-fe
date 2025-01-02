import { ChipType } from '../../../types/cardTypes';

export interface DriverDataDetail {
  id?: number; // 기사 아이디
  estimateReqId: number; // 기사 아이디
  serviceType?: ChipType[]; // 서비스 유형
  isConfirmed?: boolean; // 확정된 요청인지 확인(true)
  isCancelled?: boolean; // 취소 여부 (false)
  isAssigned?: boolean; // 지정경적 여부
  profileImage: string; // 프로필 이미지
  moverName: string; // 기사 닉네임
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
  isFavorite?: boolean; // 찜 여부
  price?: number; //견적가
}

export interface DriverListData {
  list: DriverData[];
}

export interface DriverData {
  total: number;
  list: {
    moverId?: number; // 기사 아이디
    estimateReqId: number; // 기사 아이디
    serviceType?: ChipType[]; // 서비스 유형
    isConfirmed?: boolean; // 확정된 요청인지 확인(true)
    isCancelled?: boolean; // 취소 여부 (false)
    isAssigned?: boolean; // 지정경적 여부
    profileImage: string; // 프로필 이미지
    moverName: string; // 기사 닉네임
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
    isFavorite?: boolean; // 찜 여부
    price?: number; //견적가
  }[];
}
