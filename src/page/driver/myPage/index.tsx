// import DriverCard from '../../../components/card/DriverCard';
import DriverCard from '../../../components/card/DriverCard';
import { ChipType } from '../../../types/cardTypes';
import Review from '../../../components/review/Review';
import Tab from '../../../components/tab/Tab';
import useDirection from '../../../lib/function/direction';
import style from './index.module.css';

export type ServiceRegionType =
  | 'SEOUL'
  | 'GYEONGGI'
  | 'INCHEON'
  | 'GANGWON'
  | 'CHUNGBUK'
  | 'CHUNGNAM'
  | 'SEJONG'
  | 'DAEJEON'
  | 'JEONBUK'
  | 'JEONNAM'
  | 'GWANGJU'
  | 'GYEONGBUK'
  | 'GYEONGNAM'
  | 'DAEGU'
  | 'ULSAN'
  | 'BUSAN'
  | 'JEJU';

interface DriverProfile {
  id: number;
  userId: number;
  profileImg: string;
  moverName: string;
  career: number;
  summary: string;
  description: string;
  confirmationCount: number;
  serviceType: ChipType[];
  serviceRegion: ServiceRegionType[];
  reviewStats: {
    averageScore: number;
    totalReviews: number;
  };
  favoriteCount: number;
  isAssigned?: boolean;
}

const mockData: DriverProfile = {
  id: 1,
  userId: 5,
  profileImg:
    'https://moving-profile.s3.us-east-1.amazonaws.com/profiles/1733118794939_bestItem.svg',
  moverName: '이사팔',
  career: 24,
  summary: '제 인생에서는 이사를 빼놓을 순 없습니다.',
  description:
    '침대류 보호커버(일반,포장 이사 전부적용)\n가구류 보호커버(일반,포장 이사 전부적용)\n차량 동승가능\n\n채택해주시면 \n편하고 안전한 이사 도와드리겠습니다.\n삼성에서 7년간 고객응대 CS교육받은 \n마인드로 고객의 입장에서 생각하고\n착한 이사가 되겠습니다',
  confirmationCount: 3,
  serviceType: ['OFFICE', 'SMALL', 'HOUSE'],
  serviceRegion: [
    'BUSAN',
    'GYEONGGI',
    'GYEONGNAM',
    // 'DAEGU',
    // 'SEOUL',
    // 'SEJONG',
    // 'JEONNAM',
    // 'JEONBUK',
    // 'JEJU',
    // 'INCHEON',
    // 'GYEONGBUK',
    // 'GWANGJU',
    // 'GANGWON',
    // 'CHUNGNAM',
  ],
  reviewStats: {
    averageScore: 4.3,
    totalReviews: 57,
  },
  favoriteCount: 40,
  isAssigned: false,
};

export default function MyPage() {
  const { direction_driverEditProfile, direction_driverEditInfo } =
    useDirection();

  return (
    <>
      <Tab firstText='마이페이지' />
      <div className={style.overlay}>
        <div className={style.container}>
          <DriverCard
            list={{ ...mockData, moverId: mockData.userId }}
            type='profile'
            editInfoBtn={direction_driverEditInfo}
            editProfileBtn={direction_driverEditProfile}
          />
          <div className={style.line} />
          <Review />
        </div>
      </div>
    </>
  );
}
