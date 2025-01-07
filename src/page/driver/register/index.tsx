import React, { useContext, useEffect, useState } from 'react';
import { TextBtn } from '../../../components/page/edit/EditBtn';
import DriverregisterMid from './components/Mid';
import style from './index.module.css';
import { DriverRegisterFormValue, DriverRegisterValidation } from './type';
import { driverRegisterValidation } from '../../../lib/function/validation';
import { ServiceRegion } from '../../../components/page/register/Region';
import { translateServiceReverseRegionArray } from '../../../lib/function/utils';
import { auth } from '../../../lib/api/auth';
import { isAxiosError } from 'axios';
import { AuthContext } from '../../../context/authContext';

export default function DriverRegisterPage() {
  const {
    userValue: { user, isPending },
  } = useContext(AuthContext);

  useEffect(() => {
    if (!isPending && user && user?.Mover?.profileImage) {
      window.location.href = '/';
    }
  }, [user, isPending]);

  const [preview, setPreview] = useState<string | undefined>();
  const [values, setValues] = useState<DriverRegisterFormValue>({
    image: null,
    name: '', // 별명입니다.
    history: '',
    introduce_detail: '',
    introduce_simple: '',
    small: undefined,
    house: undefined,
    office: undefined,
    region: [],
  });

  const [validation, setValidation] = useState<DriverRegisterValidation>({
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
  const profileRegister = async () => {
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
        alert('회원가입이 완료되었습니다.');
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
          <span className={style.firstText}>기사님 프로필 등록</span>
          <span className={style.secoundText}>
            추가 정보를 입력하여 회원 가입을 완료해주세요.
          </span>
        </header>
        <DriverregisterMid
          values={values}
          validation={validation}
          preview={preview ?? user?.Mover?.profileImage}
          inputHeandler={inputHeandler}
          textAreaHeandler={textAreaHeandler}
        />
        <div className={style.bottom}>
          <TextBtn
            onClick={profileRegister}
            text={isLoginPending ? 'loading...' : '시작하기'}
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
