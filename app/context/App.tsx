"use client";

import { AppContextType } from "@/types/type";
import React, { createContext, useContext, useState } from "react";

type AppContextProviderProps = {
  children: React.ReactNode;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [totalTasks, setTotalTasks] = useState<number>(0);

  return <AppContext.Provider value={{ totalTasks, setTotalTasks }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
