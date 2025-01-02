import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createEstimateReq,
  deleteEstimateReq,
  getEstimateReqList,
  getUserEstimateReq,
  getMoverEstimateReq,
} from '../api/estimateReq';
import { estimateQueryParams, PaginationParams } from '../../types/apiTypes';

export interface FormValues {
  movingType: null | string;
  movingDate: null | string;
  departure: null | string;
  arrival: null | string;
  comment?: undefined | string | null;
}

/* 유저-견적 요청 조회 */
export function useGetUserEstimateReq() {
  return useQuery({
    queryKey: ['estimateReq'],
    queryFn: () => getUserEstimateReq(),
  });
}

/* 유저-견적 요청 삭제 */
export function useDeleteEstimateReq() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['estimateReq'],
    mutationFn: (estimateReqId: number) => deleteEstimateReq(estimateReqId),
    onSuccess: (data) => {
      console.log('견적 요청 삭제(상태 변경) 성공', data);
      queryClient.setQueryData(['estimateReq'], []);
    },
    onError: (error) => {
      console.error('견적 요청 삭제(상태 변경) 실패, 에러', error);
    },
  });
  return mutation;
}

//* 유저 - 견적 요청
export function useCreateEstimateReq() {
  const mutation = useMutation({
    mutationFn: (data: FormValues) => createEstimateReq(data),
  });

  return mutation;
}

/* GET USER-받았던 견적 리스트 조회*/
export function useGetEstimateReqList({
  page = 1,
  pageSize = 8,
}: PaginationParams): any {
  return useQuery({
    queryKey: ['estimateReq', page, pageSize],
    queryFn: () => getEstimateReqList({ page, pageSize }),
  });
}

// 기사 - 견적 요청 리스트 조회
export function useGetMoverEstimateReq(queryParams: estimateQueryParams) {
  return useQuery({
    queryKey: ['estimateReq', queryParams],
    queryFn: () => getMoverEstimateReq(queryParams),
    placeholderData: keepPreviousData,
  });
}
