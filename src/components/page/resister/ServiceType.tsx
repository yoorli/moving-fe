import React from 'react';
import { TypeSelectItem } from './SelectItem';
import style from './ServiceType.module.css';
import { UserResisterFormValues } from '../../../page/user/resister/type';
import { DriverResisterFormValue } from '../../../page/driver/resister/type';

export enum I_ServiceType {
  SMALL = '소형이사',
  HOUSE = '가정이사',
  OFFICE = '사무실이사',
}

export default function ServiceType({
  title,
  values,
  validation,
  errorMessage,
  nomalMessage,
  inputHeandler,
}: {
  title: string;
  values: UserResisterFormValues | DriverResisterFormValue;
  validation: boolean;
  errorMessage: string;
  nomalMessage: string;
  inputHeandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={style.container}>
      <div className={style.textWrapper}>
        <span className={style.topText}>{title}</span>
        <span
          className={`${style.bottomText} ${style[validation ? '' : 'invalied']}`}
        >
          {validation ? nomalMessage : errorMessage}
        </span>
      </div>
      <div className={style.itemContainer}>
        <TypeSelectItem
          inputHeandler={inputHeandler}
          value={values.small}
          title='소형이사'
          name='small'
        />
        <TypeSelectItem
          inputHeandler={inputHeandler}
          value={values.house}
          title='가정이사'
          name='house'
        />
        <TypeSelectItem
          inputHeandler={inputHeandler}
          value={values.office}
          title='사무실이사'
          name='office'
        />
      </div>
    </div>
  );
}
