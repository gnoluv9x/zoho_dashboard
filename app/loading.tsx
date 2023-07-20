"use client";

import Loader from "@/components/Common/Loading";

export default function Loading() {
  return (
    <div className="relative z-50 w-screen h-screen">
      <Loader />
    </div>
  );
}
