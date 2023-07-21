"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Avatar from "../Common/Avatar";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "@/constant";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/auth") {
    return false;
  }

  const handleLogout = () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
    router.push("/auth");
  };

  return (
    <header className="px-5 h-14 flex justify-end items-center bg-blue-600 text-white text-2xl font-bold">
      <div className="mr-2 flex gap-2 items-center">
        <Avatar className="w-6 h-6 rounded-full " />
        <span className="">{process.env.NEXT_PUBLIC_ZOHO_USERNAME}</span>
      </div>
      <div className="mr-2 w-[1px] h-7 bg-[#aaa] my-2"></div>
      <button onClick={handleLogout} className="p-1 font-normal">
        Sign out
      </button>
    </header>
  );
};

export default Header;
