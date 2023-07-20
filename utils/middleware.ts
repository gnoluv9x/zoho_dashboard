import { ACCESS_TOKEN_KEY } from "@/constant";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

export const authMiddleware = async () => {
  const cookieStore = cookies();

  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY);
};
