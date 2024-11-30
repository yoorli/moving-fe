import React from 'react';
import style from './ImgUpload.module.css';
import altImg from '../../../assets/icons/ic_profile_upload_large.svg';

export default function ImgUpload({
  inputHeandler,
  preview,
}: {
  preview?: string;
  inputHeandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className={style.container} htmlFor='image'>
      <input
        style={{ width: '0px', height: '0px' }}
        type='file'
        id='image'
        name='image'
        onChange={inputHeandler}
      />
      <span className={style.title}>프로필 이미지</span>
      <img className={style.image} src={preview ?? altImg} alt='' />
    </label>
  );
}
