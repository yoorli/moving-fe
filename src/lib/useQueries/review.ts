import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createReview,
  getMoverReviewList,
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
export function useGetMoverReviewList(moverId: number) {
  return useQuery({
    queryKey: ['review', moverId],
    queryFn: () => getMoverReviewList(moverId),
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
