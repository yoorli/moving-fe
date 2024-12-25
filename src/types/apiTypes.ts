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
  estimateId: number;
  comment?: string;
  price: number;
}

export interface EstimateUser extends EstimateParams {
  movingType: string;
  isAssigned: boolean;
  movingDate: string;
  departure: string;
  arrival: string;
  movingRequest: string;
}

export interface EstimateConsumer extends EstimateUser {
  moverId: number;
  isConfirmed: boolean;
  isReqConfirmed: boolean;
  serviceType: string[];
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
  detailDeparture: string;
  detailArrival: string;
}

// estimateReq
export interface estimateQueryParams extends PaginationParams {
  type?: string[];
  isAssigned?: boolean;
  order?: string;
  keyWord?: string;
}
