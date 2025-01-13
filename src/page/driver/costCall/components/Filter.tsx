import { ChangeEvent, useEffect } from 'react';

import style from './Filter.module.css';

type FilterProps = {
  type?: 'moving' | 'filter';
  checkedItems: {
    SMALL: boolean;
    HOUSE: boolean;
    OFFICE: boolean;
    ASSIGN: boolean;
  };
  setCheckedItems: (items: string[]) => void;
  count: {
    total: number;
    SMALL: number;
    HOUSE: number;
    OFFICE: number;
    ASSIGN: number;
  };
};

export default function Filter({
  type,
  checkedItems,
  setCheckedItems,
  count,
}: FilterProps) {
  const allChecked =
    checkedItems.SMALL && checkedItems.HOUSE && checkedItems.OFFICE;

  const handleAllCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.checked;
    const newItems = [
      newVal ? 'SMALL' : '',
      newVal ? 'HOUSE' : '',
      newVal ? 'OFFICE' : '',
      checkedItems.ASSIGN ? 'ASSIGN' : '',
    ].filter(Boolean);
    setCheckedItems(newItems);
  };

  const toggleCheckbox = (key: keyof typeof checkedItems) => {
    const updatedItems = {
      ...checkedItems,
      [key]: !checkedItems[key],
    };

    const selectedKeys = Object.keys(updatedItems).filter(
      (k) => updatedItems[k as keyof typeof checkedItems],
    );

    setCheckedItems(selectedKeys);
  };

  useEffect(() => {
    // count 변화 시 별도 로직 없이 count만 표시
  }, [count]);

  return (
    <div className={style.filter}>
      {(type === 'moving' || type === undefined) && (
        <div className={style.movingType}>
          <div className={style.filterName}>
            이사유형
            <span>
              <input
                type='checkbox'
                checked={allChecked}
                onChange={handleAllCheck}
                className={style.showPointer}
              />
              전체선택
            </span>
          </div>
          <div>
            <label className={style.checkboxLabel}>
              소형이사 ({count.SMALL})
              <input
                type='checkbox'
                checked={checkedItems.SMALL}
                onChange={() => toggleCheckbox('SMALL')}
              />
            </label>
          </div>
          <div>
            <label className={style.checkboxLabel}>
              가정이사 ({count.HOUSE})
              <input
                type='checkbox'
                checked={checkedItems.HOUSE}
                onChange={() => toggleCheckbox('HOUSE')}
              />
            </label>
          </div>
          <div>
            <label className={style.checkboxLabel}>
              사무실이사 ({count.OFFICE})
              <input
                type='checkbox'
                checked={checkedItems.OFFICE}
                onChange={() => toggleCheckbox('OFFICE')}
              />
            </label>
          </div>
        </div>
      )}
      {(type === 'filter' || type === undefined) && (
        <div className={style.movingFilter}>
          <div className={style.filterName}>필터</div>
          <label className={style.checkboxLabel}>
            지정 견적 요청 ({count.ASSIGN})
            <input
              type='checkbox'
              checked={checkedItems.ASSIGN}
              onChange={() => toggleCheckbox('ASSIGN')}
            />
          </label>
        </div>
      )}
    </div>
  );
}
