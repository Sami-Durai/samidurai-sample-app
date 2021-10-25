// redux store
import appStore from "store";

import { REQUESTERROR } from "store/actionTypes/toaster";

// local storage
import { lStorage } from "utils/storage";

// utils
import { logout } from "utils/login";

const interceptor = ax => {
  ax.interceptors.request.use(
    config => {
      let token = lStorage.get("authInfo") ? lStorage.get("authInfo").token : null;
      config.headers = {
        "Authorization": `Bearer ${token}`
      }
      return config;
    },
    error => {
      Promise.reject(error);
    }
  );

  ax.interceptors.response.use(
    next => {
      return Promise.resolve(next);
    },
    error => {
      if (error.response && error.response.status === 401) {
        logout();
      }
      else {
        appStore.dispatch({
          type: REQUESTERROR,
          payload: {
            show: true,
            toastMessage: {
              severity: "error",
              summary: "Somthing Went Wrong",
              detail: error.message
            }
          }
        });
      }
      return Promise.reject(error);
    }
  );
};

export { interceptor };
