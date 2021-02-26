import React, { useEffect, useState } from 'react';
import { useAccountsDm } from './dm/accounts.hook';
import type { AccountsListDataEntity } from './dm/entity/accounts-list.entity';

export type AccountsListProps = {
  /**
   * Get a page
   */
  page?: number;
};

function AccountsList({ page = 1 }: AccountsListProps) {
  const { getAccountsList } = useAccountsDm();
  const [list, setList] = useState<AccountsListDataEntity[]>([]);

  useEffect(() => {
    void getAccountsList(page).then((response) => {
      setList(response.data);
    });
  }, [getAccountsList, page]);

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
