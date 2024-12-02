import classNames from 'classnames';
import style from './Tab.module.css';

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
      className={classNames(style.selectedContent, {
        [style.active]: selectedTab === tab,
      })}
      onClick={() => handleTabClick(tab)}
    >
      {text}
    </div>
  );

  return (
    <div className={style.container}>
      {selectable ? (
        <div className={style.select}>
          {renderTab('first', firstText)}
          {renderTab('second', secondText)}
        </div>
      ) : (
        <div className={style.nonSelect}>
          <div className={style.content}>{firstText}</div>
        </div>
      )}
    </div>
  );
}
