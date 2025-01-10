import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Tab from '../../../components/tab/Tab';
import style from './index.module.css';

import ReceivedList from './components/ReceivedList';
import { useGetEstimate } from '../../../lib/useQueries/estimate';
import useDirection from '../../../lib/function/direction';
import CostInfo from '../../../components/costInfo/CostInfo';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';
import ModalContainer from '../../../components/modal/ModalContainer';

export default function ReceivedCostDetail() {
  const { direction_pendingCost, direction_receivedCost, direction_root } =
    useDirection();
  const [currentTab, setCurrentTab] = useState<'first' | 'second'>('second');

  const handleTabChange = (selectedTab: 'first' | 'second') => {
    setCurrentTab(selectedTab);
  };

  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useGetEstimate(id ?? '');

  const modalBtnClick = () => {
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
              </div>
            )}
          </div>
        </div>
        {error && (
          <ModalContainer
            title='에러 메시지'
            isText={true}
            text={error.message}
            buttonText='확인'
            closeBtnClick={() => modalBtnClick()}
            buttonClick={modalBtnClick}
            btnColorRed={true}
          />
        )}
      </div>
    </>
  );
}
