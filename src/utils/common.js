import React from 'react';

import { FileIcon } from 'react-file-icon';

//import { signOut } from '@heartfulnessinstitute/react-hfn-profile';

// storage 
import { lStorage } from '../utils/storage';

//state
import appStore from '../store/index';

//utils
import { formatDate } from '@fullcalendar/core'

import { isEmpty, isString, isObject, isArray, merge } from 'lodash';

import { saveAs } from 'file-saver';

import { LOGOUT, SHOWLOGIN } from "../store/actions/type/login";


export const fileType = {

  png: {
    color: "lavender",
    type: "image",
  },
  jpg: {
    color: "mistyrose",
    type: "image",
  },
  jpeg: {
    color: "papayawhip",
    type: "image",
  },
  gif: {
    color: "papayawhip",
    type: "image",
  },
  svg: {
    color: "papayawhip",
    type: "vector",
  },
  doc: {
    color: "#2C5898",
    type: "document",
  },
  docx: {
    color: "#2C5898",
    type: "document",
  },
  xsls: {
    color: "#1A754C",
    type: "spreadsheet",
  },
  xls: {
    color: "#1A754C",
    type: "spreadsheet",
  },
  xlsx: {
    color: "#1A754C",
    type: "spreadsheet",
  },
  csv: {
    color: "#1A754C",
    labelColor: "#1A754C",
  },
  ppt: {
    color: "#D14423",
    labelColor: "#D14423",
  },
  pdf: {
    color: "#D14423",
    type: "acrobat",
  },

}

const dateOptions = {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}

export const logout = () => {
  lStorage.clear();
  appStore.dispatch({ type: LOGOUT });
  //signOut();
}

export const showLogin = () => {
  appStore.dispatch({ type: SHOWLOGIN })
}

export const getDateString = (inputDate, customDateOptions) => {
  let date = inputDate;
  if (!(inputDate instanceof Date))
    date = new Date(inputDate);
  if (!isNaN(date)) {
    return formatDate(date, merge({}, dateOptions, customDateOptions))
  }
  return null;
}

export const getFileTypeIcon = (rowData) => {

  let fileName;

  if (rowData.file_type) {
    fileName = rowData.file_type.toLowerCase()
  } else {
    fileName = ""
  }

  return (
    <>
      {
        (fileName && fileType[fileName])
          ?
          <div className="file-type-wrapper">
            <FileIcon
              extension={fileName}
              color={fileType[fileName].color}
              type={fileType[fileName].type}
              glyphColor={"#fff"}
              labelUppercase
            />
          </div>
          :
          <></>
      }

    </>
  )
}

export const getMediaIcon = (rowData) => {

  let fileName;

  if (rowData.file_type) {
    fileName = rowData.file_type.toLowerCase()
  } else {
    fileName = ""
  }

  return (
    <div className="gallery-media-icon">
      {
        (fileName && fileType[fileName])
          ?
          <FileIcon
            className=""
            extension={fileName}
            color={fileType[fileName].color}
            type={fileType[fileName].type}
            glyphColor={"#fff"}
            labelUppercase
          />
          :
          <FileIcon color="blue" />
      }

    </div>
  )
}

export const getAttachmentIcon = (fileExtension) => {
  return (
    <div>
      {
        (fileExtension && fileType[fileExtension])
          ?
          <FileIcon
            className=""
            extension={fileExtension}
            color={fileType[fileExtension].color}
            type={fileType[fileExtension].type}
            glyphColor={"#fff"}
            labelUppercase
          />
          :
          <FileIcon color="blue" />
      }

    </div>
  )
}

export const isLoginAuth = () => {
  let loginDetails = lStorage.get('dmsAuthInfo');
  return (loginDetails && loginDetails.token) ? true : false;
}

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
}

export const randomText = (val) => {
  return Array.from(Array(val), () => Math.floor(Math.random() * 36).toString(36)).join('');
}

export const getTotalHours = val => {
  if (val && Number.isInteger(val)) {
    const minutes = val % 60;
    const hours = parseInt(val / 60);

    if (Number.isInteger(minutes) && Number.isInteger(hours))
      return ((hours < 10) ? "0" + hours : hours) + ":" + ((minutes < 10) ? "0" + minutes : minutes);
  }
}

export const downloadFile = (url, name) => {
  try {
    if (url && name) {
      saveAs(url, name);
    }
  }
  catch {
    console.log("Something went wrong.");
  }
}
