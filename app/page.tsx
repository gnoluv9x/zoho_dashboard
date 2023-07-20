"use client";

import CommonTable from "@/components/Common/Table";
import Filter from "@/components/Filters";
import TaskTable from "@/components/TaskTable";
import { ACCESS_TOKEN_KEY } from "@/constant";
import { CommonInfo, FinalResponse, IdAndNameType, ItemsResponse } from "@/types";
import axiosClient from "@/utils/api";
import { removeDuplicate } from "@/utils/helper";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [respData, setRespData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [listSprints, setListSprints] = useState<any[]>([]);
  const [listStatus, setListStatus] = useState<CommonInfo[]>([]);
  const [listMembers, setListMembers] = useState<any[]>([]);
  const [listProjects, setListProjects] = useState<CommonInfo[]>([]);
  const [listAllItems, setListAllItems] = useState<any[]>([]);
  console.log("Debug_here listAllItems: ", listAllItems);
  const [listRenderItems, setListRenderItems] = useState<any[]>([]);

  const router = useRouter();

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
    (data.items || []).forEach((item: any) => {
      item.sprints.forEach((sprint: any) => {
        const listTaskOfSprint = sprint.items.tasks;
        const listMemberOfSprint = sprint.items.members;

        listAllItems.push(...listTaskOfSprint);
        listAllMembers.push(...listMemberOfSprint);
      });
    });

    setListAllItems(listAllItems);
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

  if (!accessToken) {
    router.push("/auth");
    return false;
  }

  return (
    <main className="content_container">
      <div className="container mx-auto">
        <Filter loading={loading} data={respData} />
        <TaskTable listSprints={listSprints} data={listAllItems} />
      </div>
    </main>
  );
}
