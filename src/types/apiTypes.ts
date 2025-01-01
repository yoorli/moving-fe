import { ChipType } from "./cardTypes";

//assignedEstimateReq + estimate, estimateReq /useQueries-assignedEstimateReq,estimate
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

//driver + estimate
export interface ReviewStats {
  averageScore: number;
  totalReviews: number;
}

export interface Mover {
  id: number;
  userId: number;
  career: number;
  summary: string;
  confirmationCount: number;
  serviceType: string[];
  serviceRegion: string[];
  profileImg: string | null;
  moverName: string;
  reviewStats: ReviewStats;
  favoriteCount: number;
  isAssigned: boolean; // 지정 견적 요청
  isFavorite: boolean; // 찜 여부
  estimateId?: number; // 견적 ID 추가
  moverId?: number;
}

export interface MoverList {
  list: Mover[];
}

export interface MoverListResponse {
  list: Mover[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export interface MoverDetail extends Mover {
  description: string;
  isConfirmed: boolean; // 견적 있는지 여부
}

//estimate
export interface EstimateParams {
  estimateId?: number;
  estimateRequestId?: number;
  isAssigned?: boolean;
  comment?: string;
  price: number;
  movingDate?: string;
}

export interface EstimateUser extends EstimateParams {
  movingType: ChipType;
  departure: string;
  arrival: string;
  movingRequest: string;
  customerComment?: string;
  moverComment?: string;
}

export interface EstimateConsumer extends EstimateUser {
  moverId: number;
  isConfirmed: boolean;
  isReqConfirmed: boolean;
  serviceType: ChipType[];
  summary: string;
  profileImg: string;
  moverName: string;
  reviewStats: ReviewStats;
  career: number;
  confirmationCount: number;
  favoriteCount: number;
  isFavorite: boolean;
}

export interface EstimateMover extends EstimateUser {
  customerName: string;
  detailDeparture?: string;
  detailArrival?: string;
}

// estimateReq
export interface estimateQueryParams extends PaginationParams {
  type?: string[];
  isAssigned?: boolean;
  order?: string;
  keyWord?: string;
}
