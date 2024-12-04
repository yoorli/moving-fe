import style from "./FilterDropdown.module.css";
import activeIcon from "../../../../assets/icons/ic_active_filter.svg";
import inactiveIcon from "../../../../assets/icons/ic_inactive_filter.svg";

const translations: Record<string, string> = {
  전체: "",
  서울: "SEOUL",
  경기: "GYEONGGI",
  인천: "INCHEON",
  강원: "GANGWON",
  충북: "CHUNGBUK",
  충남: "CHUNGNAM",
  세종: "SEJONG",
  대전: "DAEJEON",
  전북: "JEONBUK",
  전남: "JEONNAM",
  광주: "GWANGJU",
  경북: "GYEONGBUK",
  경남: "GYEONGNAM",
  대구: "DAEGU",
  울산: "ULSAN",
  부산: "BUSAN",
  제주: "JEJU",
  소형이사: "SMALL",
  가정이사: "HOUSE",
  사무실이사: "OFFICE",
};

interface DropdownItem {
  label: string;
}

interface FilterDropdownProps {
  title: string;
  placeholder: string;
  items: DropdownItem[];
  onSelect: (value: string) => void;
  onToggle: () => void;
  isOpen: boolean;
  isRegion?: boolean;
}

const translateLabelToValue = (label: string): string => {
  return translations[label] || "";
};

const FilterDropdown = ({
  title,
  placeholder,
  items,
  onSelect,
  onToggle,
  isOpen,
  isRegion = false,
}: FilterDropdownProps) => {
  const handleSelect = (item: DropdownItem) => {
    const translatedValue = translateLabelToValue(item.label);
    onSelect(translatedValue);
  };

  return (
    <div className={style.container}>
      <p className={style.title}>{title}</p>
      <div
        className={`${style.filterBox} ${isOpen ? style.active : ""}`}
        onClick={onToggle}
      >
        <span className={style.selectedText}>{placeholder}</span>
        <img
          src={isOpen ? activeIcon : inactiveIcon}
          alt="Toggle"
          className={style.icon}
        />
      </div>
      {isOpen && (
        <div
          className={`${style.dropdown} ${
            isRegion ? style.regionDropdown : style.serviceDropdown
          }`}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={style.dropdownItem}
              onClick={() => handleSelect(item)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;

