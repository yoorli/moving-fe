import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Tab from '../../../components/tab/Tab';
import style from './index.module.css';

import ReceivedList from './components/ReceivedList';
import { useGetEstimate } from '../../../lib/useQueries/estimate';
import useDirection from '../../../lib/function/direction';
import CostInfo from '../../../components/costInfo/CostInfo';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';

import PageError from '../../../components/pageError/PageError';

import noItems from '../../../assets/icons/ic_noItems.svg';

export default function ReceivedCostDetail() {
  const { direction_pendingCost, direction_receivedCost, direction_root } =
    useDirection();
  const [currentTab, setCurrentTab] = useState<'first' | 'second'>('second');

  const handleTabChange = (selectedTab: 'first' | 'second') => {
    setCurrentTab(selectedTab);
  };

  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useGetEstimate(id ?? '');

  const handleErrorClick = () => {
    direction_root();
  };

  return (
    <>
      <Tab
        selectable={true}
        firstText='대기 중인 견적'
        secondText='받았던 견적'
        selectedTab={currentTab}
        onTabChange={handleTabChange}
        tabChangeType='route'
        firstTabRoute={direction_pendingCost}
        secondTabRoute={direction_receivedCost}
      />

      <div className={style.container}>
        <div className={style.layout}>
          <div className={style.main}>
            {!isLoading && data ? (
              <>
                <CostInfo
                  movingRequest={data?.info?.movingRequest}
                  movingType={data?.info?.movingType}
                  movingDate={data?.info?.movingDate}
                  departure={data.info.departure}
                  arrival={data.info.arrival}
                  comment={data.info.comment}
                />

                <ReceivedList list={data.list} />
              </>
            ) : (
              <div className={style.noContents}>
                {isLoading && (
                  <div className={style.loading}>
                    <LoadingSpinner />
                  </div>
                )}
                {error && (
                  <div className={style.noContents}>
                    <PageError
                      image={noItems}
                      contentTextFirst={
                        '데이터를 불러오는 중 에러가 발생했습니다:'
                      }
                      contentTextSecond={`${error.message}`}
                      buttonText='홈으로 돌아가기'
                      buttonHandler={() => handleErrorClick()}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
