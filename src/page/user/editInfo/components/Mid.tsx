import React, { useContext } from 'react';
import {
  InvisibleInputComponent,
  NomalInputComponent,
} from '../../../../components/input/AuthInput';

import style from './Mid.module.css';
import { UserEditInfoFormValidation, UserEditInfoFormValues } from '../type';
import { AuthContext } from '../../../../context/authContext';

export default function EditMidComponent({
  values,
  validation,
  inputHeandler,
}: {
  values: UserEditInfoFormValues;
  validation: UserEditInfoFormValidation;
  inputHeandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const {
    userValue: { user },
  } = useContext(AuthContext);
  return (
    <div className={style.mid}>
      <div className={style.left}>
        <NomalInputComponent
          title='이름'
          placeholder='성함을 입력해 주세요'
          value={values.name}
          name='name'
          inputHeandler={inputHeandler}
          validation={validation.name}
          errorMessage='성함을 입력해 주세요'
        />
        <hr className={style.rightLine} />
        <NomalInputComponent
          title='이메일'
          placeholder={`${user?.email ?? 'loading...'}`}
          name='email'
          inputHeandler={inputHeandler}
          errorMessage='이메일 형식이 아닙니다.'
          readonly={true}
        />
        <hr className={style.rightLine} />
        <NomalInputComponent
          title='전화번호'
          placeholder='숫자만 입력해 주세요'
          value={values.phoneNumber}
          name='phoneNumber'
          inputHeandler={inputHeandler}
          validation={validation.phoneNumber}
          errorMessage='전화번호를 입력해 주세요'
        />
      </div>
      <div className={style.right}>
        <InvisibleInputComponent
          title='현재 비밀번호'
          placeholder='현재 비밀번호을 입력해 주세요'
          value={values.currentPassword}
          name='currentPassword'
          inputHeandler={inputHeandler}
          validation={validation.currentPassword}
          errorMessage='비밀번호가 올바르지 않습니다.'
        />
        <hr className={style.rightLine} />
        <InvisibleInputComponent
          title='새 비밀번호'
          placeholder='새 비밀번호을 입력해 주세요'
          value={values.newPassword}
          name='newPassword'
          inputHeandler={inputHeandler}
          validation={validation.newPassword}
          errorMessage='비밀번호가 올바르지 않습니다.'
        />
        <hr className={style.rightLine} />
        <InvisibleInputComponent
          title='새 비밀번호 확인'
          placeholder='새 비밀번호을 다시 한번 입력해 주세요'
          value={values.confirmNewPassword}
          name='confirmNewPassword'
          inputHeandler={inputHeandler}
          validation={validation.confirmNewPassword}
          errorMessage='비밀번호가 일치하지 않습니다.'
        />
      </div>
    </div>
  );
}
