import { useMemo } from 'react';
import { getAccountId, getAccountsList } from './accounts.dm';

export function useAccountsDm() {
  return useMemo(() => ({
    getAccountsList: (page?: number) => getAccountsList(page),
    getAccountId: (id: number) => getAccountId(id)
  }), [getAccountId, getAccountsList]);
}
