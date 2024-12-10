import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import Tab from '../../../components/tab/Tab';
import style from './index.module.css';
import ReceivedCostInfo from './components/ReceivedCostInfo';
import ReceivedList from './components/ReceivedList';
import { mockData } from './mockData';
import useDirection from '../../../lib/function/direction';

export default function ReceivedCostDetail() {
  const [currentTab, setCurrentTab] = useState<'first' | 'second'>('second');

  const handleTabChange = (selectedTab: 'first' | 'second') => {
    setCurrentTab(selectedTab);
  };

  // const { id } = useParams();\

  const { direction_pendingCost, direction_receivedCost } = useDirection();

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
            <ReceivedCostInfo info={mockData.info} />
            <ReceivedList list={mockData.list} count={mockData.total} />
          </div>
        </div>
      </div>
    </>
  );
}
