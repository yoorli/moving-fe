import axios from './axios';

const PATH = '/mover';

/* /:id GET - 기사 프로필 상세 조회 */
export async function getMoverMe(moverId: number) {
  const res = await axios.get(`${PATH}/${moverId}/detail`);
  return res.data;
}

/**
 * 기사님 프로필 상세 조회 - /mover/{moverId}/detail
 * @param moverId 기사님 Id
 * @returns 기사님 프로필 상세 조회
 */
export async function getMoverDetailProfile(moverId: number) {
  const res = await axios.get(`${PATH}/${moverId}/detail`);
  return res.data;
}
