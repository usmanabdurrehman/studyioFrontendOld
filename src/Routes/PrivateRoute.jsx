import React, { memo } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = memo(({ component: Component, isAuth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isAuth === true ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/',
          state: { from: props.location },
        }}
      />
    ))}
  />
));

export default PrivateRoute;
