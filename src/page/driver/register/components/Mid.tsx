import React from 'react';
import ImgUpload from '../../../../components/page/register/ImgUpload';
import style from './Mid.module.css';
import { DriverRegisterFormValue, DriverRegisterValidation } from '../type';
import {
  NomalInputComponent,
  NomalTextAreaComponent,
} from '../../../../components/input/AuthInput';
import ServiceType from '../../../../components/page/register/ServiceType';
import { RegionArray } from '../../../../components/page/register/Region';

type Props = {
  values: DriverRegisterFormValue;
  validation: DriverRegisterValidation;
  preview?: string;
  inputHeandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  textAreaHeandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function DriverregisterMid({
  preview,
  inputHeandler,
  textAreaHeandler,
  values,
  validation,
}: Props) {
  return (
    <div className={style.mid}>
      <div className={style.left}>
        <ImgUpload preview={preview} inputHeandler={inputHeandler} />
        <hr className={style.rightLine} />
        <NomalInputComponent
          title='별명'
          placeholder='기사님 별명을 입력해 주세요'
          value={values.name}
          name='name'
          inputHeandler={inputHeandler}
          validation={validation.name}
          errorMessage='별명을 입력해 주세요.'
        />
        <hr className={style.rightLine} />
        <NomalInputComponent
          title='경력(년)*'
          placeholder='경력을 입력해 주세요'
          value={values.history}
          name='history'
          inputHeandler={inputHeandler}
          validation={validation.history}
          type='number'
          errorMessage='경력을 입력해 주세요'
        />
        <hr className={style.rightLine} />
        <NomalInputComponent
          title='한 줄 소개*'
          placeholder='한 줄 소개를 입력해 주세요'
          value={values.introduce_simple}
          name='introduce_simple'
          inputHeandler={inputHeandler}
          validation={validation.introduce_simple}
          errorMessage='8자리 이상 입력해 주세요.'
        />
      </div>
      <div className={style.right}>
        <NomalTextAreaComponent
          title='상세 설명*'
          placeholder='상세 내용을 입력해 주세요.'
          value={values.introduce_detail}
          name='introduce_detail'
          textAreaHeandler={textAreaHeandler}
          validation={validation.introduce_detail}
          errorMessage='10자리 이상 입력해 주세요.'
        />
        <hr className={style.rightLine} />
        <ServiceType
          title='제공 서비스'
          values={values}
          inputHeandler={inputHeandler}
          nomalMessage='*견적 요청 시 이용 서비스를 선택할 수 있어요.'
          errorMessage='* 1개 이상 선택해 주세요'
          validation={!!values.small || !!values.house || !!values.office}
        />
        <hr className={style.rightLine} />
        <RegionArray
          title='서비스 가능 지역'
          nomalMessage='*견적 요청 시 지역을 설정할 수 있어요.'
          errorMessage='* 1개 이상 선택해 주세요'
          inputHeandler={inputHeandler}
          region={values.region}
          validation={validation.region}
        />
      </div>
    </div>
  );
}
