// state
import appStore from "store";

import { APP_OPENSIDEBAR } from "store/actionTypes/app";

//utils
import moment from "moment";

import { isEmpty, isString, isObject, isArray } from "lodash";

import { saveAs } from "file-saver";

export const getDateString = (inputDate = null, dateFormat = "MMM DD, YYYY") => {
  let date = inputDate;
  if (!(inputDate instanceof Date))
    date = new Date(inputDate);
  if (!isNaN(date)) {
    return moment(date).format(dateFormat);
  }
  return null;
};

export const getResponseMessage = (apiResponseData) => {
  let errMsg = "", message, errObj;

  if (!isEmpty(apiResponseData) && !isEmpty(apiResponseData.message)) {
    message = apiResponseData.message;
    if (isString(message)) {
      errMsg = message
    }

    if (isObject(message)) {

      errObj = Object.keys(message[0])

      if (isArray(errObj)) {
        errMsg = message[0][errObj[0]][0];
      }

    }

    if (isArray(message)) {

      if (isObject(message[0])) {

        errObj = Object.keys(message[0]);

        if (isArray(errObj)) {
          errMsg = message[0][errObj[0]][0];
        }

      }
      else if (isString(message[0])) {
        errMsg = message[0];
      }

    }
  }
  return errMsg;
};

export const randomText = (val) => {
  return Array.from(Array(val), () => Math.floor(Math.random() * 36).toString(36)).join("");
};

export const getTotalHours = val => {
  if (val && Number.isInteger(val)) {
    const minutes = val % 60;
    const hours = parseInt(val / 60);

    if (Number.isInteger(minutes) && Number.isInteger(hours))
      return ((hours < 10) ? "0" + hours : hours) + ":" + ((minutes < 10) ? "0" + minutes : minutes);
  }
};

export const downloadFile = (url, name) => {
  try {
    if (url && name) {
      saveAs(url, name);
    }
  }
  catch {
    console.log("Something went wrong.");
  }
};

export const toggleSideBar = () => {
  const isSidebarOpen = appStore.getState().appDetails.isSidebarOpen;
  appStore.dispatch({ type: APP_OPENSIDEBAR, payload: !isSidebarOpen });
};

