import { ACCEPT_STATUS_CODE } from "@/constant";
import { ILoginBody } from "@/models/server";
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
      status: false,
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
      { message: "Sai thông tin đăng nhập" },
      { status: ACCEPT_STATUS_CODE.BAD_REQUEST }
    );
  }

  // get access token from refresh token
  const formData = new FormData();
  formData.append("refresh_token", process.env.NEXT_PUBLIC_REFESH_TOKEN as string);
  formData.append("client_id", process.env.NEXT_PUBLIC_ZOHO_CLIENT_ID as string);
  formData.append("client_secret", process.env.NEXT_PUBLIC_ZOHO_CLIENT_SECRET as string);
  formData.append("redirect_uri", "https://www.google.com");
  formData.append("grant_type", "refresh_token");

  const response = await fetch("https://accounts.zoho.com/oauth/v2/token", {
    method: "POST",
    redirect: "manual",
    body: formData,
  });
  const respData = await response.json();
  console.log("Debug_here response: ", respData);

  return NextResponse.json({ message: "Đăng nhập thành công" }, { status: 200 });
}
