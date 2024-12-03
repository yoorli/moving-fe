import UserCard from '../../../../components/card/UserCard';

import style from './CallList.module.css';

interface UserData {
  users: {
    id: number;
    label: string[];
    called?: boolean;
    name: string;
    movingDate: string;
    start: string;
    end: string;
    createAt: string;
  }[];
}

const mockData: UserData = {
  users: [
    {
      id: 3,
      label: ['소형이사'],
      called: false,
      name: 'user3',
      movingDate: '2024.07.01',
      start: '인천시 남동구',
      end: '경기도 고양시',
      createAt: '2024.12.02 20:30:40',
    },
    {
      id: 3,
      label: ['포장이사'],
      called: false,
      name: 'user3',
      movingDate: '2024.07.01',
      start: '인천시 남동구',
      end: '경기도 고양시',
      createAt: '2024.12.02 20:30:40',
    },
    {
      id: 3,
      label: ['대형이사'],
      called: false,
      name: 'user3',
      movingDate: '2024.07.01',
      start: '인천시 남동구',
      end: '경기도 고양시',
      createAt: '2024.12.02 20:30:40',
    },
  ],
};

export default function CallList() {
  return (
    <div className={style.callList}>
      {mockData.users.map((user) => (
        <UserCard key={user.id} user={user} type='receive' />
      ))}
    </div>
  );
}
