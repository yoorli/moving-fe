import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import Tab from '../../../components/tab/Tab';
import style from './index.module.css';
import ReceivedCostInfo from './components/ReceivedCostInfo';
import ReceivedList from './components/ReceivedList';
import { mockData } from './mockData';

export default function ReceivedCostDetail() {
  const [currentTab, setCurrentTab] = useState<'first' | 'second'>('second');

  const handleTabChange = (selectedTab: 'first' | 'second') => {
    setCurrentTab(selectedTab);
  };

  // const { id } = useParams();

  return (
    <>
      <Tab
        selectable={true}
        firstText='대기중인 견적'
        secondText='받았던 견적'
        selectedTab={currentTab}
        onTabChange={handleTabChange}
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
