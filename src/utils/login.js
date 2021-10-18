// storage 
import { lStorage } from "utils/storage";

export const getLoginID = () => {
  const loginDetails = lStorage.get("dmsAuthInfo");
  return (loginDetails && loginDetails.id) ? loginDetails.id : null;
};

export const getLoginName = () => {
  const loginDetails = lStorage.get("dmsAuthInfo");
  return (loginDetails && loginDetails.name) ? loginDetails.name : "";
};


export const getLoginRole = () => {
  const loginDetails = lStorage.get("dmsAuthInfo");
  return (loginDetails && loginDetails.role) ? loginDetails.role : "";
};

export const getLoginUer = () => {
  const loginDetails = lStorage.get("dmsAuthInfo");

  return (loginDetails ? {
    id: loginDetails.id || null,
    name: loginDetails.name || "",
    role: loginDetails.role || "",
    email: loginDetails.email_address || "",
    phoneNo: loginDetails.phoneNo || "",
    avatar: loginDetails.avatar || "",
    address: loginDetails.address || "",
    city: loginDetails.city || "",
    state: loginDetails.state || "",
    country: loginDetails.country || "",
    ashram: loginDetails.ashram || null
  } : {})
};
