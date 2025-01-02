import DriverCard from '../../../components/card/DriverCard';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';
import Tab from '../../../components/tab/Tab';
import { useGetFavoriteMover } from '../../../lib/useQueries/favorite';
import { ChipType } from '../../../types/cardTypes';
import style from './index.module.css';

// 타입 정의
interface Mover {
  moverId: number;
  moverName: string;
  profileImg: string;
  career: number;
  confirmationCount: number;
  reviewStats: {
    averageScore: number; // 평점
    totalReviews: number; // 리뷰 갯수
  };
  serviceType: ChipType[];
}

export default function UserFavoriteMover() {
  const { data, isLoading } = useGetFavoriteMover();

  console.log(data);
  console.log(data?.data);

  return (
    <>
      <Tab firstText='찜한 기사님' />
      <div className={style.overlay}>
        {!isLoading && data ? (
          <div className={style.container}>
            <div className={style.cardContainer}>
              {data?.data.list.map((mover: Mover, moverId: number) => (
                <DriverCard
                  key={moverId}
                  list={{ ...mover, isFavorite: true }}
                  type='dibs'
                />
              ))}
            </div>
          </div>
        ) : (
          <div>
            {isLoading ? <LoadingSpinner /> : '데이터를 불러올 수 없습니다.'}
          </div>
        )}
      </div>
    </>
  );
}
