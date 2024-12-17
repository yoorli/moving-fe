import axios from './axios';

const PATH = '/mover';


/* /list GET - 기사 목록 조회 */
interface ReviewStats {
  averageScore: number;
  totalReviews: number;
}

interface Mover {
  id: number;
  userId: number;
  career: number;
  summary: string;
  confirmationCount: number;
  serviceType: string[];
  serviceRegion: string[];
  profileImg: string | null;
  moverName: string;
  reviewStats: ReviewStats;
  favoriteCount: number;
  isAssigned: boolean; // 지정 견적 요청
  isFavorite: boolean; // 찜 여부
}

interface MoverListResponse {
  list: Mover[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

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

/* /{moverId}/detail GET - 기사 프로필 상세 조회 */
interface ReviewStats {
  averageScore: number;
  totalReviews: number;
}

interface MoverDetail {
  id: number;
  userId: number;
  career: number;
  summary: string;
  description: string;
  confirmationCount: number;
  serviceType: string[];
  serviceRegion: string[];
  profileImg: string | null;
  moverName: string;
  reviewStats: ReviewStats;
  favoriteCount: number;
  isAssigned: boolean; // 지정 견적 여부
  isFavorite: boolean; // 찜 여부
  isConfirmed: boolean; // 견적 있는지 여부
}

export async function getMoverDetail(moverId: number): Promise<MoverDetail> {
  try {
    const response = await axios.get(`${PATH}/${moverId}/detail`);
    const data: MoverDetail = response.data;

    return {
      ...data,
      profileImg: data.profileImg || '/default-profile.png',
    };
  } catch (error) {
    console.error('이사 기사 프로필을 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }
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
