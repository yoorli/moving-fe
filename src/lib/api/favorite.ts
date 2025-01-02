import axios from './axios';

const PATH = '/favorite';

// 찜한 기사님 조회 - /favorite/me
export async function getFavoriteMover() {
  const res = await axios.get(`${PATH}/me`);
  return res;
}

/**
 * 찜 상태 토글 - /favorite
 * @param moverId 기사님의 ID
 * @returns { isFavorite: boolean } - 변경된 찜 상태
 */
export async function toggleFavoriteMover(moverId: number): Promise<{ isFavorite: boolean }> {
  const res = await axios.post(PATH, { moverId });
  return res.data;
}