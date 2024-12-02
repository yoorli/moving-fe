import React, { useState } from 'react';
import { CancelBtn, TextBtn } from '../../../components/page/edit/EditBtn';
import style from './index.module.css';
import { editValidation } from '../../../lib/function/validation';

import EditMidComponent from './components/Mid';
import { UserEditInfoFormValidation, UserEditInfoFormValues } from './type';

export default function UserEditInfoPage() {
  const [values, setValues] = useState<UserEditInfoFormValues>({
    name: '',
    email: '',
    phoneNumber: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [validation, setValidation] = useState<UserEditInfoFormValidation>({
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

  return (
    <span className={style.container}>
      <div className={style.wrapper}>
        <header className={style.top}>
          <span className={style.firstText}>기본정보 수정</span>
        </header>
        <EditMidComponent
          values={values}
          validation={validation}
          inputHeandler={inputHeandler}
        />
        <div className={style.bottom}>
          <CancelBtn />
          <TextBtn
            text='수정하기'
            validation={
              validation.name &&
              validation.email &&
              validation.phoneNumber &&
              validation.currentPassword &&
              validation.newPassword &&
              validation.confirmNewPassword &&
              !!values.name &&
              !!values.email &&
              !!values.phoneNumber &&
              !!values.currentPassword &&
              !!values.newPassword &&
              !!values.confirmNewPassword
            }
          />
        </div>
      </div>
    </span>
  );
}
