import style from './FilterDropdown.module.css';
import activeIcon from '../../../../assets/icons/ic_active_filter.svg';
import inactiveIcon from '../../../../assets/icons/ic_inactive_filter.svg';

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
    onSelect(item.label);
    onToggle();
  };

  return (
    <div className={style.container}>
      <p className={style.title}>{title}</p>
      <div
        className={`${style.filterBox} ${isOpen ? style.active : ''}`}
        onClick={onToggle}
      >
        <span className={`${style.selectedText} ${isOpen ? style.activeText : ''}`}>
          {placeholder}
        </span>
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

