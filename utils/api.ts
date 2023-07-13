import { authApi } from "@/api/auth";
import { ACCEPT_STATUS_CODE, ACCESS_TOKEN_KEY } from "@/constant";
import axios, { AxiosError, AxiosResponse } from "axios";
import queryString from "query-string";
import { setClientCookie } from "./helper";

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
  async function (response: AxiosResponse) {
    if (response.status === 401) {
      const { config } = response;

      const resp = await authApi.getAccessToken();

      if (resp?.access_token) {
        setClientCookie(ACCESS_TOKEN_KEY, resp.access_token);
        return axiosClient(config);
      }
    }
    return response;
  },
  function (error: AxiosError) {}
);

export default axiosClient;
