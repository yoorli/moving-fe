import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFavoriteMover, toggleFavoriteMover } from '../api/favorite';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

/* 찜한 기사님 조회 */
export function useGetFavoriteMover() {
  const { userValue } = useContext(AuthContext);
  return useQuery({
    queryKey: ['favoriteMover'],
    queryFn: getFavoriteMover,
    enabled: !!userValue?.user?.id,
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
