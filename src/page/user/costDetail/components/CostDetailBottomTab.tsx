import React from "react";
import style from "./CostDetailBottomTab.module.css";
import Button from "../../../../components/btn/Button";
import HeartEmptyIcon from "../../../../assets/icons/ic_empty_heart_small.svg";
import HeartIcon from "../../../../assets/icons/ic_full_heart_small.svg";

interface CostDetailBottomTabProps {
  isFavorite: boolean;
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  isConfirmed: boolean;
  setIsConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
  isReqConfirmed: boolean;
  handleConfirmClick: () => void;
}

function CostDetailBottomTab({
  isFavorite,
  setIsFavorite,
  isConfirmed,
  isReqConfirmed,
  handleConfirmClick,
}: CostDetailBottomTabProps) {
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  // isReqConfirmed가 true면 아무것도 렌더링하지 않음
  if (isReqConfirmed) {
    return null;
  }

  return (
    <div className={style.fixedBottomTab}>
      <div className={style.container}>
        <Button
          btnStyle="outlined354pxLine200"
          src={isFavorite ? HeartIcon : HeartEmptyIcon}
          alt="찜하기 아이콘"
          srcLocationFront
          className={style.heartButton}
          onClick={handleFavoriteToggle}
        />
        <div style={{ height: "16px" }}></div>
        <Button
          btnStyle={isConfirmed ? "outlined314pxBlue300" : "solid314pxBlue300"}
          text={isConfirmed ? "견적 확정 완료" : "견적 확정하기"}
          className={style.confirmButton}
          disabled={isConfirmed}
          onClick={handleConfirmClick}
        />
      </div>
    </div>
  );
}

export default CostDetailBottomTab;

