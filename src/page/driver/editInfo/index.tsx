import React, { useState } from 'react';
import { CancelBtn, TextBtn } from '../../../components/page/edit/EditBtn';

import style from './index.module.css';

import { editValidation } from '../../../lib/function/validation';
import DriverResisterMid from './components/Mid';
import { DriverEditInfoForm, DriverEditInfoValidation } from './type';

export default function DriverEditInfoPage() {
  const [values, setValues] = useState<DriverEditInfoForm>({
    name: '',
    email: '',
    phoneNumber: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [validation, setValidation] = useState<DriverEditInfoValidation>({
    name: true,
    email: true,
    phoneNumber: true,
    currentPassword: true,
    newPassword: true,
    confirmNewPassword: true,
  });

  const inputHeandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const oldPassword = 'test1234@';
    const { newPassword } = values; // 비밀번호 확인 용

    setValues({
      ...values,
      [name]: value,
    });

    setValidation({
      ...validation,
      [name]: editValidation(name, value, oldPassword, newPassword),
    });
  };

  // const loginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (
  //     !!values.email &&
  //     !!values.password &&
  //     !!values.name &&
  //     !!values.phoneNumber &&
  //     !!values.confirmPassword &&
  //     validation.email &&
  //     validation.password &&
  //     validation.name &&
  //     validation.phoneNumber &&
  //     validation.confirmPassword
  //   ) {
  //     /**TODO API request */
  //   } else {
  //     return;
  //   }
  // };
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <header className={style.top}>
          <span className={style.firstText}>기본정보 수정</span>
        </header>
        <DriverResisterMid
          values={values}
          validation={validation}
          inputHeandler={inputHeandler}
        />
        <div className={style.bottom}>
          <CancelBtn />
          <TextBtn
            text='수정하기'
            validation={
              !!values.name &&
              !!values.email &&
              !!values.phoneNumber &&
              !!values.currentPassword &&
              !!values.newPassword &&
              !!values.confirmNewPassword &&
              validation.email &&
              validation.phoneNumber &&
              validation.name &&
              validation.currentPassword &&
              validation.newPassword &&
              validation.confirmNewPassword
            }
          />
        </div>
      </div>
    </div>
  );
}
