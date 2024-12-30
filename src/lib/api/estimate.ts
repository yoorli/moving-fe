import axios from './axios';
import { getParams } from '../function/utils';
import {
  EstimateConsumer,
  EstimateMover,
  EstimateParams,
  PaginationParams,
} from '../../types/apiTypes';

const PATH = `/estimate`;

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
export async function getMovedEstimates({ page, pageSize }: PaginationParams) {
  const res = await axios.get(`${PATH}/movedList`, {
    params: { page, pageSize },
  });
  return res.data;
}

/* GET USER-받았던 견적 상세내용 리스트 조회*/
export async function getEstimate(estimateRequestId: string) {
  const res = await axios.get(`${PATH}/list/${estimateRequestId}`);
  return res.data;
}

/* GET - 기사-확정된 견적 리스트 조회*/
export async function getEstimateConfirmed(queryParams: PaginationParams) {
  const params = getParams(queryParams);
  const res = await axios.get(`${PATH}/confirmed`, { params });
  return res.data;
}

/* GET - 기사-보낸 견적 리스트 조회*/
export async function getEstimateList(queryParams: PaginationParams) {
  const params = getParams(queryParams);
  const res = await axios.get(`${PATH}/sentList`, { params });
  return res.data;
}

/* POST - 견적 작성 */
export async function createEstimate(data: EstimateParams) {
  const res = await axios.post(`${PATH}`, data);
  return res.data;
}

/* /{estimateId} GET - 견적 상세 조회 */
export async function getEstimateDetail(
  estimateId: number,
  userType: 'consumer' | 'mover',
): Promise<EstimateConsumer | EstimateMover> {
  const response = await axios.get(`${PATH}/${estimateId}`);
  const data = response.data;

  if (userType === 'consumer') {
    const consumerData: EstimateConsumer = {
      estimateId: data.estimateId,
      moverId: data.moverId,
      isConfirmed: data.isConfirmed,
      isReqConfirmed: data.isReqConfirmed,
      serviceType: data.serviceType,
      isAssigned: data.isAssigned,
      summary: data.summary,
      profileImg: data.profileImg || '/default-profile.png',
      moverName: data.moverName,
      reviewStats: data.reviewStats,
      career: data.career,
      confirmationCount: data.confirmationCount,
      favoriteCount: data.favoriteCount,
      isFavorite: data.isFavorite,
      price: data.price,
      moverComment: data.moverComment,
      customerComment: data.customerComment,
      movingRequest: data.movingRequest,
      movingType: data.movingType,
      movingDate: data.movingDate,
      departure: data.departure,
      arrival: data.arrival,
    };
    return consumerData;
  } else {
    const moverData: EstimateMover = {
      estimateRequestId: data.estimateRequestId,
      movingType: data.movingType,
      isAssigned: data.isAssigned,
      customerName: data.customerName,
      movingDate: data.movingDate,
      departure: data.departure,
      arrival: data.arrival,
      price: data.price,
      moverComment: data.moverComment,
      customerComment: data.customerComment,
      movingRequest: data.movingRequest,
      detailDeparture: data.detailDeparture,
      detailArrival: data.detailArrival,
    };
    return moverData;
  }
}
