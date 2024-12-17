import axios from './axios';

import { MoverDetail, MoverListResponse } from '../../types/apiTypes';

const PATH = '/mover';

export async function getMoverList(): Promise<MoverListResponse> {
  try {
    const response = await axios.get(`${PATH}/list`);
    const data: MoverListResponse = response.data;

    return {
      list: data.list.map((mover) => ({
        ...mover,
        profileImg: mover.profileImg || '/default-profile.png',
      })),
      totalCount: data.totalCount,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
    };
  } catch (error) {
    console.error('기사 목록을 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }
}

/**
 * 기사님 프로필 상세 조회 - /mover/{moverId}/detail
 * @param moverId 기사님 Id
 * @returns 기사님 프로필 상세 조회
 */
export async function getMoverDetailProfile(moverId: number): Promise<MoverDetail> {
  const res = await axios.get(`${PATH}/${moverId}/detail`);
  return res.data;
}
