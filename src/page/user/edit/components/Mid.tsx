import React from 'react';
import {
  InvisibleInputComponent,
  NomalInputComponent,
} from '../../../../components/input/AuthInput';
import { EditFormValidation, EditFormValues } from '../type';
import style from './Mid.module.css';
import ImgUpload from '../../../../components/page/resister/ImgUpload';
import Region from '../../../../components/page/resister/Region';

export default function EditMidComponent({
  values,
  validation,
  inputHeandler,
  preview,
}: {
  values: EditFormValues;
  validation: EditFormValidation;
  inputHeandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preview?: string;
}) {
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
          errorMessage='2글자 이상, 10자 이하로 입력해주세요.'
        />
        <NomalInputComponent
          title='이메일'
          placeholder='이메일을 입력해 주세요'
          value={values.email}
          name='email'
          inputHeandler={inputHeandler}
          validation={validation.email}
          errorMessage='이메일 형식이 아닙니다.'
        />
        <NomalInputComponent
          title='전화번호'
          placeholder='숫자만 입력해 주세요'
          value={values.phoneNumber}
          name='phoneNumber'
          inputHeandler={inputHeandler}
          validation={validation.phoneNumber}
          errorMessage='전화번호를 입력해 주세요'
        />
        <InvisibleInputComponent
          title='현재 비밀번호'
          placeholder='현재 비밀번호을 입력해 주세요'
          value={values.currentPassword}
          name='currentPassword'
          inputHeandler={inputHeandler}
          validation={validation.currentPassword}
          errorMessage='비밀번호가 올바르지 않습니다.'
        />
        <InvisibleInputComponent
          title='새 비밀번호'
          placeholder='새 비밀번호을 입력해 주세요'
          value={values.newPassword}
          name='newPassword'
          inputHeandler={inputHeandler}
          validation={validation.newPassword}
          errorMessage='비밀번호가 올바르지 않습니다.'
        />
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
      <div className={style.right}>
        <ImgUpload inputHeandler={inputHeandler} preview={preview} />
        <Region
          nomalMessage='*견적 요청 시 지역을 설정할 수 있어요.'
          errorMessage='*1개 선택해주세요'
          inputHeandler={inputHeandler}
          region={values.region}
          validation={validation.region}
        />
      </div>
    </div>
  );
}
