import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createEstimate,
  getEstimateConfirmed,
  getEstimateDetail,
  getEstimateList,
  getEstimate,
  getMovedEstimates,
  getPendingEstimate,
  updateEstimateConfirmed,
} from '../api/estimate';
import { EstimateParams, PaginationParams } from '../../types/apiTypes';

// 확정된 견적 리스트 조회
export function useGetEstimateConfirmed(queryParams: PaginationParams) {
  return useQuery({
    queryKey: ['estimateConfirmed', queryParams],
    queryFn: () => getEstimateConfirmed(queryParams),
  });
}

// 보낸 견적 리스트 조회
export function useGetEstimateList(queryParams: PaginationParams) {
  return useQuery({
    queryKey: ['estimateList', queryParams],
    queryFn: () => getEstimateList(queryParams),
  });
}

// 견적 작성
export function useCreateEstimate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EstimateParams) => createEstimate(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['estimate'] });
    },
    onError: (error) => {
      console.error('Error:', error);
    },
  });
}

// 견적 상세 조회
export function useGetEstimateDetail(
  id: number,
  userType: 'consumer' | 'mover',
) {
  return useQuery({
    queryKey: ['estimateDetail', id, userType],
    queryFn: () => getEstimateDetail(id, userType),
    enabled: !!id,
  });
}

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
export function useGetMovedEstimates({ page, pageSize }: PaginationParams) {
  return useQuery({
    queryKey: ['completionEstimates'],
    queryFn: () => getMovedEstimates({ page, pageSize }),
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
