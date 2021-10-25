// state
import appStore from "store";

import { LOGOUT, SHOWLOGIN } from "store/actionTypes/login";

//utils
import { signOut } from "@heartfulnessinstitute/react-hfn-profile";

import { lStorage } from "utils/storage";

export const getLoginID = () => {
  const loginDetails = lStorage.get("authInfo");
  return (loginDetails && loginDetails.id) ? loginDetails.id : null;
};

export const getLoginName = () => {
  const loginDetails = lStorage.get("authInfo");
  return (loginDetails && loginDetails.name) ? loginDetails.name : "";
};


export const getLoginRole = () => {
  const loginDetails = lStorage.get("authInfo");
  return (loginDetails && loginDetails.role) ? loginDetails.role : {};
};

export const getLoginUer = () => {
  const loginDetails = lStorage.get("authInfo");

  return (loginDetails ? {
    id: loginDetails.id || null,
    name: loginDetails.name || "",
    role: loginDetails.role || {},
    email: loginDetails.email || "",
    phoneNo: loginDetails.phoneNo || "",
    avatar: loginDetails.photo_url || ""
  } : {})
};

export const isLoginAuth = () => {
  let loginDetails = lStorage.get("authInfo");
  return (loginDetails && loginDetails.token) ? true : false;
}

export const logout = () => {
  lStorage.clear();
  appStore.dispatch({ type: LOGOUT });
  signOut();
};

export const showLogin = () => {
  appStore.dispatch({ type: SHOWLOGIN });
};
