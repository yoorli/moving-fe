import axios from './axios';

const PATH = '/assignedEstimateReq';

interface PaginationParams {
  page?: number;
  pageSize?: number;
}

function getParams(queryParams: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(queryParams).filter(([_, value]) => value !== undefined)
  );
}

/* PATCH - 기사 - 지정 견적 반려 */
export async function updateEstimateReject(estimateRequestId: number) {
  const res = await axios.patch(`${PATH}/${estimateRequestId}`);
  return res.data;
}

/* GET - 기사 - 반려된 견적 요청 및 취소된 견적 요청 조회  */
export async function getEstimateReject(queryParams: PaginationParams) {
  const params = getParams(queryParams);
  const res = await axios.get(`${PATH}/rejectList`, { params });

  return res.data;
}
