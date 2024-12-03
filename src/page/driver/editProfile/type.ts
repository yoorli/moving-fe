import { ServiceRegion } from '../../../components/page/register/Region';
import { I_ServiceType } from '../../../components/page/register/ServiceType';

export type DriverregisterFormValue = {
  image: File | null;
  name: string;
  history: string;
  introduce_simple: string;
  introduce_detail: string;
  small: I_ServiceType | undefined;
  house: I_ServiceType | undefined;
  office: I_ServiceType | undefined;
  region: Array<ServiceRegion | null>;
};

export type DriverregisterValidation = {
  image: boolean;
  name: boolean;
  history: boolean;
  introduce_simple: boolean;
  introduce_detail: boolean;
  serviceType: boolean;
  region: boolean;
};
