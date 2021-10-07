import appStore from 'src/store/index';

// utils
import { isEmpty, isArray, isObject } from 'lodash';

import { lStorage } from 'src/utils/storage';

// services
import DropdownService from 'src/services/login';

import {
  CLEAR,
  COLLEGEPOC,
  MODULELIST
} from 'src/store/actions/type/dropdown';

const getAvailableVolunteersForPOC = async (payload) => {
  try {
    appStore.dispatch({ type: COLLEGEPOC, payload: [] })

    let userDetails = lStorage.get('dmsAuthInfo');

    if (userDetails && userDetails.role_priority) {
      let dropdownService = new DropdownService()
      let apiResponse = await dropdownService.getVolunteersForPOC(payload)

      if (apiResponse && apiResponse.data) {
        let apiResponseData = apiResponse.data;
        if (!apiResponseData.isError && apiResponseData.data) {
          let rows = [], dropdownOptions;
          if (isArray(apiResponseData.data))
            rows = apiResponseData.data;
          else if (isObject(apiResponseData.data))
            rows = [apiResponseData.data];
          dropdownOptions = rows.map(value => ({
            label: value.name || "",
            value: value.user_id,
            city: value.city || "",
            state: value.state || "",
            zone: value.zone || ""
          }));
          appStore.dispatch({ type: COLLEGEPOC, payload: dropdownOptions })
        }
      }
    }
  }
  catch {
    console.log("Something went wrong.");
  }
}

const getModuleDropdown = async () => {
  let dd = appStore.getState().dropdownDetails;

  if (isEmpty(dd.discipline)) {
    let dropdownService = new DropdownService()
    let apiResponse = await dropdownService.getModuleList()
    if (apiResponse && apiResponse.data) {
      let apiResponseData = apiResponse.data;

      if (!apiResponseData.isError) {
        let dropdownOptions = apiResponseData.data.map(value => {
          return { label: value.module_name, value: value.module_id }
        });
        appStore.dispatch({ type: MODULELIST, payload: dropdownOptions })
      }
    }
  }
}

const clearDropdown = () => {
  appStore.dispatch({ type: CLEAR })
}

export const dropdown = {
  clear: clearDropdown,
  collegePOC: getAvailableVolunteersForPOC,
  moduleList: getModuleDropdown
}
