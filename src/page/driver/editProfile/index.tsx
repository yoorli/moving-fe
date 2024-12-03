import React, { useState } from 'react';
import { CancelBtn, TextBtn } from '../../../components/page/edit/EditBtn';
import DriverregisterMid from './components/Mid';
import style from './index.module.css';
import { DriverregisterFormValue, DriverregisterValidation } from './type';
import { driverRegisterValidation } from '../../../lib/function/validation';
import { ServiceRegion } from '../../../components/page/register/Region';

export default function DriverEditProfilePage() {
  const [preview, setPreview] = useState<string | undefined>();
  const [values, setValues] = useState<DriverregisterFormValue>({
    image: null,
    name: '',
    history: '',
    introduce_detail: '',
    introduce_simple: '',
    small: undefined,
    house: undefined,
    office: undefined,
    region: [],
  });

  const [validation, setValidation] = useState<DriverregisterValidation>({
    image: true,
    name: true,
    history: true,
    introduce_detail: true,
    introduce_simple: true,
    serviceType: true,
    region: false,
  });

  const inputHeandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, type } = e.currentTarget;

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
      if (!values.region.includes(name as ServiceRegion)) {
        setValues((prev) => ({
          ...values,
          region: [...prev.region, name as ServiceRegion],
        }));

        setValidation({
          ...validation,
          region: true,
        });
      } else {
        setValues((prev) => {
          const newArray = prev.region.filter(
            (item) => item !== (name as ServiceRegion),
          );
          if (newArray.length < 1) {
            setValidation({
              ...validation,
              region: false,
            });
          }
          return {
            ...values,
            region: newArray,
          };
        });
      }
    } else {
      setValues({
        ...values,
        [name]: value,
      });

      setValidation({
        ...validation,
        [name]: driverRegisterValidation(name, value),
      });
    }
  };

  const textAreaHeandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;

    setValues({
      ...values,
      [name]: value,
    });

    setValidation({
      ...validation,
      [name]: driverRegisterValidation(name, value),
    });
  };
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <header className={style.top}>
          <span className={style.firstText}>프로필 수정</span>
        </header>
        <DriverregisterMid
          values={values}
          validation={validation}
          preview={preview}
          inputHeandler={inputHeandler}
          textAreaHeandler={textAreaHeandler}
        />
        <div className={style.bottom}>
          <CancelBtn />
          <TextBtn
            text='수정하기'
            validation={
              validation.name &&
              validation.history &&
              validation.introduce_simple &&
              validation.introduce_detail &&
              validation.region &&
              !!values.name &&
              !!values.history &&
              !!values.introduce_simple &&
              !!values.introduce_detail &&
              values.region.length > 0 &&
              (!!values.small || !!values.house || !!values.office)
            }
          />
        </div>
      </div>
    </div>
  );
}
