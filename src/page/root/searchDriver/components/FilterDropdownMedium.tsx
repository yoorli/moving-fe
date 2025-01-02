import style from './FilterDropdownMedium.module.css';
import activeIconMedium from '../../../../assets/icons/ic_active_filter_medium.svg';
import inactiveIconMedium from '../../../../assets/icons/ic_inactive_filter_medium.svg';

interface DropdownItem {
  label: string;
}

interface FilterDropdownMediumProps {
  placeholder: string;
  items: DropdownItem[];
  onSelect: (value: string) => void;
  onToggle: () => void;
  isOpen: boolean;
  isRegion?: boolean;
}

const FilterDropdownMedium = ({
  placeholder,
  items,
  onSelect,
  onToggle,
  isOpen,
  isRegion = false,
}: FilterDropdownMediumProps) => {
  const handleSelect = (item: DropdownItem) => {
    onSelect(item.label);
    onToggle();
  };

  return (
    <div className={style.container}>
      <div
        className={`${style.filterBox} ${isOpen ? style.active : ''} ${
          isRegion ? style.region : style.service
        }`}
        onClick={onToggle}
      >
        <span className={`${style.selectedText} ${isOpen ? style.activeText : ''}`}>
          {placeholder}
        </span>
        <img
          src={isOpen ? activeIconMedium : inactiveIconMedium}
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

export default FilterDropdownMedium;

