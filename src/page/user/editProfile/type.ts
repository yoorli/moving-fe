import { ServiceRegion } from '../../../components/page/register/Region';
import { I_ServiceType } from '../../../components/page/register/ServiceType';

export type UserregisterFormValues = {
  image: File | null;
  region: ServiceRegion | undefined;
  small: I_ServiceType | undefined;
  house: I_ServiceType | undefined;
  office: I_ServiceType | undefined;
};

export type UserregisterFormValidation = {
  image: boolean;
  region: boolean;
};
