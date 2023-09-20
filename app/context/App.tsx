"use client";

import { CommonInfo, IdAndNameType, ItemTypes } from "@/types";
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
  const [listItemTypes, setListItemTypes] = useState<ItemTypes[]>([]);

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
        listItemTypes,
        setListItemTypes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
