"use client";

import Loader from "@/components/common/Loading";

export default function Loading() {
  return (
    <div className="relative z-[loading] h-[calc(100vh-56px)] w-screen">
      <Loader />
    </div>
  );
}
