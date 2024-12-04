import { useState } from 'react';
import MovingType from './components/MovingType';
import MovingDate from './components/MovingDate';
import Navigation from './components/Navigation';
import MovingAddress from './components/MovingAddress';
import MovingComments from './components/MovingComments';
import ModalContainer from '../../../components/modal/ModalContainer';
import NoContents from '../../../components/noContents/NoContents';
import style from './index.module.css';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const modalBtnClick = () => {
    setIsSubmitted(true);
    setIsModalOpen(false);
  };

  const handleTabChange = () => {
    alert('받은요청 페이지로 가자!');
  };

  return (
    <div className={style.container}>
      <div className={style.mainContent}>
        <Navigation isSelectOption={isSelectOption} isSubmitted={isSubmitted} />
        {!isSubmitted ? (
          <div className={style.contentSection}>
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
                <MovingComments
                  value={values.comment}
                  onClick={(comment) =>
                    handleSelectCompletion('comment', comment)
                  }
                  isModalOpen={setIsModalOpen}
                  disabled={isButtonEnabled}
                />
              )}
            </div>
          </div>
        ) : (
          <NoContents
            image='car'
            hasButton={true}
            buttonText='받은 견적 보러가기'
            buttonHandler={() => handleTabChange()}
          />
        )}

        {isModalOpen && (
          <ModalContainer
            title='견적 확정하기'
            isText={true}
            text='견적을 확정하시겠습니까?'
            buttonText='견적 확정하기'
            closeBtnClick={() => setIsModalOpen(false)}
            buttonClick={modalBtnClick}
          />
        )}
      </div>
    </div>
  );
}
