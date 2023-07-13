"use client";

import { ACCESS_TOKEN_KEY } from "@/constant";
import { getClientCookie } from "@/utils/helper";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const accessToken = getClientCookie(ACCESS_TOKEN_KEY);

  if (!accessToken) {
    router.push("/auth");
    return false;
  }

  return <main className="container">Oke content</main>;
}
