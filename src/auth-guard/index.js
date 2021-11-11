import React from "react";

// router
import { Route, Redirect } from "react-router-dom";

// components
// shared components
import Unauthorized from "components/logout/Unauthorized";

// utils
import { hasRouteAccess } from "utils/accessControl";

import { isLoginAuth } from "utils/login";

const AuthGuard = ({ component: Component, ...rest }) => {
  const hasAccess = hasRouteAccess(rest.computedMatch.path);
  
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoginAuth())
          return hasAccess ? <Component {...props} /> : <Unauthorized />
        else
          return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      }}
    />
  )
};

export default AuthGuard;
