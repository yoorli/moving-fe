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

export default function UserCostCallPage() {
  const [values, setValues] = useState<FormValues>({
    movingType: null,
    movingDate: null,
    departure: null,
    arrival: null,
    comment: null,
  });

  const handleSelectCompletion = (
    name: keyof FormValues,
    value: string | Date | null,
  ) => {
    setValues((prev: FormValues) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.layout}>
      <div className={styles.center}>
        <div className={styles.nav}>
          <div className={styles.navLayout}>
            <div className={styles.navText}>견적요청</div>
            <div className={styles.navBar}>
              <div className={styles.navBarColor} />
            </div>
          </div>
        </div>

        <div className={styles.body}>
          <MovingType
            onClick={(type) => handleSelectCompletion('movingType', type)}
            value={values.movingType}
          />
          <div>
            <MovingDate
              onClick={(date) => handleSelectCompletion('movingDate', date)}
              value={values.movingDate}
            />
          </div>
          <div>
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
          </div>
          <div>
            <Comments
              value={values.comment}
              onClick={(comment) => handleSelectCompletion('comment', comment)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
