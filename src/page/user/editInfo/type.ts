export type UserEditInfoFormValues = {
  name: string;
  phoneNumber: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
export type UserEditInfoFormValidation = {
  name: boolean;
  phoneNumber: boolean;
  currentPassword: boolean;
  newPassword: boolean;
  confirmNewPassword: boolean;
};
