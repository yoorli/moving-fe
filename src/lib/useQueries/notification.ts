import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotification, createNotificationRead } from '../api/notification';

// 알림 상세 조회 (GET)
export function useGetNotification() {
  return useQuery({
    queryKey: ['notification'],
    queryFn: getNotification,
  });
}

// 알림 읽음 처리 (POST)
export function useCreateNotificationRead() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (notificationId: number) =>
      createNotificationRead(notificationId),
    onSuccess: () => {
      // 알림 읽기 처리가 성공하면, 'notification' 쿼리의 캐시를 무효화하고 다시 가져옴
      queryClient.invalidateQueries({ queryKey: ['notification'] });
    },
  });

  return mutation;
}
