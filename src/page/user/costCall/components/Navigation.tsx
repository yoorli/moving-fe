import style from './Navigation.module.css';

export interface SelectValues {
  isSelectOption: {
    movingType: boolean;
    movingDate: boolean;
    arrival: boolean;
    departure: boolean;
  };
}

export default function Navigation({ isSelectOption }: SelectValues) {
  return (
    <div className={style.navigation}>
      <div className={style.navWrapper}>
        <div className={style.navTitle}>견적요청</div>
        <div className={style.navProgressBar}>
          <div
            className={style.navProgress}
            style={
              isSelectOption.arrival && isSelectOption.departure
                ? { width: '100%' }
                : isSelectOption.movingDate
                  ? { width: '75%' }
                  : isSelectOption.movingType
                    ? { width: '50%' }
                    : { width: '25%' }
            }
          />
        </div>
      </div>
    </div>
  );
}
