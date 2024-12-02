import { ServiceRegion } from '../../../components/page/resister/Region';
import { I_ServiceType } from '../../../components/page/resister/ServiceType';

export type EditFormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  image: File | null;
  region: ServiceRegion | undefined;
  small: I_ServiceType | undefined;
  house: I_ServiceType | undefined;
  office: I_ServiceType | undefined;
};
export type EditFormValidation = {
  name: boolean;
  email: boolean;
  phoneNumber: boolean;
  currentPassword: boolean;
  newPassword: boolean;
  confirmNewPassword: boolean;
  image: boolean;
  region: boolean;
};
