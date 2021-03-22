import accountRoutes from '../../../accounts/view/router/routes'

export const appRoutes = [
  {
    path: "/",
    redirect: "/accounts"
  },
  ...accountRoutes
]
