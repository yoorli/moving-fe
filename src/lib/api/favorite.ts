import axios from './axios';

const PATH = '/favorite';

// 찜한 기사님 조회 - /favorite/me
export async function getFavoriteMover() {
  const res = await axios.get(`${PATH}/me`);
  return res;
}
