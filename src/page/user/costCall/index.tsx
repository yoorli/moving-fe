import { useState } from 'react';
import MovingType from './comments/MovingType';
import MovingDate from './comments/MovingDate';
import Navigation from './comments/Navigation';
import MovingAddress from './comments/MovingAddress';
import Comments from './comments/Comment';
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
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <Navigation isSelectOption={isSelectOption} />

        <div className={styles.contentSection}>
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
              <MovingAddress
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
