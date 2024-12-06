import { ChangeEvent, useState } from 'react';

import style from './Filter.module.css';

interface FilterOption {
  label: string;
  count: number;
  isChecked: boolean;
}

type FilterProps = {
  type?: 'moving' | 'filter';
  count: {
    total: number;
    small: number;
    medium: number;
    large: number;
    assign: number;
  };
};

export default function Filter({ type, count }: FilterProps) {
  const [moveTypes, setMoveTypes] = useState<FilterOption[]>([
    { label: '소형이사', count: count.small, isChecked: true },
    { label: '가정이사', count: count.medium, isChecked: true },
    { label: '사무실이사', count: count.large, isChecked: true },
  ]);

  const [isAssigned, setIsAssigned] = useState<FilterOption>({
    label: '지정 견적 요청',
    count: count.large,
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
