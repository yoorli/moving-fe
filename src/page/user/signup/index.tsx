import React, { useState } from 'react';
import style from '../../../components/page/signup/index.module.css';
import { UserSignupBottom } from '../../../components/page/signup/SignupBottom';
import { UserSignupTop } from '../../../components/page/signup/SignupTop';
import { Link } from 'react-router-dom';
import {
  EmailInputComponent,
  PasswordInputComponent,
} from '../../../components/page/login/LoginInput';
import { signupValidation } from '../../../lib/function/validation';
import {
  ConfirmPasswordInputComponent,
  NameInputComponent,
  PhoneNumberInputComponent,
} from '../../../components/page/signup/SignupInput';
import SignupBtn from '../../../components/page/signup/SignupBtn';

type FormLogin = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

type FormValidation = {
  name: boolean;
  email: boolean;
  phoneNumber: boolean;
  password: boolean;
  confirmPassword: boolean;
};

export default function UserSignupPage() {
  const [values, setValues] = useState<FormLogin>({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [validation, setValidation] = useState<FormValidation>({
    name: true,
    email: true,
    phoneNumber: true,
    password: true,
    confirmPassword: true,
  });

  const inputHeandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const { password } = values; // 비밀번호 확인 용

    setValues({
      ...values,
      [name]: value,
    });

    setValidation({
      ...validation,
      [name]: signupValidation(name, value, password),
    });
  };

  const loginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !!values.email &&
      !!values.password &&
      !!values.name &&
      !!values.phoneNumber &&
      !!values.confirmPassword &&
      validation.email &&
      validation.password &&
      validation.name &&
      validation.phoneNumber &&
      validation.confirmPassword
    ) {
      /**TODO API request */
    } else {
      return;
    }
  };
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <UserSignupTop />
        <div className={style.mid}>
          <form className={style.loginForm} onSubmit={loginSubmit}>
            <NameInputComponent
              value={values.name}
              inputHeandler={inputHeandler}
              validation={validation.name}
            />
            <EmailInputComponent
              value={values.email}
              inputHeandler={inputHeandler}
              validation={validation.email}
            />
            <PhoneNumberInputComponent
              value={values.phoneNumber}
              inputHeandler={inputHeandler}
              validation={validation.phoneNumber}
            />
            <PasswordInputComponent
              value={values.password}
              inputHeandler={inputHeandler}
              validation={validation.password}
            />
            <ConfirmPasswordInputComponent
              value={values.confirmPassword}
              inputHeandler={inputHeandler}
              validation={validation.confirmPassword}
            />
            <SignupBtn
              context='시작하기'
              validation={
                !!values.email &&
                !!values.password &&
                !!values.name &&
                !!values.phoneNumber &&
                !!values.confirmPassword &&
                validation.email &&
                validation.password &&
                validation.name &&
                validation.phoneNumber &&
                validation.confirmPassword
              }
            />
          </form>
          <p>
            아직 무빙 회원이 아니신가요?
            <Link to='/user/signup'>이메일로 회원가입하기</Link>
          </p>
        </div>
        <UserSignupBottom />
      </div>
    </div>
  );
}
