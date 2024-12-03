import { ServiceRegion } from '../../../components/page/register/Region';
import { I_ServiceType } from '../../../components/page/register/ServiceType';

export type UserRegisterFormValues = {
  image: File | null;
  region: ServiceRegion | undefined;
  small: I_ServiceType | undefined;
  house: I_ServiceType | undefined;
  office: I_ServiceType | undefined;
};

export type UserRegisterFormValidation = {
  image: boolean;
  region: boolean;
};
