import React, { useEffect, useState } from 'react';
import type { AccountsListDataEntity } from '../../domain/models/accounts-list';
import { AccountsRepository } from "../../data/accounts.repository";
import { Link, Switch } from 'react-router-dom';
import { CustomRouteChildrenProps, RouteWithSubRoutes } from '../../../common/view/router/config';

export interface AccountsListProps extends CustomRouteChildrenProps {};

function AccountsList({ routes }: AccountsListProps) {
  const [list, setList] = useState<AccountsListDataEntity[]>([]);

  useEffect(() => {
    void AccountsRepository.getAccountsList().then((response) => {
      setList(response.data);
    });
    void AccountsRepository.getAccountId('1').then((response) => {
      // eslint-disable-next-line no-console
      console.log(response)
    });
  }, []);

  return (
    <>
      <ul>
        {list.map(({ id, first_name, last_name, email }) => (
          <li key={id}>
            {first_name} {last_name} <span className="email">{email}</span>
          </li>
        ))}
      </ul>
      <Link to="/accounts/create">Go to accounts form (formik + yup)</Link>
      <Link to="/accounts-redirect">Go to redirect route</Link>
      <br/>
      <hr/>
      <Switch>
        {routes.map((route, idx) => (
          <RouteWithSubRoutes key={idx} {...route} />
        ))}
      </Switch>
      <br/>
      <hr/>
    </>
  );
}

export default React.memo(AccountsList);
