import axios from './axios';

const PATH = '/review';

export interface ReviewData {
  estimateId: number;
  moverId: number;
  score: number;
  content: string;
}

interface Review {
  reviewId: string;
  customerName: string;
  createAt: string; // 작성일 (ISO 8601)
  score: number; // 별점
  content: string; // 리뷰 내용
}

interface Reviews {
  hasNextPage: boolean; // 다음 페이지 여부
  list: Review[]; // 리뷰 목록
}

interface MoverReviewsResponse {
  reviewStats: ReviewStats;
  reviews: Reviews;
}

/* /{moverId} GET - 기사 리뷰 조회 */
interface ReviewStats {
  totalReviews: number;
  reviewCount: {
    [key: string]: number; // 리뷰 점수별 갯수 (1~5점)
  };
}


/* /:id GET - 기사 프로필 상세 조회 */
export async function getMoverMe(moverId: number) {
  const res = await axios.get(`${PATH}/${moverId}/detail`);
  return res.data;
}

/**
 * 작성한 리뷰 리스트 조회 - /review/me
 * @returns 내가 작성한 리뷰 리스트
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
 * @param moverId 기사님 Id
 * @returns 기사님 리뷰 리스트
 */
export async function getMoverReviewList(moverId: number) {
  const res = await axios.get(`${PATH}/${moverId}`);
  return res.data;
}

/**
 * @param {number} moverId - 조회할 기사 ID
 * @param {number} page - 페이지 번호 (기본값 1)
 * @param {number} pageSize - 페이지당 불러올 리뷰 갯수 (기본값 10)
 * @returns {Promise<MoverReviewsResponse>} - 리뷰 정보와 수치
 */
export async function getMoverReviews(
  moverId: number,
  page = 1,
  pageSize = 10
): Promise<MoverReviewsResponse> {
  try {
    const response = await axios.get(`${PATH}/${moverId}`, {
      params: {
        page,
        pageSize,
      },
    });
    const data: MoverReviewsResponse = response.data;

    return {
      reviewStats: data.reviewStats,
      reviews: {
        hasNextPage: data.reviews.hasNextPage,
        list: data.reviews.list.map((review) => ({
          reviewId: review.reviewId,
          customerName: review.customerName,
          createAt: review.createAt,
          score: review.score,
          content: review.content,
        })),
      },
    };
  } catch (error) {
    console.error('기사 리뷰 정보를 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }
}
