"use client";

import Loader from "@/components/common/Loading";
import { useAppContext } from "@/components/context/App";
import Filter from "@/components/Filters";
import TaskTable from "@/components/TaskTable";
import { ACCESS_TOKEN_KEY } from "@/constant";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const appContext = useAppContext();

  const accessToken = Cookies.get(ACCESS_TOKEN_KEY);
  const loading = appContext?.loading;

  useEffect(() => {
    if (typeof window !== "undefined" && !accessToken) {
      router.push("/auth");
    }
  }, [accessToken, router]);

  return (
    <>
      {loading && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-loading h-screen w-screen">
          <Loader />
        </div>
      )}
      <Filter />
      <TaskTable />
    </>
  );
}