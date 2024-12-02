import style from './DriverProfile.module.css';

interface ProfileProps {
  type?: string;
  user: {
    label?: string[];
    called?: boolean;
    name: string;
    movingDate?: string;
    start?: string;
    end?: string;
    createAt?: string;
    description?: string;
    profileImage?: string;
    rating?: number;
    reviews?: number;
    experience?: number;
    confirmedCases?: number;
    likes?: number;
    cost?: number;
    service?: string[];
    serviceRegion?: string[];
  };
}

export default function UserProfile({ type, user }: ProfileProps) {
  return (
    <>
      {type !== 'review' ? (
        <div>
          <div className={style.userInfo}>{user.name} 고객님</div>
          <div className={style.movingInfo}>{user.movingDate}</div>
          <div className={style.movingInfo}>{user.start}</div>
          <div className={style.movingInfo}>{user.end}</div>
        </div>
      ) : (
        <div>
          <div>
            image
          </div>
          <div className={style.info}>
            <div className={style.userInfo}>{user.name} 기사님</div>
            <div className={style.movingInfo}>{user.movingDate}</div>
            <div className={style.stars}>{user.rating}</div>
          </div>
        </div>
      )}
    </>
  );
}
