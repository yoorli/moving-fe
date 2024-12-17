import { useQuery } from '@tanstack/react-query';
import { getFavoriteMover } from '../api/favorite';

/* 찜한 기사님 조회 */
export function useGetFavoriteMover() {
  return useQuery({
    queryKey: ['favoriteMover'],
    queryFn: getFavoriteMover,
  });
}
