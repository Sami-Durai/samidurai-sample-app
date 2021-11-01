import { combineReducers } from "redux";

// reducers
import appDetails from "store/reducers/app";

import loginDetails from "store/reducers/login";

import toasterDetails from "store/reducers/toaster";

import confirmDialogDetails from "store/reducers/confirmDialog";

import modalPopupDetails from "store/reducers/modalPopup";

import dropdownDetails from "store/reducers/dropdown";

const rootReducer = combineReducers({
  appDetails,
  loginDetails,
  toasterDetails,
  confirmDialogDetails,
  modalPopupDetails,
  dropdownDetails
});

export default rootReducer;
