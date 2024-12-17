import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getEstimate,
  getMovedEstimates,
  getPendingEstimate,
  updateEstimateConfirmed,
} from '../api/estimate';

/* 유저-대기 중인 견적 조회 */
export function useGetPendingEstimate() {
  return useQuery({
    queryKey: ['pendingEstimate'],
    queryFn: () => getPendingEstimate(),
  });
}

/* 견적 확정(견적 요청 상태 변경) */
export function useUpdateEstimateConfirmed() {
  const mutation = useMutation({
    mutationFn: (estimateId: number) => updateEstimateConfirmed(estimateId),
    onSuccess: (data) => {
      console.log('견적 확정 성공', data);
    },
    onError: (error) => {
      console.error('견적 확정 에러 발생', error);
    },
  });
  return mutation;
}

/* 작성 가능한 리뷰(이사 완료 리스트) 조회 */
export function useGetMovedEstimates() {
  return useQuery({
    queryKey: ['completionEstimates'],
    queryFn: () => getMovedEstimates(),
  });
}

/* GET USER-받았던 견적 상세내용 리스트 조회*/
export function useGetEstimate(estimateRequestId: number) {
  return useQuery({
    queryKey: ['estimate', estimateRequestId],
    queryFn: () => getEstimate(estimateRequestId),
    enabled: !!estimateRequestId,
  });
}
