import React, { useState } from 'react';
import { TextBtn } from '../../../components/page/edit/EditBtn';
import style from './index.module.css';
import { UserResisterFormValidation, UserResisterFormValues } from './type';
import { ServiceRegion } from '../../../components/page/resister/Region';
import ResisterMidComponent from './components/Mid';

export default function UserEditProfilePage() {
  const [preview, setPreview] = useState<string | undefined>();
  const [values, setValues] = useState<UserResisterFormValues>({
    image: null,
    region: undefined,
    small: undefined,
    house: undefined,
    office: undefined,
  });

  const [validation, setValidation] = useState<UserResisterFormValidation>({
    image: true,
    region: false,
  });

  const inputHeandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, checked, type } = e.currentTarget;

    if (files?.[0]) {
      const file = files?.[0];
      setValues({
        ...values,
        image: file,
      });

      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    } else if (name === 'small' || name === 'house' || name === 'office') {
      if (values[name]) {
        setValues({
          ...values,
          [name]: undefined,
        });
      } else {
        setValues({
          ...values,
          [name]: value,
        });
      }
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
    }
  };
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <header className={style.top}>
          <span className={style.firstText}>프로필 수정</span>
          <span className={style.secoundText}>
            추가 정보를 입력하여 회원가입을 완료해주세요.
          </span>
        </header>
        <ResisterMidComponent
          values={values}
          validation={validation}
          inputHeandler={inputHeandler}
          preview={preview}
        />
        <div className={style.bottom}>
          <TextBtn
            text='시작하기'
            validation={
              validation.region &&
              !!values.region &&
              (!!values.small || !!values.house || !!values.office)
            }
          />
        </div>
      </div>
    </div>
  );
}
