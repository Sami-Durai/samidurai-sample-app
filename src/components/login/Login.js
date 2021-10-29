import React, { useState, useEffect, useCallback } from "react";

// react router
import { useHistory } from "react-router-dom";

// components
import { HfnFirebaseAuth, } from "@heartfulnessinstitute/react-hfn-profile";

// primereact components 
import { Card } from "primereact/card";

// utils
import { isLoginAuth } from "utils/login";

import { lStorage } from "utils/storage";

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
      if (myInfo.id) {

        const roleInfo = credentials.find(({ email_address }) => email_address === myInfo.email);

        const user = {
          id: myInfo.id,
          name: myInfo.name,
          email: myInfo.email,
          photo_url: myInfo.photo_url,
          role: roleInfo ? roleInfo.role : { role: "sa", name: "Super Admin", slug: "super_admin" },
          token: "xyz"
        };

        lStorage.set("authInfo", user);
        setTimeout(() => {
          history.push("/dashboard");
        });
      }
    }
  }, []);

  return (
    <div className="login-section">
      <div className="card-wrapper">

        <div className="loging-logo p-px-2 p-mx-5 p-mx-md-0 p-mb-4 p-text-center">
          <img src="/assets/logo.png" alt="heartfulness" />
        </div>

        <Card>
          <div className="login">
            <h2 className="title"> LogIn</h2>
            <HfnFirebaseAuth titleText="" doLogin={processLogin} />
            {loginCheck ? <div className="p-text-center p-m-4 p-text-bold"> Fetching info... </div> : null}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Login;
