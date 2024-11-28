import React, { useState } from 'react';
import style from './SignupInput.module.css';
import eyeClose from '../../../assets/icons/ic_eye_close.svg';
import eyeOpen from '../../../assets/icons/ic_eye_open.svg';

type InputType = {
  value: string;
  inputHeandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validation: boolean;
};

export const NameInputComponent = ({
  value,
  inputHeandler,
  validation,
}: InputType) => {
  return (
    <div className={style.container}>
      <span className={style.text}>이름</span>
      <input
        className={`${style.input} ${
          style[value && validation ? 'complete' : '']
        } ${style[value && !validation ? 'invalid' : '']} `}
        value={value ?? ''}
        placeholder='성함을 입력해 주세요.'
        onChange={inputHeandler}
        type='text'
        id='name'
        name='name'
      />
      {validation ? null : (
        <span className={style.invaild}>
          2글자 이상, 10자 이하로 입력해주세요.
        </span>
      )}
    </div>
  );
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
        placeholder='이메일을 입력해 주세요.'
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

export const PhoneNumberInputComponent = ({
  value,
  inputHeandler,
  validation,
}: InputType) => {
  return (
    <div className={style.container}>
      <span className={style.text}>전화번호</span>
      <input
        className={`${style.input} ${
          style[value && validation ? 'complete' : '']
        } ${style[value && !validation ? 'invalid' : '']} `}
        value={value ?? ''}
        placeholder='숫자만 입력해 주세요.'
        onChange={inputHeandler}
        type='text'
        id='phoneNumber'
        name='phoneNumber'
      />
      {validation ? null : (
        <span className={style.invaild}>전화번호를 입력해 주세요.</span>
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
          placeholder='비밀번호을 입력해 주세요.'
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

export const ConfirmPasswordInputComponent = ({
  value,
  inputHeandler,
  validation,
}: InputType) => {
  const [invisible, setInvisible] = useState<boolean>(true);

  return (
    <div className={style.container}>
      <span className={style.text}>비밀번호 확인</span>
      <div className={style.inputContainer}>
        <input
          value={value ?? ''}
          onChange={inputHeandler}
          className={`${style.input} ${
            style[value && validation ? 'complete' : '']
          } ${style[value && !validation ? 'invalid' : '']} `}
          type={invisible ? 'password' : 'text'}
          id='confirmPassword'
          name='confirmPassword'
          placeholder='비밀번호을 다시 한번 입력해 주세요.'
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
        <span className={style.invaild}>비밀번호가 일치하지 않습니다.</span>
      )}
    </div>
  );
};
