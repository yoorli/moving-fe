import axios from './axios';

const PATH = '/notification';

/* GET - 알림 상세 조회 */
export async function getNotification() {
  const res = await axios.get(`${PATH}/history`);
  return res.data;
}

/* POST - 알림 읽음 처리 */
export async function createNotificationRead(notificationId: number) {
  const res = await axios.post(`${PATH}/read/${notificationId}`);
  return res.data;
}
