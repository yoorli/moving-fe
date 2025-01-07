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
export function useCreateNotificationRead(notificationId: number) {
  const mutation = useMutation({
    mutationFn: () => createNotificationRead(notificationId),
  });

  return mutation;
}
