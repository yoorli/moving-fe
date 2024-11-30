import React from 'react';
import style from './SelectItem.module.css';
import { ServiceRegion } from './Region';

export const RegionSelectItem = ({
  inputHeandler,
  region,
  validation,
  name,
}: {
  region: ServiceRegion | undefined;
  validation: boolean;
  name: ServiceRegion;
  inputHeandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label
      className={`${style.itemWrapper} ${style[validation && region === name ? 'selected' : '']}`}
      htmlFor={name}
    >
      <input
        style={{ position: 'absolute', width: '0px', height: '0px' }}
        type='checkbox'
        name={name}
        id={name}
        checked={validation}
        onChange={inputHeandler}
      />
      {name}
    </label>
  );
};

export const TypeSelectItem = ({
  inputHeandler,
  value,
  name,
  title,
}: {
  value?: string;
  name: string;
  title: string;
  inputHeandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label
      className={`${style.itemLongWrapper} ${style[value === 'on' ? 'selected' : '']}`}
      htmlFor={name}
    >
      <input
        style={{ position: 'absolute', width: '0px', height: '0px' }}
        type='checkbox'
        name={name}
        id={name}
        onChange={inputHeandler}
      />
      {title}
    </label>
  );
};
