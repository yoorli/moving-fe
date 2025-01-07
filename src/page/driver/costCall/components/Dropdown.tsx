import { useEffect, useRef, useState } from 'react';

import vectorDownSmall from '../../../../assets/icons/ic_vector_down_small.svg';

import style from './Dropdown.module.css';

interface DropdownProps {
  setSortItem: (items: string) => void;
}

export default function Dropdown({ setSortItem: setSortItem }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState('이사 빠른순');

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(!isOpen);
    setSortItem(option == '이사 빠른순' ? 'move' : 'request');
  };

  const dropdownHandler = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <button className={style.dropdown} onClick={dropdownHandler}>
        {selectedOption} <img src={vectorDownSmall} alt='vectorDownSmall' />{' '}
      </button>
      {isOpen && (
        <div ref={dropdownRef} className={style.menu}>
          <div
            onClick={() => selectOption('이사 빠른순')}
            className={style.text}
          >
            이사 빠른순
          </div>
          <div
            onClick={() => selectOption('요청일 빠른순')}
            className={style.text}
          >
            요청일 빠른순
          </div>
        </div>
      )}
    </div>
  );
}
