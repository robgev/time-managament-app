import React, { FunctionComponent } from 'react';
import { 
  Route, 
  Redirect,
  RouteProps,
} from 'react-router-dom';
import { hasToken } from 'utils/token';
import { IAuthorizedRouteProps } from './types';

const AuthorizedRoute: FunctionComponent<IAuthorizedRouteProps>  = ({ path, component: Component }) => {
  return (
    <Route
      exact
      path={path}
      render={({ location }: RouteProps) =>
        hasToken() ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: location,
              },
            }}
          />
        )
      }
    />
  );
};

export default AuthorizedRoute;
