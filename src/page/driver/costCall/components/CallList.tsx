import UserCard from '../../../../components/card/UserCard';

import { ChipType } from '../../../../components/card/type';

import style from './CallList.module.css';

interface User {
  id: number;
  movingType: ChipType[];
  isAssigned: boolean;
  customer: string;
  movingDate: string;
  departure: string;
  arrival: string;
  createAt: string;
}

interface CallListProps {
  list: User[];
}

export default function CallList({list} : CallListProps) {
  return (
    <div className={style.callList}>
      {list.map((user) => (
        <UserCard key={user.id} user={user} type='receive' />
      ))}
    </div>
  );
}
