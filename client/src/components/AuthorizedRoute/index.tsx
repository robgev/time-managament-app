import React, { FunctionComponent, useContext } from 'react';
import { userStore } from 'contexts/CurrentUser';
import { 
  Route, 
  Redirect,
  RouteProps,
} from 'react-router-dom';
import { hasToken } from 'utils/token';
import { IAuthorizedRouteProps } from './types';
import { UserRole } from 'types/User.d';

const AuthorizedRoute: FunctionComponent<IAuthorizedRouteProps>  = ({ path, component: Component, minRole = UserRole.USER }) => {
  const { role } = useContext<any>(userStore);
  return (
    <Route
      exact
      path={path}
      render={({ location }: RouteProps) =>
        hasToken() ? (
          role >= minRole ? (
            <Component />
          ) : null
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
