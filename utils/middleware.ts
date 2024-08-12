import { ACCESS_TOKEN_COOKIE_KEY } from "@/constant";
import { cookies } from "next/headers";

export const authMiddleware = async () => {
  const cookieStore = cookies();

  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_KEY);
};
