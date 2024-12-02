import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {
  AddressValues,
  MetaValues,
} from '../../page/user/costCall/components/MovingAddressModal';

interface AddressListData {
  documents: AddressValues[];
  meta: MetaValues;
}

const instance = axios.create({
  baseURL: 'https://dapi.kakao.com/v2/local/search',
  headers: {
    Authorization: `KakaoAK ${process.env.REACT_APP_REST_API_KEY}`,
  },
});

export async function fetchAddress(keyword: string, currentPage: number) {
  try {
    const res = await instance.get(`/address.json`, {
      params: {
        query: keyword,
        page: currentPage,
        size: 5,
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

export function useMovingAddressList(address: string, currentPage: number) {
  const { data, isLoading, error } = useQuery<AddressListData>({
    queryKey: ['movingAddress', address, currentPage],
    queryFn: () => fetchAddress(address, currentPage),
    enabled: !!address,
  });

  return {
    addressList: data?.documents || [],
    meta: data?.meta,
    isLoading,
    error,
  };
}
