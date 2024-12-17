import axios from './axios';

const PATH = '/favorite';

/* /:id GET - 기사 프로필 상세 조회 */
export async function getMoverMe(moverId: number) {
  const res = await axios.get(`${PATH}/${moverId}/detail`);
  return res.data;
}

// 찜한 기사님 조회 - /favorite/me
export async function getFavoriteMover() {
  const res = await axios.get(`${PATH}/me`);
  return res;
}
