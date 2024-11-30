import { useState } from 'react';
import Tab from '../../../components/tab/Tab';
import styles from './index.module.css';

export default function UserFavoriteMover() {
  const [currentTab, setCurrentTab] = useState<'first' | 'second'>('first');

  const handleTabChange = (selectedTab: 'first' | 'second') => {
    setCurrentTab(selectedTab);
  };

  return (
    <div className={styles.container}>
      <Tab
        selectable={true}
        firstText='작성 가능한 리뷰'
        secondText='내가 작성한 리뷰'
        selectedTab={currentTab}
        onTabChange={handleTabChange}
      />
      {currentTab === 'first' ? (
        <div>작성 가능한 리뷰</div>
      ) : (
        <div>내가 작성한 리뷰</div>
      )}
    </div>
  );
}
