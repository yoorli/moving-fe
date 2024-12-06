import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
import Tab from '../../../components/tab/Tab';
// import style from './index.module.css';
import ReceivedCostInfo from './components/ReceivedCostInfo';

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
        firstText='작성 가능한 리뷰'
        secondText='내가 작성한 리뷰'
        selectedTab={currentTab}
        onTabChange={handleTabChange}
      />
      <ReceivedCostInfo />
    </>
  );
}
