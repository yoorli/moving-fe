import { useQuery } from '@tanstack/react-query';
import { getCustomer } from '../api/customer';

/* GET - 유저 정보 조회 */
export function useGetCustomer() {
  return useQuery({
    queryKey: ['customer'],
    queryFn: () => getCustomer(),
  });
}
