import { combineReducers } from "redux";

// reducers
import appDetails from "./app";

import loginDetails from "./login";

import { toasterDetails } from "./toaster";

import { confirmDialogDetails } from "./confirmDialog";

import { modalPopupDetails } from "./modalPopup";

import { cartDetails } from "./cart";

import { dropdownDetails } from "./dropdown";

const rootReducer = combineReducers({
  appDetails,
  loginDetails,
  toasterDetails,
  confirmDialogDetails,
  modalPopupDetails,
  cartDetails,
  dropdownDetails
});

export default rootReducer;
