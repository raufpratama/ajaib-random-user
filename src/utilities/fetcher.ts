import axios, {AxiosError, AxiosRequestConfig} from "axios";
import { STORAGE_KEYS, HttpMethod } from "./constants";

const baseConfig: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

const client = axios.create(baseConfig);

client.interceptors.request.use(async function (config) {
  const token = localStorage.getItem(STORAGE_KEYS.token);

  //const roleId = localStorageExt.getLocalStorage(LOCALSTORAGE_KEY.ROLE_ID);

  if (token) {
    config.headers!.Authorization = "Bearer " + token;
  }

  return Promise.resolve(config);
});

client.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  async function (error: AxiosError) {
    /*if (error.response.status === 401) {
      window.location.href = SSO.LOGIN_URL;
    }*/
    if (
      error.config?.method !== HttpMethod.GET
    ) {
      console.log(error.toJSON());
    }

    return Promise.reject(error);
  }
);

const fetcher = async <T = any, Z = AxiosRequestConfig>(config: Z) => {
  return client.request<T>(config);
};

export default fetcher;
