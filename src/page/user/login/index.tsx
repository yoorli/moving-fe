import React, { useState } from 'react';

import style from '../../../components/page/login/index.module.css';
import { loginValidation } from '../../../lib/function/validation';
import { Link } from 'react-router-dom';
import {
  InvisibleInputComponent,
  NomalInputComponent,
} from '../../../components/input/AuthInput';
import AuthBtn from '../../../components/btn/AuthBtn';
import { UserLoginTop } from '../../../components/page/auth/AuthTop';
import { UserLoginBottom } from '../../../components/page/auth/AuthBottom';

type FormLogin = {
  email: string;
  password: string;
};

type FormValidation = {
  email: boolean;
  password: boolean;
};

export default function UserLoginPage() {
  const [values, setValues] = useState<FormLogin>({
    email: '',
    password: '',
  });

  const [validation, setValidation] = useState<FormValidation>({
    email: true,
    password: true,
  });

  const inputHeandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value,
    });

    setValidation({
      ...validation,
      [name]: loginValidation(name, value),
    });
  };

  const loginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      values.email &&
      values.password &&
      validation.email &&
      validation.password
    ) {
      /**TODO API request */
    } else {
      return;
    }
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <UserLoginTop />
        <div className={style.mid}>
          <form className={style.loginForm} onSubmit={loginSubmit}>
            <NomalInputComponent
              title='이메일'
              placeholder='이메일을 입력해 주세요'
              value={values.email}
              name='email'
              inputHeandler={inputHeandler}
              validation={validation.email}
              errorMessage='이메일 형식이 아닙니다.'
            />
            <InvisibleInputComponent
              title='비밀번호'
              placeholder='비밀번호을 입력해 주세요'
              value={values.password}
              name='password'
              inputHeandler={inputHeandler}
              validation={validation.password}
              errorMessage='비밀번호가 올바르지 않습니다.'
            />
            <AuthBtn
              context='로그인'
              validation={
                !!values.email &&
                !!values.password &&
                validation.email &&
                validation.password
              }
            />
          </form>

          <p>
            아직 무빙 회원이 아니신가요?
            <Link to='/user/signup'>이메일로 회원가입하기</Link>
          </p>
        </div>
        <UserLoginBottom />
      </div>
    </div>
  );
}
