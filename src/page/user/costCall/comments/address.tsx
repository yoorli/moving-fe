import { useState } from 'react';
import AddressModal from './addressModal';

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
  };

  const handleSetValue = (name: 'arrival' | 'departure', value: string) => {
    setAddressValues((prev) => ({
      ...prev,
      [name]: value, // name에 해당하는 값만 업데이트
    }));
  };

  return (
    <div>
      <div>
        <div>이사 지역을 선택해 주세요</div>
        <div>
          <button onClick={handleClick}>출발지역 선택</button>
        </div>
        {isDepartureModal && (
          <AddressModal setValue={handleSetValue} type='departure' />
        )}
        <div>
          <button onClick={handleClickTwo}>도착지역 선택</button>
        </div>
        {isArrivalModal && (
          <AddressModal setValue={handleSetValue} type='arrival' />
        )}
        <button onClick={handleSelectClick}>선택완료</button>
      </div>
      {departure && arrival && (
        <div>
          <div>{departure}</div>

          <button onClick={() => departureClick(null)}>수정하기</button>
          <div>{arrival}</div>
          <button onClick={() => arrivalClick(null)}>수정하기</button>
        </div>
      )}
    </div>
  );
}
