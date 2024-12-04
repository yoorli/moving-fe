import { useState } from 'react';

import style from './Filter.module.css';

interface FilterOption {
  label: string;
  count: number;
  isChecked: boolean;
}

export default function Filter() {
  const [moveTypes, setMoveTypes] = useState<FilterOption[]>([
    { label: '소형이사', count: 10, isChecked: true },
    { label: '가정이사', count: 2, isChecked: true },
    { label: '사무실이사', count: 8, isChecked: true },
  ]);

  const [filters, setFilters] = useState<FilterOption>({
    label: '지정 견적 요청',
    count: 10,
    isChecked: true,
  });

  const toggleCheckbox = (index: number, isMoveType: boolean) => {
    if (isMoveType) {
      setMoveTypes((prev) => {
        const updated = [...prev];
        updated[index].isChecked = !updated[index].isChecked;
        return updated;
      });
    } else {
      setFilters((prev) => {
        prev.isChecked = !prev;
        return prev;
      });
    }
  };

  return (
    <div className={style.filter}>
      <div className={style.movingType}>
        <div className={style.filterName}>
          이사유형
          <span>
            <input type='checkbox' /> 전체선택
          </span>
        </div>
        <div>
          {moveTypes.map((moveType) => (
            <label key={moveType.label} className={style.checkboxLabel}>
              <span>
                {moveType.label} ({moveType.count})
              </span>
              <input type='checkbox' onChange={() => toggleCheckbox(1, true)} />
            </label>
          ))}
        </div>
      </div>

      <div className={style.movingFilter}>
        <div className={style.filterName}>필터</div>
        <label className={style.checkboxLabel}>
          <span className={style.text}>
            {filters.label} ({filters.count})
          </span>
          <input type='checkbox' onChange={() => toggleCheckbox(1, false)} />
        </label>
      </div>
    </div>
  );
}
