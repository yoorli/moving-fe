import React, { ChangeEvent, KeyboardEvent } from 'react';
import style from './DriverSearch.module.css';

interface DriverSearchProps {
  placeholder: string;
  value?: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const DriverSearch = ({
  placeholder,
  value,
  className,
  onChange,
  onKeyPress,
}: DriverSearchProps) => {
  return (
    <div className={`${style.searchContainer} ${className || ''}`}>
      <img alt="Search Icon" className={style.searchIcon} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        className={style.searchInput}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </div>
  );
};

export default DriverSearch;

