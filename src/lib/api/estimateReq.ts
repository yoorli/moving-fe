import axios from './axios';

const PATH = '/estimateReq';

type useGetEstimateReqListProps = {
  page?: number;
  pageSize?: number;
};

interface PaginationParams {
  page?: number;
  pageSize?: number;
}

interface GetEstimateReqParams extends PaginationParams {
  type?: string;
  isAssigned?: boolean;
  order?: string;
  keyWord?: string;
}

// Record<string, any>: 문자열을 키로, 어떤 값이든 허용하는 타입
function getParams(queryParams: Record<string, any>) {
  // Object.fromEntries()는 키-값 배열을 다시 객체로 변환
  return Object.fromEntries(
    // undefined가 아닌 경우에만 배열에 남도록 함함
    // [_, value] : 첫 번째 요소(키)를 무시, 두 번째 요소(값)만 사용
    Object.entries(queryParams).filter(([_, value]) => value !== undefined),
  );
}

/* GET - 기사-견적 요청 리스트 조회 */
export async function getMoverEstimateReq(queryParams: GetEstimateReqParams) {
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
export async function getEstimateReqList({
  page,
  pageSize,
}: useGetEstimateReqListProps) {
  const res = await axios.get(`${PATH}/estimateReq/customer/list`, {
    params: { page, pageSize },
  });
  return res.data;
}
