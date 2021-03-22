import React, { ComponentType } from 'react';
import { Route, Redirect, RouteChildrenProps, RouteComponentProps } from 'react-router-dom';
import * as H from 'history';

export type RouteGuard = { execute: (route: AppRoute, location: H.Location<any>, query: URLSearchParams) => boolean | string };
export type AppRoute = {
  path: string;
  component?: ComponentType<any>;
  routes?: AppRoute[];
  exact?: boolean;
  guard?: RouteGuard;
  redirect?: string;
};

type Props = AppRoute;

export interface CustomRouteChildrenProps extends RouteChildrenProps {
  routes: AppRoute[];
}

export const RouteWithSubRoutes = (route: Props) => {
  const routeGuard = (props: RouteComponentProps<{ [K: string]: string | undefined }>) => {
    const queryParams = new URLSearchParams(props.location.search);
    const result = route.guard?.execute(route, props.location, queryParams);
    if (typeof result === 'boolean' && result && route.component) {
      return <route.component {...props} routes={route.routes} />;
    } else if (typeof result === 'string') {
      return <Redirect to={result} />;
    } else {
      return <Redirect to="/" />;
    }
  };

  return (
    <Route
      path={route.path}
      // exact={Boolean(route.exact)}
      render={(props) => {
        switch (true) {
          case Boolean(route.redirect):
            return <Redirect to={route.redirect ?? '/'} />;
          case Boolean(route.guard):
            return routeGuard(props);
          default:
            if (route.component) {
              return <route.component {...props} routes={route.routes} />;
            } else {
              return <Redirect to="/" />;
            }
        }
      }}
    />
  );
};
