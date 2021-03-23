import AccountsList from '../../view/components/accounts-list.component';
import type { AppRoute } from '../../../common/view/router/config';

const routes: AppRoute[] = [
  {
    path: '/accounts',
    component: AccountsList
  },
  {
    path: '/accounts-redirect',
    redirect: '/accounts-test'
  },
  {
    path: '/accounts-guard',
    guard: { execute: () => true },
    component: () => 'guarded route --'
  },
  {
    path: '/accounts-guard-with-redirect',
    guard: { execute: () => '/accounts-redirect' },
    component: () => 'never reaching here --'
  },
  {
    path: '/accounts-test',
    component: () => 'test page --'
  }
];

export default routes;
