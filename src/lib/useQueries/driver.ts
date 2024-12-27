import { useQuery } from '@tanstack/react-query';
import { getMoverDetail, getMoverList, getMoverProfile } from '../api/driver';

interface UseMoverListParams {
  sortBy?: 'reviewCount' | 'averageScore' | 'career' | 'confirmationCount';
  keyword?: string;
  selectedServiceRegion?: string;
  selectedServiceType?: string;
}

/* GET - 기사님 리스트 조회 */
export function useGetMoverList(params: UseMoverListParams) {
  return useQuery({
    queryKey: ['moverList', params],
    queryFn: () => getMoverList(params),
  });
}

/* GET - 기사님 프로필 상세 조회 */
export function useGetMoverDetail(moverId: number) {
  return useQuery({
    queryKey: ['moverDetail', moverId],
    queryFn: () => getMoverDetail(moverId),
    enabled: !!moverId, // moverId가 존재할 때만 실행
  });
}

/* 기사님 프로필 조회 */
export function useGetMoverProfile() {
  return useQuery({
    queryKey: ['MoverProfile'],
    queryFn: getMoverProfile,
  });
}
