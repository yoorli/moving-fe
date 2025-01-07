import { useQuery, useMutation } from '@tanstack/react-query';
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
  const mutation = useMutation({
    // mutationFn은 이제 notificationId를 인자로 받도록 변경
    mutationFn: (notificationId: number) =>
      createNotificationRead(notificationId),
  });

  return mutation;
}
