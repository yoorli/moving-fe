import { useQuery } from '@tanstack/react-query';
import { getMoverDetailProfile, getMoverList } from '../api/driver';

export function useGetMoverList(
  serviceType?: string[],
  serviceRegion?: string[],
) {
  return useQuery({
    queryKey: ['moverList', { serviceType, serviceRegion }],
    queryFn: () => getMoverList(),
  });
}

export function useGetMoverDetail(id: number) {
  return useQuery({
    queryKey: ['moverDetail', id],
    queryFn: () => getMoverDetailProfile(id),
    enabled: !!id, // id가 존재할 때만 실행
  });
}
