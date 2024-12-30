import axios from './axios';

const PATH = '/customer/me';

/* GET -  유저 정보 조회 */
export async function getCustomer() {
  const res = await axios.get(`${PATH}`);
  return res.data;
}
