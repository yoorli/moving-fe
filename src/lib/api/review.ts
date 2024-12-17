import axios from './axios';

const PATH = '/review';

export interface ReviewData {
  estimateId: number;
  moverId: number;
  score: number;
  content: string;
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
