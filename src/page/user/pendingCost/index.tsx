import { useState } from 'react';
import Tab from '../../../components/tab/Tab';
import style from './index.module.css';
import useDirection from '../../../lib/function/direction';
import CostInfo from '../../../components/costInfo/CostInfo';

export default function PendingCost() {
  const [currentTab, setCurrentTab] = useState<'first' | 'second'>('first');

  const handleTabChange = (selectedTab: 'first' | 'second') => {
    setCurrentTab(selectedTab);
  };

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
        <CostInfo />
        <div>카드 나열</div>
      </div>
    </>
  );
}
