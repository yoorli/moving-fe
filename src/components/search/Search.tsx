import React, { useState } from 'react';
import style from './Search.module.css';

interface SearchProps {
  placeholder: string;
  setSearchTerm: (searchTerm: string) => void;
}

const Search = ({ placeholder, setSearchTerm }: SearchProps) => {
  const [term, setTerm] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
    if(!e.target.value) setSearchTerm(e.target.value)
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchTerm(e.currentTarget.value);
    }
  };

  return (
    <div className={style.searchContainer}>
      <img alt='Search Icon' className={style.searchIcon} />
      <input
        type='text'
        placeholder={placeholder}
        className={style.searchInput}
        value={term}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default Search;
