import style from "./CostDetailBottomTab.module.css";
import Button from "../../../../components/btn/Button";
import HeartIcon from "../../../../assets/icons/ic_full_heart_small.svg";

const CostDetailBottomTab = ({ isConfirmed }: { isConfirmed: boolean }) => {
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
          text="견적 확정하기"
          btnStyle={isConfirmed ? "outlined314pxBlue300" : "solid314pxBlue300"}
          className={style.confirmButton}
        />
      </div>
    </div>
  );
};

export default CostDetailBottomTab;

