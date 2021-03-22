import React, { ComponentType } from 'react'
import { Route, Redirect, RouteChildrenProps } from 'react-router-dom'
import * as H from 'history';

export type RouteGuard = { execute: (route: AppRoute, location: H.Location<any>, query: URLSearchParams) => boolean | string }
export type AppRoute = {
  path: string,
  component: ComponentType<any>,
  routes?: Array<AppRoute>, exact?: boolean,
  guard?: RouteGuard,
  redirect?: string
}

type Props = AppRoute

export interface CustomRouteChildrenProps extends RouteChildrenProps{
  routes: Array<AppRoute>
}

export class RouteWithSubRoutes extends React.Component<Props, any> {
  render (): React.ReactNode {
    const route = this.props
    return (
      <Route
        path={route.path}
        // exact={Boolean(route.exact)}
        render={props => {
          const queryParams = new URLSearchParams(props.location.search)

          switch (true) {
            case Boolean(route.redirect):
              return (<Redirect to="/"/>)
            case Boolean(route.guard):
              const result = route.guard?.execute(route, props.location, queryParams)
              if (typeof result === 'boolean' && result) {
                return (<route.component {...props} routes={route.routes}/>)
              } else if (typeof result === 'string') {
                return (<Redirect to={result}/>)
              } else {
                return (<Redirect to="/"/>)
              }
            default:
              return (<route.component {...props} routes={route.routes}/>)
          }
        }}
      />
    )
  }
}
