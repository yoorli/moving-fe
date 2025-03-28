import React, { useContext, useEffect, useState } from 'react';
import { CancelBtn, TextBtn } from '../../../components/page/edit/EditBtn';
import style from './index.module.css';
import { editValidation } from '../../../lib/function/validation';

import EditMidComponent from './components/Mid';
import { UserEditInfoFormValidation, UserEditInfoFormValues } from './type';
import { auth } from '../../../lib/api/auth';
import { isAxiosError } from 'axios';
import { AuthContext } from '../../../context/authContext';

export default function UserEditInfoPage() {
   const {
      userValue: { user },
    } = useContext(AuthContext);
  const [values, setValues] = useState<UserEditInfoFormValues>({
    name: '',
    phoneNumber: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

   useEffect(()=>{
      setValues((prev)=>({
        ...prev,
        name: user?.name,
        phoneNumber: user?.phoneNumber ?? 'loading...',
      }))
    },[user])

  const [validation, setValidation] = useState<UserEditInfoFormValidation>({
    name: true,
    phoneNumber: true,
    currentPassword: true,
    newPassword: true,
    confirmNewPassword: true,
  });

  const inputHeandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const { newPassword } = values; // 비밀번호 확인 용
    setValues({
      ...values,
      [name]: value,
    });

    setValidation({
      ...validation,
      [name]: editValidation(name, value, newPassword),
    });
  };

  const [isLoginPending, setIsLoginPending] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<{
    password: string;
  }>({
    password: '',
  });
  const editSubmit = async () => {
    if (
      !!values.newPassword &&
      !!values.name &&
      !!values.phoneNumber &&
      !!values.confirmNewPassword &&
      validation.newPassword &&
      validation.name &&
      validation.phoneNumber &&
      validation.confirmNewPassword
    ) {
      const formData = {
        name: values.name,
        phoneNumber: values.phoneNumber,
        usedPassword: values.currentPassword,
        newPassword: values.newPassword,
      };
      try {
        setIsLoginPending(true);
        const response = await auth.patch('/customer/info', formData);
        alert(response.data.message);
        window.location.href = '/';
      } catch (e) {
        if (isAxiosError(e)) {
          const data = e.response?.data;
          if (data.type === 'password') {
            setValidation({
              ...validation,
              currentPassword: false,
            });
          } else {
            alert(data.message);
            window.location.href = '/';
          }

          setErrorMessage({
            ...errorMessage,
            [data.type]: data.message,
          });
        }
      } finally {
        setIsLoginPending(false);
      }
    } else {
      return;
    }
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
            onClick={editSubmit}
            text={isLoginPending ? 'loading...' : '수정하기'}
            validation={
              validation.name &&
              validation.phoneNumber &&
              validation.currentPassword &&
              validation.newPassword &&
              validation.confirmNewPassword &&
              !!values.name &&
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
