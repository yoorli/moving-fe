import React, { useState } from 'react';
import style from './LoginInput.module.css';
import eyeClose from '../../../assets/icons/ic_eye_close.svg';
import eyeOpen from '../../../assets/icons/ic_eye_open.svg';

type InputType = {
  value: string;
  inputHeandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validation: boolean;
};

export const EmailInputComponent = ({
  value,
  inputHeandler,
  validation,
}: InputType) => {
  return (
    <div className={style.container}>
      <span className={style.text}>이메일</span>
      <input
        className={`${style.input} ${
          style[value && validation ? 'complete' : '']
        } ${style[value && !validation ? 'invalid' : '']} `}
        value={value ?? ''}
        placeholder='이메일을 입력 해주세요.'
        onChange={inputHeandler}
        type='text'
        id='email'
        name='email'
      />
      {validation ? null : (
        <span className={style.invaild}>이메일 형식이 아닙니다.</span>
      )}
    </div>
  );
};

export const PasswordInputComponent = ({
  value,
  inputHeandler,
  validation,
}: InputType) => {
  const [invisible, setInvisible] = useState<boolean>(true);

  return (
    <div className={style.container}>
      <span className={style.text}>비밀번호</span>
      <div className={style.inputContainer}>
        <input
          value={value ?? ''}
          onChange={inputHeandler}
          className={`${style.input} ${
            style[value && validation ? 'complete' : '']
          } ${style[value && !validation ? 'invalid' : '']} `}
          type={invisible ? 'password' : 'text'}
          id='password'
          name='password'
          placeholder='비밀번호을 입력 해주세요.'
        />
        <div className={style.iconPill}>
          {invisible ? (
            <img
              onClick={() => {
                setInvisible((prev) => !prev);
              }}
              src={eyeClose}
              alt=''
            />
          ) : (
            <img
              onClick={() => {
                setInvisible((prev) => !prev);
              }}
              src={eyeOpen}
              alt=''
            />
          )}
        </div>
      </div>
      {validation ? null : (
        <span className={style.invaild}>비밀번호가 올바르지 않습니다.</span>
      )}
    </div>
  );
};
