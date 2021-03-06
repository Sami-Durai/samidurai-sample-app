// eslint-disable-next-line no-undef
const configData = process.env;
let config = {};

try {
  config.apiURL = configData.REACT_APP_API_BASE_URI || "";
  config.NODE_ENV = configData.NODE_ENV;
  config.cityAutoCompleteURL = configData.REACT_APP_AUTOCOMPLETE_URI || "https://us-central1-hfn-registration-qa.cloudfunctions.net/";
}
catch {
  config.apiURL = "";
  config.cityAutoCompleteURL = "https://us-central1-hfn-registration-qa.cloudfunctions.net/";
}

config.appURL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

config.maxAllowedFileSize = 20;

config.donationAccountTypeList = [
  {
    name: "online",
    value: "online",
  },
  {
    name: "onsite ",
    value: "onsite ",
  }
];

export default config;
