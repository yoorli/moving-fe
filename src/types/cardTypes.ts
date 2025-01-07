export type ChipType =
  | 'SMALL'
  | 'HOUSE'
  | 'OFFICE'
  | 'ASSIGN'
  | 'CONFIRM'
  | 'WAITING';

// DriverCard, DriverProfile
export type DriverProfileType =
  | 'profile'
  | 'cost'
  | 'waiting'
  | 'dibs'
  | 'review'
  | 'confirm'
  | 'notConfirm'
  | 'cancel';

// 견적 id = estimateId
// 견적 요청 id= estimateReqId

export interface BaseProps {
  count?: number; // 칩 표시 개수
  list: {
    isAssigned?: boolean; // 지정견적 여부
    isConfirmed?: boolean; // 확정된 요청인지 확인(true)
    isCancelled?: boolean; // 취소 여부 (false)
    moverName?: string; //기사 닉네임
    movingDate?: string; // 이사 날짜
    serviceType?: ChipType[]; // 서비스 유형
    departure?: string; // 출발지
    arrival?: string; // 도착지
    price?: number; // 견적가
    createAt?: string; // 작성일
    updatedAt?: string; // 작성일
    profileImg?: string; // 기사 프로필 이미지 *
    moverId?: number; // 기사 아이디
    reviewStats?: {
      averageScore?: number; // 평점
      totalReviews?: number; // 리뷰 갯수
    };
    comment?: string; //요구사항   *
    confirmationCount?: number; // 확정 건 수 *
  };
}

export interface DriverProfileProps extends BaseProps {
  type?: DriverProfileType;
  styles?: string;
  editInfoBtn?: () => void; //기본 정보 수정 버튼
  editProfileBtn?: () => void; //기본 정보 내 프로필 수정
  confirmCostBtn?: () => void; //견적 확정하기 버튼
  detailBtn?: () => void; //상세보기 버튼
  reviewBtn?: () => void; //리뷰 작성하기 버튼
  costListBtn?: () => void; //견적 목록보기 버튼
  list: BaseProps['list'] & {
    estimateId?: number; // 견적 id
    estimateReqId?: number;
    career?: number; // 경력
    summary?: string; // 한 줄 소개
    serviceRegion?: string[]; // 서비스 지역
    favoriteCount?: number; // 찜 갯수
    isFavorite?: boolean; // 찜 여부
  };
}

// UserCard, UserProfile
type UserProfileType =
  | 'receive'
  | 'review'
  | 'allCost'
  | 'confirmedCost'
  | 'modal';

export interface UserProfileProps extends BaseProps {
  type?: UserProfileType;
  sendCostBtn?: () => void;
  rejectCostBtn?: () => void;
  list: BaseProps['list'] & {
    customerId?: number; // 고객 아이디
    estimateReqId?: number; // 견적 요청 id
    movingType?: ChipType; // 이사 서비스 유형
    customerName?: string; // 고객 이름
    isRejected?: boolean; // 반려 여부
    content?: string; // 리뷰 내용
  };
}
