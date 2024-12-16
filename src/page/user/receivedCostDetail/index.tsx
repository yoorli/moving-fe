import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import Tab from '../../../components/tab/Tab';
import style from './index.module.css';

import ReceivedList from './components/ReceivedList';
import { mockData } from './mockData';
import useDirection from '../../../lib/function/direction';
import CostInfo from '../../../components/costInfo/CostInfo';

export default function ReceivedCostDetail() {
  const { direction_pendingCost, direction_receivedCost } = useDirection();
  const [currentTab, setCurrentTab] = useState<'first' | 'second'>('second');

  const handleTabChange = (selectedTab: 'first' | 'second') => {
    setCurrentTab(selectedTab);
  };

  // const { id } = useParams();\

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
              movingRequest={mockData.info.movingRequest}
              movingType={mockData.info.movingType}
              movingDate={mockData.info.movingDate}
              departure={mockData.info.departure}
              arrival={mockData.info.arrival}
              comment={mockData.info.comment}
            />
            <ReceivedList list={mockData.list} count={mockData.total} />
          </div>
        </div>
      </div>
    </>
  );
}
