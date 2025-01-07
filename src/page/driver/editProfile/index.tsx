import React, { useContext, useState } from 'react';
import { CancelBtn, TextBtn } from '../../../components/page/edit/EditBtn';
import DriverregisterMid from './components/Mid';
import style from './index.module.css';
import { DriverregisterFormValue, DriverregisterValidation } from './type';
import { driverRegisterValidation } from '../../../lib/function/validation';
import { ServiceRegion } from '../../../components/page/register/Region';
import { translateServiceReverseRegionArray } from '../../../lib/function/utils';
import { auth } from '../../../lib/api/auth';
import { isAxiosError } from 'axios';
import { AuthContext } from '../../../context/authContext';

export default function DriverEditProfilePage() {
  const {
    userValue: { user },
  } = useContext(AuthContext);

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

  const [isLoginPending, setIsLoginPending] = useState<boolean>(false);
  const profilEdit = async () => {
    if (
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
    ) {
      const keys = Object.keys(values) as [];
      const formData = {
        profileImage: values.image,
        serviceType: keys
          .filter((data) => {
            const service = ['office', 'small', 'house'];
            return service.includes(data);
          })
          .filter((data) => {
            return values[data] === 'on';
          })
          .map((data) => (data as string).toUpperCase()),
        region: translateServiceReverseRegionArray(values.region as string[]),
        nickname: values.name,
        career: values.history,
        summary: values.introduce_simple,
        description: values.introduce_detail,
      };
      try {
        setIsLoginPending(true);
        await auth.patch('/mover/profile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('프로필 수정이 완료되었습니다.');
        window.location.href = '/';
      } catch (e) {
        if (isAxiosError(e)) {
          const data = e.response?.data;

          alert(data);
        }
      } finally {
        setIsLoginPending(false);
      }
    } else {
      return;
    }
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
          preview={preview ?? user?.Mover?.profileImage}
          inputHeandler={inputHeandler}
          textAreaHeandler={textAreaHeandler}
        />
        <div className={style.bottom}>
          <CancelBtn />
          <TextBtn
            onClick={profilEdit}
            text={isLoginPending ? 'loading...' : '수정하기'}
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
