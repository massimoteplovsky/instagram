import React from 'react';
import pt from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { Path, RouteProtection } from '../constants';

export default function ProtectedRoute({
  user,
  protectionType,
  children,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user && RouteProtection.SEMI_PROTECTED === protectionType) {
          return <Redirect to={Path.DASHBOARD} />;
        }

        if (!user && RouteProtection.PROTECTED === protectionType) {
          return (
            <Redirect
              to={{
                pathname: Path.LOGIN,
                state: { from: location },
              }}
            />
          );
        }

        return React.cloneElement(children, { user });
      }}
    />
  );
}

ProtectedRoute.propTypes = {
  user: pt.object,
  children: pt.object.isRequired,
  protectionType: pt.string.isRequired,
};
