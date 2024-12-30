import DriverCard from '../../../components/card/DriverCard';
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

  // 로딩 중일 때 처리
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <Tab firstText='찜한 기사님' />
      {!isLoading && data ? (
        <div className={style.overlay}>
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
        </div>
      ) : (
        <div>{isLoading ? '로딩 중...' : '데이터를 불러올 수 없습니다.'}</div>
      )}
    </>
  );
}
