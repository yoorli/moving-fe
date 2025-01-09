import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  AddressValues,
  MetaValues,
} from '../../page/user/costCall/components/MovingAddressModal';
import { ENV } from './STORAGE_KEY';

interface AddressListData {
  documents: AddressValues[];
  meta: MetaValues;
}

const instance = axios.create({
  baseURL: 'https://dapi.kakao.com/v2/local/search',
  headers: {
    Authorization: `KakaoAK ${ENV.KAKAO_CLIENT_REST_KEY}`,
  },
});

export async function fetchAddress(
  keyword: string,
  currentPage: number,
  size: number,
) {
  try {
    const res = await instance.get('/address.json', {
      params: {
        query: keyword,
        page: currentPage,
        size: size,
        analyze_type: 'exact',
      },
    });

    return res.data;
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      addressList: [],
      meta: '',
    };
  }
}

export function useMovingAddressList(
  address: string,
  currentPage: number,
  size: number,
) {
  const { data, isLoading, error } = useQuery<AddressListData>({
    queryKey: ['movingAddress', address, currentPage, size],
    queryFn: () => fetchAddress(address, currentPage, size),
    enabled: !!address,
  });

  return {
    addressList: data?.documents || [],
    meta: data?.meta,
    isLoading,
    error,
  };
}
