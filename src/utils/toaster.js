// store
import appStore from "store";

import { SETREF, SUCCESS, INFO, WARN, ERROR, CUSTOM } from "store/actionTypes/toaster";

const toaster = {
  setRef: (ref) => appStore.dispatch({ type: SETREF,  payload: ref }),

  success: (detail) => {
    appStore.dispatch({
      type: SUCCESS, payload: { toastMessage: { severity: "success", summary: "Success", detail: detail } }
    });
  },

  info: (detail) => {
    appStore.dispatch({
      type: INFO, payload: { toastMessage: { severity: "info", summary: "Information", detail: detail } }
    });
  },

  warn: (detail) => {
    appStore.dispatch({
      type: WARN, payload: { toastMessage: { severity: "warn", summary: "Warning", detail: detail } }
    });
  },

  error: (detail) => {
    appStore.dispatch({
      type: ERROR, payload: { toastMessage: { severity: "error", summary: "Error", detail: detail } }
    });
  },

  custom: (toastMessage) => {
    appStore.dispatch({
      type: CUSTOM, payload: { toastMessage: toastMessage }
    });
  }
};

export default toaster;
