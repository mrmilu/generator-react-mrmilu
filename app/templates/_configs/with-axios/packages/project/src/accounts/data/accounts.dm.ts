import { JsonConvert } from 'json2typescript';
import Api, { parseUrl } from '../../common/data/config.dm';
import urls from './accounts.urls';
import type { AccountsListResponse } from '../domain/entity/accounts-list.types';
import { AccountsListResponseEntity } from './entity/accounts-list.entity';
import type { AccountsGetResponse } from '../domain/entity/accounts-get.types';
import { AccountsGetDataEntity } from './entity/accounts-get.entity';

const jsonConverter = new JsonConvert();

export function getAccountsList(page = 1): Promise<AccountsListResponseEntity> {
  return Api()
    .get<AccountsListResponse>(urls.accountList, { params: { page } })
    .then(({ data }) => jsonConverter.deserializeObject(data, AccountsListResponseEntity));
}

export function getAccountId(id: number): Promise<AccountsGetDataEntity> {
  const url = parseUrl(urls.accountId, { id });
  return Api()
    .get<AccountsGetResponse>(url)
    .then(({ data }) => jsonConverter.deserializeObject(data.data, AccountsGetDataEntity));
}
