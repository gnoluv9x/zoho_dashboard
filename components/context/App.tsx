"use client";

import { CommonInfo, IdAndNameType, ItemTypes, SprintDataType } from "@/types";
import { AppContextType, ChartDataItemType, TaskDetail } from "@/types/type";
import React, { createContext, useContext, useState } from "react";

type AppContextProviderProps = {
  children: React.ReactNode;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [renderItems, setRenderItems] = useState<TaskDetail[]>([]); // list task cần render
  const [listSprints, setListSprints] = useState<SprintDataType[]>([]); //
  const [listStatus, setListStatus] = useState<CommonInfo[]>([]); // trạng thái task: to do, inprogress, done....
  const [listMembers, setListMembers] = useState<IdAndNameType[]>([]);
  const [listProjects, setListProjects] = useState<CommonInfo[]>([]);
  const [listItemTypes, setListItemTypes] = useState<ItemTypes[]>([]); // danh sách các kiểu task: bug, task, story
  const [chartData, setChartData] = useState<Record<string, ChartDataItemType[]>>({});
  const [listAllItems, setListAllItems] = useState<TaskDetail[]>([]);

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
        chartData,
        setChartData,
        listAllItems,
        setListAllItems,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
