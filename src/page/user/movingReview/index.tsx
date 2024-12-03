import { useState } from 'react';
import Tab from '../../../components/tab/Tab';
import style from './index.module.css';
import NoContents from '../../../components/nocontents/NoContents';

export default function UserMovingReview() {
  const [currentTab, setCurrentTab] = useState<'first' | 'second'>('first');

  const handleTabChange = (tab: 'first' | 'second') => {
    setCurrentTab(tab);
  };

  return (
    <div className={style.container}>
      <Tab
        selectable={true}
        firstText='작성 가능한 리뷰'
        secondText='내가 작성한 리뷰'
        selectedTab={currentTab}
        onTabChange={handleTabChange}
      />
      <NoContents
        hasButton={true}
        buttonText='리뷰 작성하러 가기'
        buttonHandler={() => handleTabChange('first')}
      />
    </div>
  );
}
