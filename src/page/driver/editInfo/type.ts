export type DriverEditInfoForm = {
  name: string;
  email: string;
  phoneNumber: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type DriverEditInfoValidation = {
  name: boolean;
  email: boolean;
  phoneNumber: boolean;
  currentPassword: boolean;
  newPassword: boolean;
  confirmNewPassword: boolean;
};
