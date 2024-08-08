"use client";

import { MemberPerformance } from "@/components/MemberPerformance";
import { ACCESS_TOKEN_KEY } from "@/constant";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Page() {
  const router = useRouter();
  const accessToken = Cookies.get(ACCESS_TOKEN_KEY);

  useLayoutEffect(() => {
    if (typeof window !== "undefined" && !accessToken) {
      router.push("/auth");
    }
  }, [accessToken, router]);

  return <MemberPerformance />;
}
