let config = {};

try {
  config.apiURL = "";
}
catch {
  config.apiURL = "";
}

config.appURL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

config.maxAllowedFileSize = 20;

export default config;
