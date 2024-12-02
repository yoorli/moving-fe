export type UserEditInfoFormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
export type UserEditInfoFormValidation = {
  name: boolean;
  email: boolean;
  phoneNumber: boolean;
  currentPassword: boolean;
  newPassword: boolean;
  confirmNewPassword: boolean;
};
