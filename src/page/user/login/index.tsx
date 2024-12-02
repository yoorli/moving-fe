import React, { useState } from 'react';

import style from '../../../components/page/login/index.module.css';
import { loginValidation } from '../../../lib/function/validation';
import LoginBtn from '../../../components/page/login/LoginBtn';
import { Link } from 'react-router-dom';
import {
  EmailInputComponent,
  PasswordInputComponent,
} from '../../../components/page/login/LoginInput';
import { UserLoginTop } from '../../../components/page/login/LoginTop';
import { UserLoginBottom } from '../../../components/page/login/LoginBottom';

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
            <EmailInputComponent
              value={values.email}
              inputHeandler={inputHeandler}
              validation={validation.email}
            />
            <PasswordInputComponent
              value={values.password}
              inputHeandler={inputHeandler}
              validation={validation.password}
            />
            <LoginBtn
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