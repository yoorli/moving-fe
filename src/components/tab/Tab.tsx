import classNames from 'classnames';
import styles from './Tab.module.css';

interface TabProps {
  selectable?: boolean;
  firstText: string;
  secondText?: string;
  selectedTab?: 'first' | 'second';
  onTabChange?: (selectedTab: 'first' | 'second') => void;
  tabChangeType?: 'state' | 'route';
  firstTabRoute?: () => void;
  secondTabRoute?: () => void;
}

export default function Tab({
  selectable = false,
  firstText,
  secondText,
  selectedTab,
  onTabChange,
  tabChangeType = 'state',
  firstTabRoute,
  secondTabRoute,
}: TabProps) {
  const handleTabClick = (tab: 'first' | 'second') => {
    if (tabChangeType === 'state') {
      onTabChange?.(tab);
    } else if (tabChangeType === 'route') {
      if (tab === 'first') {
        firstTabRoute?.();
      } else {
        secondTabRoute?.();
      }
    }
  };

  const renderTab = (tab: 'first' | 'second', text: string | undefined) => (
    <div
      className={classNames(styles.selectedContent, {
        [styles.active]: selectedTab === tab,
      })}
      onClick={() => handleTabClick(tab)}
    >
      {text}
    </div>
  );

  return (
    <div className={styles.container}>
      {selectable ? (
        <div className={styles.select}>
          {renderTab('first', firstText)}
          {renderTab('second', secondText)}
        </div>
      ) : (
        <div className={styles.nonSelect}>
          <div className={styles.content}>{firstText}</div>
        </div>
      )}
    </div>
  );
}
