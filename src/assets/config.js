// utils
//import getMandatoryEnv from "sites-common/src/utils/getMandatoryEnv";
//const getMandatoryEnv = require("sites-common/src/utils/getMandatoryEnv");

let config = {};

try {
  //const { dmsConfig } = getMandatoryEnv([ "dmsConfig" ]);
  //config.apiURL = dmsConfig.apiURL || "";
  config.apiURL = "";
}
catch {
  config.apiURL = "";
}

config.appURL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

config.maxAllowedFileSize = 20;

export default config;
