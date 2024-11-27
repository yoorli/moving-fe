import React, { useState } from 'react';

import style from '../../../components/page/login/index.module.css';
import { loginValidation } from '../../../lib/function/validation';

import { Link } from 'react-router-dom';
import {
  EmailInputComponent,
  PasswordInputComponent,
} from '../../../components/page/login/LoginInput';
import LoginBtn from '../../../components/page/login/LoginBtn';
import logo from '../../../assets/logo.svg';
import google from '../../../assets/images/img_login_google_large.svg';
import kakao from '../../../assets/images/img_login_kakao_large.svg';
import naver from '../../../assets/images/img_login_naver_large.svg';

type FormLogin = {
  email: string;
  password: string;
};

type FormValidation = {
  email: boolean;
  password: boolean;
};

export default function DriverLoginPage() {
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
    if (!(validation.email && validation.password)) {
      return;
    } else {
      /**TODO API request */
    }
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.top}>
          <img src={logo} alt='' />
          <p>
            일반 유저라면?<Link to='/user/login'>일반 유저 전용 페이지</Link>
          </p>
        </div>
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
            <Link to='/driver/signup'>이메일로 회원가입하기</Link>
          </p>
        </div>
        <div className={style.bottom}>
          <span>SNS 계정으로 간편 가입하기</span>
          <div className={style.snsIcon}>
            <img src={google} alt='' />
            <img src={kakao} alt='' />
            <img src={naver} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
}
