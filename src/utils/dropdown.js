// store
import appStore from "store/index";

import { CLEAR, GENERALSTATUS, FC } from "store/actionTypes/dropdown";

// services
//import DropdownService from "services/login";

const geFunctionalControllers = async () => {
  try {
    appStore.dispatch({ type: FC, payload: [] });
    //const dropdownService = new DropdownService();
    //const apiResponse = await dropdownService.getFCList();
    const apiResponse = {
      data: {
        results:
          [
            {
              name: "Sami",
              id: 10
            },
            {
              name: "Durai",
              id: 11
            }
          ]
      }
    };

    if (apiResponse && apiResponse.data && !apiResponse.data.isError && Array.isArray(apiResponse.data.results)) {
      const results = apiResponse.data.results;
      appStore.dispatch({ type: FC, payload: results.map(({ name, id }) => ({ label: name, value: id })) });
    }
  }
  catch {
    console.log("Something went wrong.");
  }
};

const getGeneralStatuses = async () => {
  try {
    appStore.dispatch({ type: GENERALSTATUS, payload: [] });
    //const dropdownService = new DropdownService();
    //const apiResponse = await dropdownService.getGeneralStatusList();
    const apiResponse = {
      data: {
        results:
          [
            {
              name: "Active",
              id: 1
            },
            {
              name: "In Active",
              id: 2
            }
          ]
      }
    };

    if (apiResponse && apiResponse.data && !apiResponse.data.isError && Array.isArray(apiResponse.data.results)) {
      const results = apiResponse.data.results;
      appStore.dispatch({ type: GENERALSTATUS, payload: results.map(({ name, id }) => ({ label: name, value: id })) });
    }
  }
  catch {
    console.log("Something went wrong.");
  }
};

const clearDropdown = () => {
  appStore.dispatch({ type: CLEAR })
};

export default {
  clear: clearDropdown,
  fc: geFunctionalControllers,
  generalStatus: getGeneralStatuses
};
