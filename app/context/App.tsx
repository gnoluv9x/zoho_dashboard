"use client";

import { CommonInfo, IdAndNameType } from "@/types";
import { AppContextType, TaskDetail } from "@/types/type";
import React, { createContext, useContext, useState } from "react";

type AppContextProviderProps = {
  children: React.ReactNode;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [renderItems, setRenderItems] = useState<TaskDetail[]>([]);
  const [listSprints, setListSprints] = useState<any[]>([]);
  const [listStatus, setListStatus] = useState<CommonInfo[]>([]);
  const [listMembers, setListMembers] = useState<IdAndNameType[]>([]);
  const [listProjects, setListProjects] = useState<CommonInfo[]>([]);

  return (
    <AppContext.Provider
      value={{
        renderItems,
        setRenderItems,
        listSprints,
        setListSprints,
        listStatus,
        setListStatus,
        listMembers,
        setListMembers,
        listProjects,
        setListProjects,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
