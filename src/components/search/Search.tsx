import React, { useEffect, useState } from 'react';
import style from './Search.module.css';

interface SearchProps {
  placeholder1: string;
  placeholder2?: string;
  setSearchTerm: (searchTerm: string) => void;
}

const Search = ({ placeholder1, placeholder2, setSearchTerm }: SearchProps) => {
  const [term, setTerm] = useState('');
  const [placeholder, setPlaceholder] = useState(placeholder1);
  const [showHelp, setShowHelp] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
    if (!e.target.value) setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchTerm(e.currentTarget.value);
    }
  };

  const showText = () => {
    setShowHelp(true)
  };

  const handleValue = () => {
    setShowHelp(false)
  };

  useEffect(() => {
    if (!showHelp) {
      setPlaceholder(placeholder1)
    } else {
      placeholder2 && setPlaceholder(placeholder2)
    }
  }, [showHelp]);

  return (
    <div className={style.searchContainer}>
      <img alt='Search Icon' className={style.searchIcon} onClick={showText} />
      <input
        type='text'
        placeholder={placeholder}
        className={style.searchInput}
        value={term}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        onClick={handleValue}
      />
    </div>
  );
};

export default Search;
