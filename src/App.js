import React from "react";

import { Switch, Redirect } from "react-router-dom";

// components
import AuthGuard from "auth-guard/index";

import Login from "components/login/Login";

// shared components
import HFNErrorBoundary from "sharedComponents/errorBoundary";

import HFNLoader from "sharedComponents/lazyLoading";

import HFNToaster from "sharedComponents/toasters";

import HFNConfirmDialog from "sharedComponents/confirmDialog";

import TokenExpire from "sharedComponents/logout/tokenExpire";

// utils
import lazy from "utils/lazy";

// lazy components
const LayoutContainer = lazy("layouts/Template");

const App = () => {
    return (
      <HFNErrorBoundary>
        <HFNLoader>
          <div className="hfn">
            <Switch>

              <Login path="/login" />

              <AuthGuard path="/" component={LayoutContainer} />

              <Redirect to="login"></Redirect>

            </Switch>
          </div>

          <div>
            <HFNToaster />
            <HFNConfirmDialog />
            <TokenExpire />
          </div>
        </HFNLoader>
      </HFNErrorBoundary>
    );
};

export default App;
