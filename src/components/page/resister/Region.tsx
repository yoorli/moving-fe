import React from 'react';
import style from './Region.module.css';
import { RegionSelectItem } from './SelectItem';

export enum ServiceRegion {
  SEOUL = '서울',
  GYEONGGI = '경기',
  INCHEON = '인천',
  GANGWON = '강원',
  CHUNGBUK = '충북',
  CHUNGNAM = '충남',
  SEJONG = '세종',
  DAEJEON = '대전',
  JEONBUK = '전북',
  JEONNAM = '전남',
  GWANGJU = '광주',
  GYEONGBUK = '경북',
  GYEONGNAM = '경남',
  DAEGU = '대구',
  ULSAN = '울산',
  BUSAN = '부산',
  JEJU = '제주',
}

export default function Region({
  inputHeandler,
  title,
  region,
  validation,
  nomalMessage,
  errorMessage,
}: {
  title: string;
  region: ServiceRegion | undefined;
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
        <RegionSelectItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.SEOUL}
          validation={validation}
        />
        <RegionSelectItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.GYEONGGI}
          validation={validation}
        />
        <RegionSelectItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.INCHEON}
          validation={validation}
        />
        <RegionSelectItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.GANGWON}
          validation={validation}
        />
        <RegionSelectItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.CHUNGBUK}
          validation={validation}
        />
        <RegionSelectItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.CHUNGNAM}
          validation={validation}
        />
        <RegionSelectItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.SEJONG}
          validation={validation}
        />
        <RegionSelectItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.DAEJEON}
          validation={validation}
        />
        <RegionSelectItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.JEONBUK}
          validation={validation}
        />
        <RegionSelectItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.JEONNAM}
          validation={validation}
        />
        <RegionSelectItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.GWANGJU}
          validation={validation}
        />
        <RegionSelectItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.GYEONGBUK}
          validation={validation}
        />
        <RegionSelectItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.GYEONGNAM}
          validation={validation}
        />
        <RegionSelectItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.DAEGU}
          validation={validation}
        />
        <RegionSelectItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.ULSAN}
          validation={validation}
        />
        <RegionSelectItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.BUSAN}
          validation={validation}
        />
        <RegionSelectItem
          inputHeandler={inputHeandler}
          region={region}
          name={ServiceRegion.JEJU}
          validation={validation}
        />
      </div>
    </div>
  );
}
