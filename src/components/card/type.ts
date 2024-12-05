// DriverCard, DriverProfile
type DriverProfileType = 'profile' | 'cost' | 'waiting' | 'dibs' | 'review';

export interface DriverProfileProps {
  type?: DriverProfileType;
  styles?: string;
  editInfoBtn?: () => void; //기본 정보 수정 버튼
  editProfileBtn?: () => void; //기본 정보 내 프로필 수정
  confirmCostBtn?: () => void; //견적 확정하기 버튼
  detailBtn?: () => void; //상세보기 버튼
  reviewBtn?: () => void; //리뷰 작성하기 버튼
  user: {
    id: number; // 기사 아이디
    serviceType?: string[]; // 서비스 유형
    isAssigned?: boolean; // 지정경적 여부
    profileImage: string; // 프로필 이미지
    nickname: string; // 기사 닉네임
    career?: number; // 경력
    summary?: string; // 한 줄 소개
    serviceRegion?: string[]; // 서비스 지역
    comment?: string; //요구사항
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
  };
}

// UserCard, UserProfile
type UserProfileType = 'receive' | 'review' | 'confirmedCost' | 'modal';

export interface UserProfileProps {
  type?: UserProfileType;
  sendCostBtn?: () => void;
  rejectCostBtn?: () => void;
  user: {
    movingType?: string[]; // 이사 서비스 유형
    isAssigned?: boolean; // 지정견적 여부
    customer?: string; // 고객 이름
    moverName?: string; //기사 닉네임
    movingDate?: string; // 이사 날짜
    departure?: string; // 출발지
    arrival?: string; // 도착지
    price?: number; // 견적가
    createAt?: string; // 작성일
    profileImg?: string; // 기사 프로필 이미지
    reviewStats?: {
      averageScore: number; // 평점
    };
    content?: string; // 리뷰 내용
  };
}
