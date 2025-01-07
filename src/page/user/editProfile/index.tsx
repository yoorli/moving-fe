import React, { useContext, useState } from 'react';
import { TextBtn } from '../../../components/page/edit/EditBtn';
import style from './index.module.css';
import { UserregisterFormValidation, UserregisterFormValues } from './type';
import { ServiceRegion } from '../../../components/page/register/Region';
import RegisterMidComponent from './components/Mid';
import { translateServiceReverseRegion } from '../../../lib/function/utils';
import { auth } from '../../../lib/api/auth';
import { isAxiosError } from 'axios';
import { AuthContext } from '../../../context/authContext';

export default function UserEditProfilePage() {
  const {
    userValue: { user },
  } = useContext(AuthContext);

  const [preview, setPreview] = useState<string | undefined>();
  const [values, setValues] = useState<UserregisterFormValues>({
    image: null,
    region: undefined,
    small: undefined,
    house: undefined,
    office: undefined,
  });

  const [validation, setValidation] = useState<UserregisterFormValidation>({
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

  const [isLoginPending, setIsLoginPending] = useState<boolean>(false);

  const profileRegister = async () => {
    if (
      validation.region &&
      validation.image &&
      !!values.region &&
      values.image &&
      (!!values.small || !!values.house || !!values.office)
    ) {
      const keys = Object.keys(values) as [];

      const formData = {
        region: translateServiceReverseRegion(values.region as string),
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
      };

      try {
        setIsLoginPending(true);
        await auth.patch('/customer/profile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('프로필 수정이 완료 되었습니다.');
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
        <RegisterMidComponent
          values={values}
          validation={validation}
          inputHeandler={inputHeandler}
          preview={preview ?? user?.Customer?.profileImage}
        />
        <div className={style.bottom}>
          <TextBtn
            onClick={profileRegister}
            text={isLoginPending ? 'loading...' : '수정하기'}
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
