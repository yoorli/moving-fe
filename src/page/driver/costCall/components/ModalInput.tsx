import { ChangeEvent, useState } from 'react';
import classNames from 'classnames';

import { formatCurrency } from '../../../../lib/function/utils';

import style from './ModalInput.module.css';

interface ModalInputProps {
  text: string;
  basicText: string;
  isTextArea?: boolean;
}

export default function ModalInput({
  text,
  basicText,
  isTextArea,
}: ModalInputProps) {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const inputValue = event.target.value.replace(/,/g, '');
    const formattedValue = formatCurrency(Number(inputValue), true)
    setValue(formattedValue);
  }

  return (
    <div className={style.textInput}>
      {text}
      {isTextArea ? (
        <textarea
          className={classNames(style.input, { [style.textArea]: isTextArea })}
          placeholder={basicText}
        />
      ) : (
        <input
          className={style.input}
          type='text'
          placeholder={basicText}
          value={value}
          onChange={handleChange}
        />
      )}
    </div>
  );
}
