import React, { useState, useEffect, useCallback } from "react";

// react router
import { useHistory } from "react-router-dom";

// components
import { HfnFirebaseAuth, signOut } from "@heartfulnessinstitute/react-hfn-profile";

// primereact components 
import { Card } from "primereact/card";

// utils
import { isLoginAuth } from "utils/login";

import { lStorage } from "utils/storage";

import toaster from "utils/toaster";

import credentials from "assets/data/credentials.json";

const Login = () => {

  let history = useHistory();

  const [loginCheck, setLoginCheck] = useState(false);

  useEffect(() => {
    if (isLoginAuth())
      history.push("/dashboard");
  }, []);

  const processLogin = useCallback(async ({ myInfo }) => {
    if (myInfo) {
      setLoginCheck(true);
      if (myInfo.email) {
        const user = credentials.find(({ email_address }) => email_address === myInfo.email);
        if (user) {
          lStorage.set("authInfo", user);
          setTimeout(() => {
            history.push("/dashboard");
          });
        }
        else {
          toaster.error("Invalid credentials");
          signOut();
          setLoginCheck(false);
        }
      }
    }
  }, []);

  return (
    <div className="login-section">
      <div className="card-wrapper">

        <div className="loging-logo p-px-2 p-mx-5 p-mx-md-0 p-mb-4 p-text-center">
          <img src="/assets//logo.png" alt="heartfulness" />
        </div>

        <Card>
          <div className="login">
            <HfnFirebaseAuth doLogin={processLogin} />
            {loginCheck ? <div className="p-text-center p-m-4 p-text-bold"> Validating... </div> : null}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Login;
