import { ILoginBody } from "@/models/server";
import axiosClient from "@/utils/api";

const LOGIN_URL = "/login";

export const authApi = {
  login: (body: ILoginBody): Promise<any> => {
    return axiosClient.post(LOGIN_URL, body);
  },
  async getAccessToken() {
    try {
      const formData = new FormData();
      formData.append("refresh_token", process.env.NEXT_PUBLIC_REFESH_TOKEN as string);
      formData.append("client_id", process.env.NEXT_PUBLIC_ZOHO_CLIENT_ID as string);
      formData.append("client_secret", process.env.NEXT_PUBLIC_ZOHO_CLIENT_SECRET as string);
      formData.append("redirect_uri", process.env.NEXT_PUBLIC_REDIRECT_URL as string);
      formData.append("grant_type", "refresh_token");

      const response = await fetch("https://accounts.zoho.com/oauth/v2/token", {
        method: "POST",
        redirect: "manual",
        body: formData,
      });

      const respData = await response.json();
      return respData;
    } catch (error: any) {
      throw new Error(error?.message || "Không thể nhận được token");
    }
  },
};
