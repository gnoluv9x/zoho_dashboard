"use client";

import { usePathname } from "next/navigation";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const pathname = usePathname();

  if (pathname === "/auth") {
    return false;
  }

  return (
    <header className="px-5 h-14 flex justify-end items-center bg-blue-600 text-white text-2xl font-bold">
      <button className="p-2">Sign in</button>
    </header>
  );
};

export default Header;
