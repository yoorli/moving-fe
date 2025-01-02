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
