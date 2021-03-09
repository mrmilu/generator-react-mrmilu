import React, { useEffect, useState } from 'react';
import { useAccountsDm } from '../data/accounts.hook';
import type { AccountsListDataEntity } from '../data/entity/accounts-list.entity';
import { getAccountsList } from "../data/accounts.dm";

export type AccountsListProps = {
  /**
   * Get a page
   */
  page?: number;
};

function AccountsList({ page = 1 }: AccountsListProps) {
  const [list, setList] = useState<AccountsListDataEntity[]>([]);

  useEffect(() => {
    void getAccountsList(page).then((response) => {
      setList(response.data);
    });
  }, [page]);

  return (
    <ul>
      {list.map(({ id, first_name, last_name, email }) => (
        <li key={id}>
          {first_name} {last_name} <span className="email">{email}</span>
        </li>
      ))}
    </ul>
  );
}

export default React.memo(AccountsList);
