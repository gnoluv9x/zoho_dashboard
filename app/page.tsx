"use client";

import CommonTable from "@/components/Common/Table";
import Filter from "@/components/Filters";
import { ACCESS_TOKEN_KEY } from "@/constant";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const accessToken = Cookies.get(ACCESS_TOKEN_KEY);

  if (!accessToken) {
    router.push("/auth");
    return false;
  }

  return (
    <main className="content_container">
      <div className="container mx-auto">
        <Filter />
        <CommonTable />
      </div>
    </main>
  );
}
