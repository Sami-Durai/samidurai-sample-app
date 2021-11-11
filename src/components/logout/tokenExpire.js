import React, { useCallback } from "react";

// router
import { useHistory } from "react-router";

// state 
import { useSelector } from "react-redux";

// prime components
import { Dialog } from "primereact/dialog";

import { Button } from "primereact/button";

// utils
import { showLogin } from "utils/login";

const TokenExpire = () => {
  const expired = useSelector(state => state.loginDetails.expired);

  const history = useHistory();

  const login = useCallback(() => {
    showLogin();
    history.push("/login");
  }, []);

  return (
    <div>
      <Dialog
        showHeader={false}
        className="token-expire-popup"
        position="top"
        visible={expired}
        onHide={() => { }}
      >
        <div className="token-expire-box">
          Session has been expired!
        </div>
        <div className="token-expire-login">
          <Button type="submit" label="Login" className="p-button p-button-primary p-mt-4 p-mb-2" onClick={login} />
        </div>
      </Dialog>
    </div>
  );
};

export default TokenExpire;
