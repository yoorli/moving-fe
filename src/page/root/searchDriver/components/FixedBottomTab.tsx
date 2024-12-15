import React from "react";
import style from "./FixedBottomTab.module.css";
import Button from "../../../../components/btn/Button";
import HeartIcon from "../../../../assets/icons/ic_full_heart_small.svg";
import HeartEmptyIcon from "../../../../assets/icons/ic_empty_heart_small.svg";

interface FixedBottomTabProps {
  isFavorite: boolean;
  isAssigned: boolean;
  isConfirmed: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>;
}

const FixedBottomTab = ({
  isFavorite,
  setIsFavorite,
  isAssigned,
  isConfirmed,
  setModalOpen,
}: FixedBottomTabProps) => {
  return (
    <div className={style.fixedBottomTab}>
      <div className={style.container}>
        <Button
          btnStyle="outlined354pxLine200"
          src={isFavorite ? HeartIcon : HeartEmptyIcon}
          alt="찜하기 아이콘"
          srcLocationFront
          className={style.heartButton}
          onClick={() => setIsFavorite(!isFavorite)}
        />
        <Button
          text={isAssigned ? "지정 견적 요청 완료" : "지정 견적 요청하기"}
          btnStyle="solid354pxBlue300"
          disabled={isAssigned}
          className={style.requestButton}
          onClick={() => {
            if (!isAssigned && !isConfirmed) {
              setModalOpen(true);
            }
          }}
        />
      </div>
    </div>
  );
};

export default FixedBottomTab;

