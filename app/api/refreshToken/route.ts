import { authApi } from "@/api/auth";
import { ACCEPT_STATUS_CODE, ACCESS_TOKEN_COOKIE_KEY } from "@/constant";
import { ILoginBody } from "@/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // get access token from refresh token
  const respData = await authApi.getAccessToken();

  if (respData?.access_token) {
    const cookieStore = cookies();
    cookieStore.set(ACCESS_TOKEN_COOKIE_KEY, respData.access_token);
    return NextResponse.json(
      { message: "Đăng nhập thành công", accessToken: respData.access_token, status: "success" },
      { status: 200 },
    );
  } else {
    return NextResponse.json(
      { message: "Đăng nhập thất bại", status: "fail" },
      { status: ACCEPT_STATUS_CODE.BAD_REQUEST },
    );
  }
}
