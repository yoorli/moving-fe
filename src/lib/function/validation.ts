export const emailValidation = (email?: string) => {
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  //값이 있을 경우에만 유효성 검사 실행.
  if (email && !emailRegEx.test(email)) {
    return false;
  } else {
    return true;
  }
};

export const passwordValidation = (password?: string) => {
  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  //값이 있을 경우에만 유효성 검사 실행.
  if (password && !passwordRegEx.test(password)) {
    return false;
  } else {
    return true;
  }
};

export const loginValidation = (name: string, value?: string) => {
  if (name === "email") {
    return emailValidation(value);
  }
  if (name === "password") {
    return passwordValidation(value);
  }

  return;
};
