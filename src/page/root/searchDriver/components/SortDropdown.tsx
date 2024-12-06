import React from "react";
import style from "./SortDropdown.module.css";
import inactiveIcon from "../../../../assets/icons/ic_inactive_filter_medium.svg";

interface SortDropdownProps {
  placeholder: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
  isOpen: boolean; // 외부에서 열림 상태를 관리
  onToggle: () => void; // 외부에서 열림 상태 토글
  className?: string;
}

const SortDropdown = ({
  placeholder,
  options,
  onSelect,
  isOpen,
  onToggle,
  className = "",
}: SortDropdownProps) => {
  return (
    <div className={`${style.container} ${className}`}>
      <div
        className={`${style.filterBox} ${isOpen ? style.active : ""}`}
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
                onSelect(option.value); // 선택한 정렬 값 전달
                onToggle(); // 드롭다운 닫기
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

