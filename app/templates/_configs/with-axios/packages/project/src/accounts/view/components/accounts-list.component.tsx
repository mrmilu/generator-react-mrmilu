import React, { useEffect, useState } from 'react';
import type { AccountsListDataEntity } from '../../data/models/accounts-list.entity';
import { AccountsRepository } from "../../data/accounts.repository";

export type AccountsListProps = {
  /**
   * Get a page
   */
  page?: number;
};

function AccountsList({ page = 1 }: AccountsListProps) {
  const [list, setList] = useState<AccountsListDataEntity[]>([]);

  useEffect(() => {
    void AccountsRepository.getAccountsList(page).then((response) => {
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
