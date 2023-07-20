import { NextResponse } from "next/server";

export const authenticationFailed = (message: string = "Authentication failed") => {
  return new NextResponse(JSON.stringify({ success: false, message }), {
    status: 401,
    headers: { "content-type": "application/json" },
  });
};

export const emptyResponse = (message: string = "Empty data") => {
  return new NextResponse(JSON.stringify({ success: false, message }), {
    status: 201,
    headers: { "content-type": "application/json" },
  });
};
