import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Tab from '../../../components/tab/Tab';
import style from './index.module.css';

import ReceivedList from './components/ReceivedList';
// import { mockData } from './mockData';
import { useGetEstimate } from '../../../lib/useQueries/estimate';
import useDirection from '../../../lib/function/direction';
import CostInfo from '../../../components/costInfo/CostInfo';

export default function ReceivedCostDetail() {
  const { direction_pendingCost, direction_receivedCost } = useDirection();
  const [currentTab, setCurrentTab] = useState<'first' | 'second'>('second');

  const handleTabChange = (selectedTab: 'first' | 'second') => {
    setCurrentTab(selectedTab);
  };

  const { id } = useParams<{ id: string }>();

  const { data } = useGetEstimate(id ?? '');

  if (!data) {
    return <div>No data available</div>;
  }

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
            <CostInfo
              movingRequest={data?.info?.movingRequest}
              movingType={data?.info?.movingType}
              movingDate={data?.info?.movingDate}
              departure={data.info.departure}
              arrival={data.info.arrival}
              comment={data.info.comment}
            />

            <ReceivedList list={data.list} />
          </div>
        </div>
      </div>
    </>
  );
}
