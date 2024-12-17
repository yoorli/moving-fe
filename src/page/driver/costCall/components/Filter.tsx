import { ChangeEvent, useEffect, useState } from 'react';

import style from './Filter.module.css';

interface FilterOption {
  label: string;
  count: number;
  isChecked: boolean;
}

type FilterProps = {
  type?: 'moving' | 'filter';
  setCheckedItems: (items: string[]) => void;
  count: {
    total: number;
    small: number;
    house: number;
    office: number;
    assign: number;
  };
};

export default function Filter({
  type,
  setCheckedItems: setCheckedItems,
  count,
}: FilterProps) {
  const [moveTypes, setMoveTypes] = useState<FilterOption[]>([
    { label: '소형이사', count: count.small, isChecked: true },
    { label: '가정이사', count: count.house, isChecked: true },
    { label: '사무실이사', count: count.office, isChecked: true },
  ]);

  const [isAssigned, setIsAssigned] = useState<FilterOption>({
    label: '지정 견적 요청',
    count: count.assign,
    isChecked: true,
  });

  const allCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setMoveTypes((prev) =>
      prev.map((moveType) => ({
        ...moveType,
        isChecked: checked,
      })),
    );
  };

  const toggleCheckbox = (isMoveType: boolean, index?: number) => {
    if (isMoveType && typeof index === 'number') {
      setMoveTypes((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          isChecked: !updated[index].isChecked,
        };
        return updated;
      });
    } else {
      setIsAssigned((prev) => ({
        ...prev,
        isChecked: !prev.isChecked,
      }));
    }
  };

  const allChecked = moveTypes.every((moveType) => moveType.isChecked);

  const itemType = (
    moveTypes: FilterOption[],
    isAssigned: FilterOption,
  ): string[] => {
    const selectedItems: string[] = [];

    moveTypes.forEach((moveType) => {
      if (moveType.isChecked) {
        if (moveType.label === '소형이사') selectedItems.push('SMALL');
        if (moveType.label === '가정이사') selectedItems.push('HOUSE');
        if (moveType.label === '사무실이사') selectedItems.push('OFFICE');
      }
    });

    if (isAssigned.isChecked) {
      selectedItems.push('ASSIGN');
    }

    return selectedItems;
  };

  useEffect(() => {
    setCheckedItems(itemType(moveTypes, isAssigned));
  }, [moveTypes, isAssigned]);

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
                onChange={allCheckHandler}
              />
              전체선택
            </span>
          </div>
          <div>
            {moveTypes.map((moveType, index) => (
              <label key={moveType.label} className={style.checkboxLabel}>
                <span>
                  {moveType.label} ({moveType.count})
                </span>
                <input
                  type='checkbox'
                  checked={moveType.isChecked}
                  onChange={() => {
                    toggleCheckbox(true, index);
                  }}
                />
              </label>
            ))}
          </div>
        </div>
      )}
      {(type === 'filter' || type === undefined) && (
        <div className={style.movingFilter}>
          <div className={style.filterName}>필터</div>
          <label className={style.checkboxLabel}>
            <span className={style.text}>
              {isAssigned.label} ({isAssigned.count})
            </span>
            <input
              type='checkbox'
              checked={isAssigned.isChecked}
              onChange={() => toggleCheckbox(false)}
            />
          </label>
        </div>
      )}
    </div>
  );
}
