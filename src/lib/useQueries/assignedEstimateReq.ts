import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getEstimateReject,
  updateEstimateReject,
} from '../api/assignedEstimateReq';

interface QueryParams {
  page?: number;
  pageSize?: number;
}

// 지정 견적 반려
export function useUpdateEstimateReject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => updateEstimateReject(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['rejectList'] });
    },
    onError: (error) => {
      console.error('Error:', error);
    },
  });
}

// 반려된 견적 요청 및 취소된 견적 요청 조회
export function useGetEstimateReject(queryParams: QueryParams) {
  return useQuery({
    queryKey: ['rejectList', queryParams],
    queryFn: () => getEstimateReject(queryParams),
  });
}
