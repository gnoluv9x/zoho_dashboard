import { authApi } from "@/api/auth";
import { ACCEPT_STATUS_CODE, ACCESS_TOKEN_KEY } from "@/constant";
import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import queryString from "query-string";
import { getAccessToken } from "./listApis";

const listAcceptHttpStatusCode = Object.values(ACCEPT_STATUS_CODE);

const axiosClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: (status: number): boolean => {
    return (status >= 200 && status < 300) || listAcceptHttpStatusCode.includes(status);
  },
  paramsSerializer: (params): string => queryString.stringify(params, { skipNull: true, skipEmptyString: true }),
});

// Interceptors
axiosClient.interceptors.response.use(
  async function (response: AxiosResponse) {
    if (response.status === 401) {
      const { config } = response;

      const resp: any = await getAccessToken();

      if (resp?.data?.accessToken) {
        Cookies.set(ACCESS_TOKEN_KEY, resp?.data.accessToken);
        return axiosClient(config);
      }
    }
    return response;
  },
  function (error: AxiosError) {},
);

export default axiosClient;
