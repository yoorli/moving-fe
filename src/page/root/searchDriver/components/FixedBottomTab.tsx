import React from "react";
import style from "./FixedBottomTab.module.css";
import Button from "../../../../components/btn/Button";
import HeartIcon from "../../../../assets/icons/ic_full_heart_small.svg";

const FixedBottomTab = () => {
  return (
    <div className={style.fixedBottomTab}>
      <div className={style.container}>
        <Button
          btnStyle="outlined354pxLine200"
          src={HeartIcon}
          alt="찜하기 아이콘"
          srcLocationFront
          className={style.heartButton}
        />
        <Button
          text="지정 견적 요청하기"
          btnStyle="solid354pxBlue300"
          className={style.requestButton}
        />
      </div>
    </div>
  );
};

export default FixedBottomTab;
