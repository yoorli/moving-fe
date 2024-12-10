import classNames from 'classnames';
import style from './Tab.module.css';

// Define type for tab options based on hasThirdTab
type TabOptions<T extends boolean> = T extends true
  ? 'first' | 'second' | 'third'
  : 'first' | 'second';

// Generic interface for TabProps
interface TabProps<T extends boolean = false> {
  selectable?: boolean;
  firstText: string;
  secondText?: string;
  thirdText?: string;
  selectedTab?: TabOptions<T>;
  hasThirdTab?: T;
  onTabChange?: (selectedTab: TabOptions<T>) => void;
  tabChangeType?: 'state' | 'route';
  firstTabRoute?: () => void;
  secondTabRoute?: () => void;
}

export default function Tab<T extends boolean = false>({
  selectable = false,
  firstText,
  secondText,
  thirdText,
  selectedTab,
  hasThirdTab = false as T,
  onTabChange,
  tabChangeType = 'state',
  firstTabRoute,
  secondTabRoute,
}: TabProps<T>) {
  const handleTabClick = (tab: TabOptions<T>) => {
    if (tabChangeType === 'state') {
      onTabChange?.(tab);
    } else if (tabChangeType === 'route') {
      if (tab === 'first') {
        firstTabRoute?.();
      } else if (tab === 'second') {
        secondTabRoute?.();
      }
    }
  };

  const renderTab = (tab: TabOptions<T>, text: string | undefined) => (
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
          {hasThirdTab && renderTab('third' as TabOptions<T>, thirdText)}
        </div>
      ) : (
        <div className={style.nonSelect}>
          <div className={style.content}>{firstText}</div>
        </div>
      )}
    </div>
  );
}