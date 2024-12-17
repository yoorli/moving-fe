import axios from './axios';

import { getParams } from '../function/utils';
import { estimateQueryParams, PaginationParams } from '../../types/apiTypes';

const PATH = `${process.env.REACT_APP_API_URL}/estimateReq`;

/* GET - 기사-견적 요청 리스트 조회 */
export async function getMoverEstimateReq(queryParams: estimateQueryParams) {
  const params = getParams(queryParams);
  const res = await axios.get(`${PATH}/mover/list`, { params });
  return res.data;
}

/**
 * 유저-견적 요청 조회 /estimateReq
 * @returns 견적 요청
 */
export async function getUserEstimateReq() {
  const res = await axios.get(`${PATH}`);
  return res.data;
}

/**
 * 유저-견적 요청 삭제 /estimateReq/{estimateRequestId}
 * @param estimateRequestId 견적 요청 Id
 * @returns 견적 요청 상태
 */
export async function deleteEstimateReq(estimateRequestId: number) {
  const res = await axios.patch(`${PATH}/${estimateRequestId}`);
  return res.data;
}

/* POST USER-견적 추가 */
export async function createEstimateReq(data: any) {
  const res = await axios.post(`${PATH}`, data);
  return res.data;
}

/* GET USER-받았던 견적 리스트 조회*/
export async function getEstimateReqList({ page, pageSize }: PaginationParams) {
  const res = await axios.get(`${PATH}/customer/list`, {
    params: { page, pageSize },
  });
  return res.data;
}
