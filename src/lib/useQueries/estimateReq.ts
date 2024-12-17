import { useQuery } from '@tanstack/react-query';
import { getMoverEstimateReq } from '../api/estimateReq';

interface QueryParams {
  page?: number;
  pageSize?: number;
}

interface estimateQueryParams extends QueryParams {
  type?: string;
  isAssigned?: boolean;
  order?: string;
  keyWord?: string;
}

// 견적 요청 리스트 조회
export function useGetEstimateReq(queryParams: estimateQueryParams) {
  return useQuery({
    queryKey: ['estimateReq', queryParams],
    queryFn: () => getMoverEstimateReq(queryParams),
  });
}
