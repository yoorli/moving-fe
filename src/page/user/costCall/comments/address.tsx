import { useState } from 'react';
import AddressModal from './addressModal';
import pageStyles from '../index.module.css';
import style from './address.module.css';
import Button from '../../../../components/btn/Button';
// import { createPortal } from 'react-dom';
// import ModalContent from './modalTest';

export interface ValuePiece {
  arrival: string | null;
  departure: string | null;
}

interface AddressCompoProps extends ValuePiece {
  arrivalClick: (arrival: string | null) => void;
  departureClick: (departure: string | null) => void;
}

export default function AddressCompo({
  arrival,
  departure,
  arrivalClick,
  departureClick,
}: AddressCompoProps) {
  const [addressValues, setAddressValues] = useState<ValuePiece>({
    arrival: '',
    departure: '',
  });
  const [isDepartureModal, setIsDepartureModal] = useState(false);
  const [isArrivalModal, setIsArrivalModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleClick = () => {
    setIsDepartureModal((prev) => !prev);
  };

  const handleClickTwo = () => {
    setIsArrivalModal((prev) => !prev);
  };

  const handleSelectClick = () => {
    if (addressValues) {
      arrivalClick(addressValues.arrival);
      departureClick(addressValues.departure);
    }
    setIsEdit(true);
  };

  const handleEditClick = () => {
    arrivalClick(null);
    departureClick(null);

    setIsEdit(false);
  };

  const handleSetValue = (name: 'arrival' | 'departure', value: string) => {
    setAddressValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div>
        <div className={pageStyles.white}>이사 지역을 선택해 주세요</div>

        {!isEdit && (
          <div className={pageStyles.option}>
            <div className={style.layout}>
              <div className={style.text}>출발지</div>
              <Button
                className={style.btn}
                text={
                  addressValues.departure
                    ? `${addressValues.departure}`
                    : '출발지역 선택하기'
                }
                style='outlined560pxBlue300'
                onClick={() => {
                  handleClick();
                }}
              />
            </div>
            {isDepartureModal && (
              <AddressModal
                setValue={handleSetValue}
                type='departure'
                onClose={() => {
                  setIsDepartureModal(false);
                }}
              />
            )}

            <div className={style.layout}>
              <div className={style.text}>도착지</div>
              <Button
                className={style.btn}
                text={
                  addressValues.arrival
                    ? `${addressValues.arrival}`
                    : '도착지역 선택하기'
                }
                style='outlined560pxBlue300'
                onClick={() => {
                  handleClickTwo();
                }}
              />
            </div>
            {isArrivalModal && (
              <AddressModal
                setValue={handleSetValue}
                type='arrival'
                onClose={() => {
                  setIsArrivalModal(false);
                }}
              />
            )}

            <Button
              text='선택완료'
              style='solid640pxBlue300'
              onClick={() => handleSelectClick()}
              disabled={!(addressValues.arrival && addressValues.departure)}
            />
          </div>
        )}
      </div>
      {isEdit && (
        <div>
          <div className={pageStyles.selectOption} style={{ gap: '10px' }}>
            <div> 출발지</div>
            <div>{departure}</div>
            <div className={style.selectOption}> 도착지</div>
            <div>{arrival}</div>
          </div>

          <div
            className={pageStyles.selectEditButton}
            onClick={() => handleEditClick()}
          >
            수정하기
          </div>
        </div>
      )}
    </div>
  );
}
