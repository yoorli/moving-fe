import axios from './axios';

const PATH = '/estimateReq';

type useGetEstimateReqListProps = {
  page?: number;
  pageSize?: number;
};

/* /:id GET - 기사 프로필 상세 조회 */
export async function getMoverMe(moverId: number) {
  const res = await axios.get(`${PATH}/${moverId}/detail`);
  return res.data;
}

/**
 * 유저-견적 요청 조회 /estimateReq
 * @returns 견적 요청
 */
export async function getEstimateReq() {
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
export async function getEstimateReqList({
  page,
  pageSize,
}: useGetEstimateReqListProps) {
  const res = await axios.get(`${PATH}/estimateReq/customer/list`, {
    params: { page, pageSize },
  });
  return res.data;
}