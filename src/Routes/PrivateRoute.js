// @flow
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CheckToken } from '../Utils/checkToken';

export const PrivateRoute = ({ children, ...routeProp }) => {
  const auth = CheckToken();
  return (
    <Route
      {...routeProp}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
