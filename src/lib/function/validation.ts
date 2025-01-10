const emailValidation = (email?: string) => {
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  //값이 있을 경우에만 유효성 검사 실행.
  if (email && !emailRegEx.test(email)) {
    return false;
  } else {
    return true;
  }
};

const passwordValidation = (password?: string) => {
  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
  //값이 있을 경우에만 유효성 검사 실행.
  if (password && !passwordRegEx.test(password)) {
    return false;
  } else {
    return true;
  }
};

const upperLowerValidation = (name?: string, upper = 8, lower = 2) => {
  const length = name?.length;
  //값이 있을 경우에만 유효성 검사 실행.
  if (length && (length > upper || length < lower)) {
    return false;
  } else {
    return true;
  }
};
const upperValidation = (value?: string, number = 8) => {
  const length = value?.length;
  //값이 있을 경우에만 유효성 검사 실행.
  if (length && length < number) {
    return false;
  } else {
    return true;
  }
};

const phoneValidation = (phoneNumber?: string) => {
  const phoneRegEx = /^(01[016789]{1})[0-9]{4}[0-9]{4}$/;
  //값이 있을 경우에만 유효성 검사 실행.
  if (phoneNumber && !phoneRegEx.test(phoneNumber)) {
    return false;
  } else {
    return true;
  }
};

const passwordEqualValidation = (
  confirmPassword?: string,
  password?: string,
) => {
  if (!password && !confirmPassword) {
    return true;
  }
  if (!password) {
    return false;
  }

  //값이 있을 경우에만 유효성 검사 실행.
  if (password && confirmPassword && !(password === confirmPassword)) {
    return false;
  } else {
    return true;
  } // 비밀번호 일치 여부 검시.
};

//
export const loginValidation = (name: string, value?: string) => {
  if (name === 'email') {
    return emailValidation(value);
  }
  if (name === 'password') {
    return passwordValidation(value);
  }
  return;
};

export const signupValidation = (
  name: string,
  value?: string,
  password?: string,
) => {
  if (name === 'name') {
    return upperLowerValidation(value);
  }
  if (name === 'email') {
    return emailValidation(value);
  }
  if (name === 'phoneNumber') {
    return phoneValidation(value);
  }
  if (name === 'password') {
    return passwordValidation(value);
  }
  if (name === 'confirmPassword') {
    return passwordEqualValidation(value, password);
  }
  return;
};

export const editValidation = (
  name: string,
  value?: string,
  newPassword?: string,
) => {
  if (name === 'name') {
    return upperLowerValidation(value);
  }
  if (name === 'email') {
    return emailValidation(value);
  }
  if (name === 'phoneNumber') {
    return phoneValidation(value);
  }
  if (name === 'currentPassword') {
    return passwordValidation(value);
  }
  if (name === 'newPassword') {
    return passwordValidation(value);
  }
  if (name === 'confirmNewPassword') {
    return passwordEqualValidation(value, newPassword);
  }
  return;
};

export const driverRegisterValidation = (name: string, value?: string) => {
  if (name === 'name') {
    return upperLowerValidation(value);
  }
  if (name === 'history') {
    return upperLowerValidation(value, 2, 1);
  }
  if (name === 'introduce_simple') {
    return upperValidation(value, 8);
  }
  if (name === 'introduce_detail') {
    return upperValidation(value, 10);
  }
  return;
};
