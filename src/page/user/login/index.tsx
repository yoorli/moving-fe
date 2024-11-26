import { useState } from "react";
import {
  EmailInputComponent,
  PasswordInputComponent,
} from "./components/PageInput";
import style from "./index.module.css";
import { loginValidation } from "../../../lib/function/validation";

export type FormLogin = {
  email: string;
  password: string;
};

type FormValidation = {
  email: boolean;
  password: boolean;
};

export default function UserLoginPage() {
  const [values, setValues] = useState<FormLogin>({
    email: "",
    password: "",
  });

  const [validation, setValidation] = useState<FormValidation>({
    email: true,
    password: true,
  });

  const inputHeandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value,
    });

    setValidation({
      ...validation,
      [name]: loginValidation(name, value),
    });
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.top}></div>
        <div className={style.mid}>
          <form className={style.loginForm}>
            <EmailInputComponent
              value={values.email}
              inputHeandler={inputHeandler}
              validation={validation.email}
            />
            <PasswordInputComponent
              value={values.password}
              inputHeandler={inputHeandler}
              validation={validation.password}
            />
          </form>
        </div>
        <div className={style.bottom}></div>
      </div>
    </div>
  );
}
