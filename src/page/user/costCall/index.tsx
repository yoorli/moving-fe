import UserCard from '../../../components/card/UserCard';

import style from './index.module.css';

import avatarGreenLarge from '../../../assets/images/img_avatar_green_large.svg';

export default function UserCallPage() {
  const user1 = {
    id: 1,
    label: ['소형이사'],
    called: true,
    name: 'user1',
    movingDate: '2024.07.01',
    start: '인천시 남동구',
    end: '경기도 고양시',
    createAt: '2024.07.01 12:30:40'
  };

  const user2 = {
    id: 2,
    label: ['포장이사'],
    called: true,
    name: 'user2',
    movingDate: '2024.07.01',
    start: '인천시 남동구',
    end: '경기도 고양시',
    createAt: '2024.07.01 12:30:40',
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
    createAt: '2024.07.01 12:30:40',
  };

  const user4 = {
    id: 3,
    label: ['소형이사', '대형이사'],
    called: false,
    profileImage: avatarGreenLarge,
    name: 'user4',
    rating: 4.3,
    cost: 210000,
    movingDate: '2024.07.01',
    start: '인천시 남동구',
    end: '경기도 고양시',
    createAt: '2024.07.01 12:30:40',
    review: '처음 견적 받아봤는데, 엄청 친절하시고 꼼꼼하세요! 귀찮게 이것저것 물어봤는데 잘 알려주셨습니다. 원룸 이사는 믿고 맡기세요! :)'
  };

  return (
      <div className={style.container}>
        *Card-list/확정견적 &lt;Card user=&#123;user1&#125;&gt;
        <UserCard user={user1} />
        *Card-list/견적내역 &lt;Card user=&#123;user2&#125;
        type=&apos;confirm&apos;&gt;
        <UserCard user={user2} type='confirmedCost' />
        *Card-list/대기중인내역 &lt;Card user=&#123;user3&#125;
        type=&apos;receive&apos;&gt;
        <UserCard user={user3} type='receive' />
        *Card-list/견적내역 &lt;Card user=&#123;user4&#125;
        type=&apos;confirm&apos;&gt;
        <UserCard user={user4} type='review' />
      </div>
  );
}
