import React from 'react';
import style from './FixedBottomTab.module.css';
import Button from '../../../../components/btn/Button';
import HeartIcon from '../../../../assets/icons/ic_full_heart_small.svg';
import HeartEmptyIcon from '../../../../assets/icons/ic_empty_heart_small.svg';
import { useToggleFavoriteMover } from '../../../../lib/useQueries/favorite';
// import axios from '../../../../lib/api/axios';
// import { useRequestAssignedEstimate } from '../../../../lib/useQueries/assignedEstimateReq';

interface FixedBottomTabProps {
  isFavorite: boolean;
  isAssigned: boolean;
  isConfirmed: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAssigned: React.Dispatch<React.SetStateAction<boolean>>;
  moverId: number;
  isLoggedIn: boolean;
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FixedBottomTab = ({
  isFavorite,
  setIsFavorite,
  isAssigned,
  setIsAssigned,
  isConfirmed,
  setModalOpen,
  moverId,
  isLoggedIn,
  setLoginModalOpen,
}: FixedBottomTabProps) => {
  const { mutate: toggleFavorite } = useToggleFavoriteMover();

  const handleFavoriteToggle = () => {
    if (!isLoggedIn) {
      setLoginModalOpen(true);
      return;
    }

    toggleFavorite(moverId, {
      onSuccess: () => {
        setIsFavorite((prev) => !prev);
      },
    });
  };

  const handleAssignRequest = async () => {
    if (!isLoggedIn) {
      setLoginModalOpen(true);
      return;
    }

    if (!isAssigned && isConfirmed) {
      setIsAssigned(true);
    } else if (!isConfirmed) {
      setModalOpen(true);
    }
  };

  return (
    <div className={style.fixedBottomTab}>
      <div className={style.container}>
        <Button
          btnStyle='outlined354pxLine200'
          src={isFavorite ? HeartIcon : HeartEmptyIcon}
          alt='찜하기 아이콘'
          srcLocationFront
          className={style.heartButton}
          onClick={handleFavoriteToggle}
        />
        <Button
          text={isAssigned ? '지정 견적 요청 완료' : '지정 견적 요청하기'}
          btnStyle='solid354pxBlue300'
          disabled={isAssigned}
          className={style.requestButton}
          onClick={handleAssignRequest}
        />
      </div>
    </div>
  );
};

export default FixedBottomTab;
