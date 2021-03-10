import type { Support } from '../../data/accounts.types';

export interface AccountsGetData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface AccountsGetResponse {
  data: AccountsGetData;
  support: Support;
}
