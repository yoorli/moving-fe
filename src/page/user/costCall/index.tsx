import { useState } from 'react';
import Navigation from './components/Navigation';
import NoContents from '../../../components/noContents/NoContents';
import style from './index.module.css';
import CostCallContent from './components/CostCallContent';
import useDirection from '../../../lib/function/direction';
import { useGetCustomer } from '../../../lib/useQueries/customer';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';
import PageError from '../../../components/pageError/PageError';

import noItems from '../../../assets/icons/ic_noItems.svg';

export interface SelectValues {
  movingType: boolean;
  movingDate: boolean;
  departure: boolean;
  arrival: boolean;
}

export default function UserCostCallPage() {
  const { direction_pendingCost, direction_root } = useDirection();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isSelectOption, setIsSelectOption] = useState<SelectValues>({
    movingType: false,
    movingDate: false,
    departure: false,
    arrival: false,
  });

  const { data, isLoading, error } = useGetCustomer();

  const handleErrorClick = () => {
    direction_root();
  };

  if (error) {
    return (
      <div className={style.noContent}>
        <PageError
          image={noItems}
          contentTextFirst={'데이터를 불러오는 중 에러가 발생했습니다:'}
          contentTextSecond={`${error.message}`}
          buttonText='홈으로 돌아가기'
          buttonHandler={handleErrorClick}
        />
      </div>
    );
  }

  return (
    <>
      {!isLoading && data?.isConfirmed ? (
        <>
          <Navigation
            isSelectOption={isSelectOption}
            isSubmitted={isSubmitted}
          />
          <div className={style.container}>
            <div className={style.mainContent}>
              <CostCallContent
                isSelectOption={isSelectOption}
                setIsSelectOption={setIsSelectOption}
                setIsSubmitted={setIsSubmitted}
                redirect={direction_pendingCost}
              />
            </div>
          </div>
        </>
      ) : (
        <div className={style.noContents}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <NoContents
              image='car'
              hasButton={true}
              buttonText='받은 견적 보러가기'
              buttonHandler={() => direction_pendingCost()}
            />
          )}
        </div>
      )}
    </>
  );
}
