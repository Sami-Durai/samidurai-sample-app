// axios
import axios from "axios";

// request and response interceptor
import { interceptor } from "services/baseInterceptor";

// config
import config from "assets/config";

export const ax = axios.create({
  baseURL: config.apiURL
});

export const axApp = axios.create({
  baseURL: config.appURL
});

interceptor(ax);