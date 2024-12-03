import DriverCard from '../../../components/card/DriverCard';
import UserCard from '../../../components/card/UserCard';

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

  const user1 = {
    id: 1,
    label: ['소형이사'],
    called: true,
    name: 'user1',
    movingDate: '2024.07.01',
    start: '인천시 남동구',
    end: '경기도 고양시',
    createAt: '2024.07.01 12:30:40',
  };

  const user2 = {
    id: 2,
    label: ['포장이사'],
    called: true,
    name: 'user2',
    movingDate: '2024.07.01',
    start: '인천시 남동구',
    end: '경기도 고양시',
    createAt: '2024.12.02 20:56:40',
    cost: 210000,
  };

  const user3 = {
    id: 3,
    label: ['대형이사'],
    called: false,
    name: 'user3',
    movingDate: '2024.07.01',
    start: '인천시 남동구',
    end: '경기도 고양시',
    createAt: '2024.12.02 20:30:40',
  };

  const user4 = {
    id: 3,
    label: ['소형이사', '대형이사'],
    called: false,
    profileImage: avatarGreenLarge,
    name: 'user4',
    rating: 3.5,
    cost: 210000,
    movingDate: '2024.07.01',
    start: '인천시 남동구',
    end: '경기도 고양시',
    createAt: '2024.12.02 17:30:40',
    review:
      '처음 견적 받아봤는데, 엄청 친절하시고 꼼꼼하세요! 귀찮게 이것저것 물어봤는데 잘 알려주셨습니다. 원룸 이사는 믿고 맡기세요! :)',
  };
  return (
    <>
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
      <div className={style.container}>
        *Card-list/확정견적 &lt;Card user=&#123;user1&#125;&gt;
        <UserCard user={user1} />
        *Card-list/확정 견적 &lt;Card user=&#123;user2&#125;
        type=&apos;confirmedCost&apos;&gt;
        <UserCard user={user2} type='confirmedCost' />
        *Card-list/받은 요청 &lt;Card user=&#123;user3&#125;
        type=&apos;receive&apos;&gt;
        <UserCard user={user3} type='receive' />
        *Card-list/내가 작성한 리뷰 &lt;Card user=&#123;user4&#125;
        type=&apos;review&apos;&gt;
        <UserCard user={user4} type='review' />
      </div>
    </>
  );
}
