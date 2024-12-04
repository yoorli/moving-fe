import useDirection from '../../lib/function/direction';
import style from './ProfileModal.module.css';

type Props = {
  modalController: () => void;
};

export function UserProfileModal({ modalController }: Props) {
  const { direction_userEditProfile, direction_userEditInfo } = useDirection();
  const directionAndPopModal = (direction: () => void) => {
    direction();
    modalController();
  };
  return (
    <div className={style.container}>
      <div className={style.title}>
        <span>김가나 고객님</span>
      </div>
      <div
        onClick={() => {
          directionAndPopModal(direction_userEditProfile);
        }}
        className={style.item}
      >
        프로필 수정
      </div>
      <div
        onClick={() => {
          directionAndPopModal(direction_userEditInfo);
        }}
        className={style.item}
      >
        기본정보 수정
      </div>
      <div className={style.item}>찜한 기사님</div>
      <div className={style.item}>이사 리뷰</div>
      <div className={style.logout}>로그아웃</div>
    </div>
  );
}
