import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFavoriteMover, toggleFavoriteMover } from '../api/favorite';

/* 찜한 기사님 조회 */
export function useGetFavoriteMover() {
  return useQuery({
    queryKey: ['favoriteMover'],
    queryFn: getFavoriteMover,
  });
}

/* 찜 상태 토글 */
export function useToggleFavoriteMover() {
  const queryClient = useQueryClient();

  return useMutation<{ isFavorite: boolean }, Error, number>({
    mutationFn: toggleFavoriteMover,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favoriteMover'] });
      queryClient.invalidateQueries({ queryKey: ['moverDetail'] });
    },
  });
}

