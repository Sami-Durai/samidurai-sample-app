import React, { useState, useEffect } from "react";

// react router
import { useHistory } from "react-router-dom";

// react redux
import { connect } from "react-redux";

// components
// primereact components 
import { Card } from "primereact/card";

import { Button } from "primereact/button";

// shared components
import HFNDynamicForm from "shared-components/hfn-form";

// utils
import { isEmpty } from "lodash";

import { isLoginAuth } from "utils/common";

import { lStorage } from "utils/storage";

import validations from "utils/validations";

//import { HfnFirebaseAuth, signOut } from "@heartfulnessinstitute/react-hfn-profile";

const Login = () => {

  let history = useHistory();

  const [isShowSSO] = useState(false);

  // initial values 
  const [loginFormInitialValue] = useState({
    email_address: null,
    password: null
  });

  // properties 

  const [loginFormFields] = useState({
    email_address: {

      properties: {
        type: "InputText",
        label: "Email address",
        fieldWrapperClassNames: "p-col-12",
        primeFieldProps: {
        },
        validations: {
          required: validations.required,
          pattern: validations.email
        }
      },

    },
    password: {

      properties: {
        type: "InputText",
        label: "Password",
        fieldWrapperClassNames: "p-col-12",
        primeFieldProps: {
          type: "password"
        },
        validations: {
          required: validations.required,
        }
      },


    }
  });

  useEffect(() => {
    isLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Login form submit section starts
  const loginFormOnsubmit = async (data, err) => {
    if (isEmpty(err)) {
      lStorage.set("dmsAuthInfo", { name: "Ashram Manager", role: "AM", token: "xyz", authed: true, isUser: true });
      history.push("/dashboard");
    }
  };
  // Login form submit section end

  const isLogin = () => {
    if (isLoginAuth())
      history.push("/");
    else
      history.push("/login");
  };

  const loginSubmitButtonGroup = () => {
    return (
      <div className="p-field p-col-12">
        <Button label="LogIn" className="p-button-primary login-button" type="submit" />
      </div>
    )
  };

  // const showSSO = () => {
  //   setShowSSO(!isShowSSO)
  // }

  // const processLogin = async ({ myInfo }) => {

  //   let loginResponse, ssoLoginInfo;

  //   console.log(myInfo)

  //   ssoLoginInfo = {
  //     ssoAuthenticate: { results: [myInfo] }
  //   }

  //   try {

  //     if (ssoLoginInfo.ssoAuthenticate.results.length > 0 && myInfo) {

  //       loginResponse = await response.add({
  //         service: ls,
  //         method: "ssoLogin",
  //         data: { item: ssoLoginInfo },
  //         toasterMessage: {
  //           success: "Login successfully",
  //           error: "Please login with registered email"
  //         }
  //       })

  //       if (loginResponse && loginResponse.data && !loginResponse.data.isError) {
  //         lStorage.set("dmsAuthInfo", loginResponse.data.data);
  //         props.dispatch({ type: LOGIN, payload: loginResponse.data.data });
  //         history.push("/dashboard");
  //       } else {
  //         signOut()
  //       }
  //     }

  //   } catch (err) {
  //     console.log(err)
  //   }

  // }

  return (
    <div className="login-section">
      <div className="card-wrapper">

        <div className="loging-logo p-px-2 p-mx-5 p-mx-md-0 p-mb-4 p-text-center">
          <img src="/assets//logo.png" alt="heartfulness" />
        </div>

        <Card>
          <div className="login">

            {
              (!isShowSSO) ? <div>
                <h2 className="title p-mb-4"> Login</h2>

                <HFNDynamicForm
                  initialValues={loginFormInitialValue}
                  fields={loginFormFields}
                  onFormSubmit={loginFormOnsubmit}
                  submitButtonGroup={loginSubmitButtonGroup}>
                </HFNDynamicForm>

                {/* <div className="sso-wrapper">
                  <div className="or">
                    <span>Or</span>
                  </div>
                  <div className="p-field p-col-12">
                    <Button onClick={showSSO} className="p-button-success sso-btn">SignIn With SRCM Profile</Button>
                  </div>
                </div> */}

                <a className="forget-pass" href="https://profile.sahajmarg.org/accounts/password/reset/" target="_blank" rel="external nofollow noopener noreferrer" >
                  Forgot Password?
                </a>
              </div> :
                <div>
                  {/* <HfnFirebaseAuth doLogin={processLogin}></HfnFirebaseAuth>
                  <div className="p-field p-col-12 p-text-center" style={{ cursor: "pointer" }}>
                    <p onClick={showSSO}><u>Login</u></p>
                  </div> */}
                </div>
            }

          </div>
        </Card>
      </div>
    </div>
  )
}

// export default Login
const mapStateToProps = (state) => ({
  ld: state.loginDetails
});

export default connect(mapStateToProps)(Login);
