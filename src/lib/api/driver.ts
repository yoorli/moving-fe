import axios from './axios';
import { MoverDetail, MoverListResponse } from '../../types/apiTypes';

const PATH = '/mover';

interface MoverQueryParams {
  sortBy?: 'reviewCount' | 'averageScore' | 'career' | 'confirmationCount';
  keyword?: string;
  selectedServiceRegion?: string;
  selectedServiceType?: string;
}

/* GET - 기사님 리스트 조회 */
export async function getMoverList(queryParams: MoverQueryParams): Promise<MoverListResponse> {
  const res = await axios.get(`${PATH}/list`, { params: queryParams });
  return res.data;
}

/**
 * 기사님 프로필 상세 조회 - /mover/{moverId}/detail
 * @param moverId 기사님 Id
 * @returns 기사님 프로필 상세 조회
 */
export async function getMoverDetail(moverId: number): Promise<MoverDetail> {
  const res = await axios.get(`${PATH}/${moverId}/detail`);
  return res.data;
}

// 기사 프로필 조회 - /mover/me
export async function getMoverProfile() {
  const res = await axios.get(`${PATH}/me`);
  return res;
}