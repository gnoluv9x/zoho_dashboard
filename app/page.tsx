"use client";

import Loader from "@/components/Common/Loading";
import Filter from "@/components/Filters";
import TaskTable from "@/components/TaskTable";
import { ACCESS_TOKEN_KEY } from "@/constant";
import { CommonInfo, FinalResponse, IdAndNameType } from "@/types";
import { TaskDetail } from "@/types/type";
import axiosClient from "@/utils/api";
import { removeDuplicate } from "@/utils/helper";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppContext } from "./context/App";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);

  const [listSprints, setListSprints] = useState<any[]>([]);
  const [listStatus, setListStatus] = useState<CommonInfo[]>([]);
  const [listMembers, setListMembers] = useState<IdAndNameType[]>([]);
  const [listProjects, setListProjects] = useState<CommonInfo[]>([]);
  const [listAllItems, setListAllItems] = useState<TaskDetail[]>([]);
  const [listRenderItems, setListRenderItems] = useState<TaskDetail[]>([]);

  const router = useRouter();
  const appContext = useAppContext();

  const accessToken = Cookies.get(ACCESS_TOKEN_KEY);

  const handleRespData = (data: FinalResponse) => {
    setListProjects(data.projects.projects);

    // list stataus
    let listStatus: CommonInfo[] = [];
    let listSprintss: IdAndNameType[] = [];
    data.sprints.forEach((item: any) => {
      listStatus = listStatus.concat(item.status);
      listSprintss = listSprintss.concat(item.sprints.listing);
    });

    setListStatus(listStatus);
    setListSprints(listSprintss);

    // list all items
    // list members
    const listAllItems: any[] = [];
    const listAllMembers: any[] = [];
    (data.items || []).forEach((item: any, idx: number) => {
      item.sprints.forEach((sprint: any) => {
        const listTaskOfSprint = sprint.items.tasks;
        const listMemberOfSprint = sprint.items.members;

        listAllItems.push(...listTaskOfSprint);
        listAllMembers.push(...listMemberOfSprint);
      });
    });

    setListAllItems(listAllItems);
    setListRenderItems(listAllItems);
    setListMembers(removeDuplicate(listAllMembers, "id"));
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
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && !accessToken) {
      router.push("/auth");
    }
  }, [accessToken, router]);

  useEffect(() => {
    appContext?.setTotalTasks(listRenderItems.length);
  }, [listRenderItems, appContext]);

  return (
    <main className="content_container">
      <div className="container mx-auto">
        {loading ? (
          <div className="relative h-[calc(100vh-56px)]">
            <Loader />
          </div>
        ) : (
          <>
            <Filter
              allItems={listAllItems}
              loading={loading}
              listStatus={listStatus}
              listProjects={listProjects}
              listMembers={listMembers}
              onChangeRenderItems={setListRenderItems}
            />
            <TaskTable
              listSprints={listSprints}
              data={listRenderItems}
              listStatus={listStatus}
              listProjects={listProjects}
              listMembers={listMembers}
              loading={loading}
            />
          </>
        )}
      </div>
    </main>
  );
}
