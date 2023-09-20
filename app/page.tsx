"use client";

import Loader from "@/components/Common/Loading";
import Filter from "@/components/Filters";
import TaskTable from "@/components/TaskTable";
import { ACCESS_TOKEN_KEY } from "@/constant";
import { AllSprintData, CommonInfo, FinalResponse, IdAndNameType, ItemTypes } from "@/types";
import { TaskDetail } from "@/types/type";
import axiosClient from "@/utils/api";
import { removeDuplicate, sortFollowDate } from "@/utils/helper";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppContext } from "./context/App";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);

  const [listAllItems, setListAllItems] = useState<TaskDetail[]>([]);

  const router = useRouter();
  const appContext = useAppContext();

  const accessToken = Cookies.get(ACCESS_TOKEN_KEY);

  const handleRespData = (data: FinalResponse) => {
    appContext?.setListProjects(data.projects.projects);

    // list stataus
    let listStatus: CommonInfo[] = [];
    let listSprintss: IdAndNameType[] = [];
    let listItemType: ItemTypes[] = [];

    data.sprints.forEach((item: AllSprintData) => {
      listStatus = listStatus.concat(item.status);
      listSprintss = listSprintss.concat(item.sprints.listing);
      listItemType = listItemType.concat(item.itemTypes);
    });

    appContext?.setListStatus(removeDuplicate(listStatus, "id"));
    appContext?.setListSprints(listSprintss);
    appContext?.setListItemTypes(removeDuplicate(listItemType, "id"));

    // list all items
    // list members
    const listAllItems: TaskDetail[] = [];
    const listAllMembers: TaskDetail[] = [];
    (data.items || []).forEach((item: any, idx: number) => {
      item.sprints.forEach((sprint: any) => {
        const listTaskOfSprint = sprint.items.tasks;
        const listMemberOfSprint = sprint.items.members;

        listAllItems.push(...listTaskOfSprint);
        listAllMembers.push(...listMemberOfSprint);
      });
    });

    // sort follow created date
    sortFollowDate(listAllItems, "timeCreate", "desc");

    setListAllItems(listAllItems);
    appContext?.setRenderItems(listAllItems);
    appContext?.setListMembers(removeDuplicate(listAllMembers, "id"));
  };

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/allTasks")
      .then((resp: AxiosResponse<FinalResponse>) => {
        handleRespData(resp.data);
      })
      .catch((err) => {
        console.log("Debug_here err: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && !accessToken) {
      router.push("/auth");
    }
  }, [accessToken, router]);

  // useEffect(() => {
  //   appContext?.setRenderItems(listRenderItems);
  // }, [listRenderItems, appContext]);

  return loading ? (
    <div className="relative w-screen h-screen top-0 bottom-0  left-0 right-0 z-loading">
      <Loader />
    </div>
  ) : (
    <main className="w-full pt-16 px-3 h-screen">
      <div className="container mx-auto">
        <Filter allItems={listAllItems} />
        <TaskTable loading={loading} />
      </div>
    </main>
  );
}
