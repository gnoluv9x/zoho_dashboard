"use client";

import React from "react";

interface indexProps {}

const Header: React.FC<indexProps> = ({}) => {
  return (
    <header className="px-5 h-14 flex justify-end items-center bg-blue-600 text-white text-2xl font-bold">
      <button className="p-2">Sign in</button>
    </header>
  );
};

export default Header;
