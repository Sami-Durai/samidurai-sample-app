// eslint-disable-next-line no-undef
const configData = process.env;
let config = {};

try {
  config.apiURL = configData.REACT_APP_API_BASE_URI || "";
  config.NODE_ENV = configData.NODE_ENV;
}
catch {
  config.apiURL = "";
}

config.appURL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

config.maxAllowedFileSize = 20;

export default config;
