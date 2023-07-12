import axios, { AxiosError, AxiosResponse } from "axios";
import queryString from "query-string";
import { handleLogout } from "./helper";
import { ACCEPT_STATUS_CODE } from "@/constant";

const listAcceptHttpStatusCode = Object.values(ACCEPT_STATUS_CODE);

const axiosClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: (status: number): boolean => {
    return (status >= 200 && status < 300) || listAcceptHttpStatusCode.includes(status);
  },
  paramsSerializer: (params): string =>
    queryString.stringify(params, { skipNull: true, skipEmptyString: true }),
});

// Interceptors
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    if (response.status === 401) {
      handleLogout();
    }
    return response;
  },
  function (error: AxiosError) {
    if (error.response?.status === 401) {
      handleLogout();
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
