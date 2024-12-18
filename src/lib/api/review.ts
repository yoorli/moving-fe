import axios from './axios';

const PATH = '/review';

// 리뷰 작성에 필요한 데이터
export interface ReviewData {
  estimateId: number;
  moverId: number;
  score: number;
  content: string;
}

// 단일 리뷰 항목
interface Review {
  reviewId: string;
  customerName: string;
  createAt: string; // 작성일
  score: number; // 별점
  content: string; // 리뷰 내용
}

// 리뷰 통계 데이터
interface ReviewStats {
  totalReviews: number; // 총 리뷰 수
  reviewCount: {
    [key: string]: number; // 점수별 리뷰 수 (1~5)
  };
}

// 리뷰 목록과 페이지네이션
interface Reviews {
  hasNextPage: boolean; // 다음 페이지 여부
  list: Review[]; // 리뷰 리스트
}

// 기사 리뷰 응답 구조
interface MoverReviewsResponse {
  reviewStats: ReviewStats; // 리뷰 별점 통계
  reviews: Reviews; // 리뷰 목록과 페이지 정보
}

/**
 * 작성한 리뷰 리스트 조회 - /review/me
 * @returns 내가 작성한 리뷰 리스트
 */
export async function getMyReviewList() {
  const res = await axios.get(`${PATH}/me`);
  return res.data;
}

/**
 * 리뷰 작성 - /review
 * @param data 리뷰 작성 데이터
 * @returns 작성된 리뷰의 결과
 */
export async function createReview(data: ReviewData) {
  const res = await axios.post(`${PATH}`, data);
  return res.data;
}

/**
 * 기사님 리뷰 조회 - /review/{moverId}
 * @param moverId 기사님 ID
 * @param page 페이지 번호 (기본값 1)
 * @param pageSize 페이지당 리뷰 개수 (기본값 5)
 * @returns 리뷰 별점 통계와 리뷰 목록
 */
export const getMoverReviews = async (
  moverId: number,
  page = 1,
  pageSize = 5
): Promise<MoverReviewsResponse> => {
  const params = { page, pageSize };
  const res = await axios.get(`${PATH}/${moverId}`, { params });
  return res.data;
};
