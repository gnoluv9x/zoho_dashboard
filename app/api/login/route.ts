import { authApi } from "@/api/auth";
import { ACCEPT_STATUS_CODE, ACCESS_TOKEN_KEY } from "@/constant";
import { ILoginBody } from "@/models/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const loginBody: ILoginBody = await req.json();

  // validate body
  if (!loginBody || !loginBody.username || !loginBody.password) {
    let message = "",
      missingType = "";

    if (!loginBody) {
      message = "Vui lòng nhập đầy đủ username và password";
      missingType = "all";
    } else if (!loginBody.username) {
      message = "Vui lòng nhập username";
      missingType = "username";
    } else if (!loginBody.password) {
      message = "Vui lòng nhập password";
      missingType = "username";
    }

    const resp = {
      status: "fail",
      missingType,
      message,
    };

    return NextResponse.json(resp, { status: ACCEPT_STATUS_CODE.INVALID_FORMAT });
  }

  const { username, password } = loginBody;

  // validate username && password
  if (
    username !== process.env.NEXT_PUBLIC_ZOHO_USERNAME ||
    password !== process.env.NEXT_PUBLIC_ZOHO_PASSWORD
  ) {
    return NextResponse.json(
      { message: "Sai thông tin đăng nhập", status: "fail" },
      { status: ACCEPT_STATUS_CODE.BAD_REQUEST }
    );
  }

  // get access token from refresh token
  const respData = await authApi.getAccessToken();

  if (respData?.access_token) {
    const cookieStore = cookies();
    cookieStore.set(ACCESS_TOKEN_KEY, respData.access_token);
    return NextResponse.json(
      { message: "Đăng nhập thành công", accessToken: respData.access_token, status: "success" },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: "Đăng nhập thất bại", status: "fail" },
      { status: ACCEPT_STATUS_CODE.BAD_REQUEST }
    );
  }
}
