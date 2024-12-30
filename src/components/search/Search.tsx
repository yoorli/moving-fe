import React from 'react';
import style from './Search.module.css';

interface SearchProps {
  placeholder: string;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

const Search = ({ placeholder, searchTerm, setSearchTerm }: SearchProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={style.searchContainer}>
      <img alt='Search Icon' className={style.searchIcon} />
      <input
        type='text'
        placeholder={placeholder}
        className={style.searchInput}
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Search;
