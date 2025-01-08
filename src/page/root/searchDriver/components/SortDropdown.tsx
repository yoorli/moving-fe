import React from 'react';
import style from './SortDropdown.module.css';
import inactiveIcon from '../../../../assets/icons/ic_inactive_filter_medium.svg';

interface SortDropdownProps {
  placeholder: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
  hasWrapper?: boolean;
}

const SortDropdown = ({
  placeholder,
  options,
  onSelect,
  isOpen,
  onToggle,
  className = '',
  hasWrapper = true, // 기본값 true
}: SortDropdownProps) => {
  if (!hasWrapper) {
    // 1199px 이하일 경우
    return (
      <div
        className={`${style.filterBox} ${isOpen ? style.active : ''} ${className}`}
        onClick={onToggle}
      >
        <span className={style.selectedText}>{placeholder}</span>
        <img src={inactiveIcon} alt="Toggle" className={style.icon} />
        {isOpen && (
          <div className={style.dropdown}>
            {options.map((option, index) => (
              <div
                key={index}
                className={style.dropdownItem}
                onClick={() => {
                  onSelect(option.value);
                  onToggle();
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 1200px 이상일 경우
  return (
    <div className={`${style.container} ${className}`}>
      <div
        className={`${style.filterBox} ${isOpen ? style.active : ''}`}
        onClick={onToggle}
      >
        <span className={style.selectedText}>{placeholder}</span>
        <img src={inactiveIcon} alt="Toggle" className={style.icon} />
      </div>
      {isOpen && (
        <div className={style.dropdown}>
          {options.map((option, index) => (
            <div
              key={index}
              className={style.dropdownItem}
              onClick={() => {
                onSelect(option.value);
                onToggle();
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default SortDropdown;

