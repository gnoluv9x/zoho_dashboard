"use client";

import Loader from "@/components/Common/Loading";

export default function Loading() {
  return (
    <div className="relative w-screen h-[calc(100vh-56px)] z-[loading]">
      <Loader />
    </div>
  );
}
