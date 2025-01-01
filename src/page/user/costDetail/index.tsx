import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DriverCard from "../../../components/card/DriverCard";
import CostDetailBottomTab from "../costDetail/components/CostDetailBottomTab";
import CostInfo from "../../../components/costInfo/CostInfo";
import Button from "../../../components/btn/Button";
import Tab from "../../../components/tab/Tab";
import Toast from "../../../components/toast/Toast";
import HeartEmptyIcon from "../../../assets/icons/ic_empty_heart_small.svg";
import HeartIcon from "../../../assets/icons/ic_full_heart_small.svg";
import style from "./index.module.css";
import { useGetEstimateDetail, useUpdateEstimateConfirmed } from "../../../lib/useQueries/estimate";
import { EstimateConsumer } from "../../../types/apiTypes";
import LoadingSpinner from "../../../components/loading/LoadingSpinner";

const CostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: estimate } = useGetEstimateDetail(Number(id), "consumer") as {
    data: EstimateConsumer;
  };
  const { mutate: updateEstimateConfirmed } = useUpdateEstimateConfirmed();

  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1199);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 1199);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (estimate) {
      console.log("견적 상세 데이터:", estimate);
      setIsFavorite(estimate.isFavorite);
      setIsConfirmed(estimate.isConfirmed);
    }
  }, [estimate]);

  if (!estimate) {
    return (
      <div className={style.outerContainer}>
        <div className={style.noPadding}>
          <Tab firstText="견적 상세" />
        </div>
        <LoadingSpinner />
      </div>
    );
  }

  const costInfoData = {
    id: estimate.estimateId,
    name: estimate.moverName || "기사님",
    isConfirmed,
    movingRequest: estimate.movingRequest || "정보 없음",
    movingType: estimate.movingType || "HOUSE",
    movingDate: estimate.movingDate || "2023-10-15",
    departure: estimate.departure || "서울특별시 강남구",
    arrival: estimate.arrival || "경기도 성남시",
    comment: estimate.customerComment || "추가 요청 사항 없음",
  };

  const shouldShowToast = estimate.isReqConfirmed && !isConfirmed;

  const handleConfirmClick = () => {
    if (!isConfirmed) {
      console.log("전달된 estimateId 값:", estimate.estimateId);
      updateEstimateConfirmed(Number(estimate.estimateId), {
        onSuccess: () => {
          setIsConfirmed(true); // 성공 시 확정 상태 업데이트
        },
        onError: (error) => {
          console.error("견적 확정 실패:", error); // 실패 시
        },
      });
    }
  };

  return (
    <div className={style.outerContainer}>
      <div className={style.noPadding}>
        <Tab firstText="견적 상세" />
      </div>

      <div className={style.container}>
        <div className={style.leftFilters}>
          <DriverCard list={estimate} type="cost" showPrice={false} />
          <div className={style.section}>
            <div className={style.border}></div>
            <h2 className={style.sectionTitle}>견적가</h2>
            <p className={style.costValue}>
              {estimate.price != null ? `${estimate.price.toLocaleString()} 원` : "가격 정보 없음"}
            </p>
            <div className={style.border}></div>
            <h2 className={style.sectionTitle}>{estimate.moverName} 기사님의 코멘트</h2>
            <p className={style.comment}>{estimate.moverComment || "기사님의 코멘트입니다."}</p>

            <div className={style.costInfoWrapper}>
              <CostInfo {...costInfoData} />
            </div>

            {shouldShowToast && (
              <div className={style.toastWrapper}>
                <Toast text="확정하지 않은 견적이에요!" />
              </div>
            )}
          </div>
        </div>

        {!isMobileView && (
          <div className={style.rightFilters}>
            {estimate.isReqConfirmed ? (
              <p className={style.shareText}>견적서 공유하기</p>
            ) : (
              <>
                <Button
                  text="견적 찜하기"
                  btnStyle="outlined354pxLine200"
                  src={isFavorite ? HeartIcon : HeartEmptyIcon}
                  srcLocationFront
                  className={style.heartButton}
                  onClick={() => setIsFavorite(!isFavorite)}
                />
                <div style={{ height: "32px" }}></div>
                <Button
                  text={isConfirmed ? "견적 확정 완료" : "견적 확정하기"}
                  btnStyle={isConfirmed ? "outlined314pxBlue300" : "solid314pxBlue300"}
                  className={style.confirmButton}
                  disabled={isConfirmed}
                  onClick={handleConfirmClick}
                />
              </>
            )}
          </div>
        )}
      </div>

      {isMobileView && (
        <CostDetailBottomTab
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
          isConfirmed={isConfirmed}
          setIsConfirmed={setIsConfirmed}
          isReqConfirmed={estimate.isReqConfirmed}
          handleConfirmClick={handleConfirmClick}
        />
      )}
    </div>
  );
};

export default CostDetail;
