import DriverCard from '../../../components/card/DriverCard';

import style from './index.module.css';

import avatarPinkMedium from '../../../assets/images/img_avatar_pink_medium.svg';
import avatarBlueMedium from '../../../assets/images/img_avatar_blue_medium.svg';
import avatarGreenLarge from '../../../assets/images/img_avatar_green_large.svg';
import avatarPurpleLarge from '../../../assets/images/img_avatar_purple_large.svg';
import avatarYellowLarge from '../../../assets/images/img_avatar_yellow_large.svg';

// interface UserData {
//   users: {
//     id: number;
//     label: string;
//     called?: boolean;
//     description: string;
//     profileImage: string;
//     nickname: string;
//     rating?: number;
//     reviews?: number;
//     experience?: number;
//     confirmedCases?: number;
//     likes?: number;
//     movingDate?: string;
//     cost?: number;
//     serviceRegion?: string[];
//   }[];
// }

// const mockData: UserData = {
//   users: [
//     {
//       id: 1,
//       label: '소형이사',
//       called: true,
//       description: '고객님의 물품을 운송해 드립니다.',
//       profileImage: avatarPinkMedium,
//       nickname: 'test1',
//       rating: 4.0,
//       reviews: 20,
//       experience: 1,
//       confirmedCases: 50,
//       likes: 12,
//       cost: 350000,
//     },
//     {
//       id: 2,
//       label: '포장이사',
//       called: true,
//       description: '고객님의 물품을 운송해 드립니다.',
//       profileImage: avatarBlueMedium,
//       nickname: 'test2',
//       movingDate: '2024.07.01',
//       cost: 210000,
//     },
//     {
//       id: 3,
//       label: '대형이사',
//       called: false,
//       description: '고객님의 물품을 운송해 드립니다.',
//       profileImage: avatarGreenLarge,
//       nickname: 'test3',
//       movingDate: '2024.07.01',
//       cost: 210000,
//     },
//   ],
// };

export default function DriverCallPage() {
  // const { users } = mockData;
  const driver1 = {
    id: 1,
    label: ['소형이사', '대형이사'],
    called: true,
    description: '고객님의 물품을 운송해 드립니다.',
    profileImage: avatarPinkMedium,
    nickname: 'test1',
    rating: 4.0,
    reviews: 20,
    experience: 1,
    confirmedCases: 50,
    likes: 12,
  };

  const driver2 = {
    id: 2,
    label: ['소형이사', '포장이사'],
    called: true,
    description: '고객님의 물품을 운송해 드립니다.',
    profileImage: avatarBlueMedium,
    nickname: 'test2',
    rating: 4.3,
    reviews: 70,
    experience: 7,
    confirmedCases: 150,
    likes: 5,
    cost: 210000,
  };

  const driver3 = {
    id: 3,
    label: ['대형이사'],
    called: false,
    description: '고객님의 물품을 운송해 드립니다.',
    profileImage: avatarGreenLarge,
    nickname: 'test3',
    rating: 4.3,
    reviews: 70,
    experience: 7,
    confirmedCases: 150,
    likes: 5,
    cost: 210000,
    movingDate: '2024.07.01',
    start: '인천시 남동구',
    end: '경기도 고양시',
  };

  const driver4 = {
    id: 4,
    label: ['대형이사', '포장이사'],
    called: false,
    profileImage: avatarPurpleLarge,
    nickname: 'test4',
    rating: 4.3,
    reviews: 70,
    experience: 7,
    confirmedCases: 150,
    likes: 5,
  };

  const driver5 = {
    id: 5,
    description: '고객님의 물품을 운송해 드립니다.',
    profileImage: avatarPurpleLarge,
    nickname: 'test5',
    rating: 4.3,
    reviews: 70,
    experience: 7,
    confirmedCases: 150,
    service: ['소형이사', '포장이사'],
    serviceRegion: ['서울', '경기'],
  };

  const driver6 = {
    id: 6,
    label: ['소형이사', '대형이사', '포장이사'],
    called: true,
    profileImage: avatarYellowLarge,
    nickname: 'test6',
    cost: 210000,
    movingDate: '2024.07.01',
  };

  return (
      <div className={style.container}>
        {/* {users.map((user) => (
          <DriverCard key={user.id} user={user} />
        ))} */}
        *Card-list/기사님 찾기 &lt;Card user=&#123;driver1&#125;&gt;
        <DriverCard user={driver1} />
        *Card-list/견적내역 &lt;Card user=&#123;driver2&#125;
        type=&apos;cost&apos;&gt;
        <DriverCard user={driver2} type='cost' />
        *Card-list/대기중인내역 &lt;Card user=&#123;driver3&#125;
        type=&apos;waiting&apos;&gt;
        <DriverCard user={driver3} type='waiting' />
        *Card-list/찜한 기사님 &lt;Card user=&#123;driver4&#125;
        type=&apos;dibs&apos;&gt;
        <DriverCard user={driver4} type='dibs' />
        *Card-list/profile &lt;Card user=&#123;driver5&#125;
        type=&apos;profile&apos; type=&apos;profile&apos;&gt;
        <DriverCard user={driver5} type='profile' />
        *Card-list/작성 가능한 리뷰 &lt;Card user=&#123;driver6&#125;
        type=&apos;review&apos;&gt;
        <DriverCard user={driver6} type='review' />
      </div>
  );
}
