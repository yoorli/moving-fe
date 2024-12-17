import { useQuery } from '@tanstack/react-query';
import { getMoverEstimateReq } from '../api/estimateReq';
import { estimateQueryParams } from '../../types/apiTypes';

// 견적 요청 리스트 조회
export function useGetEstimateReq(queryParams: estimateQueryParams) {
  return useQuery({
    queryKey: ['estimateReq', queryParams],
    queryFn: () => getMoverEstimateReq(queryParams),
  });
}
