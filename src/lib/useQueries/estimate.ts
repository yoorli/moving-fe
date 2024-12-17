import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createEstimate,
  getEstimateConfirmed,
  getEstimateDetail,
  getEstimateList,
} from '../api/estimate';

interface QueryParams {
  page?: number;
  pageSize?: number;
}

interface EstimateParams {
  estimateId: number;
  comment?: string;
  price: number;
}

// 확정된 견적 리스트 조회
export function useGetEstimateConfirmed(queryParams: QueryParams) {
  return useQuery({
    queryKey: ['estimateConfirmed', queryParams],
    queryFn: () => getEstimateConfirmed(queryParams),
  });
}

// 보낸 견적 리스트 조회
export function useGetEstimateList(queryParams: QueryParams) {
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
export function useGetEstimateDetail(id: number, userType: 'consumer' | 'mover') {
  return useQuery({
    queryKey: ['estimateDetail', id, userType],
    queryFn: () => getEstimateDetail(id, userType),
    enabled: !!id,
  });
}
