import axios from './axios';

const PATH = '/estimate';

/* /:id GET - 기사 프로필 상세 조회 */
export async function getMoverMe(moverId: number) {
  const res = await axios.get(`${PATH}/${moverId}/detail`);
  return res.data;
}

/**
 * 유저-대기 중인 견적 조회 /estimate
 * @returns 대기 중인 견적 리스트
 */
export async function getPendingEstimate() {
  const res = await axios.get(`${PATH}`);
  return res.data;
}

/**
 * 유저-견적 확정 /estimate/{estimateId}
 * @param estimateId 견적 Id
 * @returns 견적 확정 상태
 */
export async function updateEstimateConfirmed(estimateId: number) {
  const res = await axios.patch(`${PATH}/${estimateId}`);
  return res.data;
}

/**
 * 이사 완료한 견적 리스트 조회 - /estimate/movedList
 * @returns 이사 완료한 견적 리스트
 */
export async function getMovedEstimates() {
  const res = await axios.get(`${PATH}/movedList`);
  return res.data;
}

/* GET USER-받았던 견적 상세내용 리스트 조회*/
export async function getEstimate(estimateRequestId: number) {
  const res = await axios.get(`${PATH}/${estimateRequestId}`);
  return res.data;
}


