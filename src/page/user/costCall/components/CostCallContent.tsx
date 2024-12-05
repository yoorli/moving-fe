import React, { useState } from 'react';
import MovingType from './MovingType';
import MovingDate from './MovingDate';
import MovingAddress from './MovingAddress';
import MovingComments from './MovingComments';
import ModalContainer from '../../../../components/modal/ModalContainer';
import pageStyle from '../index.module.css';

export interface FormValues {
  movingType: null | string;
  movingDate: null | Date;
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

interface CostCallContentProps {
  isSelectOption: SelectValues;
  setIsSelectOption: React.Dispatch<React.SetStateAction<SelectValues>>;
  setIsSubmitted: (value: boolean) => void;
}

export default function UserCostCallPage({
  isSelectOption,
  setIsSelectOption,
  setIsSubmitted,
}: CostCallContentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <div className={pageStyle.contentSection}>
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
            onClick={(comment) => handleSelectCompletion('comment', comment)}
            isModalOpen={setIsModalOpen}
            disabled={isButtonEnabled}
          />
        )}
      </div>
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
  );
}
