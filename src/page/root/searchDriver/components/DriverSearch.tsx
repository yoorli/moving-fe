import React, { ChangeEvent } from 'react';
import style from './DriverSearch.module.css';

interface DriverSearchProps {
  placeholder: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DriverSearch = ({ placeholder, className, onChange }: DriverSearchProps) => {
  return (
    <div className={`${style.searchContainer} ${className || ''}`}>
      <img alt="Search Icon" className={style.searchIcon} />
      <input
        type="text"
        placeholder={placeholder}
        className={style.searchInput}
        onChange={onChange}
      />
    </div>
  );
};

export default DriverSearch;
