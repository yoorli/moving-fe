import React from "react";
import style from "./FixedBottomTab.module.css";
import Button from "../../../../components/btn/Button";
import HeartIcon from "../../../../assets/icons/ic_full_heart_small.svg";
import HeartEmptyIcon from "../../../../assets/icons/ic_empty_heart_small.svg";
import axios from "../../../../lib/api/axios";
import { useRequestAssignedEstimate } from "../../../../lib/useQueries/assignedEstimateReq";

interface FixedBottomTabProps {
  isFavorite: boolean;
  isAssigned: boolean;
  isConfirmed: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAssigned: React.Dispatch<React.SetStateAction<boolean>>;
  moverId: number;
}

const FixedBottomTab = ({
  isFavorite,
  setIsFavorite,
  isAssigned,
  setIsAssigned,
  isConfirmed,
  setModalOpen,
  moverId,
}: FixedBottomTabProps) => {
  const { mutate: requestAssignedEstimate } = useRequestAssignedEstimate();

  const handleFavoriteToggle = async () => {
    try {
      const response = await axios.post("/favorite", { moverId });
      setIsFavorite(response.data.isFavorite);
    } catch (error) {
      console.error("찜하기 API 호출 중 오류 발생:", error);
    }
  };

  const handleAssignRequest = async () => {
    if (!isAssigned && isConfirmed) {
      try {
        await requestAssignedEstimate(moverId); // 지정 견적 요청 API 호출
        setIsAssigned(true); // 요청 성공 시 견적 요청 상태 업데이트
      } catch (error) {
        console.error("지정 견적 요청 중 오류 발생:", error);
      }
    } else if (!isConfirmed) {
      setModalOpen(true);
    }
  };

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
        <Button
          text={isAssigned ? "지정 견적 요청 완료" : "지정 견적 요청하기"}
          btnStyle="solid354pxBlue300"
          disabled={isAssigned}
          className={style.requestButton}
          onClick={handleAssignRequest}
        />
      </div>
    </div>
  );
};

export default FixedBottomTab;
