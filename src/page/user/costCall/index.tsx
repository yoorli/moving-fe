import { useState } from 'react';
import Navigation from './components/Navigation';
import NoContents from '../../../components/noContents/NoContents';
import style from './index.module.css';
import CostCallContent from './components/CostCallContent';

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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isSelectOption, setIsSelectOption] = useState<SelectValues>({
    movingType: false,
    movingDate: false,
    departure: false,
    arrival: false,
  });

  const handleTabChange = () => {
    alert('받은요청 페이지로 가자!');
  };

  return (
    <>
      <Navigation isSelectOption={isSelectOption} isSubmitted={isSubmitted} />
      <div className={style.container}>
        <div className={style.mainContent}>
          {!isSubmitted ? (
            <CostCallContent
              isSelectOption={isSelectOption}
              setIsSelectOption={setIsSelectOption}
              setIsSubmitted={setIsSubmitted}
            />
          ) : (
            <NoContents
              image='car'
              hasButton={true}
              buttonText='받은 견적 보러가기'
              buttonHandler={() => handleTabChange()}
            />
          )}
        </div>
      </div>
    </>
  );
}
