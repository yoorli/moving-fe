import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createReview,
  getMoverReviews,
  getMyReviewList,
  ReviewData,
} from '../api/review';

/* 작성한 리뷰 리스트 조회 */
export function useGetMyReviewList() {
  return useQuery({
    queryKey: ['myReview'],
    queryFn: () => getMyReviewList(),
  });
}

/* 기사님 리뷰 조회 */
export function useGetMoverReviewList(
  moverId: number,
  page = 1,
  pageSize = 5
) {
  return useQuery({
    queryKey: ['review', moverId, page, pageSize],
    queryFn: () => getMoverReviews(moverId, page, pageSize),
    enabled: !!moverId,
  });
}

/* 리뷰 작성 */
export function useCreateReview() {
  const mutation = useMutation({
    mutationFn: (data: ReviewData) => createReview(data),
    onSuccess: (data) => {
      console.log('your review has been successfully created', data);
    },
    onError: (error) => {
      console.error('Error on creating Review', error);
    },
  });

  return mutation;
}

