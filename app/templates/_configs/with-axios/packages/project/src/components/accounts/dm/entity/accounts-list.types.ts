import type { Support } from '../accounts.types';

export interface AccountsListData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface AccountsListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: AccountsListData[];
  support: Support;
}
