import React from 'react';
import style from './Region.module.css';
import { ServiceRegion } from '../../../page/user/edit/type';

export default function Region({
  inputHeandler,
  region,
  validation,
  nomalMessage,
  errorMessage,
}: {
  region: ServiceRegion | undefined;
  validation: boolean;
  errorMessage: string;
  nomalMessage: string;
  inputHeandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={style.container}>
      <div className={style.textWrapper}>
        <span className={style.topText}>내가 사는 지역</span>
        <span
          className={`${style.bottomText} ${style[validation ? '' : 'invalied']}`}
        >
          {validation ? nomalMessage : errorMessage}
        </span>
      </div>
      <div className={style.itemContainer}>
        <RegionItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.SEOUL}
          validation={validation}
        />
        <RegionItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.GYEONGGI}
          validation={validation}
        />
        <RegionItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.INCHEON}
          validation={validation}
        />
        <RegionItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.GANGWON}
          validation={validation}
        />
        <RegionItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.CHUNGBUK}
          validation={validation}
        />
        <RegionItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.CHUNGNAM}
          validation={validation}
        />
        <RegionItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.SEJONG}
          validation={validation}
        />
        <RegionItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.DAEJEON}
          validation={validation}
        />
        <RegionItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.JEONBUK}
          validation={validation}
        />
        <RegionItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.JEONNAM}
          validation={validation}
        />
        <RegionItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.GWANGJU}
          validation={validation}
        />
        <RegionItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.GYEONGBUK}
          validation={validation}
        />
        <RegionItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.GYEONGNAM}
          validation={validation}
        />
        <RegionItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.DAEGU}
          validation={validation}
        />
        <RegionItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.ULSAN}
          validation={validation}
        />
        <RegionItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.BUSAN}
          validation={validation}
        />
        <RegionItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.JEJU}
          validation={validation}
        />
      </div>
    </div>
  );
}

function RegionItem({
  inputHeandler,
  region,
  validation,
  name,
}: {
  region: ServiceRegion | undefined;
  validation: boolean;
  name: ServiceRegion;
  inputHeandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
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
}
