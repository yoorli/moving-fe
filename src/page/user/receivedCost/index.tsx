import { useState } from 'react';
import Tab from '../../../components/tab/Tab';
import style from './index.module.css';
import useDirection from '../../../lib/function/direction';

export default function ReceivedCost() {
  const [currentTab, setCurrentTab] = useState<'first' | 'second'>('second');

  const handleTabChange = (selectedTab: 'first' | 'second') => {
    setCurrentTab(selectedTab);
  };

  const { direction_pendingCost, direction_receivedCost } = useDirection();
  return (
    <div className={style.container}>
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
      <div>받았던 견적</div>
    </div>
  );
}
