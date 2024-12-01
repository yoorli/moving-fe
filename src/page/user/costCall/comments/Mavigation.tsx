import styles from './Mavigation.module.css';

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
    <div className={styles.navigation}>
      <div className={styles.navWrapper}>
        <div className={styles.navTitle}>견적요청</div>
        <div className={styles.navProgressBar}>
          <div
            className={styles.navProgress}
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
