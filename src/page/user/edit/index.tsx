import React, { useState } from 'react';
import { CancelBtn, EditBtn } from '../../../components/page/edit/EditBtn';
import style from './index.module.css';
import { editValidation } from '../../../lib/function/validation';
import { EditFormValidation, EditFormValues, ServiceRegion } from './type';
import EditMidComponent from './components/Mid';

export default function UserEditPage() {
  const [preview, setPreview] = useState<string | undefined>();
  const [values, setValues] = useState<EditFormValues>({
    name: '',
    email: '',
    phoneNumber: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    image: null,
    region: undefined,
  });

  const [validation, setValidation] = useState<EditFormValidation>({
    name: true,
    email: true,
    phoneNumber: true,
    currentPassword: true,
    newPassword: true,
    confirmNewPassword: true,
    image: true,
    region: false,
  });

  const inputHeandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, checked, type } = e.currentTarget;
    const oldPassword = 'test1234@';
    const { newPassword } = values; // 비밀번호 확인 용

    if (files?.[0]) {
      const file = files?.[0];
      setValues({
        ...values,
        image: file,
      });

      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    } else if (type === 'checkbox') {
      if (values.region && values.region !== name) {
        setValues({
          ...values,
          region: name as ServiceRegion,
        });
        setValidation({
          ...validation,
          region: true,
        });
      } else {
        setValues({
          ...values,
          region: checked ? (name as ServiceRegion) : undefined,
        });

        setValidation({
          ...validation,
          region: checked,
        });
      }
    } else {
      setValues({
        ...values,
        [name]: value,
      });

      setValidation({
        ...validation,
        [name]: editValidation(name, value, oldPassword, newPassword),
      });
    }
  };

  return (
    <span className={style.container}>
      <div className={style.wrapper}>
        <header className={style.title}>프로필 수정</header>
        <EditMidComponent
          values={values}
          validation={validation}
          inputHeandler={inputHeandler}
          preview={preview}
        />
        <span>
          이시온 사랑해 {values.region} {validation.region ? 'ok' : 'no'}
        </span>
        <div className={style.bottom}>
          <CancelBtn />
          <EditBtn
            validation={
              validation.name &&
              validation.email &&
              validation.phoneNumber &&
              validation.currentPassword &&
              validation.newPassword &&
              validation.confirmNewPassword &&
              validation.region &&
              !!values.name &&
              !!values.email &&
              !!values.phoneNumber &&
              !!values.currentPassword &&
              !!values.newPassword &&
              !!values.confirmNewPassword &&
              !!values.region
              /**TODO
               * 이미지, 이용서비스, 내가 사는 지역 추가.
               */
            }
          />
        </div>
      </div>
    </span>
  );
}
