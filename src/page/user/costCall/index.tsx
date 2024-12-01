import { useState } from 'react';
import MovingType from './comments/movingType';
import MovingDate from './comments/movingDate';
import AddressCompo from './comments/address';
import Comments from './comments/comment';
import styles from './index.module.css';

export interface FormValues {
  movingType: null | string;
  movingDate: null | string;
  departure: null | string;
  arrival: null | string;
  comment?: undefined | string | null;
}

export interface SelectValues {
  movingType: boolean;
  movingDate: boolean;
  departure: boolean;
  arrival: boolean;
}

export default function UserCostCallPage() {
  const [values, setValues] = useState<FormValues>({
    movingType: null,
    movingDate: null,
    departure: null,
    arrival: null,
    comment: null,
  });
  const [isSelectOption, setIsSelectOption] = useState<SelectValues>({
    movingType: false,
    movingDate: false,
    departure: false,
    arrival: false,
  });

  const handleSelectCompletion = (
    name: keyof FormValues,
    value: string | Date | null,
  ) => {
    setValues((prev: FormValues) => ({
      ...prev,
      [name]: value,
    }));
    setIsSelectOption((prev: SelectValues) => ({
      ...prev,
      [name]: true,
    }));
  };

  const isButtonEnabled = !!(
    values.movingType &&
    values.movingDate &&
    values.arrival &&
    values.departure !== null
  );

  return (
    <div className={styles.layout}>
      <div className={styles.center}>
        <div className={styles.nav}>
          <div className={styles.navLayout}>
            <div className={styles.navText}>견적요청</div>
            <div className={styles.navBar}>
              <div
                className={styles.navBarColor}
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

        <div className={styles.body}>
          <MovingType
            onClick={(type) => handleSelectCompletion('movingType', type)}
            value={values.movingType}
          />
          <div>
            {isSelectOption.movingType && (
              <MovingDate
                onClick={(date) => handleSelectCompletion('movingDate', date)}
                value={values.movingDate}
              />
            )}
          </div>
          <div>
            {isSelectOption.movingDate && (
              <AddressCompo
                arrival={values.arrival}
                departure={values.departure}
                arrivalClick={(arrival) =>
                  handleSelectCompletion('arrival', arrival)
                }
                departureClick={(departure) =>
                  handleSelectCompletion('departure', departure)
                }
              />
            )}
          </div>
          <div>
            {isSelectOption.arrival && isSelectOption.departure && (
              <Comments
                value={values.comment}
                onClick={(comment) =>
                  handleSelectCompletion('comment', comment)
                }
                disabled={isButtonEnabled}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
