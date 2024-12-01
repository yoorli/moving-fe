import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://dapi.kakao.com/v2/local/search',
  headers: {
    Authorization: `KakaoAK ${process.env.REACT_APP_REST_API_KEY}`,
  },
});

export async function fetchAddress(address: string) {
  try {
    const res = await instance.get(`/address.json`, {
      params: {
        query: address,
      },
    });

    return {
      addressList: res.data.documents || [],
      meta: res.data.meta || 0,
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      addressList: [],
      meta: '',
    };
  }
}
