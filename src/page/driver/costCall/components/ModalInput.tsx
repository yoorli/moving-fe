import { ChangeEvent, useState } from 'react';
import classNames from 'classnames';

import { formatCurrency } from '../../../../lib/function/utils';

import style from './ModalInput.module.css';

interface ModalInputProps {
  text: string;
  basicText: string;
  limit?: number;
  isTextArea?: boolean;
  onChange: (value: string | number) => void;
  setIsBtnActive?: any;
}

export default function ModalInput({
  text,
  basicText,
  isTextArea,
  limit = 1,
  onChange,
  setIsBtnActive,
}: ModalInputProps) {
  const [value, setValue] = useState('');

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const inputValue = event.target.value;

    if (!isTextArea) {
      // 금액 입력 필드 처리
      const rawValue = inputValue.replace(/,/g, '');
      const numericValue = Number(rawValue);
      if (isNaN(numericValue)) {
        onChange(0);
        setValue('');
        return;
      }

      const formattedValue = formatCurrency(numericValue, true);
      setValue(formattedValue);
      onChange(numericValue);
    } else {
      setValue(inputValue);
      onChange(inputValue);
    }
  };

  const handleBtnActive = () => {
    setIsBtnActive((prev: boolean[]) => {
      const updatedActiveArr = [...prev];

      if (!isTextArea) {
        const rawValue = value.replace(/,/g, '');
        updatedActiveArr[0] = Number(rawValue) >= limit;
      } else {
        updatedActiveArr[1] = value.length >= limit;
      }
      return updatedActiveArr;
    });
  };

  return (
    <div className={style.textInput}>
      {text}
      {isTextArea ? (
        <textarea
          className={classNames(style.input, { [style.textArea]: isTextArea })}
          placeholder={basicText}
          onChange={handleChange}
          onBlur={handleBtnActive}
        />
      ) : (
        <input
          className={style.input}
          type='text'
          placeholder={basicText}
          onChange={handleChange}
          value={value}
          onBlur={handleBtnActive}
        />
      )}
    </div>
  );
}
