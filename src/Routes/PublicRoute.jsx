import React, { memo } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = memo(({ component: Component, isAuth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isAuth === false ? <Component {...props} /> : <Redirect to="/timeline" />)}
  />
));

export default PublicRoute;
