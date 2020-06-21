import { GovernmentSupport } from './gov-support.model';
import { Address } from './address.model';

export interface Citizen {
  id?: number;
  birthDate?: Date;
  birthStateId?: number;
  dependantQty?: number;
  firstname?: string;
  govSupport?: GovernmentSupport[];
  hasJob?: boolean;
  curp?: string;
  hasOtherSupport?: boolean;
  isSingle?: boolean;
  maternalLastname?: string;
  lastPaycheckQty?: number;
  paternalLastname?: string;
  accepted?: number;
  assignedSocialWorker?: string;
  recommended?: boolean;
  email?: string;
  phoneNumber?: number;
  address?: Address;
  user?: {
    id?: string;
role?: string;
username?: string;
  }
}
