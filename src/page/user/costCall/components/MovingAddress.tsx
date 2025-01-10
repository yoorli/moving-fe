import { useState } from 'react';
import MovingAddressModal from './MovingAddressModal';
import pageStyle from '../index.module.css';
import style from './MovingAddress.module.css';
import Button from '../../../../components/btn/Button';
// import { createPortal } from 'react-dom';
// import ModalContent from './modalTest';

export interface AddressValue {
  arrival: string | null;
  departure: string | null;
}

interface MovingAddressProps extends AddressValue {
  arrivalClick: (arrival: string | null) => void;
  departureClick: (departure: string | null) => void;
}

export default function MovingAddress({
  arrival,
  departure,
  arrivalClick,
  departureClick,
}: MovingAddressProps) {
  const [addressValues, setAddressValues] = useState<AddressValue>({
    arrival: '',
    departure: '',
  });
  const [isDepartureModal, setIsDepartureModal] = useState(false);
  const [isArrivalModal, setIsArrivalModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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

  const handleModalToggle = (type: 'departure' | 'arrival') => {
    type === 'departure'
      ? setIsDepartureModal((prev) => !prev)
      : setIsArrivalModal((prev) => !prev);
  };

  const handleSetValue = (name: 'arrival' | 'departure', value: string) => {
    setAddressValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isDisabled =
    !addressValues.arrival ||
    !addressValues.departure ||
    addressValues.arrival === '정확한 주소를 입력해 주세요' ||
    addressValues.departure === '정확한 주소를 입력해 주세요';

  const renderButton = (
    label: '출발지' | '도착지',
    value: string | null,
    onClick: () => void,
    isModalOpen: boolean,
    type: 'departure' | 'arrival',
  ) => (
    <div className={style.layout}>
      <div className={style.text}>{label}</div>
      <Button
        className={style.button}
        text={value || `${label} 선택하기`}
        btnStyle='outlined560pxBlue300'
        onClick={onClick}
      />
      {isModalOpen && (
        <MovingAddressModal
          setValue={handleSetValue}
          type={type}
          onClose={() => {
            type === 'departure'
              ? setIsDepartureModal(false)
              : setIsArrivalModal(false);
          }}
        />
      )}
    </div>
  );

  return (
    <div>
      <div className={pageStyle.optionGuideBubble}>
        이사 지역을 선택해 주세요
      </div>

      {!isEdit && (
        <div className={pageStyle.optionBubble}>
          {renderButton(
            '출발지',
            addressValues.departure,
            () => handleModalToggle('departure'),
            isDepartureModal,
            'departure',
          )}
          {renderButton(
            '도착지',
            addressValues.arrival,
            () => handleModalToggle('arrival'),
            isArrivalModal,
            'arrival',
          )}

          <Button
            text='선택완료'
            btnStyle='solid640pxBlue300'
            onClick={handleSelectClick}
            disabled={isDisabled}
          />
        </div>
      )}

      {isEdit && (
        <div>
          <div className={pageStyle.selectOptionBubble} style={{ gap: '10px' }}>
            <div> 출발지</div>
            <div>{departure}</div>
            <div className={style.selectOption}> 도착지</div>
            <div>{arrival}</div>
          </div>

          <div
            className={pageStyle.editButton}
            onClick={() => handleEditClick()}
          >
            수정하기
          </div>
        </div>
      )}
    </div>
  );
}
