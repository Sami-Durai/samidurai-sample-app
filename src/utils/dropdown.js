// store
import appStore from "store/index";

import { CLEAR, GENERALSTATUS, COUNTRY, ORGANIZATION, FC, AM, ACCOUNTTYPE } from "store/actionTypes/dropdown";

// services
//import DropdownService from "services/login";

// config
import config from "assets/config";

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

const getCountries = async () => {
  try {
    appStore.dispatch({ type: COUNTRY, payload: [] });
    //const dropdownService = new DropdownService();
    //const apiResponse = await dropdownService.getCountryList();
    const apiResponse = {
      data: {
        results:
          [
            {
              name: "India",
              id: 1
            },
            {
              name: "United States",
              id: 2
            },
            {
              name: "Canada",
              id: 3
            }
          ]
      }
    };

    if (apiResponse && apiResponse.data && !apiResponse.data.isError && Array.isArray(apiResponse.data.results)) {
      const results = apiResponse.data.results;
      appStore.dispatch({ type: COUNTRY, payload: results.map(({ name, id }) => ({ label: name, value: id })) });
    }
  }
  catch {
    console.log("Something went wrong.");
  }
};

const getOrganizations = async () => {
  try {
    appStore.dispatch({ type: ORGANIZATION, payload: [] });
    //const dropdownService = new DropdownService();
    //const apiResponse = await dropdownService.getOrganizationList();
    const apiResponse = {
      data: {
        results:
          [
            {
              name: "Heartfulness Green",
              id: 1
            },
            {
              name: "Adopt A Tree Initiative",
              id: 2
            },
            {
              name: "Donation for SMSF India - General Fund",
              id: 3
            }
          ]
      }
    };

    if (apiResponse && apiResponse.data && !apiResponse.data.isError && Array.isArray(apiResponse.data.results)) {
      const results = apiResponse.data.results;
      appStore.dispatch({ type: ORGANIZATION, payload: results.map(({ name, id }) => ({ label: name, value: id })) });
    }
  }
  catch {
    console.log("Something went wrong.");
  }
};

const getFinanceControllers = async () => {
  try {
    appStore.dispatch({ type: FC, payload: [] });
    //const dropdownService = new DropdownService();
    //const apiResponse = await dropdownService.getFinanceControllerList();
    const apiResponse = {
      data: {
        results:
          [
            {
              name: "Sami",
              id: 11
            },
            {
              name: "Natarajan",
              id: 12
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

const getAshramManagers = async () => {
  try {
    appStore.dispatch({ type: AM, payload: [] });
    //const dropdownService = new DropdownService();
    //const apiResponse = await dropdownService.getAshramManagerList();
    const apiResponse = {
      data: {
        results:
          [
            {
              name: "Sami Durai",
              id: 21
            },
            {
              name: "Rajesh",
              id: 22
            },
            {
              name: "Yogesh",
              id: 23
            },
            {
              name: "Naga Rajan",
              id: 24
            }
          ]
      }
    };

    if (apiResponse && apiResponse.data && !apiResponse.data.isError && Array.isArray(apiResponse.data.results)) {
      const results = apiResponse.data.results;
      appStore.dispatch({ type: AM, payload: results.map(({ name, id }) => ({ label: name, value: id })) });
    }
  }
  catch {
    console.log("Something went wrong.");
  }
};

const getAccountTypes = async () => {
  try {
    const dropdownDetails = appStore.getState().dropdownDetails;

    if (!Array.isArray(dropdownDetails.accountType) || dropdownDetails.accountType.length === 0) {
      const results = Array.isArray(config.donationAccountTypeList) ? config.donationAccountTypeList : [];
      appStore.dispatch({ type: ACCOUNTTYPE, payload: results.map(({ name, value }) => ({ label: name, value: value })) });
    }
  }
  catch {
    console.log("Something went wrong.");
  }
};

const clearDropdown = () => {
  appStore.dispatch({ type: CLEAR });
};

export default {
  clear: clearDropdown,
  generalStatus: getGeneralStatuses,
  country: getCountries,
  organization: getOrganizations,
  fc: getFinanceControllers,
  am: getAshramManagers,
  accountType: getAccountTypes
};
