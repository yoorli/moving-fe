import { ServiceRegion } from '../../../components/page/resister/Region';
import { I_ServiceType } from '../../../components/page/resister/ServiceType';

export type UserResisterFormValues = {
  image: File | null;
  region: ServiceRegion | undefined;
  small: I_ServiceType | undefined;
  house: I_ServiceType | undefined;
  office: I_ServiceType | undefined;
};

export type UserResisterFormValidation = {
  image: boolean;
  region: boolean;
};
