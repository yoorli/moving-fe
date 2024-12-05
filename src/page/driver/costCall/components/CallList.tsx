import UserCard from '../../../../components/card/UserCard';

import style from './CallList.module.css';

interface User {
  id: number;
  movingType: string[];
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
